import React, { useState } from 'react';
import Button from './components/Button'
import Input from './components/Input'
import Form from './components/Form'
import Checkbox from './components/Checkbox'
import AutoComplete from './components/AutoComplete'
import Menu from './components/Menu'
import Select from './components/Select/'

const {Option} = AutoComplete

function App() {

  const [options, setOptions] = useState<{ value: string }[]>([])

  const initialValues = {
    name: 'hello',
    password:''
  }

  const onFinish = (values: any) => {
    console.log(values);
  }
  const onFinishFailed = (values: any) => {
    console.log(values)
  }

  function onChange(checkedValues: any) {
    console.log('checked = ', checkedValues);
  }
  
  const plainOptions = ['Apple', 'Pear', 'Orange'];
  const optionsD = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' },
  ];

  const dataGeneral = [ 
    'hello', 'react', 'java', 'javaScript', 'typeScript', 'python', 'vue', 'node', 'docker', 'go', 
  ]  

  const handleFetchGeneral = (value: string) => {
    const res = value ? dataGeneral.filter(item => item.includes(value)).map(item => ({ value: item})) : []
    setOptions([...res])
  }

  const onSelect = (value: any) => {
    console.log('select:' + value)
  }

  const [tran, setTran] = useState(false)
  return (
    <div className="App" >

      <AutoComplete 
        options={options}
        style={{width:300}}
        onSelect={onSelect}
        onSearch={handleFetchGeneral}>
      </AutoComplete>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      {/* <AutoComplete 
        style={{width:300}}
        onSelect={onSelect}
        onSearch={handleFetchGeneral}>
          {options.map(item => (
            <Option key={item.value} value={item.value}></Option>
          ))}
      </AutoComplete> */}

      {/* <Select
        style={{width: 300}}
        onSelect={(value)=> console.log(value)}
        >
        <Option value='vue'>Vue</Option>
        <Option value='react'>React</Option>
        <Option value='typeScript'>TypeScript</Option>
      </Select> */}
      {/* <Form 
        initialValues={initialValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{width:500}}>
        <Form.Item
          name="name" 
          label='用户名'
          rules={[{ required: true, message: '不能为空' }]}
          >
          <Input></Input>
        </Form.Item>
        <Form.Item 
          name="password"
          label='密码'
          rules={[{required: true, message: '不能为空' }]}
          >
          <Input placeholder="input placeholder"></Input>
        </Form.Item>
        <Form.Item name="remember">
          <Checkbox  defaultChecked>hhhh</Checkbox>
        </Form.Item>  
        <Form.Item>
          <Button btnType='primary' type='submit'>submit</Button>
          <Button type='reset'>reset</Button>
        </Form.Item>
      </Form>
      <CheckboxGroup onChange={onChange} options={options} defaultValue={['Apple']}>

      </CheckboxGroup> */}
    </div>
  );
}

export default App;
