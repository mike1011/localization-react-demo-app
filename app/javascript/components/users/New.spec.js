import React from 'react'
import NewUserPage from './New';
import UserService from '../../services/user/userService';
import mockJsonText from './mock_json/text.json'
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import mockAxios from 'axios'

const onSubmitSpy = jest.fn();
const onSubmit = onSubmitSpy;
const onsetValuesMock = jest.fn();
const fakeEvent = { preventDefault: () => console.log('preventDefault') };


configure({ adapter: new Adapter() });

describe('New User component',() =>{
  let wrapper, firstNameInputElement, lastNameInputElement, emailInputElement, phoneNumberInputElement,
      messageInputElement, labelFullName, labelEmail, inputFirstName, inputLastName, inputEmail;
  beforeEach(() => {
    wrapper = shallow(<NewUserPage contentText={mockJsonText.form.contact_us} />)
    firstNameInputElement = shallow(<input id="first_name" onChange={(e) => onsetValuesMock(e)} value="foo" />);
    lastNameInputElement = shallow(<input id="last_name"  value="bar" />);
    emailInputElement = shallow(<input id="email"  value="foo@bar.com" />);
    phoneNumberInputElement = shallow(<input id="phone_number"  value="+1 123456789" />);
    messageInputElement = shallow(<textarea id="message"  value="This is a text message" />);

    labelFullName = wrapper.find('label[htmlFor="full_name"]');
    labelEmail = wrapper.find('label[htmlFor="email"]');
    inputFirstName = wrapper.find('input#first_name');
    inputLastName = wrapper.find('input#last_name');
    inputEmail = wrapper.find('input#email');
    onSubmitSpy.mockClear();
  });

  afterEach(() => {
    wrapper.unmount();
    firstNameInputElement.unmount();
    lastNameInputElement.unmount();
    emailInputElement.unmount();
    phoneNumberInputElement.unmount();
    messageInputElement.unmount();
  });

  it('renders text input with label', () => {

    expect(labelFullName).toHaveLength(1);
    expect(labelFullName.prop('htmlFor')).toEqual('full_name');
    expect(labelFullName.text()).toEqual('TELL US YOUR NAME *');

    expect(labelEmail).toHaveLength(1);
    expect(labelEmail.prop('htmlFor')).toEqual('email');
    expect(labelEmail.text()).toEqual('ENTER YOUR EMAIL *');

    expect(inputFirstName).toHaveLength(1);
    expect(inputFirstName.prop('type')).toEqual('text');
    expect(inputFirstName.prop('name')).toEqual('first_name');
    expect(inputFirstName.prop('id')).toEqual('first_name');

    expect(inputLastName).toHaveLength(1);
    expect(inputLastName.prop('type')).toEqual('text');
    expect(inputLastName.prop('name')).toEqual('last_name');
    expect(inputLastName.prop('id')).toEqual('last_name');

    expect(inputEmail).toHaveLength(1);
    expect(inputEmail.prop('type')).toEqual('email');
    expect(inputEmail.prop('name')).toEqual('email');
    expect(inputEmail.prop('id')).toEqual('email');

  });


  it('should call onChange prop with input values', () => {
    const event = {
      preventDefault() {},
      target: { value: 'the-value' }
    };
    firstNameInputElement.find('input').simulate('change', event);
    expect(onsetValuesMock).toBeCalledWith(event);
  });

  it('should call onBlur prop with input values', () => {
    wrapper.find('input[id="first_name"]').simulate('blur', {target: {name: 'first_name', value: 'foo'}})
    wrapper.find('input[id="last_name"]').simulate('blur', {target: {name: 'last_name', value: 'bar'}})
    wrapper.find('input[id="email"]').simulate('blur', {target: {name: 'email', value: 'foo@bar.com'}})
    wrapper.find('input[id="phone_number"]').simulate('blur', {target: {name: 'phone_number', value: '+1 123456789'}})
    wrapper.find('textarea[id="message"]').simulate('blur', {target: {name: 'message', value: 'This is a text message'}})
  });


  it('should fill in the form values', () => {
    wrapper.find('#first_name').simulate('change', {target: {name: 'first_name', value: 'Foo'}});
    wrapper.find('#last_name').simulate('change', {target: {name: 'last_name', value: 'Bar'}});
    wrapper.find('#email').simulate('change', {target: {name: 'email', value: 'foo@bar.com'}});
    wrapper.find('#phone_number').simulate('change', {target: {name: 'phone_number', value: '+1 123456789'}});
    wrapper.find('#message').simulate('change', {target: {name: 'message', value: 'Lets test this message'}});

    expect(wrapper.state('first_name')).toEqual('Foo');
    expect(wrapper.state('last_name')).toEqual('Bar');
    expect(wrapper.state('email')).toEqual('foo@bar.com');
    expect(wrapper.state('phone_number')).toEqual('+1 123456789');
    expect(wrapper.state('message')).toEqual('Lets test this message');
  });

  it('should submit the form if valid fields are present', async () => {
    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve({ status: 200, data: { message: "Details submitted successfully"} }),
    )

    wrapper.find('#first_name').simulate('change', {target: {name: 'first_name', value: 'Foo'}});
    wrapper.find('#last_name').simulate('change', {target: {name: 'last_name', value: 'Bar'}});
    wrapper.find('#email').simulate('change', {target: {name: 'email', value: 'foo@bar.com'}});
    wrapper.find('#phone_number').simulate('change', {target: {name: 'phone_number', value: '+1 123456789'}});
    wrapper.find('#message').simulate('change', {target: {name: 'message', value: 'Lets test this message'}});
    wrapper.find('form').simulate('submit', fakeEvent);

    const body = new FormData()
    body.append('user[first_name]', "foo")
    body.append('user[last_name]', "bar");
    body.append('user[email]', "foo@bar.com");
    body.append('user[phone_number]', "+1 123456789");
    body.append('user[message]', "Lets test this message");

    //explicitly set a delay
    setTimeout(()=> {
      expect(fakeEvent.mock.calls.length).to.equal(1);
      expect(onSubmit).toHaveBeenCalledTimes(1)
      expect(mockAxios.post).toHaveBeenCalledTimes(1)
      expect(UserService.create(body)).toHaveBeenCalled();
      expect(wrapper.state().formSubmittedSuccessfully).toBeTruthy();
    })

  })

  it('should give error on submitting the form', async () => {
    mockAxios.post.mockRejectedValueOnce(() =>
      Promise.reject(new Error("You have an error!")),
    )

    wrapper.instance().forceUpdate();
    wrapper.find('#first_name').simulate('change', {target: {name: 'first_name', value: ' '}});
    wrapper.find('form').simulate('submit', fakeEvent);

    const body = new FormData()
    body.append('user[first_name]', "")

    //explicitly set a delay
    setTimeout(()=> {
      expect(mockAxios.post(body)).toHaveBeenCalledTimes(1)
      expect(wrapper.state().formSubmittedSuccessfully).not.toBeTruthy();
    })

  })


})
