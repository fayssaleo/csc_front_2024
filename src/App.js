import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginView from './views/loginView/LoginView';
import { store } from './redux/store/store';
import PrivateRoute from './routes/PrivateRoute';
import Home from './layout/Home';
import AccessDenied from './views/accessDenied/AccessDenied';


function App() {

  return (
    <>
        <BrowserRouter>
            <Switch>
            <Route exact path="/" render={props => <LoginView store={store} {...props} />} />
            <Route exact path="/accessDenied" component={AccessDenied} />
            <PrivateRoute path="/home" component={Home} />
            </Switch>
        </BrowserRouter>
    </>

  );
}

export default App;
