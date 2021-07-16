import React from "react";
import { sliderReducer, StateType } from "./reducer";
import { offset } from '../../utils/utils'

const { useState, useRef, useCallback, useEffect, useReducer } = React;

interface SliderProps {
  /**
   * 默认值
   */
  defaultValue?: number;
  /**
   * 最大值
   */
  max?: number;
  /**
   * 最小值
   */
  min?: number;
  /**
   * 	步长，取值必须大于 0，并且可被 (max - min) 整除
   */
  step?: number;
  /**
   * 滑动过程回调事件
   */
  onChange?: (value: number) => void;
  /**
   * 滑动结束后回调事件
   */
  onAfterChange?: (value: number) => void;
  /**
   * 样式扩展
   */
  style?: React.CSSProperties
}

const fixRatio = (step: number, value: number, range: number) => {
  const x = Math.round(value / step)
  return x * step / range
}

export const Slider: React.FC<SliderProps> = ({
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  onAfterChange,
  ...res
}) => {
  const initState: StateType = {
    ratio: fixRatio(step, defaultValue, (max - min)),
    lastPos: 0,
    slideRange: 0,
    sliding: false,
    step,
    valueRange: (max - min)
  };

  const [active, setActive] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const [state, dispatch] = useReducer(sliderReducer, initState);

  const hotAreaRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch({
      type: 'setRail',
      payload: {
        slideRange: hotAreaRef.current!.clientWidth,
        start: offset(hotAreaRef.current).X
      }
    })
    const onSliding = (e: MouseEvent) => {
      dispatch({
        type: "sliding",
        payload: {
          lastPos: e.pageX,
        },
        callback: onChange// 回调事件调用问题,直接用ruducer处理
      });
    };
    const onSlideEnd = (e: MouseEvent) => {
      dispatch({
        type: "end",
        payload: {
          sliding: false,
          lastPos: e.pageX,
        },
        callback: onAfterChange
      });
      setOpen(false)
    };
    document.addEventListener("mousemove", onSliding);
    document.addEventListener("mouseup", onSlideEnd);

    return () => {
      document.removeEventListener("mousemove", onSliding);
      document.removeEventListener("mouseup", onSlideEnd);
    };
  }, []);

  const handleThumbMouseDown: React.MouseEventHandler<HTMLDivElement> =
    useCallback((e) => {
      e.stopPropagation()
      dispatch({
        type: "start",
        payload: {
          lastPos: e.pageX,
          sliding: true,
        }
      });
    }, []);

  const handleRailClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    dispatch({
      type: 'jumpTo',
      payload: {
        lastPos: e.pageX,
      },
      callback: onAfterChange
    })
    setOpen(true)
  }

  return (
    <>
      <div
        className={`cola-slider-wrapper ${active ? " active" : ""}`}
        {...res}
      >
        <div
          className="cola-slider-rail" ref={hotAreaRef}
          onClick={handleRailClick}
          onMouseEnter={() => setActive(true)}
          onMouseLeave={() => setActive(false)}
        >
          <div
            className="cola-slider-track"
            style={{ width: `${state.ratio * 100}%` }}
          >
            <div
              className={`cola-slider-ctrl ${open ? " open" : ""}`}
              ref={thumbRef}
              onMouseDown={handleThumbMouseDown}
              onMouseEnter={() => setOpen(true)}
            >
              {open ? <div className="cola-slider-ratio">{Math.round((max - min) * state.ratio)}</div> : ''}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Slider;
