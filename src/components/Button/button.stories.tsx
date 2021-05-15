import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import Button, { ButtonProps } from '.';

export default {
  title: 'Button',
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
    children: 'Default Button'
}

export const Primary = Template.bind({});
Primary.args = {
  children: 'primary Button',
  btnType: 'primary',
};

export const Danger = Template.bind({});
Danger.args = {
  children: 'danger Button',
  btnType: 'danger',
};

export const Link = Template.bind({});
Link.args = {
  children: 'link Button',
  btnType: 'link',
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: 'Disabled Button',
  disabled: true
};

export const Loading = Template.bind({});
Loading.args = {
  children: 'loading Button',
  loading: true,
};


export const Ghost = () => {
  return (
    <div style={{padding: '26 26 16', background: 'rgb(190, 200, 200)'}}>
      <Button style={{margin: 5}} btnType='default' ghost >Ghost</Button>
      <Button style={{margin: 5}} btnType='primary' ghost >Ghost</Button>
    </div>
  )
}

const btrowStyle = {
  margin: '10px',
}

export const Sizes = () => {
  return (
    <>
      <div style={btrowStyle} >
        <Button style={{margin: 5}} size='lg' >Large</Button>
        <Button style={{margin: 5}} size='default'>Default</Button>
        <Button style={{margin: 5}} size='sm'>Small</Button>
      </div>
      <div style={btrowStyle}>
        <Button style={{margin: 5}} btnType='primary' size='lg'>Large</Button>
        <Button style={{margin: 5}} btnType='primary' >Default</Button>
        <Button style={{margin: 5}} btnType='primary' size='sm'>Small</Button>
      </div>
      <div style={btrowStyle}>
        <Button style={{margin: 5}} btnType='danger' size='lg'>Large</Button>
        <Button style={{margin: 5}} btnType='danger' >Default</Button>
        <Button style={{margin: 5}} btnType='danger' size='sm'>Small</Button>
      </div>
      <div style={btrowStyle}>
        <Button style={{margin: 5}} loading disabled size='lg'>Large</Button>
        <Button style={{margin: 5}} loading disabled >Default</Button>
        <Button style={{margin: 5}} loading disabled size='sm'>Small</Button>
      </div>
    </>
  );
};