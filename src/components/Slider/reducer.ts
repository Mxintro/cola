
const fixRatio = (ratio: number): number => {
  return Math.max(0, Math.min(1, ratio))
}

export type StateType = {
  ratio: number,
  lastPos: number,
  slideRange: number,
  sliding: boolean
}

type Start = {
  type: 'start',
  payload:  {
    lastPos: number,
    slideRange: number,
    sliding: boolean
  }
}

type End = {
  type: 'end',
  payload:  {
    lastPos: number,
    sliding: boolean
  }
}

type Sliding = {
  type: 'sliding',
  payload:  {
    lastPos: number,
  }
}

type ActionType = Start | End | Sliding

export const sliderReducer = (state: StateType, action: ActionType): StateType => {
  const { type, payload } = action
  let ratio: number = 0
  switch (type) {
    case 'start':
      return {
        ...state,
        ...payload
      }
    case 'sliding':
      if (!state.sliding) return state
      ratio = fixRatio(state?.ratio + (payload?.lastPos - state.lastPos) / state.slideRange)
      return {
        ...state,
        ...payload,
        ratio
      }
    case 'end':
      if (!state.sliding) return state
      ratio = fixRatio(state?.ratio + (payload?.lastPos - state.lastPos) / state.slideRange)
      return {
        ...state,
        ...payload,
        ratio
      }
    default:
      return state
  }
}