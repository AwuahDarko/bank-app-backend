const mongoose = require('mongoose');


const userSettingsSchema = mongoose.Schema({
    created_at: {
        type: Date,
        default: Date.now
    },
    user_id: {
        type: String,
        required: true,
    },
    allow_internal_transfer: {
        type: Boolean,
        default: false
    },
    last_login: {
        type: Date
    },
    last_changed_pin:{
        type: Date
    },
    login_from: {
        type: Array,
        default: []
    }
});

const UserSettings = mongoose.model('user_settings', userSettingsSchema)

module.exports = UserSettings;


/*
trk : { type : Array , "default" : [] }

db.update({'Searching criteria goes here'},
{
 $push : {
    trk :  {
             "lat": 50.3293714,
             "lng": 6.9389939
           } //inserted data is the object to be inserted 
  }
});
*/