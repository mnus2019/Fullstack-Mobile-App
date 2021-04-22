const mongoose = require('mongoose');
const Schema = mongoose.Schema;





const campsiteSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    elevation: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
   
    featured: {
        type: Boolean,
        default: false
    },
    
}, {
    timestamps: true
});



const Campsite = mongoose.model('Campsite', campsiteSchema);

module.exports = Campsite;