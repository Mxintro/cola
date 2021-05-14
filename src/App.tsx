import React, { useState } from 'react';
import Menu from './components/Menu'
import Icon from './components/Icon'
import Transition from './components/Transition'
import Button from './components/Button'
import Input from './components/Input'
import AutoComplete from './components/AutoComplete'
import { DataSourceType } from './components/AutoComplete/autoComplete'


function App() {
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
  
  return (
    <div className="App">
      <AutoComplete
        style={{width:300}}
        fetchSugestions={handleFetch}
        renderOption={myRender}
        ></AutoComplete>
    </div>
  );
}

export default App;
