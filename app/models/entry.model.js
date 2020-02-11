const mongoose = require('mongoose');

//TO DO: implement event block structure
const EntrySchema = mongoose.Schema({
    blocks: {lt_id: String, title: String, start: String, end: String, uids: String},
    events: {title: String, start: String, end: String, id: String, uids: String, lists: Array, recurring: String},
    lists: {name: String, color: String, tasks: Array, list_id: String, shared_users: Array, user_id: String},
    tasks: {name: String, due: { date: String, time: String }, est: Number, alg: Number, aid: String, uids: String, lists: Array, recurring: String},
    users: {first_name: String, last_name: String, email: String, uid: String, listPositions: Array}
}, {
    timestamps: true
});

module.exports = mongoose.model('Entry', EntrySchema);
