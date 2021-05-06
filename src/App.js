import React from "react";

import BasicForm from "./home";

import {BrowserRouter, Route, Switch} from "react-router-dom";
import "./App.css";


class LandingPage extends React.Component{
  componentDidMount(){
      window.gapi.load("signin2", ()=> {
      window.gapi.signin2.render('login-button')
      })  
  }render(){
  if (this.props.isSignedIn === null) {
    return (
        <h1>Checking if you're signed in...</h1>
    )
  }
  
  return (
    <BasicForm/>
    )
}

}
const HomePage = () => {
  const authInstance = window.gapi.auth2.getAuthInstance()
  const user = authInstance.currentUser.get()
  const profile = user.getBasicProfile();
  const email = profile.getEmail();
  const img = profile.getImageUrl();

  return (
    <>
    <nav>
      <div>Proctor Portal</div>
      <div>{email}</div>
      <img src={img} id="image" alt = ""></img>
      <button onClick={authInstance.signOut} >Sign out!</button>
    </nav>
    <div>
    </div>
    </>
  );
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: null,
    };
  }
  initializeGoogleSignIn() {
    window.gapi.load('auth2', () => {
      window.gapi.auth2.init({
        client_id: '365387672860-0nufnftmst8vqpp4l2rlreje9jch3m3c.apps.googleusercontent.com'
      }).then(() => {
        const authInstance =  window.gapi.auth2.getAuthInstance()
        const isSignedIn = authInstance.isSignedIn.get()
        this.setState({isSignedIn})
        authInstance.isSignedIn.listen(isSignedIn => {
          this.setState({isSignedIn})
        })
      })
    })
  }
  componentDidMount() {
    const script = document.createElement('script')
    script.src = 'https://apis.google.com/js/platform.js'
    script.onload = () => this.initializeGoogleSignIn()
    document.body.appendChild(script)
  }

  ifUserSignedIn(Component) {
    if(this.state.isSignedIn === null){
      return <h1>Checking if you are signed in...</h1>
    }
    return this.state.isSignedIn ?
        <Component/> :
        <LandingPage/>
}
  render() {
    return (
      <div>
        <p>Hello!</p>
        <BrowserRouter>
                <Switch>
                    <Route exact path="/"  render={() => this.ifUserSignedIn(HomePage)}>
                    </Route>
                    <Route path="/home"  render={() => this.ifUserSignedIn(HomePage)}/>
                </Switch>
            </BrowserRouter>
      </div>
    );
  }
}
export default App;
