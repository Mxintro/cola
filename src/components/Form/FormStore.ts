import { deepCopy, deepGet, deepSet } from '../../utils/utils'


export type FormListener = (name: string) => void

export default class FormStore <T>{
  private initialValues: T

  private listeners: FormListener[] = []

  private values: T

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

  set(name: string, value: any) {
    deepSet(this.values, name, value)
    this.notify(name)
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
}
