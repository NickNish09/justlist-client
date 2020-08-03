import React from 'react';
import { shallow } from '../../config/enzyme';
import TodoForm from '../../components/TodoForm';

describe('TodoFrom component', () => {
  describe('when creating a new todo', () => {
    it('should return a input with no content', () => {
      const wrapper = shallow(<TodoForm pageId="1" />);

      expect(wrapper.exists()).toBeTruthy();
      expect(wrapper.find('input').props().value).toEqual('');
    });
  });
});
