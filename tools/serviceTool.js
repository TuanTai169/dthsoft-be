const _ = require("lodash")
const Service = require("../models/Service")

exports.calculateServiceCharge = async (services) => {
  const listService = await getAllInfoService(services)

  return _.sumBy(listService, (item) => {
    let quantity = 0
    for (const element of services) {
      if (element._id === item._id.toString()) quantity = element.quantity
    }
    return item.price * quantity
  })
}

const getAllInfoService = async (services) => {
  const promise = services.map((service) => {
    return Service.findById({ _id: service._id })
  })
  return await Promise.all(promise)
}
