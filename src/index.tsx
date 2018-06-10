import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import Axios from 'axios'
import { AxiosHelper } from './utils/AxiosHelper';

Axios.defaults.baseURL = 'https://api.nasa.gov'
Axios.interceptors.request.use(
  (config) => AxiosHelper.requestInterceptor(config),
  (error) => AxiosHelper.exceptionHandler(error)
)
Axios.defaults.validateStatus = (statusNumber) => AxiosHelper.statusValidator(statusNumber)
Axios.interceptors.response.use(
  (response) => AxiosHelper.responseIntercetor(response),
  (error) => AxiosHelper.exceptionHandler(error)
)

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
