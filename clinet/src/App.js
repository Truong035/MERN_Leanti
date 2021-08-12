
import './App.css';
import 'react-bootstrap'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Landing from './component/Layout/Langding';
import Auth from './view/Auth';
 import AuthContextProvider from './contents/AuthContext'
 import Dashboard from './view/Dashboard'
 import ProtectedRoute from './routing/ProtectedRoute';
import PostContextProvider from './contents/PostContext';
function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
      <Router>
      <Switch>
        <Route exact path='/' component={Landing}></Route>
        <Route exact path='/login'  render={props=><Auth {...props} authRoute='login'/>}></Route>
        <Route exact path='/register'  render={props=><Auth {...props} authRoute='register'/>}></Route>

      <ProtectedRoute exact path='/dashboard' component={Dashboard}></ProtectedRoute>
      </Switch>
    </Router>
      </PostContextProvider>

  </AuthContextProvider>
 
  )
}

export default App;
