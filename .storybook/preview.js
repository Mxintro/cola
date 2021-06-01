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
  // 组件展示排序
  options: {
    storySort: {
      order: ['Button', 'Input','Checkbox', 'AutoComplete','Select','Checkbox', 'From', 'Menu'],
    },
  }
}