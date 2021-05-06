import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Button, { ButtonProps } from './button'

// 默认点击事件
const defaultProps = {
  onClick: jest.fn()
}

const testProps: ButtonProps = {
  btnType: 'primary',
  size: 'lg',
  className: 'out-class'
}

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
}

describe('test Button component', () => {
  it('should render the corret default button', () => {
    const wrapper = render(<Button { ...defaultProps }>hello</Button>)
    const el = wrapper.getByText('hello') as HTMLButtonElement // 断言为button，具disabled
    expect(el).toBeInTheDocument()
    expect(el.tagName).toEqual('BUTTON')
    expect(el).toHaveClass('btn btn-default')
    expect(el.disabled).toBeFalsy()
    fireEvent.click(el)
    expect(defaultProps.onClick).toHaveBeenCalled()
  })
  it('should render the correct component based on different props', () => {
    const wrapper = render(<Button { ...testProps }>hello</Button>)
    const el = wrapper.getByText('hello')
    expect(el).toBeInTheDocument()
    expect(el).toHaveClass('btn btn-primary out-class')
  })
  it('should render a link when btnType equals link and href is provide', () => {
    const wrapper = render(<Button btnType='link' href='http://onsite'>hello</Button>)
    const el = wrapper.getByText('hello')
    expect(el).toBeInTheDocument()
    expect(el.tagName).toEqual('A')
    expect(el).toHaveClass('btn btn-link')
  })
  it('should render disabled button when disabled set true', () => {
    const wrapper = render(<Button { ...disabledProps }>hello</Button>)
    const el = wrapper.getByText('hello') as HTMLButtonElement // 断言为button，具disabled
    expect(el).toBeInTheDocument()
    expect(el.disabled).toBeTruthy()
    fireEvent.click(el)
    expect(defaultProps.onClick).not.toHaveBeenCalled()
  })
})