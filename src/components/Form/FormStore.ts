import { deepCopy, deepGet, deepSet } from '../../utils/utils'
import Schema, { Rules, RuleItem } from 'async-validator';
import * as React from 'react';
 
export type FormListener = (name: string) => void

export type FormItemType = { [key: string]: any }

export default class FormStore {
  
  private initialValues: FormItemType = {}

  private listeners: FormListener[] = []

  private values: FormItemType = {}

  private rulesList: Rules = {}

  private errorsList: FormItemType = {}

  // 针对reset后直接验证
  private waitToReset: number = 0

  constructor(value: FormItemType) {
    this.initialValues = value
    this.values = deepCopy(value)
  }

  notify(name: string) {
    this.listeners.forEach(listener => listener(name))
  }

  get(name?: string){
    return name === undefined ? { ...this.values } : deepGet(this.values, name)
  }

  set(name: string, value: any, validate: boolean) {
    if (value === this.values.name) return
    deepSet(this.values, name, value)
    
    if (this.waitToReset === 0) {
      if (validate ) {
        this.validate(name).then().catch(e =>console.log(e))
      }
    } else {
      this.waitToReset--
    }
  }

  addRules(name: string, rules: RuleItem | RuleItem[]) {
    this.rulesList[name] = rules
  }

  getErrors(name:string) {
    return this.errorsList[name] || ''
  }
  
  reset() {
    this.waitToReset = Object.keys(this.values).length
    // 这里需要merge
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
        return Promise.reject(error)
      }   
    } else {
      return this.get()
    }
  }
}
