import React, { useEffect } from "react";
import Quora from "./components/Quora/index";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import { logout, selectUser, login } from "./features/userSlice";
import Login from "./components/auth/Login";
import { auth } from "./firebase";
import {Redirect, Route, Switch} from 'react-router-dom'
import QuestionDetail from "./components/QuestionDetail";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photoUrl: authUser.photoURL,
            displayName: authUser.displayName,
            email: authUser.email,
          })
        );
        // console.log(authUser)
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (<div className="App">
    <Switch>
      <Route path='/login'>
          {!user ?<Login/> :<Redirect to='/' />}
      </Route>
      <Route path='/' exact>
      {user ?<Quora/> :<Redirect to='/login' />}
      </Route>
      <Route path='/:Id'>
        <QuestionDetail/>
      </Route>
    </Switch>

    </div>);
}

export default App;
