import React from 'react';
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
  console.log('appppppppppppppppppppppppppppppppp')
  return (
    <div className="App" >
      <Form store={store} onFinish={onFinish} style={{width:500}}>
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
