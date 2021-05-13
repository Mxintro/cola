import React, { useState } from 'react';
import Menu from './components/Menu'
import Icon from './components/Icon'
import Transition from './components/Transition'
import Button from './components/Button'
import Input from './components/Input'

function App() {
  const [op, setop] = useState(false)
  return (
    <div className="App">
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
      <Input style={{width:300}}></Input>
      <Input
        defaultValue="prepend text"
        prepend="https://"
      />
      <Input
        icon="search"
        placeholder="input with icon"
      />
    </div>
  );
}

export default App;
