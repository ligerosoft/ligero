import { RightOutlined } from '@ant-design/icons';
import { mount } from 'enzyme';
import React from 'react';
import Cell from '..';

describe('Cell', () => {
  it('render cell correctly', () => {
    const wrapper = mount(<Cell>cell</Cell>);
    expect(wrapper).toMatchSnapshot();
  });

  it('render with ellipsis', () => {
    const wrapper = mount(
      <Cell ellipsis>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit natus enim dolorum autem ad
        aspernatur vitae, eveniet blanditiis consequatur dignissimos iste quibusdam doloribus
        nostrum voluptates provident sit repudiandae, nam culpa.
      </Cell>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('render with align correctly', () => {
    const wrapper = mount(<Cell />);
    const aligns = ['top', 'center', 'bottom'];
    aligns.forEach(align => {
      wrapper.setProps({ align });
      expect(wrapper).toMatchSnapshot();
    });
  });

  it('render with label correctly', () => {
    const wrapper = mount(<Cell label="label">content</Cell>);
    expect(wrapper).toMatchSnapshot();
  });

  it('render with extra icon correctly', () => {
    const wrapper = mount(<Cell extra={<RightOutlined />}>content</Cell>);
    expect(wrapper).toMatchSnapshot();
  });

  it('render with right and extra', () => {
    const wrapper = mount(
      <Cell right="right" extra={<RightOutlined />}>
        content
      </Cell>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('render cell group correctly', () => {
    const wrapper = mount(
      <Cell.Group title="组一">
        <Cell label="描述信息">单元格</Cell>
        <Cell label="描述信息">单元格</Cell>
      </Cell.Group>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
