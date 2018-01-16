import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Btn from 'common/components/Elements/Btn';
import Text from 'common/components/Elements/Text';
import FormHOC from 'common/components/Blocks/FormHOC';
import ForgotForm from 'common/containers/ForgotForm';

const Form = ForgotForm(
  FormHOC({
    initialState: {
      username: '',
    },
    page: 'Forgot Password',
    subTitle: `
    Please enter the username you use to sign in
    and check your inbox for a password reset email.
  `,
    errorMessage: 'Maybe the username field was empty.',
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
            <Btn purpose={submit} disabled={loading}>
              Send
            </Btn>
          )}
        </Form>
      )}
    />
    <Route
      path="/forgot/mailed"
      render={() => (
        <section>
          <Text level="normal">
            The password reset email has been sent successfully.
          </Text>
          <Btn rootLink>Home</Btn>
        </section>
      )}
    />
    <Redirect from="/forgot" to="/" />
  </Switch>
);
