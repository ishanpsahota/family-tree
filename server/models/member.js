const mongoose = require('mongoose')

const bcrypt = require('bcrypt-nodejs');

SALT_WORK_FACTOR = 7;

const memberSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true
    },

    email: {
        type: String,
        trim: true,
        unique: true
    },

    password:
    {
        type: String,
        trim: true,
    },

    // username: {
    //     type: String,
    //     trim: true,
    //     unique: true
    // },

    gender: {
        type: String
    },

    relationships: [{
        name: String,
        with: mongoose.Types.ObjectId,
        treeId: mongoose.Types.ObjectId
    }],
    
    dateOfBirth: {
        type: Date
    },

    trees: [{
        name: String,
        treeId: mongoose.Types.ObjectId,
        owner: Boolean
    }]

});

memberSchema.statics.authenticate = function (email, password, callback) {
    var member = this;

    member.findOne({ 'email': email })
      .exec(function (err, member) {
        if (err) {
          return callback(err)
        } else if (!member) {
          var err = new Error('member not found.');
          err.status = 401;
          return callback(err);
        }
        bcrypt.compare(password, member.password, function (err, result) {
          if (result === true) {
            return callback(null, member);
          } else {
            return callback(err);
          }
        })
      });
  }

memberSchema.pre('save', function(next){
    var member = this;

    if(!member.isModified('password'))
        return next();
    
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt)
    {
        if(err) return next(err);
            
        bcrypt.hash(member.password, salt, null, function(err, hash)
        {
            if(err) return next(err);

            member.password = hash;
            next();
        });
    });

    next();
});

module.exports = mongoose.model('member', memberSchema);
  