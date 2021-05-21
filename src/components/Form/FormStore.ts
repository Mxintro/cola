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

  constructor(value: T) {
    this.initialValues = value
    this.values = deepCopy(value)
  }

  notify(name: string) {
    console.log('noooooti')
    console.log(this.listeners)
    this.listeners.forEach(listener => listener(name))
  }

  get(name?: string) {
    // console.log('get')
    return name === undefined ? { ...this.values } : deepGet(this.values, name)
  }

  set(name: string, value: any, validate: boolean) {
    deepSet(this.values, name, value)
    console.log('set')
    // console.log(this.values)
    // console.log(this.rulesList)
    if (validate) this.validate(name)
    // this.notify(name)
  }

  addRules(name: string, rules: RuleItem | RuleItem[]) {
    this.rulesList[name] = rules
  }

  getErrors(name:string) {
    console.log('getError')
    console.log(name)

    return this.errorsList[name]
  }


  subscribe(listener: FormListener) {
    console.log(`sub++++++++++`)
    console.log(this.listeners)


    // 订阅
    this.listeners.push(listener)
    // 清除订阅
    return () => {
      console.log(`sub------`)
      console.log(this.listeners)


      const index = this.listeners.indexOf(listener)
      if (index > -1) this.listeners.splice(index, 1)
    }
  }

  validate(name: string) {
    const descriptor: Rules = {}
    descriptor[name] = this.rulesList[name]
    const validator = new Schema(descriptor as Rules)
    const source: {[key:string]: string } = {}
    source[name] = this.get(name)
    console.log(`validate==============${source[name]}`)
    console.log(descriptor)


    validator.validate(source, { firstFields: true }).then(()=> {
      this.errorsList[name] = ''
    }).catch(({errors}) => {
      if (errors) {
        this.errorsList[name] = errors[0].message
        console.log(this.errorsList, name)
        console.log(this.listeners)

      }
    }).finally( () => this.notify(name) )
  }
}
