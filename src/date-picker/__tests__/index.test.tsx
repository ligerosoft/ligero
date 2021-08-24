import { mount } from 'enzyme';
import React from 'react';
import DatePicker, { DatePickerColumnType } from '..';

const minDate = new Date(2021, 0, 1);
const maxDate = new Date(2021, 11, 30);
describe('DatePicker', () => {
  it('render correctly', () => {
    const wrapper = mount(<DatePicker />);
    expect(wrapper).toMatchSnapshot();
  });

  it('render with different type correctly', () => {
    const wrapper = mount(<DatePicker minDate={minDate} maxDate={maxDate} type="date" />);

    expect(wrapper).toMatchSnapshot();

    wrapper.setProps({ type: 'datetime' });
    expect(wrapper).toMatchSnapshot();

    wrapper.setProps({ type: 'yearmonth' });
    expect(wrapper).toMatchSnapshot();

    wrapper.setProps({ type: 'monthday' });
    expect(wrapper).toMatchSnapshot();

    wrapper.setProps({ type: 'dayhour' });
    expect(wrapper).toMatchSnapshot();
  });

  it('format the column', () => {
    const formatter = (type: DatePickerColumnType, value: string) => {
      if (type === 'day') {
        return `${value}日`;
      }
      return value;
    };
    const wrapper = mount(<DatePicker formatter={formatter} minDate={minDate} maxDate={maxDate} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('filter the column correctly', () => {
    const filter = (type: DatePickerColumnType, value: string[]) => {
      if (type === 'day') {
        return value.filter((item) => +item % 2);
      }
      return value;
    };
    const wrapper = mount(<DatePicker filter={filter} minDate={minDate} maxDate={maxDate} />);
    expect(wrapper).toMatchSnapshot();
  });
});
