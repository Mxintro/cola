import React, { useState } from 'react';
import Menu from './components/Menu'
import Icon from './components/Icon'
import Transition from './components/Transition'
import Button from './components/Button'
import Input from './components/Input'
import AutoComplete from './components/AutoComplete'

function App() {
  const [op, setop] = useState(false)
  const data = ['hello', 'react', 'java', 'javaScript', 'typeScript', 'go', 'python', 'vue', 'node', 'docker']
  const handleFetch = (value: string): string[] => {
    const res = data.filter(item => item.includes(value))
    console.log(res)
    return [...res]
  }
  return (
    <div className="App">
      <div>
      <Menu>
        <Menu.Item> 
          active
        </Menu.Item>
        <Menu.Item>
          default
        </Menu.Item>
        <Menu.Item disabled>
          disabled
        </Menu.Item>
        <Menu.SubMenu title='subMenu'>
          <Menu.Item>
            1
          </Menu.Item>
          <Menu.Item>
            2
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
      <Transition
        in={op}
        timeout={300}
        animation='zoom-in-left'
      >
        <Menu mode='vertical' defaultOpenSubMenus={['3']}  style={{ width: 256 }}>
          <Menu.Item>
            active
          </Menu.Item>
          <Menu.Item>
            default
          </Menu.Item>
          <Menu.Item disabled>
            disabled
          </Menu.Item>
          <Menu.SubMenu title='subMenu'>
            <Menu.Item>
              1
            </Menu.Item>
            <Menu.Item>
              2
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Transition>
      <Button onClick={() => setop(!op)}>toggle</Button>
      </div>
      
      <Input style={{width:300}}></Input>
      {/* <Input
        defaultValue="prepend text"
        prepend="https://"
      />
      <Input
        icon="search"
        placeholder="input with icon"
      /> */}
      <AutoComplete style={{width:300}} fetchSugestions={handleFetch}></AutoComplete>
    </div>
  );
}

export default App;
