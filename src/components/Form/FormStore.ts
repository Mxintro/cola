import { deepCopy, deepGet, deepSet } from '../../utils/utils'
import Schema, { Rules } from 'async-validator';


export type FormListener = (name: string) => void
interface itemRules {
  [key: string]: Rules
}

export default class FormStore <T extends Object = any>{
  private initialValues: T
  private listeners: FormListener[] = []
  private values: T
  // 一个map结构
  private rulesList: itemRules = {}
  private errorsList:  { [key: string]: string } = {}

  constructor(value: T) {
    this.initialValues = value
    this.values = deepCopy(value)
  }

  notify(name: string) {
    console.log('noti')
    this.listeners.forEach(listener => listener(name))
  }

  get(name?: string) {
    console.log('get')
    return name === undefined ? { ...this.values } : deepGet(this.values, name)
  }

  set(name: string, value: any) {
    deepSet(this.values, name, value)
    console.log(this.values)
    this.notify(name)
  }

  addRules(name: string, rules: Rules) {
    this.rulesList[name] = rules
  }

  setErrors(name:string, msg: string) {
    this.errorsList[name] = msg
  }

  getErrors(name:string) {
    return this.errorsList[name]
  }


  subscribe(listener: FormListener) {
    console.log('sub')
    // 订阅
    this.listeners.push(listener)
    // 清除订阅
    return () => {
      const index = this.listeners.indexOf(listener)
      if (index > -1) this.listeners.splice(index, 1)
    }
  }

  validate(name: string) {
    const descriptor = this.rulesList[name]
    const validator = new Schema(descriptor)
    const source = this.get(name)
    validator.validate(source).then(() => {
    }).catch(({ errors, fields }) => {
      return this.setErrors(name, errors[0].message)
    })
  }
}
