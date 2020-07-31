import React from 'react';
import { shallow } from '../config/enzyme';
import App from '../App';
import UrlPlaceholder from '../components/UrlPlaceholder';

describe('home page', () => {
  it('should render a url input', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.contains(<UrlPlaceholder />)).toBeTruthy();
  });
});
