import { createBrowserHistory } from 'history';

export function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    handleError(response);
  }
  function handleError(response) {
    let history = createBrowserHistory();
    if(response.status === 401) {
      history.push('/')
    }
    else if(response.status === 403) {
      history.push('/accessDenied')
      return
    }
    else {
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    }

  }
  
  