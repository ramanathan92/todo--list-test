import styles from './Dashboard.module.css';
import React, { Component } from "react";

export default class Dashboard extends Component {

  
  constructor(props) {
    super(props);
    this.state = {
        error: null,
        isLoaded: false,
        sessionUserName: '',
        userName: '',
        password: '',
        tasks : [],
        task : "",
        subTask : ""
    };
}

  componentDidMount() {
    if (localStorage.getItem("sessionUserName") == "") {
      this.props.history.push('/sign-in');
    }
    else{
      document.getElementById("navbar-elements").style.display = "none";
      document.getElementById("navbar-elements-log-out").style.display = "block";

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "username":  localStorage.getItem("sessionUserName")})
      };

      fetch("http://localhost:4000/api/v1/tasks",requestOptions)
      //fetch("https://todo-api-myapp.herokuapp.com/api/v1/tasks",requestOptions)
      .then(res => res.json())
      .then(
          (res) => {
              console.log(res.tasks);
              if(res && res.tasks.length != 0){
                var joined = this.state.tasks.concat(res.tasks);
                this.setState({tasks : joined});
                console.log(this.state.tasks);
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

    }
  }


    addTask(){
      console.log(this.state);
      this.state.tasks.push({[this.task.value]:this.subTask.value});
      console.log(this.state.tasks);
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "username":  localStorage.getItem("sessionUserName"),"tasks" : this.state.tasks})
      };

      fetch("http://localhost:4000/api/v1/tasks/addTask",requestOptions)
      //fetch("https://todo-api-myapp.herokuapp.com/api/v1/addTask",requestOptions)
      .then(res => res.json())
      .then(
          (res) => {
              console.log(res);
              this.setState({tasks : res.tasks});
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
              this.setState({
                  tasks : [],
                  isLoaded: true,
                  error: error
              });
          }
      );

    }

    render() {

      const {tasks} = this.state;
        return (
            <div>
              <div>TASKS</div>
              <div className="task-div">
              {Object.keys(tasks).map((item,index) => (
                                        <li key={index}>
                                            {item} :  {tasks[index]}
                                        </li>
                                    ))}

              <input type="text" ref={el => this.task = el}   placeholder="Enter Task"/>
              <input type="text" ref={el => this.subTask = el}   placeholder="Enter Sub-Task"/>
              <button onClick= {this.addTask.bind(this)} className="btn btn-primary btn-block">Add</button>
              </div>
            </div>
        );
    }
}
