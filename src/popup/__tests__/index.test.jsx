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

  it('should be called when click overlay', () => {
    const close = jest.fn();
    const wrapper = mount(<Popup onOverlayClick={close} visible />);

    wrapper.find('.ligero-overlay').simulate('click');

    expect(close).toHaveBeenCalled();
  });

  it('mask should not be called when maskClosable is false', () => {
    const close = jest.fn();
    const wrapper = mount(<Popup maskClosable={false} visible />);

    wrapper.find('.ligero-overlay').simulate('click');
    expect(close).not.toHaveBeenCalled();
  });
});
