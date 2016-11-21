const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
//Running the mongo db: docker run --name react-auth-mongo --rm -p 27017:27017 -v $(pwd)/mongo-data:/data/db mongo

//Define the user model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

//On save hook, encrypt password

userSchema.pre('save', function(next){
  const user = this;
  bcrypt.genSalt(10, function(err, salt){
    if( err ) { return next(err); }
    bcrypt.hash(user.password, salt, null, function(err,hash){
      if( err ) { return next(err); }

      user.password = hash;

      //go ahead and save the model
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if(err) { return callback(err) }

    callback(null, isMatch);

  });
}


//Create model class
//user collection
const ModelClass = mongoose.model('user', userSchema);

//Export the model
module.exports = ModelClass;

