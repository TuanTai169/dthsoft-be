import React, { useRef, useEffect } from "react"
import { useDispatch } from "react-redux"
import { checkOut } from "../../redux/actions/receiptAction"

const Paypal = (props) => {
  const paypal = useRef()
  const { receipt, closeAllModal } = props
  const dispatch = useDispatch()

  const value = parseInt(receipt.paidOut)

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Payment",
                amount: {
                  currency_code: "USD",
                  value: value,
                },
              },
            ],
          })
        },
        onApprove: async (data, actions) => {
          await actions.order.capture()
          closeAllModal()
          dispatch(checkOut({ ...receipt, paidOut: value }))
        },
        onError: (err) => {
          console.log(err)
        },
      })
      .render(paypal.current)
  }, [closeAllModal, dispatch, receipt, value])

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  )
}

export default Paypal
