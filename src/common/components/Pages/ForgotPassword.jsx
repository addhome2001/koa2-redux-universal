import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import * as Actions from 'common/redux/modules/auth/actions';
import Btn from 'common/components/Elements/Btn';
import Text from 'common/components/Elements/Text';
import initForm from 'common/components/Blocks/initForm';
import makeFormController from 'common/components/Blocks/makeFormController';

const Form = makeFormController(
  Actions.forgotPasswordAsync,
  Actions.setFailureMessage,
  initForm({
    initialState: {
      email: '',
    },
    page: 'Forgot Password',
    subTitle: `
    Please enter the email you use to sign in
    and check your inbox for a password reset.
  `,
    errorMessage: 'Maybe the email field was empty.',
  }),
);

export default () => (
  <Switch>
    <Route
      exact
      path="/forgot"
      render={() => (
        <Form>
          {({ submit, loading }) => (
            <React.Fragment>
              <Btn purpose={submit} disabled={loading}>
                Send
              </Btn>
              <Btn rootLink>Home</Btn>
            </React.Fragment>
          )}
        </Form>
      )}
    />
    <Route
      path="/forgot/mailed"
      render={() => (
        <React.Fragment>
          <Text level="normal">
            The password reset email has been sent successfully.
          </Text>
          <Btn rootLink>Home</Btn>
        </React.Fragment>
      )}
    />
    <Redirect from="/forgot" to="/" />
  </Switch>
);
