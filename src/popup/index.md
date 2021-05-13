---
title: Popup
subtitle: 弹出层
group:
  path: /
nav:
  title: 组件
  path: /components
---

## Popup

### 基础用法

`visible`控制弹出层是否显示。

```tsx | pure
<Popup visible>内容</Popup>
```

### 弹出位置

可以设置`position`来决定弹出位置，可选值 `top`,`right`,`bottom`,`left`,`center`.

```tsx | pure

<Popup position="top" visible>内容</Popup>
<Popup position="right" visible>内容</Popup>
<Popup position="bottom" visible>内容</Popup>
<Popup position="left" visible>内容</Popup>
<Popup position="center" visible>内容</Popup>

```

### 挂载位置

弹出层默认挂载载`document.body`上，可以通过设定`getContainer`来指定其挂载位置。当

`getContainer`为`false`时，原地挂载。

```tsx | pure
// 挂载载root下
<div id="root">
  <Popup getContainer={false}>内容</Popup>
</div>

// 挂载载root下
<div id="root"></div>
<Popup getContainer={document.querySelector('#root')}>内容</Popup>

```

### 代码

```tsx
import React, { useState } from 'react';
import { Popup, Button } from 'ligero';

const positions = ['top', 'right', 'bottom', 'left', 'center'];
export default () => {
  const [visible, setVisible] = useState(false);
  const [destroy, setDestroy] = useState(false);
  const [container, setContainer] = useState<false | undefined>();
  const [mask, setMask] = useState(true);
  const [position, setPosition] = useState('center');
  const hide = () => {
    setVisible(false);
  };
  const getStyle = () => {
    if (['left', 'right'].includes(position)) {
      return {
        width: 100,
        height: '100%',
        background: 'white',
        fontSize: 16,
      };
    }
    if (['top', 'bottom'].includes(position)) {
      return {
        height: 100,
        width: '100%',
        background: 'white',
        fontSize: 16,
      };
    }
    return {
      padding: 20,
      background: 'white',
    };
  };
  return (
    <>
      <Button type="primary" onClick={() => setVisible((p) => !p)}>
        弹出
      </Button>
      <Button type="danger" onClick={() => setDestroy((p) => !p)}>
        是否销毁
      </Button>
      <Button
        type="primary"
        onClick={() => {
          setContainer(container === false ? undefined : false);
        }}
      >
        切换container
      </Button>
      <Button
        type="warning"
        onClick={() => {
          setMask(!mask);
        }}
      >
        切换mask
      </Button>
      {positions.map((position) => {
        return (
          <Button key={position} onClick={() => setPosition(position)}>
            {position}
          </Button>
        );
      })}
      <Popup
        position={position}
        destroyOnClose={destroy}
        visible={visible}
        getContainer={container}
        overlay={mask}
        afterClose={() => {
          setVisible(false);
        }}
      >
        <div style={getStyle()}></div>
      </Popup>
    </>
  );
};
```

### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | :-- | --- | --- |
| visible | 是否展示弹出层 | `boolean` | `false` |
| overlay | 是否展示遮罩层 | `boolean` | `true` |
| overlayClosable | 是否允许点击遮罩层关闭 | `boolean` | `true` |
| position | 弹出层弹出位置, 可选 `top`,`right`, `bottom`,`left`, `center` | `string` | `center` |
| duration | 弹出层动画持续时间 | `number` | `300` |
| destroyOnClose | 关闭弹出层销毁内部 | `boolean` | `false` |
| shouldLock | 弹出层弹出层禁止滚动 | `boolean` | `true` |
| onOverlayClick | 点击遮罩层事件 | `function` | `-` |
| afterClose | 弹出层关闭之后事件 | `function` | `-` |
| className | 弹出层样式类名 | `string` | `-` |
| prefixCls | 类型前缀 | `stirng` | `-` |
