const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const memberSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        unique: true
    },
    lastName: {
        type: String,
        required: true,
        unique: true
    },
 
    phoneNum: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
   
    agree: {
        type: Boolean,
        default: false
    },
    contactType: {
        type: String,
        required: true
    },
    
    feedback: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;