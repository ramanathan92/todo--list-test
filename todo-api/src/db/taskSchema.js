var mongoose = require('mongoose'); 
  
var TaskSchema = new mongoose.Schema({ 
    username :String, 
    tasks :Array,
}); 
  
module.exports = mongoose.model( 
    'task', TaskSchema, 'Tasks'); 