import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';

export default RouteComponent =>
  class RouteRender extends PureComponent {
    static propTypes = {
      route: PropTypes.shape({
        routes: PropTypes.array,
        component: PropTypes.func,
      }).isRequired,
    };

    render() {
      return (
        <RouteComponent { ...this.props }>
          { renderRoutes(this.props.route.routes) }
        </RouteComponent>
      );
    }
  };
