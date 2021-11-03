import * as types from "../constants/themeConstant"

const setMode = (mode) => {
  return {
    type: types.SET_MODE,
    payload: mode,
  }
}

const setColor = (color) => {
  return {
    type: types.SET_COLOR,
    payload: color,
  }
}

const getTheme = () => {
  return {
    type: types.GET_THEME,
  }
}

const exportDefault = {
  setColor,
  setMode,
  getTheme,
}

export default exportDefault
