import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Btn from 'common/components/Elements/Btn';
import Text from 'common/components/Elements/Text';

const ErrorPage = () => (
  <React.Fragment>
    <Switch>
      <Route
        exact
        path="/error"
        render={() => <Text>Something went wrong.</Text>}
      />
    </Switch>
    <Btn to="/">Back To Home</Btn>
  </React.Fragment>
);

export default ErrorPage;
