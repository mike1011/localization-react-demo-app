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
    //ready to validate the inputs
    this.validator = new SimpleReactValidator({autoForceUpdate: this});

  }

  setValues(event) {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  }

  reloadPage(time_in_ms = nil) {
    if (Number.isInteger(time_in_ms)) {
      setTimeout(
        function() {
          window.location.reload(true);
        }
        .bind(this),
        parseInt(time_in_ms)
      );
    }
  }

  handleSubmit = event => {
    this.toastId = null;
    event.preventDefault()
    const { first_name, last_name, email, phone_number, message } = this.state
    //prepare the payload in the way needed by Rails
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
          this.toastId = toast.success( response.data.message, { autoClose: 5000, pauseOnHover: true });
          this.reloadPage(5000)
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
      input, address, full_address, lets_talk, title,
      contact_number, general_support_email, general_support
    } = this.props.contentText

    return (
      <React.Fragment>
       <div className="wrap-contact100">
        <div className="lang-div">
              <div className="dropdown">
                <button className="btn btn-outline-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown">
                  {input.label.change_lang_btn}
                </button>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="?locale=en">English</a>
                  <a className="dropdown-item" href="?locale=fr">French</a>
                  <a className="dropdown-item" href="?locale=hi">Hindi</a>
                </div>
              </div>
            </div>
            <form className="contact100-form" onSubmit={this.handleSubmit}>
              <span className="contact100-form-title">
                {title}
              </span>

              <label className="label-input100" htmlFor="full_name">{input.label.name} *</label>
              <div className="wrap-input100 rs1-wrap-input100 ">
                <input className="input100" value={this.state.first_name} onChange={(e) => this.setValues(e)} onBlur={() => this.validator.showMessageFor('first_name')} type="text" name="first_name" id="first_name"  placeholder={input.placeholder.first_name} required/>
                <span className="focus-input100"></span>
                {this.validator.message('first_name', this.state.first_name, 'required|alpha_num_dash_space|min:3|max:300', {className: 'text-danger fs-11'})}
              </div>
              <div className="wrap-input100 rs1-wrap-input100 ">
                <input className="input100" value={this.state.last_name} onChange={(e) => this.setValues(e)} onBlur={() => this.validator.showMessageFor('last_name')} type="text" name="last_name" id="last_name"  placeholder={input.placeholder.last_name} required/>
                <span className="focus-input100"></span>
                {this.validator.message('last_name', this.state.last_name, 'required|alpha_num_dash_space|min:3|max:300', {className: 'text-danger fs-11'})}
              </div>


              <label className="label-input100" htmlFor="email">{input.label.email} *</label>
              <div className="wrap-input100" >
                <input className="input100" value={this.state.email} onChange={(e) => this.setValues(e)} onBlur={() => this.validator.showMessageFor('email')} type="email" name="email" id="email"  placeholder="Eg. example@email.com" required/>
                <span className="focus-input100"></span>
                {this.validator.message('email', this.state.email, 'required|email', {className: 'text-danger fs-11'})}
              </div>

              <label className="label-input100" htmlFor="phone">{input.label.phone}</label>
              <div className="wrap-input100">
                <input className="input100" value={this.state.phone_number} onChange={(e) => this.setValues(e)} onBlur={() => this.validator.showMessageFor('phone_number')} type="text" name="phone_number" id="phone_number" placeholder="Eg. +1 800 000000" />
                <span className="focus-input100"></span>
                {this.validator.message('phone_number', this.state.phone_number, 'string', {className: 'text-danger fs-11'})}
              </div>

              <label className="label-input100" htmlFor="message">{input.label.message} *</label>
              <div className="wrap-input100 validate-input" data-validate = "Message is required">
                <textarea className="input100" value={this.state.message} onChange={(e) => this.setValues(e)} onBlur={() => this.validator.showMessageFor('message')} name="message" id="message" placeholder={input.placeholder.message} />
                <span className="focus-input100"></span>
                {this.validator.message('message', this.state.message, 'alpha_num_dash_space', {className: 'text-danger fs-11'})}
              </div>

              <div className="container-contact100-form-btn">
                <button id="submitBtn" type="submit" data-disable-with="Send Message..." disabled={this.state.formSubmittedSuccessfully} className="contact100-form-btn">{input.label.submit_btn}</button>
              </div>
            </form>

            <div className="contact100-more flex-col-c-m bg">
              <div className="flex-w size1 p-b-47">
                <div className="txt1 p-r-25">
                  <span className="fa fa-map-marker"></span>
                </div>

                <div className="flex-col size2">
                  <span className="txt1 p-b-20">
                    {address}
                  </span>

                  <span className="txt3">
                    {full_address}
                  </span>
                </div>
              </div>

              <div className="dis-flex size1 p-b-47">
                <div className="txt1 p-r-25">
                  <span className="fa fa-phone"></span>
                </div>

                <div className="flex-col size2">
                  <span className="txt1 p-b-20">
                    {lets_talk}
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
                    {general_support}
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
  contentText: PropTypes.object,
};


export default New
