require("dotenv").config()
require("./config/database").connectDB()
const express = require("express")
const app = express()
const cors = require("cors")

//Import Routes
const routes = require("./routes")

//Middleware
app.use(express.json())
app.use(cors())
app.use(routes)

//Listen
const PORT = 5000
app.listen(PORT, () => console.log(`Server started on post ${PORT}`))
