---
title: Button
subtitle: 按钮
group:
  path: /
nav:
  title: 组件
  path: /components
---

## Button

表示一个可点击的按钮，可以用在表单或文档其它需要使用简单标准按钮的地方。

### 按钮类型

按钮支持`default`、`primary`, `success`, `danger`, `warning`, `dashed`六种类型，默认为`defualt`.

```tsx | pure
<Button type="primary">提示按钮</Button>
<Button type="default">默认按钮</Button>
<Button type="success">成功按钮</Button>
<Button type="warning">警告按钮</Button>
<Button type="danger">危险按钮</Button>
<Button type="dashed">虚线按钮</Button>
```

### 朴素按钮

可以给按钮设置`plain`属性为朴素按钮，背景为白色，文字颜色为按钮的颜色

```tsx | pure
<Button type="primary" plain>提示朴素按钮</Button>
<Button type="default" plain>默认朴素按钮</Button>
<Button type="success" plain>成功朴素按钮</Button>
<Button type="warning" plain>警告朴素按钮</Button>
<Button type="danger" plain>危险朴素按钮</Button>
<Button type="dashed" plain>虚线朴素按钮</Button>
```

### 按钮尺寸

按钮`size`支持 4 种，分别为`xs`, `sm`, `md`, `lg`. 属性与高度对应关系`xs`为`22px`,`sm`为`32px`,`md`为`44px`, `xs`为`50px`, 按钮默认`size`为`md`.

```tsx | pure
<Button type="primary" size="xs">超小号按钮</Button>
<Button type="primary" size="sm">小号按钮</Button>
<Button type="primary" size="md">中号按钮</Button>
<Button type="primary" size="lg">大号按钮</Button>
```

### 不可用按钮

`disabled`可以使按钮不可用，无法点击，按钮样式会改变.

```tsx | pure
<Button type="primary" disabled>提示按钮</Button>
<Button type="default" disabled>默认按钮</Button>
<Button type="success" disabled>成功按钮</Button>
<Button type="warning" disabled>警告按钮</Button>
<Button type="danger" disabled>危险按钮</Button>
<Button type="dashed" disabled>虚线按钮</Button>
```

### 按钮图标

按钮 `icon`属性支持嵌入图标。

```tsx | pure
<Button type="primary" icon={<LikeOutlined/>}></Button>
<Button type="primary" icon={<LikeOutlined/>}>Like</Button>
<Button type="primary" shape="round">A</Button>
<Button type="primary" size="sm" icon={<LikeOutlined/>}></Button>
<Button type="primary" disabeld icon={<LikeOutlined/>}></Button>
```

### loading 按钮

添加 `loading` 属性即可让按钮处于加载状态, loading 时禁止点击。

```tsx | pure
<Button type="primary" loading>Loading</Button>
<Button type="primary" loading disabled>Like</Button>

```

### 块级按钮

`block`是使按钮占据一行。

```tsx | pure
<Button type="primary" block>Button</Button>
<Button block>Button</Button>
<Button type="dashed" block>Button</Button>
```

### 按钮形状

额外支持`round`,`sqaure`两种形状。

```tsx | pure
<Button type="primary" shape="sqaure">Button</Button>
<Button shape="round">Button</Button>
```

### 自定义颜色

`color`可以设置按钮的背景颜色，文字默认为白色。

```tsx | pure
<Button type="primary" color="purple">Button</Button>
<Button type="primary" plain color="purple">Button</Button>
```

### 链接

当为按钮设置 `href`属性，其行为和 `a`标签一样。

```tsx | pure
<Button type="primary" href="https://github.com">
  Button
</Button>
```

### 代码

