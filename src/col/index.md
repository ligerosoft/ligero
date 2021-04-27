---
title: Grid
subtitle: 栅格
group:
  path: /
nav:
  title: 组件
  path: /components
---

## Grid

栅格系统是基于行 `row` 和 `col` 列组合实现行列布局。

### 基础用法

我们可以通过设置`Col`的 `span`属性设置一列所占的宽度百分比，设置`offset`来设定距离左侧偏移距离.`span` 与`offset`用法一致，两个的值只能是 1 到 24 的正整数。

```tsx | pure
<Row>
  <Col span={8}>span-8</Col>
  <Col span={8}>span-8</Col>
  <Col span={8}>span-8</Col>
</Row>

<Row>
  <Col span={12}>span-12</Col>
  <Col span={12}>span-12</Col>
</Row>

<Row>
  <Col span={2} offset={4}>span-2 offset-4</Col>
</Row>
```

### 设置列边距

通过设置`gutter`属性设置行和列元素之间的间距，默认为`0`,当`gutter`为 数字时，设置为列间距。当`gutter`为 数组时，设置行列间距.

```tsx | pure
// 设置列间距
<Row gutter={10}>
  <Col span={8}>span-8</Col>
  <Col span={8}>span-8</Col>
  <Col span={8}>span-8</Col>
</Row>
// 设置行和列间距
<Row gutter={[10, 10]}>
  <Col span={12}>span-12</Col>
  <Col span={12}>span-12</Col>
</Row>
// 设置行间距
<Row gutter={[0, 10]}>
  <Col span={2} offset={4}>span-2 offset-4</Col>
</Row>
```

### 行布局

`row`通过设置 `align` 和 `justify` 属性，来决定子元素的排版。

```tsx | pure
// align items flex start
<Row align="top">
  <Col span={4}>span-4</Col>
  <Col span={4}>span-4</Col>
  <Col span={4}>span-4</Col>
</Row>
// align items center
<Row align="center">
  <Col span={4}>span-4</Col>
  <Col span={4}>span-4</Col>
  <Col span={4}>span-4</Col>
</Row>
// align items flex end
<Row align="bottom">
  <Col span={4}>span-4</Col>
  <Col span={4}>span-4</Col>
  <Col span={4}>span-4</Col>
</Row>

// justify content flex start
<Row justify="start">
  <Col span={4}>span-4</Col>
  <Col span={4}>span-4</Col>
  <Col span={4}>span-4</Col>
</Row>

// justify-content center
<Row justify="center">
  <Col span={4}>span-4</Col>
  <Col span={4}>span-4</Col>
  <Col span={4}>span-4</Col>
</Row>

// justify-content flex end
<Row justify="end">
  <Col span={4}>span-4</Col>
  <Col span={4}>span-4</Col>
  <Col span={4}>span-4</Col>
</Row>

// justify-content space-between
<Row justify="space-between">
  <Col span={4}>span-4</Col>
  <Col span={4}>span-4</Col>
  <Col span={4}>span-4</Col>
</Row>

// justify-content space-around
<Row justify="space-around">
  <Col span={4}>span-4</Col>
  <Col span={4}>span-4</Col>
  <Col span={4}>span-4</Col>
</Row>
```

### flex 属性

`col`的`flex`属性，属性为 `flex-grow`, `flex-shrink`, `flex-basis`组合.

```tsx | pure

// 宽度百分比
<Row>
  <Col flex={1}>flex: 1 1 auto</Col>
  <Col flex={3}>flex: 3 3 auto</Col>
</Row>

<Row>
  <Col flex="auto">flex: 1 1 auto</Col>
  <Col flex="200px">flex: 0 0 200px</Col>
</Row>

<Row>
  <Col flex="1 1 auto">flex: 1 1 auto</Col>
  <Col flex="0 0 200px">flex: 0 0 200px</Col>
</Row>

<Row wrap={false}>
  <Col flex="none">flex: none</Col>
  <Col flex="200px">flex: 0 0 200px</Col>
  <Col flex="auto">flex: 0 0 auto</Col>
</Row>
```

### 代码

