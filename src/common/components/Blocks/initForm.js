import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Components
import Alert from 'common/components/Elements/Alert';
import Text from 'common/components/Elements/Text';
import Form from 'common/components/Elements/Form';

export default function({
  initialFormFields,
  page = '',
  subTitle = '',
  errorMessage,
}) {
  return class From extends PureComponent {
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
      this.state = {
        formFields: initialFormFields,
      };
      this.submit = ::this.submit;
      this.changeHandler = ::this.changeHandler;
      this.formFieldKeys = Object.keys(initialFormFields);
      this.page = page;
      this.subTitle = subTitle;
    }

    componentWillUnmount() {
      const { failureMessage, setFailureMessage } = this.props;
      return failureMessage && setFailureMessage();
    }

    changeHandler({ target }) {
      const { name, value } = target;
      const { formFields } = this.state;

      this.setState({
        formFields: {
          ...formFields,
          [name]: value,
        },
      });
    }

    submit(e) {
      const { setFailureMessage, submitForm } = this.props;
      const { formFields } = this.state;

      e.preventDefault();

      if (this.formFieldKeys.every((scope) => !!formFields[scope])) {
        submitForm(formFields);
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
      const { formFields } = this.state;

      return (
        <React.Fragment>
          <Text>{this.page}</Text>
          <Text level="normal">{this.subTitle}</Text>
          {failureMessage && (
            <Alert message={failureMessage} closeHandler={setFailureMessage} />
          )}
          <Form
            formFieldKeys={this.formFieldKeys}
            formFields={formFields}
            changeHandler={this.changeHandler}
            disabled={loading}
          />
          {children({ submit: this.submit, loading })}
        </React.Fragment>
      );
    }
  };
}