```tsx
import React from 'react';
import { Button } from 'ligero';
import { LikeOutlined } from '@ant-design/icons';
const Block = props => {
  return (
    <div style={{ fontSize: 16, margin: '20px 0 10px 0' }}>{props.title || props.children}</div>
  );
};
export default () => {
  return (
    <React.Fragment>
      <Block>按钮类型</Block>
      <Button type="primary">提示按钮</Button>
      <Button type="default">默认按钮</Button>
      <Button type="success">成功按钮</Button>
      <Button type="warning">警告按钮</Button>
      <Button type="danger">危险按钮</Button>
      <Button type="dashed">虚线按钮</Button>
      <Block>禁用类型</Block>
      <Button disabled>提示按钮</Button>
      <Button type="success" disabled>
        成功按钮
      </Button>
      <Button type="warning" disabled>
        警告按钮
      </Button>
      <Button type="danger" disabled>
        危险按钮
      </Button>
      <Block>朴素按钮</Block>
      <Button plain type="default">
        提示按钮
      </Button>
      <Button plain type="primary">
        提示按钮
      </Button>
      <Button type="success" plain>
        成功按钮
      </Button>
      <Button type="warning" plain>
        警告按钮
      </Button>
      <Button type="danger" plain>
        危险按钮
      </Button>
      <Block>自定义颜色</Block>
      <Button color="purple" plain>
        朴素单色
      </Button>
      <Button color="purple">单色</Button>
      <Block>自定义形状</Block>
      <Button shape="square" type="primary">
        方形
      </Button>
      <Button shape="round" type="primary">
        圆形
      </Button>
      <Block>自定义大小</Block>
      <Button size="xs" type="primary">
        迷你按钮
      </Button>
      <Button size="sm" type="primary">
        小号按钮
      </Button>
      <Button size="md" type="primary">
        普通按钮
      </Button>
      <Button size="lg" type="primary">
        大号按钮
      </Button>
      <Block>跳转</Block>
      <Button href="https:/github.com/ligerosoft/ligero" type="primary">
        跳转
      </Button>
      <Button loading type="primary">
        loading
      </Button>
      <Button color="purple" loading plain>
        单色
      </Button>
      <Block>带图标的按钮</Block>
      <Button type="primary" icon={<LikeOutlined />}>
        loading
      </Button>
      <Button type="primary" block icon={<LikeOutlined />}>
        loading
      </Button>
      <Button type="primary" icon={<LikeOutlined />} />
      <Button type="primary" shape="round" icon={<LikeOutlined />} />
      <Button type="primary" size="xs" shape="round" icon={<LikeOutlined />} />
      <Button type="primary" size="sm" shape="round" icon={<LikeOutlined />} />
      <Button type="primary" size="md" shape="round" icon={<LikeOutlined />} />
      <Button type="primary" size="lg" shape="round" icon={<LikeOutlined />} />
      <Button>
        <LikeOutlined />
      </Button>
      <Button type="primary" size="lg" shape="round">
        A
      </Button>
      <Button type="primary" size="md" shape="round">
        A
      </Button>
      <Button type="primary" size="sm" shape="round">
        A
      </Button>
      <Button type="primary" size="xs" shape="round">
        A
      </Button>
    </React.Fragment>
  );
};
```

### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 组件额外的类名 | `string` | - |
| prefixCls | 组件类名前缀 | `string` | - |
| type | button 类型，可选 `primary`、`default`、`success`、`warning`、`danger`、`dashed` | `string` | `primary` |
| shape | button 圆角的大小，可选 `square`(无圆角)、`round`(圆形) | `string` | - |
| size | button 大小，可选 `xs`、`sm`、`md`、`lg` | `string` | `md` |
| disabled | 是否禁用按钮 | `boolean` | - |
| plain | button 朴素形式 | `boolean` | - |
| block | 是否默认占据一行 | `boolean` | - |
| htmlType | 设置 button 的原生 `type` 值，可选 `submit`、`button`、`reset` | `string` | `button` |
| color | 配置按钮的颜色 | `string` | - |
| style | 按钮的额外样式 | `React.CSSProperties` | - |
| href | 点击跳转地址，指定此属性 button 的行为和`a`标签一致 | `string` | - |
| target | 和 a 链接的 target 属性一致，href 存在时生效 | `string` | - |
| icon | 设置按钮图标 | ReactNode | - |
