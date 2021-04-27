import { mount, render } from 'enzyme';
import React from 'react';
import Row from '..';

describe('Row', () => {
  it('mount row correctly', () => {
    expect(mount(<Row />)).toMatchSnapshot();
  });

  it('should has "ligero-row--wrap" default or set wrap props is true', () => {
    const wrapper = render(<Row />);
    expect(wrapper.hasClass('ligero-row--wrap')).toBe(true);
  });
  it('render classes when set props align or justify', () => {
    const wrapper = mount(<Row />);
    wrapper.setProps({ align: 'center' });
    const aligns = ['top', 'center', 'bottom'];

    aligns.forEach(align => {
      wrapper.setProps({ align });
      expect(wrapper.render().hasClass(`ligero-row--align-${align}`)).toBe(true);
    });
    const justifies = ['start', 'center', 'end', 'space-around', 'space-between'];

    justifies.forEach(justify => {
      wrapper.setProps({ justify });
      expect(wrapper.render().hasClass(`ligero-row--justify-${justify}`)).toBe(true);
    });
  });
});
