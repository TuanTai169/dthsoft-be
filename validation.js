// VALIDATION
const Joi = require("@hapi/joi")

//Create User Validation
const userValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(10).required().email(),
    password: Joi.string().min(8).required(),
    phone: Joi.string().min(10),
    address: Joi.string(),
    image: Joi.string(),
    roles: Joi.string(),
  })
  return schema.validate(data)
}

//Create Customer Validation
const customerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(10).required().email(),
    phone: Joi.string().min(10).required(),
    cmnd: Joi.string(),
    address: Joi.string().min(10),
    gender: Joi.string(),
    birthDate: Joi.date(),
    note: Joi.string(),
  })
  return schema.validate(data)
}
//Create Room Validation
const roomValidation = (data) => {
  const schema = Joi.object({
    roomNumber: Joi.string().required().min(3),
    floor: Joi.number().required(),
    price: Joi.number().required(),
    roomType: Joi.string(),
    status: Joi.string(),
    isActive: Joi.boolean(),
  })
  return schema.validate(data)
}

module.exports.userValidation = userValidation
module.exports.customerValidation = customerValidation
module.exports.roomValidation = roomValidation
