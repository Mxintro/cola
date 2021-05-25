import AutoComplete, { DataSourceType, AutoCompleteProps } from './autoComplete'

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
  {value:'go', number: 10}
]
const dataGeneral = [ 
  'hello', 'react', 'java', 'javaScript', 'typeScript', 'python', 'vue', 'node', 'docker', 'go', 
]


const handleFetch = (value: string) => {
  const res = data.filter(item => item.value.includes(value))
  return [...res]
}

const handleFetchGeneral = (value: string) => {
  const res = dataGeneral.filter(item => item.includes(value)).map(item => ({ value: item}))
  return [...res]
}

const handleFetchAsync = async (query: string) => {
  try {
    const { items } = await fetch(`https://api.github.com/search/users?q=${query}`).then(res => res.json())
    return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item}))
  } catch (error) {
    console.log(error)
  }
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

const Template: Story<AutoCompleteProps> = (args) => <AutoComplete style={{width:300}} {...args} />

export const General = Template.bind({})
General.args = {
  fetchSuggestions: handleFetchGeneral,
}

export const Fetch = Template.bind({})
Fetch.args = {
  fetchSuggestions: handleFetchAsync,
}

export const Customize = Template.bind({})
Customize.args = {
  fetchSuggestions: handleFetch,
  renderOption: myRender
}


