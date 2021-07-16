// *根据步长比例指定滑动位置， 会导致误差积累
// 
const fixRatio = (ratio: number, valueRange: number, step: number): number => {
  const x = 1/valueRange*step
  const r = Math.round(Math.max(0, Math.min(1, ratio))/x)
  return x * r
}

// 所以确定起点，确定区间
const fixPos = (pos: number, step: number, start: number, range: number): {lastPos: number, stepCount: number} => {
  if (pos <= start) return { lastPos: start, stepCount: 0}
  if (pos >= (start+range)) return { lastPos: (start+range), stepCount:range/step}
  const x = Math.round((pos-start)/step)
  return { lastPos: x * step + start, stepCount: x}
}

export type StateType = {
  ratio: number,
  lastPos: number,
  slideRange: number,
  sliding: boolean,
  step: number,
  valueRange: number,
  start?: number,
}

type SetRail = {
  type: 'setRail',
  payload:  {
    slideRange: number,
    start: number,
  }
}

type Start = {
  type: 'start',
  payload:  {
    lastPos: number,
    sliding: boolean,
  }
}

type End = {
  type: 'end',
  payload:  {
    lastPos: number,
    sliding: boolean
  },
  callback?: (value: number) => void
}

type Sliding = {
  type: 'sliding',
  payload:  {
    lastPos: number,
  },
  callback?: (value: number) => void
}

type JumpTo = {
  type: 'jumpTo',
  payload: {
    lastPos: number,
  },
  callback?: (value: number) => void
}

export type ActionType = Start | End | Sliding | JumpTo | SetRail

// 解决类型保护问题，这里使用自定义的类型保护。还可以改写ActionType，去掉payload可以使代码更简洁
// The Type Guard Functions
const isStartAction = (action: ActionType): action is Start => {
  return action.type === 'start'
}

const isSetRailAction = (action: ActionType): action is SetRail => {
  return action.type === 'setRail'
}

const isEndAction = (action: ActionType): action is End => {
  return action.type === 'end'
}

const isSlidingAction = (action: ActionType): action is Sliding => {
  return action.type === 'sliding'
}

const isJumpToAction = (action: ActionType): action is JumpTo => {
  return action.type === 'jumpTo'
}

// ?按步长跳问题
// 1.获取初始位置 2.根据步长设置特定位置
export const sliderReducer = (state: StateType, action: ActionType): StateType => {
  const { step, valueRange, start, slideRange } = state
  const slideStep = step/valueRange*slideRange

  if (isSlidingAction(action)) {
    const { payload, callback} = action 
    if (!state.sliding) {
      return state
    }

    const { lastPos, stepCount } = fixPos( payload.lastPos, slideStep, start as number, slideRange)
    if (lastPos === state.lastPos) return state
    const ratio = stepCount * step/valueRange

    callback && callback(Math.round(ratio*state.valueRange))
    return {
      ...state,
      ...payload,
      ratio,
      lastPos
    }
  }

  if(isJumpToAction(action)) {
    const { payload, callback } = action

    const { lastPos, stepCount } = fixPos( payload.lastPos, slideStep, start as number, slideRange)
    if (lastPos === state.lastPos) return state
    const ratio = stepCount * step/valueRange

    callback && callback(Math.round(ratio*state.valueRange))
    return {
      ...state,
      ...payload,
      ratio,
      lastPos
    }
  }

  if(isEndAction(action)) {
    const { payload, callback } = action
    if (!state.sliding) {
      return state
    }
    callback && callback(Math.round(state.ratio*state.valueRange))
    const { lastPos, stepCount } = fixPos( payload.lastPos, slideStep, start as number, slideRange)
    if (lastPos === state.lastPos) return {
      ...state,
      sliding: false
    }
    const ratio = stepCount * step/valueRange

    
    return {
      ...state,
      ...payload,
      ratio
    }
  }

  if (isStartAction(action)) {
    const { payload } = action
    return {
      ...state,
      ...payload
    }
  }
  
  if (isSetRailAction(action)) {
    const { payload } = action
    const lastPos = payload.slideRange * state.ratio + payload.start
      return {
        ...state,
        ...payload,
        lastPos
      }
  }
  return state
}