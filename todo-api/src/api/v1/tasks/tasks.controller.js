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

      TaskModel.findOne({username:req.body.username}, 
        function(err, data) {
            if(err){
                console.log(err);
            }
            if (data == null || data == "null"){
                taskDetails.save(function(err, data) {
                          if(err){
                              console.log(err);
                          }
                          else{
                              console.log(data);
                              res.json(data);
                          }
                      }); 
            }
            else{
                data.tasks = req.body.tasks;
                data.save();
                console.log(data);
                res.send(data);
            }
        });         
  };
  

  module.exports = {
    task,
    addTask
  };