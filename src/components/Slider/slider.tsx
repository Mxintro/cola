import React from 'react'

const { useState, useRef, useCallback, useEffect } = React
type MouseEventHandler = React.MouseEventHandler<HTMLDivElement>

interface SliderProps {
  initRatio: number
}

const fixRatio = (ratio: number) => Math.max(0, Math.min(1, ratio))

export const Slider: React.FC<SliderProps> = ({
  initRatio=0
}) => {
  const [ratio, setRatio] = useState<number>(initRatio)

  const [lastPos, setLastPos] = useState<number>(0)

  const [slideRange, setSlideRange] = useState<number>(0)

  const [sliding, setSliding] = useState<boolean>(false)

  const hotAreaRef =  useRef<HTMLDivElement>(null)
  const thumbRef =  useRef<HTMLDivElement>(null)


  const handleThumbMouseDown:MouseEventHandler = useCallback(e => {
    const hotArea = hotAreaRef.current
    setLastPos(e.pageX)
    setSlideRange(hotArea!.clientWidth)
    setSliding(true)
  }, [])

  useEffect(() => {
    const onSliding = (e: MouseEvent) => {
      if (!sliding) {
        return
      }
      const pos = e.pageX
      const delta = pos - lastPos
      setRatio(r => fixRatio(r + delta / slideRange))
      setLastPos(pos)
    }
    const onSlideEnd = (e: MouseEvent) => {
      if (!sliding) {
        return
      }
      const pos = e.pageX
      const delta = pos - lastPos
      setRatio(r => fixRatio(r + delta / slideRange))
      setLastPos(pos)
      setSliding(false)
    }
    console.log("effect")
    document.addEventListener("mousemove", onSliding)
    document.addEventListener("mouseup", onSlideEnd)

    return () => {
      document.removeEventListener("mousemove", onSliding)
      document.removeEventListener("mouseup", onSlideEnd)
    }
  }, [lastPos, slideRange, sliding])

  return (
    <>
      <div className="cola-slider-wrapper">
        <div className="cola-slider-track" ref={hotAreaRef} />
        <div className="cola-slider-has" style={{ width: `${ratio * 100}%` }}>
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