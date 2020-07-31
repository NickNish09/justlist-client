import React from 'react';
import { shallow } from '../../config/enzyme';
import TodoForm from '../../components/TodoForm';

describe('TodoFrom component', () => {
  describe('when creating a new todo', () => {
    it('should return a input with no content', () => {
      const wrapper = shallow(<TodoForm />);

      expect(wrapper.exists()).toBeTruthy();
      expect(wrapper.find('input').props().value).toEqual('');
    });
  });

  describe('when creating updating todo', () => {
    it('should return a input with the todo content', () => {
      const todo = { _id: '1', content: 'buy bread', isFinished: false };
      const wrapper = shallow(<TodoForm todo={todo} />);

      expect(wrapper.exists()).toBeTruthy();
      expect(wrapper.find('input').props().value).toEqual('buy bread');
    });
  });
});
