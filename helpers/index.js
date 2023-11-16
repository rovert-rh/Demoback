

const dbvalidator = require('./db-validators')
const jwt = require('./jwt')
const uploadFiles = require('./uploadFile')

module.exports = {
    ...dbvalidator,
    ...jwt,
    ...uploadFiles
}