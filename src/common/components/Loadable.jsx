import Loadable from 'react-loadable';
import Loading from './Loading';

export default (loader) =>
  Loadable({
    loader,
    delay: 2000,
    timeout: 30000,
    loading: Loading,
  });
