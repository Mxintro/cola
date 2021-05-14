import React, { useState } from 'react';
import AutoComplete, { DataSourceType, Props } from './autoComplete'

import { Story } from '@storybook/react';

export default {
  component: AutoComplete,
  title: 'AutoComplete',
};

interface dataType {
  value: string,
  number: number,
}
const data = [ 
  {value:'hello', number: 1},
  {value:'react', number: 2},
  {value:'java', number: 3},
  {value:'javaScript', number: 4},
  {value:'typeScript', number: 5},
  {value:'python', number: 6},
  {value:'vue', number: 7},
  {value:'node', number: 8},
  {value:'docker', number: 9},
  {value:'go', number: 10},
]

const handleFetch = (value: string) => {
  const res = data.filter(item => item.value.includes(value))
  return [...res]
}
const myRender = (value: DataSourceType) => {
  // 使用断言扩展数据接口
  const item = value as DataSourceType<dataType>
  return (
    <div>
      <h3>{item.value}</h3>
      <h5>{item.number}</h5>
    </div>
  )  
}

const Template: Story<Props> = (args) => <AutoComplete style={{width:300}} {...args} />

export const Primary = Template.bind({})
Primary.args = {
  fetchSugestions: handleFetch,
  renderOption: myRender
}


