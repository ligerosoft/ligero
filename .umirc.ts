import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'ligero',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mode: 'site',
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'ligero',
        camel2DashComponentName: false,
        customStyleName: () => {
          return `./style/index.less`; // 注意：这里 ./ 不可省略
        },
      },
      'lean',
    ],
  ],
  webpack5: {},
  // more config: https://d.umijs.org/config
});
