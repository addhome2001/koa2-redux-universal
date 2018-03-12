import React from 'react';

// Container
import HomeContainer from 'common/containers/Home';

// Components
import Btn from 'common/components/Elements/Btn';
import Text from 'common/components/Elements/Text';

const Home = () => (
  <React.Fragment>
    <Text>Home</Text>
    <Btn purpose="/about">About</Btn>
  </React.Fragment>
);

export default HomeContainer(Home);