```tsx
import React from 'react';
import { Row, Col } from 'ligero';

export default () => {
  const baseStyle = {
    padding: '8px 0',
    background: '#0088ff',
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  };
  const Demo = ({ children, style }) => <div style={{ ...baseStyle, ...style }}>{children}</div>;
  return (
    <div className="demo">
      基础用法
      <Row>
        <Col span={8}>
          <Demo>span-8</Demo>
        </Col>
        <Col span={8}>
          <Demo>span-8</Demo>
        </Col>
        <Col span={8}>
          <Demo>span-8</Demo>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Demo>span-12</Demo>
        </Col>
        <Col span={12}>
          <Demo>span-12</Demo>
        </Col>
      </Row>
      <Row>
        <Col span={6} offset={4}>
          <Demo>offset-4</Demo>
        </Col>
      </Row>
      列边距
      <Row gutter={10}>
        <Col span={8}>
          <Demo>span-8</Demo>
        </Col>
        <Col span={8}>
          <Demo>span-8</Demo>
        </Col>
        <Col span={8}>
          <Demo>span-8</Demo>
        </Col>
      </Row>
      <Row gutter={[10, 10]}>
        <Col span={12}>
          <Demo>span-12</Demo>
        </Col>
        <Col span={12}>
          <Demo>span-12</Demo>
        </Col>
      </Row>
      <Row gutter={[0, 10]}>
        <Col span={6} offset={4}>
          <Demo>offset-4</Demo>
        </Col>
      </Row>
      Align
      <Row align="top" gutter={10}>
        <Col span={8}>
          <Demo style={{ height: 20 }}>span-8</Demo>
        </Col>
        <Col span={8}>
          <Demo style={{ height: 40 }}>span-8</Demo>
        </Col>
        <Col span={8}>
          <Demo style={{ height: 60 }}>span-8</Demo>
        </Col>
      </Row>
      <Row align="center" gutter={10}>
        <Col span={8}>
          <Demo style={{ height: 20 }}>span-8</Demo>
        </Col>
        <Col span={8}>
          <Demo style={{ height: 40 }}>span-8</Demo>
        </Col>
        <Col span={8}>
          <Demo style={{ height: 60 }}>span-8</Demo>
        </Col>
      </Row>
      <Row align="bottom" gutter={10}>
        <Col span={8}>
          <Demo style={{ height: 20 }}>span-8</Demo>
        </Col>
        <Col span={8}>
          <Demo style={{ height: 40 }}>span-8</Demo>
        </Col>
        <Col span={8}>
          <Demo style={{ height: 60 }}>span-8</Demo>
        </Col>
      </Row>
      justify
      <Row justify="start">
        <Col span={4}>
          <Demo>span-4</Demo>
        </Col>
        <Col span={4}>
          <Demo>span-4</Demo>
        </Col>
        <Col span={4}>
          <Demo>span-4</Demo>
        </Col>
      </Row>
      <Row justify="center">
        <Col span={4}>
          <Demo>span-4</Demo>
        </Col>
        <Col span={4}>
          <Demo>span-4</Demo>
        </Col>
        <Col span={4}>
          <Demo>span-4</Demo>
        </Col>
      </Row>
      <Row justify="end">
        <Col span={4}>
          <Demo>span-4</Demo>
        </Col>
        <Col span={4}>
          <Demo>span-4</Demo>
        </Col>
        <Col span={4}>
          <Demo>span-4</Demo>
        </Col>
      </Row>
      <Row justify="space-between">
        <Col span={4}>
          <Demo>span-4</Demo>
        </Col>
        <Col span={4}>
          <Demo>span-4</Demo>
        </Col>
        <Col span={4}>
          <Demo>span-4</Demo>
        </Col>
      </Row>
      <Row justify="space-around">
        <Col span={4}>
          <Demo>span-4</Demo>
        </Col>
        <Col span={4}>
          <Demo>span-4</Demo>
        </Col>
        <Col span={4}>
          <Demo>span-4</Demo>
        </Col>
      </Row>
      Flex
      <Row>
        <Col flex={1}>
          <Demo>25%</Demo>
        </Col>
        <Col flex={3}>
          <Demo>75%</Demo>
        </Col>
      </Row>
      <Row>
        <Col flex="auto">
          <Demo>auto</Demo>
        </Col>
        <Col flex="200px">
          <Demo>200px</Demo>
        </Col>
      </Row>
      <Row>
        <Col flex="1 1 auto">
          <Demo>auto</Demo>
        </Col>
        <Col flex="0 0 200px">
          <Demo>200px</Demo>
        </Col>
      </Row>
      <Row wrap={false}>
        <Col flex="none">
          <Demo>none</Demo>
        </Col>
        <Col flex="200px">
          <Demo>200px</Demo>
        </Col>
        <Col flex="auto">
          <Demo>auto</Demo>
        </Col>
      </Row>
    </div>
  );
};
```

### API

#### Row

| 参数 | 说明 | 类型 | 默认值 |  |
| --- | --- | --- | --- | --- |
| className | 组件类名 | `string` | - |  |
| prefixCls | 组件类名前缀 | `string` | - |  |
| style | 组件样式 | `React.CSSProperties` | - |  |
| gutter | 列间距 | `number` \|`number[]` | 0 |
| align | 垂直方向对齐方式,可选`top`,`center`, `bottom` | `string` | `top` |  |
| justify | 水平方向对齐方式,可选`start`,`center`, `end`,`space-between`, `space-around` | `string` | `start` |  |
| wrap | 排列是否换行 | `boolean` | true |  |

#### Col

| 参数      | 说明          | 类型               | 默认值 |
| --------- | ------------- | ------------------ | ------ |
| className | 组件类名      | `string`           | -      |
| prefixCls | 组件类名前缀  | `string`           | -      |
| span      | 列宽度        | `number`           | -      |
| offset    | 偏移距离      | `number`           | -      |
| flex      | flex 布局属性 | `number`\|`string` | -      |
