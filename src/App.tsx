import React from 'react';
import Button from './components/Button/button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'


function App() {
  const menuStyle = (): React.CSSProperties=>({
    width: "150px"
  })
  return (
    <div className="App">
      {/* <Button size="lg" btnType="primary">lg</Button>
      <Button size="sm" btnType="primary">sm</Button>
      <Button btnType="primary" onClick={ (e) => {e.preventDefault();console.log('============')}}>primary</Button>
      <Button btnType="default">default</Button>
      <Button btnType="danger">danger</Button>
      <Button disabled>hello</Button>
      <Button btnType="link" href="http://www.baidu.com">baidu</Button> */}
      <div>
        <Menu >
          <MenuItem>
            hello
          </MenuItem>
          <MenuItem>
            web
          </MenuItem>
          <MenuItem>
            world
          </MenuItem>
        </Menu>
        <Menu mode='vertical' style={menuStyle()}>
          <MenuItem>
            hello
          </MenuItem>
          <MenuItem>
            web
          </MenuItem>
          <MenuItem >
            world
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default App;
