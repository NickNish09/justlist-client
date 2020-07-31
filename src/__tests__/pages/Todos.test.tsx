import React from 'react';
import { shallow } from '../../config/enzyme';
import Todos from '../../pages/Todos';

describe('todos page', () => {
  it('should render a input focused', () => {
    const wrapper = shallow(<Todos />);

    expect(wrapper.exists()).toBeTruthy();
  });
});
