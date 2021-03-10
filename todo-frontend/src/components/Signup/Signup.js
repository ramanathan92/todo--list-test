import React, { Component } from "react";

export default class SignUp extends Component {

    
  constructor(props) {
    super(props);
    this.state = {
        error: null,
        isLoaded: false,
        sessionUserName: '',
        email: '',
        password: '',
        firstName : '',
        lastName : ''
    };
}
componentDidMount() {
    if (localStorage.getItem("sessionUserName")) {
      this.props.history.push('/dashboard');
    }
    document.getElementById("navbar-elements").style.display = "flex";
    document.getElementById("navbar-elements-log-out").style.display = "none";
  }

    submitRegistration(event){
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "username":  this.email.value,"password" : this.password.value,
              "firstName" : this.firstName.value , "lastName" : this.lastName.value})
              };
               fetch("http://localhost:4000/api/v1/registration",requestOptions)
              //fetch("https://young-peak-46457.herokuapp.com/api/v1/registration",requestOptions)
              .then(res => res.json())
              .then(
                  (res) => {
                      console.log(res);
                      if(res.message == "success"){
                        localStorage.setItem("sessionUserName",this.email.value);
                        this.props.history.push('/dashboard');
                      }
                      else{
                        alert("Email Already Exists");
                      }
                  },
                  // Note: it's important to handle errors here
                  // instead of a catch() block so that we don't swallow
                  // exceptions from actual bugs in components.
                  (error) => {
                      this.setState({
                          isLoaded: true,
                          error: error
                      });
                  }
              );

              event.preventDefault();
        }

    render() {
        return (
            <form onSubmit= {this.submitRegistration.bind(this)}>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" ref={el => this.firstName = el}  placeholder="First name" required/>
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" ref={el => this.lastName = el}   placeholder="Last name" required/>
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" ref={el => this.email = el}  placeholder="Enter email" required/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" ref={el => this.password = el}   placeholder="Enter password" required/>
                </div>

                <button type="submit" className="btn btn-primary btn-block" >Sign Up</button>
                
            </form>
        );
    }
}