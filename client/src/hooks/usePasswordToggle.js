import { useState } from "react"

const usePasswordToggle = () => {
  const [visible, setVisible] = useState(false)

  const Icon = (
    <i
      className={visible ? "bx bx-hide" : "bx bx-show"}
      onClick={() => setVisible((visible) => !visible)}
    ></i>
  )

  const InputType = visible ? "text" : "password"

  return [InputType, Icon]
}

export default usePasswordToggle
