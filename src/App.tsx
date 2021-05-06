import React from 'react';
import Button, { ButtonType, ButtonSize }from './components/Button/button'

function App() {
  return (
    <div className="App">
      <Button size="lg" btnType="primary">lg</Button>
      <Button size="sm" btnType="primary">sm</Button>
      <Button btnType="primary" onClick={ (e) => {e.preventDefault();console.log('============')}}>primary</Button>
      <Button btnType="default">default</Button>
      <Button btnType="danger">danger</Button>
      <Button disabled>hello</Button>
      <Button btnType="link" href="http://www.baidu.com">baidu</Button>
      <button>nnn</button>
    </div>
  );
}

export default App;
