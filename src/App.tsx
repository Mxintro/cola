import React, { useState } from 'react';
import Button from './components/Button'
import Input from './components/Input'
import {Form, FormStore} from './components/Form'


function App() {

  const store = new FormStore({
    name: 'hello',
    password:''
  })

  const onFinish = (values: any) => {
    console.log(values);
  }

  return (
    <div className="App" >
      <Form store={store} onFinish={onFinish}>
        <Form.Item
          name="name" 
          rules={[{ required: true, message: '不能为空' }]}
          >
          <Input></Input>
        </Form.Item>
        <Form.Item name="password">
          <Input></Input>
        </Form.Item>
        <Form.Item>
          <Button type='submit'>submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default App;
