import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import Menu, {MenuProps} from '.';

export default {
  title: 'Menu',
  component: Menu,
  parameters: {
    component: Menu,
    componentSubtitle: "按钮组件，响应用户点击行为",
    docs: {
      description: {
        component: "Some description",
      },
    },
  },
} as Meta;

const Template: Story<MenuProps> = (args) => 
<Menu {...args}>
  <Menu.Item></Menu.Item>
</Menu>;

export const Default = Template.bind({});
