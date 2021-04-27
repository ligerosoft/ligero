import { mount } from 'enzyme';
import glob from 'glob';
import React from 'react';

type Options = {
  skip?: boolean;
};

export default function demoTest(component: string, options: Options = {}) {
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

  afterEach(() => {
    logSpy.mockReset();
    errorSpy.mockReset();
  });

  afterAll(() => {
    errorSpy.mockRestore();
    logSpy.mockReset();
  });
  const files = glob.sync(`./src/${component}/demos/*.tsx`);
  describe(`${component} demos`, () => {
    files.forEach(file => {
      let method = options.skip === true ? test.skip : test;
      if (Array.isArray(options.skip) && options.skip.some(option => file.includes(option))) {
        method = test.skip;
      }
      method(`render ${file} correctly`, () => {
        // eslint-disable-next-line import/no-dynamic-require, global-require
        const Demo = require(`.${file}`).default;
        const wrapper = mount(<Demo />);
        expect(wrapper.render()).toMatchSnapshot();
      });
    });
  });
}
