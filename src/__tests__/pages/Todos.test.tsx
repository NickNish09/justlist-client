import React from 'react';
import { shallow } from '../../config/enzyme';
import Todos from '../../pages/Todos';
import TodosList from '../../components/TodosList';

describe('todos page component', () => {
  it('should render a input focused', () => {
    const wrapper = shallow(<Todos />);

    expect(wrapper.exists()).toBeTruthy();
  });

  it('should render the list of todos', () => {
    const todos = [{ _id: '1', content: 'buy bread', isFinished: false }];
    const wrapper = shallow(<TodosList todos={todos} />);

    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find('TodoItem')).toHaveLength(todos.length);
  });
});

describe('#getTodos', () => {
  it('should get the todos list from api', () => {
    // const wrapper = shallow(<Todos />);
    // console.log(wrapper.props());
    // expect(wrapper.getTodos()).toEqual([]);
  });
});
