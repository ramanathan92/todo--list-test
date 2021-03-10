//var LoginModel = require('../../../db/loginSchema'); 

var RegistrationModel = require('../../../db/registrationSchema'); 
const login = (req, res) => {
    RegistrationModel.findOne({username:req.body.username,password : req.body.password}, 
        function(err, data) {
            if(err){
                console.log(err);
            }
            else{
                console.log(data);
                if(data == null){
                    res.send({"message" : 'failed'});
                }
                else{
                    res.send({"message" : 'success'});
                }
            }
        }); 
        
  };
  
  
  

  module.exports = {
    login
  };