---
title: Cell
subTitle: 单元格
group:
  path: /
nav:
  title: 组件
  path: /components
---

## Cell

`cell`单元格一般用于某个列表展示项。

### 基本用法

```tsx | pure
<Cell right="内容">单元格</Cell>
<Cell right="内容" label="描述信息">单元格</Cell>
```

### 配置左右侧

`icon`属性一般为单元格左侧的图标；`extra`属性会在单元格最右侧，推荐使用图标。

```tsx | pure
<Cell icon={<LikeOutlined/>}>单元格</Cell>
<Cell extra={<RightOutlined/>}>单元格</Cell>
```

### 垂直布局

`align`属性单元格内内容元素垂直布局。

```tsx | pure
<Cell align="top" label="描述信息">单元格</Cell>
<Cell align="center" label="描述信息">单元格</Cell>
<Cell align="bottom" label="描述信息">单元格</Cell>
```

### 是否显示省略号

当单元格内容过多，可以设置 `ellipsis`属性是否省略显示。

```tsx | pure
<Cell ellipsis>这是一段超长的文本，用与测试单元格是否会显示省略号。</Cell>
```

### 代码

```tsx
import React from 'react';
import { Cell } from 'ligero';
import { LikeOutlined, RightOutlined } from '@ant-design/icons';

export default () => {
  return (
    <>
      <Cell.Group title="基础用法">
        <Cell right="内容">单元格</Cell>
        <Cell right="内容" label="描述信息">
          单元格
        </Cell>
      </Cell.Group>
      <Cell.Group title="配置左右侧图标">
        <Cell icon={<LikeOutlined />}>单元格</Cell>
        <Cell extra={<RightOutlined />}>单元格</Cell>
      </Cell.Group>
      <Cell.Group title="垂直布局">
        <Cell align="top" label="描述信息" right="内容">
          单元格
        </Cell>
        <Cell align="center" label="描述信息" right="内容">
          单元格
        </Cell>
        <Cell align="bottom" label="描述信息" right="内容">
          单元格
        </Cell>
      </Cell.Group>
      <Cell.Group title="省略号配置">
        <Cell ellipsis>这是一段超长的文本，用与测试单元格是否会显示省略号。</Cell>
      </Cell.Group>
    </>
  );
};
```

### API

| 参数      | 说明                       | 类型                      | 默认值  |
| --------- | -------------------------- | ------------------------- | ------- |
| className | 组件额外的类名             | `string`                  | -       |
| prefixCls | 组件类名前缀               | `string`                  | -       |
| icon      | 单元格左侧图标             | `React.ReactNode`         | -       |
| extra     | 单元格附加信息，一般为图标 | `React.ReactNode`         | -       |
| right     | 单元格右侧内容             | `React.ReactNode`         | -       |
| label     | 单元格描述信息             | `React.ReactNode`         | -       |
| align     | 单元格垂直布局             | `top`, `center`, `bottom` | `top`   |
| ellipsis  | 单元格内容超出一行省略     | `boolean`                 | `false` |
