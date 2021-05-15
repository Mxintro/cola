import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import Input, { InputPorps } from '.';

export default {
  title: 'Input',
  component: Input,
} as Meta;

const Template: Story<InputPorps> = (args) => <Input {...args} />;

export const Default = Template.bind({});

