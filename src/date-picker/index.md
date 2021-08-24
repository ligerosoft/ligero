---
title: DatePicker
subtitle: 日期选择器
group:
  path: /
nav:
  title: 组件
  path: /components
---

## DatePicker

### 选择年月日

通过配置`type`为`date`表示选择年月日,可以配置额外`minDate`和`maxDate`属性配置日期范围.

```tsx | pure
<DatePicker
  title="选择年月日"
  minDate={new Date(2021, 10, 1)}
  maxDate={new Date(2031, 10, 10)}
  type="date"
/>
```

### 选择完整的日期

配置`type` 为`datetime`,可以选择完整日期

```tsx | pure
<DatePicker
  title="选择日期"
  minDate={new Date(2021, 10, 1)}
  maxDate={new Date(2031, 10, 10)}
  type="datetime"
/>
```

### 格式化 column

配置 formatter,可以对 column 进行格式化

```tsx | pure
const formatter = (type, value) => {
  if (type === 'month') {
    return `${value}月`;
  }
  if (type === 'day') {
    return `${value}日`;
  }
  return value;
};
<DatePicker formatter={formatter} type="yearmonth" />;
```

### 过滤器

配置`filter`函数可以过滤符合条件的选项,实现自定义时间

```tsx | pure
const filter = (type, value) => {
  if (type === 'month') {
    return value % 4;
  }
  if (type === 'day') {
    return value % 2;
  }
  return value;
};
<DatePicker formatter={formatter} type="yearmonth" />;
```

### 代码

```tsx
import React from 'react';
import { DatePicker, Cell } from 'ligero';

export default () => {
  const formatter = (type, value) => {
    if (type === 'month') {
      return `${value}月`;
    }
    if (type === 'day') {
      return `${value}日`;
    }
    if (type === 'hour') {
      return `${value}时`;
    }
    return value;
  };

  const filter = (type, value) => {
    if (type === 'month') {
      return value.filter((item) => item % 2);
    }
    if (type === 'day') {
      return value.filter((item) => item % 3);
    }
    return value;
  };
  return (
    <div>
      <DatePicker
        title="选择年月日"
        minDate={new Date(2021, 10, 1)}
        maxDate={new Date(2031, 10, 10)}
        type="date"
      />
      <DatePicker
        type="datetime"
        value={new Date(2020, 1, 2)}
        onChange={(e) => console.log(e.toString())}
      />
      <DatePicker type="monthday" title="选择月日" formatter={formatter} />
      <DatePicker
        type="monthday"
        title="过滤器"
        filter={filter}
        onConfirm={(val) => console.log(val)}
      />
      <DatePicker.TimePicker
        visibleCount={7}
        itemHeight={44}
        title="时间"
        value={'3: 10'}
        formatter={formatter}
      />
    </div>
  );
};
```

### API

#### DatePicker

| 参数 | 说明 | 类型 | 默认值 |
| --- | :-- | --- | --- |
| title | 标题 | `ReactNode` | `-` |
| toolbar | 是否显示工具栏 | `boolean` | `true` |
| okText | 确定文本 | `ReactNode` | `确定` |
| cancelText | 取消文本 | `ReactNode` | `取消` |
| value | 默认日期 | `Date` | `-` |
| itemHeight | 选项高度,单位`px` | `number` | `48` |
| visibleCount | 默认最多显示选项个数 | `number` | `5` |
| readonly | 只读 | `boolean` | `false` |
| className | 弹出层样式类名 | `string` | `-` |
| prefixCls | 类型前缀 | `stirng` | `-` |
| onChange | 日期改变时触发 | `function` | `-` |
| onCancel | 点击取消按钮触发 | `function` | `-` |
| onConfirm | 点击确认按钮触发 | `function` | `-` |
| type | 选择器类型,可选`date`\|`datetime`\|`yearmonth`\|`datehour`\|`monthday` | `string` | `date` |
| minDate | 可选最小时间 | `Date` | `十年前` |
| maxDate | 可选最大时间 | `Date` | `十年后` |
| filter | 选项过滤器 | `function` | `-` |
| formatter | 选项格式化 | `function` | `-` |

#### TimePicker

| 参数         | 说明                 | 类型        | 默认值  |
| ------------ | :------------------- | ----------- | ------- |
| title        | 标题                 | `ReactNode` | `-`     |
| toolbar      | 是否显示工具栏       | `boolean`   | `true`  |
| okText       | 确定文本             | `ReactNode` | `确定`  |
| cancelText   | 取消文本             | `ReactNode` | `取消`  |
| value        | 默认日期             | `Date`      | `-`     |
| itemHeight   | 选项高度,单位`px`    | `number`    | `48`    |
| visibleCount | 默认最多显示选项个数 | `number`    | `5`     |
| readonly     | 只读                 | `boolean`   | `false` |
| className    | 弹出层样式类名       | `string`    | `-`     |
| prefixCls    | 类型前缀             | `stirng`    | `-`     |
| onChange     | 日期改变时触发       | `function`  | `-`     |
| onCancel     | 点击取消按钮触发     | `function`  | `-`     |
| onConfirm    | 点击确认按钮触发     | `function`  | `-`     |
| minHour      | 可选最小小时         | `number`    | `0`     |
| maxHour      | 可选最大小时         | `number`    | `23`    |
| minMinute    | 可选最小分钟         | `number`    | `0`     |
| maxHour      | 可选最大分钟         | `number`    | `59`    |
| filter       | 选项过滤器           | `function`  | `-`     |
| formatter    | 选项格式化           | `function`  | `-`     |
