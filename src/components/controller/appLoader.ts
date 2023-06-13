import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super('https://newsapi.org/v2/', { apiKey: '9507b1036dba4614aa8a79a67bc2f599' });
  }
}

export default AppLoader;
