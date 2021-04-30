import { mount } from 'enzyme';
import React from 'react';
import Popup from '..';

describe('Popup', () => {
  it('should lock scroll when popup is visible', () => {
    const wrapper = mount(<Popup />);
    expect(document.body.classList.contains('ligero-overflow-hidden')).toBeFalsy();

    wrapper.setProps({ visible: true });
    expect(document.body.classList.contains('ligero-overflow-hidden')).toBeTruthy();
    wrapper.unmount();
  });

  it('should force render', () => {
    const popup = mount(<Popup forceRender />);
    expect(popup.find('.ligero-popup')).toBeTruthy();
  });

  it('afterClose should be called when click mask', () => {
    const close = jest.fn();
    const wrapper = mount(<Popup afterClose={close} visible />);

    wrapper.find('.ligero-popup__mask').simulate('click');

    expect(close).toHaveBeenCalled();
  });

  it('mask should not be called when maskClosable is false', () => {
    const close = jest.fn();
    const wrapper = mount(<Popup maskClosable={false} visible />);

    wrapper.find('.ligero-popup__mask').simulate('click');
    expect(close).not.toHaveBeenCalled();
  });
});
