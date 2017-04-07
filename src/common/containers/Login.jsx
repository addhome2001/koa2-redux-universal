import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import capitalize from 'common/utils/transform';

import Btn from 'common/components/Btn';
import Alert from 'common/components/Alert';
import styles from 'common/assets/css/app.css';

import * as Actions from 'common/redux/modules/auth/actions';

export class Login extends Component {

  static defaultProps = {
    failureMessage: '',
  }

  static propTypes = {
    submitForm: PropTypes.func.isRequired,
    setFailureMessage: PropTypes.func.isRequired,
    failureMessage: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.submit = ::this.submit;
    this.handleInputChange = ::this.handleInputChange;
    this.resetFailureMessage = ::this.resetFailureMessage;
    this.formControllers = ['username', 'password'];
  }

  componentWillUnmount() {
    this.resetFailureMessage();
  }

  resetFailureMessage() {
    this.props.setFailureMessage();
  }

  handleInputChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  submit(e) {
    const { username, password } = this.state;
    e.preventDefault();
    if (username.length > 0 && password.length > 0) {
      this.props.submitForm({
        account: this.state,
      });
    } else {
      this.props.setFailureMessage({ message: 'Invalid username or password.' });
    }
  }

  render() {
    const { failureMessage } = this.props;

    return (
      <div>
        <p className={ styles.mainText }>Login</p>
        {
          failureMessage &&
          <Alert
            message={ failureMessage }
            closeHandler={ this.resetFailureMessage }
          />
        }
        <section className={ styles.form }>
          {
            this.formControllers.map(type =>
              <input
                key={ `${type}-field` }
                className={ styles.formGroup }
                onChange={ this.handleInputChange }
                name={ type }
                type={ type }
                placeholder={ capitalize(type) }
                value={ this.state[type] || '' }
              />,
            )
          }
        </section>
        <Btn purpose={ this.submit }>Login</Btn>
        <Btn rootLink>Home</Btn>
      </div>
    );
  }
}

export default connect(
  state => ({
    failureMessage: state.auth.failureMessage,
  }),
  dispatch => ({
    submitForm: bindActionCreators(Actions.loginAsync, dispatch),
    setFailureMessage: bindActionCreators(Actions.setFailureMessage, dispatch),
  }),
)(Login);
