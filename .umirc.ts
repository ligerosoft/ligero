import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'ligero',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mode: 'site',
  base: '/ligero',
  publicPath: '/ligero/',
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'ligero',
        style: true,
        // customStyleName: () => {
        //   return `./style/index.less`; // 注意：这里 ./ 不可省略
        // },
      },
    ],
  ],
  webpack5: {},
  // themeConfig: {
  //   hd: {
  //     rules: [{ mode: 'vw', options: [32, 640] }],
  //   },
  // },
  styles: [
    `.__dumi-default-mobile-demo-layout {background: #f7f8fa; };.__dumi-default-mobile-demo-layout .ligero-button { margin-right: 16px}; .demo .ligero-col {background-clip: content-box}; .demo .ligero-col:nth-child(odd) {opacity: 0.6};`,
  ],
  // more config: https://d.umijs.org/config
});
