const joi = require('joi')

const personDataSchema = joi.object().keys({
    first_name: joi.string().required(),
    last_name: joi.string().required()
})

module.exports = {
    personDataSchema: personDataSchema
};