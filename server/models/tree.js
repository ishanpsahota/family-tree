
const mongoose = require('mongoose')

const treeSchema = new mongoose.Schema({

    name: {
        type: String
    },

    randomId: {
        type: String
    },

    ownerId: {
        type: mongoose.Types.ObjectId
    },

    members: [{
        memberId: mongoose.Types.ObjectId,
        relWithOwner: String,
        parentId: mongoose.Types.ObjectId
    }]

})

module.exports = mongoose.model('tree', treeSchema)