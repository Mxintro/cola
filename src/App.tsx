import React, { useState } from 'react';
import Button from './components/Button'
import Input from './components/Input'
import Form from './components/Form'
import Checkbox from './components/Checkbox'
import AutoComplete,{ DataSourceType, AutoCompleteProps } from './components/AutoComplete'
import Menu from './components/Menu'
import Select from './components/Select/'

const {Option} = Select

function App() {


  const initialValues = {
    name: 'hello',
    password: '',
    remmeber: true,
    phone: '',
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
  
  const plainOptions = ['Apple', 'Pear', 'Orange'].map(value => ({value: value}))

  const [tran, setTran] = useState(false)

  const helloTo = (str: string, repeat: number = 1):DataSourceType => ({
    value: 'hello ' + str.repeat(repeat), 
  })
  const [options, setOptions] = useState<DataSourceType[]>([])

  const onSearch = (searchText:string) => {
    setOptions(
      !searchText ? [] : [helloTo(searchText), helloTo(searchText, 2), helloTo(searchText, 3)],
    )
  }

  const onSelect = (data: string) => {
    console.log('onSelect', data)
  }
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
          <Input/>
        </Form.Item>
        <Form.Item 
          name="password"
          label='密码'
          rules={[
            {required: true, message: '不能为空' },
            { min: 6, message: '最少6位数'}
          ]}
          >
          <Input.Password placeholder="input placeholder" />
        </Form.Item>
        <Form.Item name="remmeber">
          <Checkbox>记住密码</Checkbox>
        </Form.Item>
        <Form.Item 
          name="gender"
          label='性别'
          rules={[{required: true, message: '请选择性别' }]}
          >
          <Select 
            placeholder='请选择性别'
          >
            <Option value='男生'></Option>
            <Option value='女生'></Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="phone" 
          label='手机'
          rules={[{ pattern:/^(?:(?:\+|00)86)?1[3-9]\d{9}$/, message: '手机格式不符' }]}
          >
          <Input/>
        </Form.Item>
        <Form.Item>
          <Button btnType='primary' type='submit'>submit</Button>
          <Button type='reset'>reset</Button>
        </Form.Item>
      </Form>

    </div>
  );
}

export default App;
