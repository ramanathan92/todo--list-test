
import React, { Component } from "react";
import './Dashboard.css';

export default class Dashboard extends Component {

  
  constructor(props) {
    super(props);
    this.state = {
        error: null,
        isLoaded: false,
        sessionUserName: '',
        userName: '',
        password: '',
        result : {
          username : "",
          tasks : []
        },
        task : "",
        subTask : ""
    };
    this.onInputchange = this.onInputchange.bind(this);
    this.onExistingInputchange = this.onExistingInputchange.bind(this);
    //this.onExistingSubtaskInputchange = this.onExistingSubtaskInputchange.bind(this,key);
}

onInputchange(event) {
  this.setState({
    [event.target.name]: event.target.value
  });
}
onExistingSubtaskInputchange(event,key) {
  this.state.result.tasks[event.target.name][key] = event.target.value;
  this.setState({result : this.state.result});
}
onExistingInputchange(event,key) {
  if(key != "" && event.target.value != "" ){
    this.state.result.tasks[event.target.name][event.target.value] = this.state.result.tasks[event.target.name][key];
    delete this.state.result.tasks[event.target.name][key];
    this.setState({result : this.state.result});
  }
  else{
    alert("Task should not be empty");
  }
  
  //this.state.result.tasks[event.target.name]
}

  componentDidMount() {
    if (localStorage.getItem("sessionUserName") == "") {
      this.props.history.push('/sign-in');
    }
    else{
      document.getElementById("navbar-elements").style.display = "none";
      document.getElementById("navbar-elements-log-out").style.display = "flex";

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "username":  localStorage.getItem("sessionUserName")})
      };

      fetch("http://localhost:4000/api/v1/tasks",requestOptions)
      //fetch("https://todo-api-myapp.herokuapp.com/api/v1/tasks",requestOptions)
      .then(res => res.json())
      .then(
          (result) => {
              console.log(result);
              if(result && result.tasks.length != 0){
                this.setState({result : result});
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

  deleteTask(event,key,value,param){
  if(param == "subtask"){
    this.state.result.tasks[value][key] = "";
  }
  else{
    this.state.result.tasks.splice(value,1);
  }
  this.setState({result : this.state.result});
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "username":  localStorage.getItem("sessionUserName"),"tasks" : this.state.result.tasks})
    };

    fetch("http://localhost:4000/api/v1/tasks/addTask",requestOptions)
    //fetch("https://todo-api-myapp.herokuapp.com/api/v1/addTask",requestOptions)
    .then(res => res.json())
    .then(
        (res) => {
            console.log(res);
            this.setState({tasks : res.tasks});
            alert("Deleted Successfully");

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

  updateTask(){
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "username":  localStorage.getItem("sessionUserName"),"tasks" : this.state.result.tasks})
    };

    fetch("http://localhost:4000/api/v1/tasks/addTask",requestOptions)
    //fetch("https://todo-api-myapp.herokuapp.com/api/v1/addTask",requestOptions)
    .then(res => res.json())
    .then(
        (res) => {
            console.log(res);
            this.setState({tasks : res.tasks});
            alert("Update Successfully");

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

    addTask(){
      if(this.state.task != ""){
        this.state.result.tasks.push({[this.state.task]:this.state.subTask});
        const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "username":  localStorage.getItem("sessionUserName"),"tasks" : this.state.result.tasks})
        };

      fetch("http://localhost:4000/api/v1/tasks/addTask",requestOptions)
      //fetch("https://todo-api-myapp.herokuapp.com/api/v1/addTask",requestOptions)
      .then(res => res.json())
      .then(
          (res) => {
              console.log(res);
              this.setState({tasks : res.tasks});
              this.setState({task : ""});
              this.setState({subTask : ""});
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
      else{
        alert("Task cannot be empty");
      }
      

    }

    render() {

      const {result} = this.state;
        return (
          <div>
          <div className="task-title">TASKS</div>
            <div class="alltask-div">
              
              <div className="task-div">
              {result.tasks.map((key,index) => (
                                        <div key={index}>
                                           <b>Task :</b> <input className="task-input" name={index} type="text" onChange={(e) =>  this.onExistingInputchange(e,Object.keys(key)[0])} value={Object.keys(key)} />
                                           <button onClick= {this.updateTask.bind(this)} className="btn btn-info delete-btn">Update</button>
                                           <button onClick= {(e) =>  this.deleteTask(e,Object.keys(key)[0],index,"task")} className="btn btn-danger delete-btn">Delete</button>
                                           <br></br>
                                            Sub-task : <input className="subtask-input" name={index} type="text" onChange={(e) =>  this.onExistingSubtaskInputchange(e,Object.keys(key)[0])} value={key[Object.keys(key)]} />
                                            <button onClick= {this.updateTask.bind(this)} className="btn btn-info delete-btn">Update</button>
                                            <button onClick= {(e) =>  this.deleteTask(e,Object.keys(key)[0],index,"subtask")} disabled = {(key[Object.keys(key)] == "")? "disabled" : ""}  className="btn btn-danger delete-btn">Delete</button>
                                        </div>
                                    ))}

              </div>
            </div>
            <div className="new-task-div">

            <input type="text" className="new-task-input" name="task" value={this.state.task} onChange={this.onInputchange} placeholder="Enter Task"/>
              <input type="text" className="new-sub-task-input" name="subTask" value={this.state.subTask} onChange={this.onInputchange}  placeholder="Enter Sub-Task"/>
              <button onClick= {this.addTask.bind(this)} className="btn btn-primary btn-block">Add</button>
              

            </div>
            
            </div>
        );
    }
}
