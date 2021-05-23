import React from 'react';
import Button from './components/Button'
import Input from './components/Input'
import Form from './components/Form'


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
  console.log('appppppppppppppppppppppppppppppppp')
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
          rules={[{message: '不能为空' }]}
          >
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
