const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const profileSchema = new mongoose.Schema({
    profileimg: {
        type: String,
        default: '',
    },
    timeCreated: {
        type: Date,
        default: () => Date.now(),
    }
});

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        username: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true
        },

        website: {
            type: String,
        },

        phone: {
            type: String,
        },

        password: {
            type: String,
            min: 6,
            max: 30
        },

        bio: {
            type: String,
            min: 0,
            max: 50
        },

        gender: {
            type: String,
        },

        created: {
            type: Date,
            required: true,
            default: Date.now
        },
        profile: {
            type: profileSchema
        }
    });
    

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', userSchema);