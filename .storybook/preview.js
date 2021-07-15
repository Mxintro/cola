import '../src/styles/index.scss';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewMode: 'docs',
  // 组件展示排序
  options: {
    storySort: {
      order: [
        'Homepage',
        'Button 按钮',
        'Input 输入框',
        'Checkbox 多选框',
        'AutoComplete 自动完成',
        'Select 下拉选择器',
        'Checkbox 多选框',
        'Form 表单',
        'Menu 导航菜单',
        'Slider 滑动输入条',
        'Icon 图标'
      ],
    },
  },
}