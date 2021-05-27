import React from "react";

import BasicForm from "./home";

import {BrowserRouter, Route, Switch} from "react-router-dom";

import "./App.css";

import { Navbar, Nav, NavDropdown, Image, 
//   Form, Button
 } from 'react-bootstrap';

 //import ReactPhone  from './phone'

class LandingPage extends React.Component{
  async componentDidMount(){
      window.gapi.load("signin2", ()=> {
      window.gapi.signin2.render('login-button')
      })
         
  }render(){
  if (this.props.isSignedIn === null) {
    return (
        <h1>  </h1>
    )
  }
  return (
    <BasicForm/>
    )
}

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
          this.state.isSignedIn?window.location.replace("/"):window.location.replace("/home")
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
        <BrowserRouter>
                <Switch>
                    <Route exact path="/"  render={() => this.ifUserSignedIn(HomePage)}/>
                    <Route path="/home"  render={() => this.ifUserSignedIn(HomePage)}/>
                    <Route path='/signup' render={() => this.ifUserSignedIn(SignUp)}/>
                </Switch>
            </BrowserRouter>
      </div>
    );
  }
}

class SignUp extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      authInstance:0,
      name:0,
      email:0,
      usn: 0,
      department: null,
      mobile_no: null,
      proctor_id: null,
      semester: 0,
      section: 0,
      batch: 0,
      role:"Student",
      img:0,
      gId:0,
      proctor:null,
      dob:null,
      respones:null,
    }
  this.post_it=this.post_it.bind(this)

  }
  componentDidMount(){
    const authInstance = window.gapi.auth2.getAuthInstance()
    const user = authInstance.currentUser.get()
    const profile = user.getBasicProfile();
    const email = profile.getEmail();
    const name = profile.getName();
    const img = profile.getImageUrl();
    const googleId = profile.getId();
    this.setState({
      authInstance: authInstance,
      name:name,
      email:email,
      img:img,
      gId:googleId,
    })
  }


  post_it(){
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        gid: this.state.gId,
        role:this.state.role,
        name:this.state.name,
        dob:this.state.dob,
        proctor:this.state.proctor,
        email:this.state.email,
        semester: this.state.semester,
        mobile_no: this.state.mobile_no,
        proctor_id: null,
        department: this.state.department,
        batch: this.state.batch,
        usn: this.state.usn,
        section:'B',

      })
  }

  fetch('http://localhost:8000/user', requestOptions).then(window.location.replace('/home'))
  }


  render(){
    return(<> 
     <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Brand href="#home">Proctor Portal</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Nav>
            <Image src = {this.state.img} alt = "" width = "40" rounded></Image>
            <NavDropdown title={this.state.email} id="collasible-nav-dropdown">
                <NavDropdown.Item href="" onClick ={this.state.authInstance.signOut} >Sign Out</NavDropdown.Item>
                <NavDropdown.Divider />
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    <div className="container emp-profile">
      <div>
        <label >Google ID:</label>
        <input type="text" id="gid" name="gid" value={this.state.gId}readOnly/><br/><br/>
        <label >Role:</label>
        <input type="text" id="role" name="role" value="Student" readOnly/><br/><br/>
        <label >Name:</label>
        <input type="text"  name="name" value={this.state.name} readOnly/><br/><br/>
        <label >Email:</label>
        <input type="text"  name="email" value= {this.state.email} readOnly/><br/><br/>
        <label >DOB:</label>
        <input type="text"  name="dob" onChange={(e) => {this.setState({dob:e.target.value})}}/><br/><br/>
        <label >Proctor:</label>
        <input type="text"  name="proctor" onChange={(e)=> {this.setState({proctor:e.target.value})}}/><br/><br/>
        <label >USN:</label>
        <input type="text"  name="usn" onChange={(e)=> {this.setState({usn:e.target.value})}}/><br/><br/>
        <label >department:</label>
        <input type="text"  name="department" onChange={(e)=> {this.setState({department:e.target.value})}}/><br/><br/>
        <label >batch:</label>
        <input type="text"  name="batch" onChange={(e)=> {this.setState({batch:e.target.value})}}/><br/><br/>
        <label >Mobile Number:</label>
        <input type="text"  name="mobile_no" onChange={(e)=> {this.setState({mobile_no:e.target.value})}}/><br/><br/>
        <label >Semster:</label>
        <input type="text"  name="semester" onChange={(e)=> {this.setState({semester:parseInt(e.target.value)})}}/><br/><br/>
        <input type="submit" onClick= {this.post_it} value="Submit"/>
      </div>
    </div>
    </>
     /* <>
       <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
         <Navbar.Brand href="#home">Proctor Portal</Navbar.Brand>
         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
         <Navbar.Collapse id="responsive-navbar-nav">
           <Nav className="mr-auto">
           </Nav>
           <Nav>
            <Image src = {this.state.img} alt = "" width = "40" rounded></Image>
           <NavDropdown title={this.state.email} id="collasible-nav-dropdown">
               <NavDropdown.Item href="" onClick ={this.state.authInstance.signOut} >Sign Out</NavDropdown.Item>
               <NavDropdown.Divider />
             </NavDropdown>
         </Nav>
         </Navbar.Collapse>
       </Navbar>
       <div className="container emp-profile">
         <Form>
           <Form.Group  md="8">
             <Form.Label>Email address</Form.Label>
             <Form.Control type="email" value={this.state.email} readOnly />
          </Form.Group>
           <Form.Group>
             <Form.Label>Name</Form.Label>
             <Form.Control type="email" value={this.state.name} readOnly />
           </Form.Group>
           <Form.Group controlId="dob">
             <Form.Label>Date of Birth</Form.Label>
             <Form.Control type="date" name="dob" placeholder="Date of Birth" />
           </Form.Group>
           <Form.Group>
             <Form.Label>Department</Form.Label>
             <Form.Control as="select">
              <option>CSE</option>
               <option>ISE</option>
               <option>MECH</option>
               <option>EC</option>
               <option>EEE</option>
               <option>Civil</option>
               <option>Aerospace</option>
               <option>Chemical</option>
             </Form.Control>
           </Form.Group>
           <Form.Group controlId="exampleForm.ControlSelect1">
             <Form.Label>Blood Group</Form.Label>
             <Form.Control as="select">
               <option>A+ve</option>
               <option>B+ve</option>
               <option>O+ve</option>
               <option>AB+ve</option>
               <option>A-ve</option>
               <option>B-ve</option>
               <option>O-ve</option>
               <option>AB-ve</option>
             </Form.Control>
           </Form.Group>
           <Form.Group>
             <ReactPhone/>
           </Form.Group>
           <Button variant="primary" type="submit">
             Submit
           </Button>

         </Form>
      </div>

       </> 
    </>)*/)
  }
}



