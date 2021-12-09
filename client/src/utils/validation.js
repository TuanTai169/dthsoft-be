import { toast } from "react-toastify"
import _ from "lodash"

export const phoneValidation = (phone) => {
  if (phone.length !== 10) {
    toast.error("Please enter valid phone number.")
    return false
  }
  var pattern = new RegExp(/(0[3|5|7|8|9])+([0-9]{8})\b/g)
  if (!pattern.test(phone)) {
    toast.error("Please enter valid phone number.")
    return false
  }
  return true
}

export const IdNumberValidation = (IDNumber) => {
  if (IDNumber.length !== 12) {
    toast.error("Please enter valid ID number.")
    return false
  }
  var pattern = new RegExp(/([0-9]{12})\b/g)
  if (!pattern.test(IDNumber)) {
    toast.error("Please enter valid phone number.")
    return false
  }
  return true
}
export const emailValidation = (email) => {
  var pattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  )
  if (!pattern.test(email)) {
    toast.error("Please enter valid email.")
    return false
  }
  return true
}
export const nameValidation = (name) => {
  var pattern = new RegExp(/^[A-Za-z0-9 ]+$/)
  if (!pattern.test(name)) {
    toast.error("Please enter valid name")
    return false
  }
  return true
}

export const textValidation = (input) => {
  var pattern = new RegExp(/^([a-zA-z0-9/\\''(),-\s]{2,255})$/)
  if (!pattern.test(input)) {
    toast.error("Please enter valid input ")
    return false
  }
  return true
}

export const numberValidation = (number) => {
  var pattern = new RegExp(/^[0-9]+$/)
  if (!pattern.test(number)) {
    toast.error("Please enter valid number ")
    return false
  }
  return true
}
export const passwordValidation = (password) => {
  var pattern = new RegExp(
    /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
  )
  if (!pattern.test(password)) {
    toast.error(
      "Password containing at least 8 characters, 1 number, 1 special character, 1 lowercase (a-z) and 1 uppercase (A-Z)"
    )
    return false
  }
  return true
}

export const matchPasswordValidation = (password, confirmPassword) => {
  if (_.isEqual(password, confirmPassword) === false) {
    toast.error("Password did not match")
    return false
  }

  return true
}
