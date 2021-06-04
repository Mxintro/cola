import { deepCopy, deepGet, deepSet } from '../../utils/utils'
import Schema, { Rules, RuleItem } from 'async-validator';

export type FormListener = (name: string) => void

export default class FormStore <T extends Object = any>{
  private initialValues: T
  private listeners: FormListener[] = []
  private values: T
  // 一个map结构
  private rulesList: Rules = {}
  private errorsList:  { [key: string]: string } = {}
  private isResetting: boolean = false

  constructor(value: T) {
    this.initialValues = value
    this.values = deepCopy(value)
  }

  notify(name: string) {
    this.listeners.forEach(listener => listener(name))
  }

  get(name?: string) {
    return name === undefined ? { ...this.values } : deepGet(this.values, name)
  }

  set(name: string, value: any, validate: boolean) {
    deepSet(this.values, name, value)
    if (validate && !this.isResetting) {
      this.validate(name).then().catch(e =>console.log(e))
    }
    this.isResetting = false
  }

  addRules(name: string, rules: RuleItem | RuleItem[]) {
    this.rulesList[name] = rules
  }

  getErrors(name:string) {
    return this.errorsList[name] || ''
  }
  
  reset() {
    this.isResetting = true
    this.values = deepCopy(this.initialValues)
    this.errorsList = {}
    this.notify('*')
  }

  subscribe(listener: FormListener) {
    // 订阅
    this.listeners.push(listener)
    // 清除订阅
    return () => {
      const index = this.listeners.indexOf(listener)
      if (index > -1) this.listeners.splice(index, 1)
    }
  }

  // 关键异步，这样确保listener回调已经添加
  async validate(name: string) {
    const descriptor: Rules = {}
    descriptor[name] = this.rulesList[name]
    const validator = new Schema(descriptor as Rules)
    const source: {[key:string]: string } = {}
    source[name] = this.get(name)

    try {
      await validator.validate(source, { firstFields: true })
      this.errorsList[name] = ''
    } catch ({errors}) {
      this.errorsList[name] = errors[0].message
      return Promise.reject(errors[0])
    } finally {
      this.notify(name)
    }
  }

  // 异步
  async formOnSubmit() {
    const keys = Object.keys(this.rulesList)
    if (keys.length > 0) {
      try {
        await Promise.all(keys.map(name => this.validate(name)))
        return this.get()
      } catch (error) {
        return Promise.reject(error )
      }   
    }
  }
}
