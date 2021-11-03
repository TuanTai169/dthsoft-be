import { bindActionCreators } from "redux"

import * as service from "./service"
export default function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...service }, dispatch)
}
