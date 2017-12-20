import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Components
import Btn from 'common/components/Elements/Btn';
import Alert from 'common/components/Elements/Alert';
import Text from 'common/components/Elements/Text';
import Form from 'common/components/Elements/Form';

export default function ({ initialState, page, errorMessage }) {
  return class FormHOC extends PureComponent {
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
      this.state = initialState;
      this.submit = ::this.submit;
      this.changeHandler = ::this.changeHandler;
      this.formScopes = Object.keys(this.state);
      this.page = page;
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
      const { setFailureMessage } = this.props;

      e.preventDefault();

      if (this.formScopes.every(scope => !!this.state[scope])) {
        this.props.submitForm(this.state);
      } else {
        setFailureMessage(errorMessage);
      }
    }

    render() {
      const { failureMessage, loading, setFailureMessage } = this.props;

      return (
        <div>
          <Text>{ this.page }</Text>
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
          <Btn purpose={ this.submit } disabled={ loading }>{ this.page }</Btn>
          <Btn rootLink disabled={ loading }>Home</Btn>
        </div>
      );
    }
  };
}
