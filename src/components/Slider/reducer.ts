
const fixRatio = (ratio: number): number => {
  return Math.max(0, Math.min(1, ratio))
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

type Start = {
  type: 'start',
  payload:  {
    lastPos: number,
    slideRange: number,
    sliding: boolean
  },
  callback?: (value: number) => void
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
  type: 'jumpto',
  payload: {
    lastPos: number,
    slideRange: number,
  },
  callback?: (value: number) => void
}

export type ActionType = Start | End | Sliding | JumpTo

// ?按步长跳问题
// 1.获取初始位置 2.根据步长设置特定位置
export const sliderReducer = (state: StateType, action: ActionType): StateType => {
  const { type, payload, callback } = action
  let ratio: number = 0
  switch (type) {
    case 'start':
      callback && callback(state.ratio)
      return {
        ...state,
        ...payload
      }
    case 'sliding':
      if (!state.sliding) return state

      ratio = fixRatio(state?.ratio + (payload?.lastPos - state.lastPos) / state.slideRange)
      // 小于步长则不动
      if (Math.abs(ratio-state.ratio)*state.valueRange < state.step) return state
      // lastPos超出范围情况
      if (ratio<=0 || ratio >= 1){
        payload.lastPos = state.lastPos
      }
      callback && callback(Math.round(ratio*state.valueRange))
      return {
        ...state,
        ...payload,
        ratio
      }
    case 'end':
      if (!state.sliding) return state

      ratio = fixRatio(state?.ratio + (payload?.lastPos - state.lastPos) / state.slideRange)
      if (Math.abs(ratio-state.ratio)*state.valueRange < state.step) return {
        ...state,
        sliding: false
      }
      if (ratio<=0 || ratio >= 1){
        payload.lastPos = state.lastPos
      }
      callback && callback(Math.round(ratio*state.valueRange))
      return {
        ...state,
        ...payload,
        ratio
      }
    case 'jumpto':
      const cur = action as JumpTo
      ratio = fixRatio(state?.ratio + (payload?.lastPos - state.lastPos) /cur.payload.slideRange)
      if (Math.abs(ratio-state.ratio)*state.valueRange < state.step) return state
      if (ratio<=0 || ratio >= 1){
        payload.lastPos = state.lastPos
      }
      callback && callback(Math.round(ratio*state.valueRange))
      return {
        ...state,
        ...payload,
        ratio
      }
    default:
      return state
  }
}