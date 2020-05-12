import React from "react"
import PropTypes from "prop-types"
import SimpleReactValidator from 'simple-react-validator';
import UserServiceAPI from '../../services/user/userService.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./New.scss";

class New extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      message: '',
      formSubmittedSuccessfully: false,
      responseMessage: ''
    };

    this.validator = new SimpleReactValidator({autoForceUpdate: this});

  }

  setValues(event) {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = event => {
    this.toastId = null;
    event.preventDefault()
    const { first_name, last_name, email, phone_number, message } = this.state
    //prepare the payload
		const body = new FormData()
		body.append('user[first_name]', first_name)
		body.append('user[last_name]', last_name);
    body.append('user[email]', email);
    body.append('user[phone_number]', phone_number);
    body.append('user[message]', message);

		UserServiceAPI.create(body)
    .then(response => {
      console.log(response.data.message)
      if (response.status == 200 && response.data.message) {
          this.setState({ formSubmittedSuccessfully: true, first_name: '', last_name: '', phone_number: '', email: '', message: ''});
          this.toastId = toast.success( response.data.message, { autoClose: 5000, pauseOnHover: true, onClose: () => window.location.reload(true) });
      }
    })
    .catch(error => {
      console.log(error.response.data.message);
      this.setState({ formSubmittedSuccessfully: false, responseMessage: error.response.data.message != undefined ? error.response.data.message : "Something went wrong.Try again."});
      this.toastId = toast.error( this.state.responseMessage, { autoClose: 5000, pauseOnHover: true });
      return false;
    })

  }

  render () {
    const {
      title, name_label, email_label,
      phone_label, message_label, btn_label, address_title, lets_talk_title,
      address, contact_number, general_support_email, general_support_title
    } = this.props.contentText;

    return (
      <React.Fragment>
        <div className="wrap-contact100">
            <form className="contact100-form" onSubmit={this.handleSubmit}>
              <span className="contact100-form-title">
                {title}
              </span>

              <label className="label-input100" htmlFor="full_name">{name_label} *</label>
              <div className="wrap-input100 rs1-wrap-input100 ">
                <input className="input100" value={this.state.first_name} onChange={(e) => this.setValues(e)} onBlur={() => this.validator.showMessageFor('first_name')} type="text" name="first_name" id="first_name"  placeholder="First name" required/>
                <span className="focus-input100"></span>
                {this.validator.message('first_name', this.state.first_name, 'required|alpha_num_dash_space|min:3|max:300', {className: 'text-danger fs-11'})}
              </div>
              <div className="wrap-input100 rs1-wrap-input100 ">
                <input className="input100" value={this.state.last_name} onChange={(e) => this.setValues(e)} onBlur={() => this.validator.showMessageFor('last_name')} type="text" name="last_name" id="last_name"  placeholder="Last name" required/>
                <span className="focus-input100"></span>
                {this.validator.message('last_name', this.state.last_name, 'required|alpha_num_dash_space|min:3|max:300', {className: 'text-danger fs-11'})}
              </div>


              <label className="label-input100" htmlFor="email">{email_label} *</label>
              <div className="wrap-input100" >
                <input className="input100" value={this.state.email} onChange={(e) => this.setValues(e)} onBlur={() => this.validator.showMessageFor('email')} type="email" name="email" id="email"  placeholder="Eg. example@email.com" required/>
                <span className="focus-input100"></span>
                {this.validator.message('email', this.state.email, 'required|email', {className: 'text-danger fs-11'})}
              </div>

              <label className="label-input100" htmlFor="phone">{phone_label}</label>
              <div className="wrap-input100">
                <input className="input100" value={this.state.phone_number} onChange={(e) => this.setValues(e)} onBlur={() => this.validator.showMessageFor('phone_number')} type="text" name="phone_number" id="phone_number" placeholder="Eg. +1 800 000000" />
                <span className="focus-input100"></span>
                {this.validator.message('phone_number', this.state.phone_number, 'string', {className: 'text-danger fs-11'})}
              </div>

              <label className="label-input100" htmlFor="message">{message_label} *</label>
              <div className="wrap-input100 validate-input" data-validate = "Message is required">
                <textarea className="input100" value={this.state.message} onChange={(e) => this.setValues(e)} onBlur={() => this.validator.showMessageFor('message')} name="message" id="message" placeholder="Write us a message" />
                <span className="focus-input100"></span>
                {this.validator.message('message', this.state.message, 'alpha_num_dash_space', {className: 'text-danger fs-11'})}
              </div>

              <div className="container-contact100-form-btn">
                <button id="submitBtn" type="submit" data-disable-with="Send Message..." disabled={this.state.formSubmittedSuccessfully} className="contact100-form-btn">{btn_label}</button>
              </div>
            </form>

            <div className="contact100-more flex-col-c-m bg">
              <div className="flex-w size1 p-b-47">
                <div className="txt1 p-r-25">
                  <span className="fa fa-map-marker"></span>
                </div>

                <div className="flex-col size2">
                  <span className="txt1 p-b-20">
                    {address_title}
                  </span>

                  <span className="txt3">
                    {address}
                  </span>
                </div>
              </div>

              <div className="dis-flex size1 p-b-47">
                <div className="txt1 p-r-25">
                  <span className="fa fa-phone"></span>
                </div>

                <div className="flex-col size2">
                  <span className="txt1 p-b-20">
                    {lets_talk_title}
                  </span>

                  <span className="txt3">
                    {contact_number}
                  </span>
                </div>
              </div>

              <div className="dis-flex size1 p-b-47">
                <div className="txt1 p-r-25">
                  <span className="fa fa-envelope"></span>
                </div>

                <div className="flex-col size2">
                  <span className="txt1 p-b-20">
                    {general_support_title}
                  </span>

                  <span className="txt3">
                    {general_support_email}
                  </span>
                </div>
              </div>
            </div>
          </div>
      </React.Fragment>
    );
  }
}

New.propTypes = {
  contentText: PropTypes.object.isRequired,
};


export default New
