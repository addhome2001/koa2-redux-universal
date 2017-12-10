import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect, withRouter } from 'react-router-dom';

export default function (ProtectedComponent, conditionAuth = true) {
  class isAuthComponent extends PureComponent {
    static defaultProps = {
      isAuth: false,
      location: {
        state: {
          from: { pathname: '/' },
        },
      },
    }

    static propTypes = {
      isAuth: PropTypes.bool.isRequired,
      location: PropTypes.shape({
        state: PropTypes.shape({
          from: PropTypes.shape({
            pathname: PropTypes.string,
          }),
        }),
      }),
    }

    render() {
      const { from: url } = this.props.location.state || { from: { pathname: '/' } };

      if (this.props.isAuth !== conditionAuth) {
        return <Redirect to={ url } />;
      }

      return <ProtectedComponent />;
    }
  }

  return compose(
    withRouter,
    connect(state => ({
      isAuth: !!state.auth.user.id,
    })),
  )(isAuthComponent);
}
