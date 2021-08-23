---
title: Picker
subtitle: 选择器
group:
  path: /
nav:
  title: 组件
  path: /components
---

### Picker

`Picker`用于多个选项中选择其中一项,通过 `columns`来配置数据.

```tsx | pure

const columns = ['星期一', '星期二', '星期三', '星期四', '星期五']

<Picker columns={columns} title="日期选择" />
```

#### 默认选中项

通过`defaultIndex`来设置默认选中项,当为多列时,其为数组.

```tsx | pure
const columns = ['星期一', '星期二', '星期三', '星期四', '星期五']
<Picker columns={columns} defaultIndex={1}>
```

#### 多列选项设置

通过二维数组形式的`columns`可以设置多列选项,此时的`defaultIndex`为数组的形式,默认为`[0, 0]`

```tsx | pure
const columns = ['星期一', '星期二', '星期三', '星期四', '星期五']
const columns2 = ['上午', '中午', '下午']

<Picker columns={[columns, columns2]} defaultIndex={[1, 1]}>
```

#### 代码

```tsx
import React from 'react';
import { Picker } from 'ligero';

export default () => {
  return (
    <div>
      <Picker
        columns={['星期一', '星期二', '星期三', '星期四', '星期五']}
        onChange={(values, index) => console.log(values, index)}
      />
      <Picker
        columns={[
          ['星期一', '星期二', '星期三', '星期四', '星期五'],
          ['上午', '中午', '下午'],
        ]}
        onChange={(values, index) => console.log(values, index)}
        onConfirm={(values, index) => console.log(values, index)}
      />
    </div>
  );
};
```

### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | :-- | --- | --- |
| title | 标题 | `ReactNode` | `-` |
| toolbar | 是否显示工具栏 | `boolean` | `true` |
| okText | 确定文本 | `ReactNode` | `确定` |
| cancelText | 取消文本 | `ReactNode` | `取消` |
| columns | 每一列的数据 | `PickerColumnType`\|`PickerColumnType[]` | `[]` |
| defaultIndex | 默认每列选中的下标 ,默认每列下标 0 | `number` \| `number[]` | `-` |
| itemHeight | 选项高度,单位`px` | `number` | `48` |
| visibleCount | 默认最多显示选项个数 | `number` | `5` |
| readonly | 只读 | `boolean` | `false` |
| className | 弹出层样式类名 | `string` | `-` |
| prefixCls | 类型前缀 | `stirng` | `-` |
| onChange | 选项改变时触发, 单列: (选中值, 选中下标), 多列: (选中值数组, 选中下标数组) | `function` | `-` |
| onCancel | 点击取消按钮触发 | `function` | `-` |
| onConfirm | 点击确认按钮触发 | `function` | `-` |
