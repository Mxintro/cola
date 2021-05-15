import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import Input, { InputProps } from '.';

export default {
  title: 'Input',
  component: Input,
} as Meta;

const Template: Story<InputProps> = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
}