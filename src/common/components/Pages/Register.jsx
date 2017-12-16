import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import Btn from 'common/components/Elements/Btn';
import Alert from 'common/components/Elements/Alert';
import Text from 'common/components/Elements/Text';
import Form from 'common/components/Elements/Form';

export class Register extends Component {

  static defaultProps = {
    failureMessage: '',
    loading: false,
  }

  static propTypes = {
    submitForm: PropTypes.func.isRequired,
    setFailureMessage: PropTypes.func.isRequired,
    failureMessage: PropTypes.string,
    loading: PropTypes.bool,
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
    };
    this.submit = ::this.submit;
    this.changeHandler = ::this.changeHandler;
    this.formScopes = Object.keys(this.state);
  }

  componentWillUnmount() {
    const { failureMessage, setFailureMessage } = this.props;
    return failureMessage && setFailureMessage();
  }

  changeHandler({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  submit(e) {
    const { username, password, email } = this.state;
    const { setFailureMessage, loading } = this.props;

    e.preventDefault();

    if (loading) return;

    if (username && password && email) {
      this.props.submitForm(this.state);
    } else {
      setFailureMessage({ message: 'Maybe you\'re missing something.' });
    }
  }

  render() {
    const { failureMessage, loading, setFailureMessage } = this.props;

    return (
      <div>
        <Text>Register</Text>
        {
          failureMessage &&
          <Alert
            message={ failureMessage }
            closeHandler={ setFailureMessage }
          />
        }
        <Form
          scopes={ this.formScopes }
          typeValues={ this.state }
          changeHandler={ this.changeHandler }
          disabled={ loading }
        />
        <Btn purpose={ this.submit } disabled={ loading }>Submit</Btn>
        <Btn rootLink disabled={ loading }>Home</Btn>
      </div>
    );
  }
}

export default Register;
