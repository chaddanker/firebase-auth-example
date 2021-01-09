import Signup from './Signup';
import Dashboard from './Dashboard';
import Login from './Login';
import { IonApp, IonContent } from '@ionic/react';
import { AuthProvider } from '../contexts/AuthContext'; 
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import ForgotPassword from './ForgotPassword';
import UpdateProfile from './UpdateProfile';

function App() {
  return (
    <AuthProvider>
      <IonApp>
        <IonContent>
          <Router>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard}/>
              <PrivateRoute path="/update-profile" component={UpdateProfile}/>
              <Route path="/login" component={Login}/>  
              <Route path="/signup" component={Signup}/>  
              <Route path="/forgot-password" component={ForgotPassword}/> 
            </Switch>
          </Router>
        </IonContent>
      </IonApp>
    </AuthProvider>
  );
}

export default App;
