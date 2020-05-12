import React from 'react'
import Index from './Index'
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('Home Page component',() =>{
  let wrapper;
  beforeEach(() => wrapper = shallow(<Index />));

  it('should render new user div', () => {
    expect(wrapper.find('.new_user').length).toEqual(1);
  });

})
