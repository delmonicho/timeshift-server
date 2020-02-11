module.exports = (app) => {
    const entries = require('../controllers/entry.controller.js');

    // Create a new entrie
    app.post('/entries', entries.create);

    // Retrieve all entries
    app.get('/entries', entries.findAll);

    // Retrieve a single entrie with entryId
    app.get('/entries/:entryId', entries.findOne);

    // Update a entrie with entryId
    app.put('/entries/:entryId', entries.update);

    // Delete a entrie with entryId
    app.delete('/entries/:entryId', entries.delete);
}
