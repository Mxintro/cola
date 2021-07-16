export function isObject (obj: any) {
  return obj !== null && typeof obj === 'object'
}

export function deepGet (obj: any, path: string) {
  const parts = path.split('.')
  const length = parts.length

  for (let i = 0; i < length; i++) {
    if (!isObject(obj)) return undefined
    obj = obj[parts[i]]
  }

  return obj
}

export function deepSet (obj: any, path: string, value: any) {
  if (!isObject(obj)) return obj

  const root = obj
  const parts = path.split('.')
  const length = parts.length

  for (let i = 0; i < length; i++) {
    const p = parts[i]

    if (i === length - 1) {
      obj[p] = value
    } else if (!isObject(obj[p])) {
      obj[p] = {}
    }

    obj = obj[p]
  }

  return root
}

export function deepCopy<T> (target: T): T {
  const type = typeof target

  if (target === null || type === 'boolean' || type === 'number' || type === 'string') {
    return target
  }

  if (target instanceof Date) {
    return new Date(target.getTime()) as any
  }

  if (Array.isArray(target)) {
    return target.map((o) => deepCopy(o)) as any
  }

  if (typeof target === 'object') {
    const obj: any = {}

    for (let key in target) {
      obj[key] = deepCopy(target[key])
    }

    return obj
  }

  return undefined as any
}

export function getPropName (valueProp: string | ((type: any) => string), type: any) {
  return typeof valueProp === 'function' ? valueProp(type) : valueProp
}

export function getValueFromEvent (...args: any[]) {
  const e = args[0] as React.ChangeEvent<any>
  return e && e.target ? (e.target.type === 'checkbox' ? e.target.checked : e.target.value) : e
}


export function debounce<T extends any[]>(
  callback: (...args: T) => any,
  delay: number
  ): (...args: T) => void {
    let timer:any  = null
    return (...args: T) => {
      timer && clearTimeout(timer as NodeJS.Timeout)
      timer = setTimeout(()=> {
        timer = null
        callback(...args)
      }, delay)
    }
}

// 获取元素距离文档顶部和左边的距离
type Position = {
  X: number,
  Y: number
}
export function offset(el: HTMLDivElement| null): Position {
  const pos = {X: 0, Y:0}
  if (!el) return pos
  let parent = el.offsetParent

  pos.X = el.offsetLeft
  pos.Y = el.offsetTop

  while (parent && !(/html|body/i.test(parent.tagName))) {
    const cur = parent as HTMLElement
    pos.X += cur.offsetLeft
    pos.Y += cur.offsetTop

    parent = cur.offsetParent
  }
  return pos
}