import React from 'react'
import { sliderReducer, StateType } from './reducer'

const { useState, useRef, useCallback, useEffect, useReducer } = React

interface SliderProps {
  initRatio: number
}

export const Slider: React.FC<SliderProps> = ({
  initRatio=0
}) => {
  const initState: StateType = {
    ratio: initRatio,
    lastPos: 0,
    slideRange: 0,
    sliding: false
  }

  const [state, dispatch] = useReducer(sliderReducer, initState)

  const hotAreaRef =  useRef<HTMLDivElement>(null)
  const thumbRef =  useRef<HTMLDivElement>(null)

  const handleThumbMouseDown: React.MouseEventHandler<HTMLDivElement> = useCallback(e => {
    console.log(e.pageX)
    dispatch({type: 'start', payload: {
      lastPos: e.pageX,
      slideRange: hotAreaRef.current!.clientWidth,
      sliding: true
    }})
    console.log(state)
  }, [])

  useEffect(() => {
    const onSliding = (e: MouseEvent) => {
      dispatch({type: 'sliding', payload: {
        lastPos: e.pageX,
      }})
    }
    const onSlideEnd = (e: MouseEvent) => {
      dispatch({type: 'end', payload: {
        sliding: false,
        lastPos: e.pageX
      }})
    }
    console.log("effect")
    document.addEventListener("mousemove", onSliding)
    document.addEventListener("mouseup", onSlideEnd)

    return () => {
      document.removeEventListener("mousemove", onSliding)
      document.removeEventListener("mouseup", onSlideEnd)
    }
  }, [])

  return (
    <>
      <div className="cola-slider-wrapper">
        <div className="cola-slider-rail" ref={hotAreaRef} />
        <div className="cola-slider-track" style={{ width: `${state.ratio * 100}%` }}>
          <div
            className="cola-slider-ctrl"
            ref={thumbRef}
            onMouseDown={handleThumbMouseDown} />
        </div>
      </div>
    </>
  )
}

export default Slider