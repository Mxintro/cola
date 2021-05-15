import '../src/styles/index.scss';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  // 组件展示排序
  options: {
    storySort: {
      order: ['Button','AotuComplete'],
    },
  }
}