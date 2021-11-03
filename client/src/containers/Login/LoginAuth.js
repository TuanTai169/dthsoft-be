import { connect } from "react-redux"
import Login from "./Login"
import { login } from "../../redux/actions/authAction"

const mapActionsLayout = { login }

export default connect(null, mapActionsLayout)(Login)