class HomePage extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      authInstance:0,
      name:false,
      email:0,
      img:0,
      gId:10000,
      data:0,
      status: true
    }
  }
  async componentDidMount(){
  const authInstance = window.gapi.auth2.getAuthInstance()
  const user = authInstance.currentUser.get()
  const profile = user.getBasicProfile();
  const email = profile.getEmail();
  const name = profile.getName();
  const img = profile.getImageUrl();
  const googleId = profile.getId();
  await fetch(`user/${googleId}`).then(res => res.json().then(value => {
    console.log(value)
    this.setState({
      authInstance: authInstance,
      name:name,
      email:email,
      img:img,
      gId:googleId,
      proctor:value.p_name,
      dob: value.dob,
      data:value,
      status: value.message==="Not found user"?false:true
    })
  }))
  }

  what_to_do(Component){
    if (this.state.status)
      return (
        Component
      )
      else
      return (<>
        <h1> </h1>
        {window.location.replace('/signup')}
      </>)
  }

  render(){
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Brand href="#home">Proctor Portal</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
          </Nav>
          <Nav>
            <Image src = {this.state.img} alt = "" width = "40" rounded></Image>
          <NavDropdown title={this.state.email} id="collasible-nav-dropdown">
              <NavDropdown.Item href="" onClick ={this.state.authInstance.signOut} >Sign Out</NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
        </Nav>
        </Navbar.Collapse>
      </Navbar>
      {this.what_to_do(<>
      <div className="container emp-profile">
            <form method="post">
                <div className="row">
                    <div className="col-md-4">
                        <div className="profile-img">
                            <Image src={this.state.img} alt="" width = "2" className ="image-rounded"/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="profile-head">
                                    <h5>
                                       {this.state.name} {this.state.data.department}-{this.state.data.batch}
                                    </h5>
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Basic Profile</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <input type="submit"  onClick = {this.state.authInstance.signOut} className="profile-edit-btn" name="btnAddMore" value="Sign Out"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="profile-work">
                            <p>Proctor</p>
                            <a href="/">{this.state.proctor}</a><br/>
                            <a href="/">{this.state.data.p_email}</a><br/>
                            <a href="/">{this.state.data.p_mobile_no}</a>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="tab-content profile-tab" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>User Google Id</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{this.state.gId}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Name</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{this.state.name}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Email</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{this.state.email}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Date of birth</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{this.state.dob}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Semester</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>4</p>
                                            </div>
                                        </div>
                            </div>
                        </div>
                </div>
                </div>
            </form>           
        </div>
      </>)}
    </>
      );
}
}


export default App;
