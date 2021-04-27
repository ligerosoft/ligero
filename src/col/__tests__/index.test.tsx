import { mount } from 'enzyme';
import React from 'react';
import Col from '..';
import Row from '../../row';

describe('Col', () => {
  it('mount col correctly', () => {
    expect(mount(<Col />)).toMatchSnapshot();
  });

  it('render col with span', () => {
    const wrapper = mount(
      <Row>
        <Col span={8}>col 8</Col>
        <Col span={8}>col 8</Col>
        <Col span={8}>col 8</Col>
      </Row>,
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('render gutter correctly', () => {
    const wrapper = mount(
      <Row gutter={20}>
        <Col span={6}>6</Col>
        <Col span={12}>12</Col>
        <Col span={6}>6</Col>

        <Col span={8}>8</Col>
        <Col span={8}>8</Col>
        <Col span={8}>8</Col>

        <Col span={4} offset={4}>
          8
        </Col>
        <Col span={6}>8</Col>
        <Col span={10}>8</Col>
      </Row>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
