var RegistrationModel = require('../../../db/registrationSchema'); 

  const registration = (req, res) => {

    RegistrationModel.findOne({username:req.body.username,password : req.body.password}, 
      function(err, data) {
          if(err){
              console.log(err);
          }
          else{
              console.log(data);
              if(data == null){
                var userDetails = new RegistrationModel(
                  { username:req.body.username,
                    password : req.body.password,
                    firstName : req.body.firstName,
                    lastName : req.body.lastName}
                );
                userDetails.save(function(err, data) {
                        if(err){
                            console.log(err);
                        }
                        else{
                            console.log(data);
                            res.json({"message" : 'success'});
                        }
                    }); 
                    
              }
              else{
                  res.send({"message" : 'exists'});
              }
          }
      }); 

   
        
  };
  

  module.exports = {
    registration
  };