import { mount, render } from 'enzyme';
import React from 'react';
import Button from '..';

describe('Button', () => {
  it('render correctly', () => {
    expect(render(<Button>button</Button>)).toMatchSnapshot();
  });

  it('mount correctly', () => {
    expect(() => mount(<Button>button</Button>)).not.toThrow();
  });

  it('render button text', () => {
    const html = mount(<Button>button</Button>);
    expect(html.text()).toBe('button');
  });

  it('render button text is empty', () => {
    const html = mount(<Button>{null}</Button>);
    expect(html.text()).toBe('');
  });

  it('should not clickable when button is disabled', () => {
    const fn = jest.fn();
    const html = mount(<Button disabled onClick={fn} />);
    html.simulate('click');
    expect(fn).not.toHaveBeenCalled();
  });

  it('should not clickable when button is loading', () => {
    const fn = jest.fn();
    const wrapper = mount(<Button loading />);
    wrapper.simulate('click');
    expect(fn).not.toHaveBeenCalled();
  });

  it('should support link', () => {
    expect(
      mount(<Button href="https://github.com/ligerosoft/ligero">link</Button>).render(),
    ).toMatchSnapshot();
  });

  it('render a single symbol with shape of round', () => {
    const html = mount(
      <Button shape="round" type="primary">
        A
      </Button>,
    );
    const commonClass = '.ligero-button.ligero-button--round.ligero-button--primary';

    expect(html.text()).toBe('A');
    expect(html.find(commonClass)).toHaveLength(1);

    html.setProps({ size: 'xs' });
    expect(html.find(`${commonClass}.ligero-button--xs`)).toHaveLength(1);

    html.setProps({ size: 'sm' });
    expect(html.find(`${commonClass}.ligero-button--sm`)).toHaveLength(1);

    html.setProps({ size: 'lg' });
    expect(html.find(`${commonClass}.ligero-button--lg`)).toHaveLength(1);
  });

  it('render button with different size', () => {
    const wrapper = mount(<Button />);
    const classes = '.ligero-button';
    expect(wrapper.find(`${classes}.ligero-button--primary`).length).toBe(0);
    expect(wrapper.find(`${classes}.ligero-button--default`).length).toBe(1);

    wrapper.setProps({ size: 'xs' });
    expect(wrapper.find(`${classes}.ligero-button--xs`)).toHaveLength(1);

    wrapper.setProps({ size: 'sm' });
    expect(wrapper.find(`${classes}.ligero-button--sm`)).toHaveLength(1);

    wrapper.setProps({ size: 'lg' });
    expect(wrapper.find(`${classes}.ligero-button--lg`)).toHaveLength(1);
  });
  it('render button with plain props and color', () => {
    const wrapper = mount(
      <Button type="primary" plain>
        plain button
      </Button>,
    );
    expect(wrapper.find('.ligero-button--plain')).toHaveLength(1);

    expect(wrapper.render()).toMatchSnapshot();

    const colorWrapper = mount(
      <Button color="purple" plain>
        plain button
      </Button>,
    );
    expect(colorWrapper).toMatchSnapshot();

    // expect(colorWrapper.attr('style')).toEqual(`background:#fff;border-color:purple;color:purple`)
  });
});
