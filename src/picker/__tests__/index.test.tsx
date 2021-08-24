import { mount } from 'enzyme';
import React from 'react';
import Picker from '..';

const simpleColumns = ['red', 'blue', 'green'];
describe('Picker', () => {
  it('it should basic render corretly', () => {
    const wrapper = mount(<Picker columns={simpleColumns} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('response events', async () => {
    const onChange = jest.fn();
    const onCancel = jest.fn();
    const onConfirm = jest.fn();
    const wrapper = mount(
      <Picker
        columns={simpleColumns}
        onCancel={onCancel}
        onChange={onChange}
        onConfirm={onConfirm}
      />,
    );
    wrapper.find('.ligero-picker__cancel').simulate('click');
    expect(onCancel).toHaveBeenCalled();

    wrapper.find('.ligero-picker__confirm').simulate('click');
    expect(onConfirm).toHaveBeenCalled();
  });
  it('set default index', () => {
    const wrapper = mount(<Picker columns={simpleColumns} />);
    expect(wrapper).toMatchSnapshot();

    wrapper.setProps({ defaultIndex: 2 });
    expect(wrapper).toMatchSnapshot();
  });
});
