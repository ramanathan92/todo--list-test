import React, { Component } from "react";

export default class Login extends Component {

  
  constructor(props) {
    super(props);
    this.state = {
        error: null,
        isLoaded: false,
        sessionUserName: '',
        email: '',
        password: '',
    };
}

  componentDidMount() {
    if (localStorage.getItem("sessionUserName")) {
      this.props.history.push('/dashboard');
    }
    
  }


  submitLogin(event){
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "username":  this.email.value,"password" : this.password.value})
    };
    fetch("http://localhost:4000/api/v1/login",requestOptions)
    //fetch("https://todo-api-myapp.herokuapp.com/api/v1/login",requestOptions)
    .then(res => res.json())
    .then(
        (res) => {
          console.log(res);
            if(res.message == "success"){
              localStorage.setItem("sessionUserName",this.email.value);
              this.props.history.push('/dashboard');
            }
            else{
              alert("Invalid Crendentials");
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
            <form onSubmit= {this.submitLogin.bind(this)}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" ref={el => this.email = el} placeholder="Enter email" required/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" ref={el => this.password = el} placeholder="Enter password" required/>
                </div>


                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                
            </form>
        );
    }
}