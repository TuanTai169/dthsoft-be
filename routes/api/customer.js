const router = require("express").Router()
const verifyToken = require("../../middleware/authorization")
const Customer = require("../../models/Customer")
const { customerValidation } = require("../../tools/validation")

// @route POST api/customer/
// @decs CREATE customer
// @access Private
router.post("/", verifyToken, async (req, res) => {
  const { name, email, phone, cmnd, address, gender, birthDate, note } =
    req.body

  //Validation
  const { error } = customerValidation({ name, email, phone, cmnd })
  if (error)
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    })
  try {
    //Check for existing email
    const emailExist = await Customer.findOne({ email })
    if (emailExist)
      return res.status(400).json({
        success: false,
        message: "Email already taken",
      })

    //Check for existing Id number
    const cmndExist = await Customer.findOne({ cmnd, isActive: true })
    if (cmndExist)
      return res.status(400).json({
        success: false,
        message: "Id Number already taken",
      })

    //All good
    const newCustomer = new Customer({
      name,
      email,
      phone,
      cmnd,
      address: address || "",
      gender: gender || "male",
      birthDate: birthDate || "",
      note: note || "",
      createBy: req.userId,
      updateBy: null,
    })
    await newCustomer.save()

    res.json({
      success: true,
      message: "Customer created successfully",
      customer: newCustomer,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
})

// @route GET api/customer/
// @decs READ ALL customer
// @access Private
router.get("/", verifyToken, async (req, res) => {
  try {
    const customers = await Customer.find({ isActive: true })
      .populate({ path: "createBy", select: "name" })
      .populate({ path: "updateBy", select: "name" })
    res.json({
      success: true,
      customers,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
})

// @route GET api/customer/
// @decs READ 1 customer
// @access Private
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id)
      .populate({ path: "createBy", select: "name" })
      .populate({ path: "updateBy", select: "name" })
    if (!customer)
      res.status(400).json({
        success: false,
        message: "Customer not found",
      })
    res.json({
      success: true,
      customer,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
})

// @route PUT api/customer/
// @decs UPDATE customer
// @access Private
router.put("/update/:id", verifyToken, async (req, res) => {
  const { name, email, phone, address, cmnd, gender, birthDate, note } =
    req.body
  const cusId = req.params.id
  //Validation
  const { error } = customerValidation({ name, email, phone, cmnd })
  if (error)
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    })
  try {
    //All good
    let updateCustomer = {
      name: name,
      email: email,
      phone: phone,
      address: address || "",
      cmnd: cmnd || "",
      gender: gender || "male",
      birthDate: birthDate || "",
      note: note || "",
      updateBy: req.userId,
    }

    const cusUpdatedCondition = { _id: cusId }

    updatedCustomer = await Customer.findOneAndUpdate(
      cusUpdatedCondition,
      updateCustomer,
      { new: true }
    )
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      updatedCustomer,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
})

// @route PUT api/customer/
// @decs DELETE customer
// @access Private
router.put(`/delete/:id`, verifyToken, async (req, res) => {
  try {
    const customerDeleteCondition = { _id: req.params.id }
    const deleted = { isActive: false, updateBy: req.userId }
    let deletedCus = await Customer.findOneAndUpdate(
      customerDeleteCondition,
      deleted,
      {
        new: true,
      }
    )
    res.status(200).json({
      success: true,
      message: "Customer deleted successfully",
      deletedCus,
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
