import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Components
import Alert from 'common/components/Elements/Alert';
import Text from 'common/components/Elements/Text';
import Form from 'common/components/Elements/Form';

export default function({
  initialState,
  page = '',
  subTitle = '',
  errorMessage,
}) {
  return class FormHOC extends PureComponent {
    static defaultProps = {
      failureMessage: '',
      loading: false,
    };

    static propTypes = {
      submitForm: PropTypes.func.isRequired,
      setFailureMessage: PropTypes.func.isRequired,
      failureMessage: PropTypes.string,
      loading: PropTypes.bool,
      children: PropTypes.func.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = initialState;
      this.submit = ::this.submit;
      this.changeHandler = ::this.changeHandler;
      this.formScopes = Object.keys(this.state);
      this.page = page;
      this.subTitle = subTitle;
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

      if (this.formScopes.every((scope) => !!this.state[scope])) {
        this.props.submitForm(this.state);
      } else {
        setFailureMessage(errorMessage);
      }
    }

    render() {
      const {
        failureMessage,
        loading,
        setFailureMessage,
        children,
      } = this.props;

      return (
        <div>
          <Text>{this.page}</Text>
          <Text level="normal">{this.subTitle}</Text>
          {failureMessage && (
            <Alert message={failureMessage} closeHandler={setFailureMessage} />
          )}
          <Form
            scopes={this.formScopes}
            typeValues={this.state}
            changeHandler={this.changeHandler}
            disabled={loading}
          />
          {children({ submit: this.submit, loading })}
        </div>
      );
    }
  };
}
