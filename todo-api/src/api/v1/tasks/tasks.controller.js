//var LoginModel = require('../../../db/loginSchema'); 

var TaskModel = require('../../../db/taskSchema'); 
const task = (req, res) => {
    TaskModel.findOne({username:req.body.username}, 
        function(err, data) {
            if(err){
                console.log(err);
            }
            else{
                console.log(data);
                    res.send(data);
            }
        }); 
        
  };
  
  
  const addTask = (req, res) => {
    var taskDetails = new TaskModel(
        { username:req.body.username,
          tasks : req.body.tasks}
      );

      taskDetails.save(function(err, data) {
            if(err){
                console.log(err);
            }
            else{
                    res.send({"message" : 'success'});
            }
        }); 
        
  };
  

  module.exports = {
    task,
    addTask
  };