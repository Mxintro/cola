import React from 'react';
import Button from './components/Button'
import Input from './components/Input'
import Form from './components/Form'
import Checkbox from './components/Checkbox'
import { CheckboxGroup } from './components/Checkbox/CheckboxGroup'
// import AutoComplete from './components/AutoComplete'


function App() {

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
  const options = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' },
  ];

  return (
    <div className="App" >
      <Form 
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

      </CheckboxGroup>
    </div>
  );
}

export default App;
