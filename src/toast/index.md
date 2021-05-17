---
title: Toast
subtitle: 轻提示
group:
  path: /
nav:
  title: 组件
  path: /components
---

```tsx
import React, { useState } from 'react';
import { Toast, Button } from 'ligero';

const key = 'updatable';
export default () => {
  const show = () => {
    Toast.success({
      message: 'Network connection failed !!!',
      duration: 0,
      closable: true,
    });
  };

  return (
    <React.Fragment>
      <Button type="primary" onClick={show}>
        show Toast
      </Button>
    </React.Fragment>
  );
};
```
