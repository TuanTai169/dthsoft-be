const router = require("express").Router()
const { checkManager } = require("../../middleware/authentication")
const verifyToken = require("../../middleware/authorization")
const Service = require("../../models/Service")

// @route POST api/service/
// @decs CREATE service
// @access Private
router.post("/", verifyToken, checkManager, async (req, res) => {
  const { name, price } = req.body

  //Validation
  if (!name || !price)
    return res.status(400).json({
      success: false,
      message: "Name and price of service are required",
    })
  try {
    //Check for existing service
    const serviceExist = await Service.findOne({ name, isActive: true })
    if (serviceExist)
      return res.status(400).json({
        success: false,
        message: "Service already taken",
      })
    //All good
    const newService = new Service({
      name,
      price,
      createBy: req.userId,
      updateBy: null,
    })

    await newService.save()
    res.json({
      success: true,
      message: "Service created successfully",
      service: newService,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
})

// @route GET api/service/
// @decs READ ALL service
// @access Private
router.get("/", verifyToken, async (req, res) => {
  try {
    const services = await Service.find({ isActive: true })
      .populate({ path: "createBy", select: "name" })
      .populate({ path: "updateBy", select: "name" })
    res.json({
      success: true,
      services,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
})

// @route GET api/service/:id
// @decs READ 1 service
// @access Private
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)
      .populate({ path: "createBy", select: "name" })
      .populate({ path: "updateBy", select: "name" })
    if (!service)
      res.json({
        success: false,
        message: "Service not found",
      })
    res.json({
      success: true,
      service,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
})

// @route PUT api/service/
// @decs UPDATE service
// @access Private
router.put("/update/:id", verifyToken, checkManager, async (req, res) => {
  const { name, price, isActive } = req.body

  //Validation
  if (!name || !price)
    return res.status(400).json({
      success: false,
      message: "Name and price of service are required",
    })

  try {
    //All good
    let updateService = {
      name: name,
      price: price,
      isActive: isActive,
      updateBy: req.userId,
    }
    const serviceUpdatedCondition = { _id: req.params.id }

    updatedService = await Service.findOneAndUpdate(
      serviceUpdatedCondition,
      updateService,
      {
        new: true,
      }
    )
    res.json({
      success: true,
      message: "Service updated successfully",
      updatedService,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
})

// @route PUT api/service/
// @decs DELETE service
// @access Private
router.put(`/delete/:id`, verifyToken, checkManager, async (req, res) => {
  try {
    const serviceDeleteCondition = { _id: req.params.id }
    const deleted = { isActive: false, updateBy: req.userId }
    let deletedService = await Service.findOneAndUpdate(
      serviceDeleteCondition,
      deleted,
      {
        new: true,
      }
    )
    res.json({
      success: true,
      message: "Service deleted successfully",
      deletedService,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
})
module.exports = router
