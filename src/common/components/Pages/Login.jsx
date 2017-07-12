import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import Btn from 'common/components/Elements/Btn';
import Alert from 'common/components/Elements/Alert';
import Text from 'common/components/Elements/Text';
import LoginForm from 'common/components/Elements/LoginForm';

export class Login extends Component {

  static defaultProps = {
    failureMessage: '',
    loading: false,
  }

  static propTypes = {
    submitForm: PropTypes.func.isRequired,
    setFailureMessage: PropTypes.func.isRequired,
    csrf: PropTypes.string.isRequired,
    failureMessage: PropTypes.string,
    loading: PropTypes.bool,
  }

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.submit = ::this.submit;
    this.changeHandler = ::this.changeHandler;
    this.resetFailureMessage = ::this.resetFailureMessage;
    this.formScopes = Object.keys(this.state);
  }

  componentWillUnmount() {
    this.resetFailureMessage();
  }

  resetFailureMessage() {
    this.props.setFailureMessage();
  }

  changeHandler({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  submit(e) {
    const { username, password } = this.state;
    const { csrf, setFailureMessage, loading } = this.props;

    e.preventDefault();

    if (loading) return;

    if (!csrf) throw new Error('csrf token was not found.');

    if (username.length > 0 && password.length > 0) {
      this.props.submitForm({
        account: this.state,
        csrf,
      });
    } else {
      setFailureMessage({ message: 'Invalid username or password.' });
    }
  }

  render() {
    const { failureMessage, loading } = this.props;

    return (
      <div>
        <Text>Login</Text>
        {
          failureMessage &&
          <Alert
            message={ failureMessage }
            closeHandler={ this.resetFailureMessage }
          />
        }
        <LoginForm
          scopes={ this.formScopes }
          typeValues={ this.state }
          changeHandler={ this.changeHandler }
          disabled={ loading }
        />
        <Btn purpose={ this.submit } disabled={ loading }>Login</Btn>
        <Btn rootLink disabled={ loading }>Home</Btn>
      </div>
    );
  }
}

export default Login;
