const Entry = require('../models/entry.model.js');
const mongoose = require('mongoose');
// Create and Save a new Entry
exports.create = (req, res) => {
    // Validate request
    if(!req.body.blocks) {
        return res.status(400).send({
            message: "Entry blocks can not be empty"
        });
    }

    // Create a Entry
    const entry = new Entry({
        blocks: req.body.blocks || "Incomplete blocks",
        events: req.body.events || "Incomplete events",
        lists: req.body.lists || "Incomplete events",
        tasks: req.body.tasks || "Incomplete tasks",
        users: req.body.users || "Incomplete users"
    });

    // Save Entry in the database
    entry.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Entry."
        });
    });
};

// Retrieve and return all entries from the database.
exports.findAll = (req, res) => {
    Entry.find()
    .then(entries => {
        res.send(entries);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving entries."
        });
    });
};

// Find a single entry with a entryId
exports.findOne = (req, res) => {
    Entry.findById(req.params.entryId)
    .then(entry => {
        if(!entry) {
            return res.status(404).send({
                message: "Entry not found with id " + req.params.entryId
            });
        }
        res.send(entry);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Entry not found with id " + req.params.entryId
            });
        }
        return res.status(500).send({
            message: "Error retrieving entry with id " + req.params.entryId
        });
    });
};

// Update a entry identified by the entryId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.blocks) {
        return res.status(400).send({
            message: "Entry blocks can not be empty"
        });
    }
    mongoose.set('useFindAndModify', false);
    // Find entry and update it with the request body
    Entry.findByIdAndUpdate(req.params.entryId, {
      blocks: req.body.blocks || "Incomplete blocks",
      events: req.body.events || "Incomplete events",
      lists: req.body.lists || "Incomplete events",
      tasks: req.body.tasks || "Incomplete tasks",
      users: req.body.users || "Incomplete users"
    }, {new: true})
    .then(entry => {
        if(!entry) {
            return res.status(404).send({
                message: "Entry not found with id " + req.params.entryId
            });
        }
        res.send(entry);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Entry not found with id " + req.params.entryId
            });
        }
        return res.status(500).send({
            message: "Error updating entry with id " + req.params.entryId
        });
    });
};

// Delete a entry with the specified entryId in the request
exports.delete = (req, res) => {
    Entry.findByIdAndRemove(req.params.entryId)
    .then(entry => {
        if(!entry) {
            return res.status(404).send({
                message: "Entry not found with id " + req.params.entryId
            });
        }
        res.send({message: "Entry deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Entry not found with id " + req.params.entryId
            });
        }
        return res.status(500).send({
            message: "Could not delete entry with id " + req.params.entryId
        });
    });
};
