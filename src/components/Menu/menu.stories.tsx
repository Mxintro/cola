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
<Menu>
  <Menu.SubMenu title="下拉选项">
    <Menu.Item>
      下拉选项一
    </Menu.Item>
    <Menu.Item>
      下拉选项二
    </Menu.Item>
  </Menu.SubMenu>
</Menu>

export const Default = Template.bind({});
