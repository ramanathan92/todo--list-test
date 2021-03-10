var mongoose = require('mongoose'); 
  
var RegistrationSchema = new mongoose.Schema({ 
    username :String, 
    password :String,
    firstName : String,
    lastName : String
}); 
  
module.exports = mongoose.model( 
    'registration', RegistrationSchema, 'Registration'); 