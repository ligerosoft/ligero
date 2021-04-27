import Button from '..';
import React from 'react';
import { LikeOutlined } from '@ant-design/icons';

export default () => {
  return (
    <>
      按钮类型：
      <Button type="primary">提示按钮</Button>
      <Button type="default">默认按钮</Button>
      <Button type="success">成功按钮</Button>
      <Button type="warning">警告按钮</Button>
      <Button type="danger">危险按钮</Button>
      <Button type="dashed">虚线按钮</Button>
      <div>禁用类型：</div>
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
      <div>朴素按钮</div>
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
      <div>按钮自定义颜色</div>
      <Button color="purple" plain>
        朴素单色
      </Button>
      <Button color="purple">单色</Button>
      <div>按钮自定义形状</div>
      <Button shape="square" type="primary">
        方形
      </Button>
      <Button shape="round" type="primary">
        圆形
      </Button>
      <div>按钮自定义大小</div>
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
      <div>跳转</div>
      <Button href="https://github.com/ligerosoft/ligero" type="primary">
        跳转
      </Button>
      <Button loading type="primary">
        loading
      </Button>
      <Button color="purple" loading plain>
        单色
      </Button>
      <div>带icon的button</div>
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
    </>
  );
};
