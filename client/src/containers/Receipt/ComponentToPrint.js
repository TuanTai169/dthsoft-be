import React from "react"
import { Col, Form, Row, Table } from "react-bootstrap"
import { useSelector } from "react-redux"
import { convertStringToDate } from "../../utils/convertDateTime"

export const ComponentToPrint = React.forwardRef((props, ref) => {
  const { receipt } = props
  const cashier = useSelector((state) => state.auth.user.name)

  const content = receipt.booking.services.map((services) => (
    <Row key={services._id}>
      <Col sm={10}>
        {" "}
        <strong>{services.name}: </strong>
      </Col>
      <Col>
        {" "}
        <strong>{services.price}</strong>
      </Col>
    </Row>
  ))

  //Render Table
  const tableHead = ["Number", "Price(USD)", "CheckIn", "CheckOut"]
  const renderHead = tableHead.map((item, index) => {
    return (
      <th
        key={index}
        style={{ fontWeight: 500, textAlign: "center", paddingRight: "10px" }}
      >
        {item}
      </th>
    )
  })

  //Room
  const roomContent = receipt.booking.rooms.map((rooms) => (
    <tr key={rooms._id}>
      <td style={{ textAlign: "center" }}>{rooms.roomNumber}</td>
      <td style={{ textAlign: "center" }}>{rooms.price}</td>
      <td style={{ textAlign: "center" }}>
        {convertStringToDate(receipt.booking.checkInDate)}
      </td>
      <td style={{ textAlign: "center" }}>
        {convertStringToDate(receipt.booking.checkOutDate)}
      </td>
    </tr>
  ))

  const today = new Date()
  const dateTime = convertStringToDate(today)

  return (
    <>
      <div ref={ref}>
        <Row className="mb-3" style={{ borderBottom: "1px solid #bbb" }}>
          <Col>
            <div style={{ textAlign: "center", fontSize: "20px" }}>
              <h5>DTHSOFT</h5>
            </div>
            <div style={{ textAlign: "center", fontSize: "13px" }}>
              <strong>
                1. Vo Van Ngan, Linh Chieu, Thu Duc City, Ho Chi Minh City, Viet
                Nam
              </strong>
            </div>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <div style={{ textAlign: "center", fontSize: "20px" }}>
              <h5>CASH RECEIPT</h5>
            </div>
          </Col>
        </Row>

        <div className="mb-3" style={{ borderBottom: "1px solid #bbb" }}>
          <Row>
            <Col sm={3}>
              <strong>Cash ID: </strong>
            </Col>
            <Col>
              <strong>{receipt._id}</strong>
            </Col>
          </Row>

          <Row>
            <Col sm={3}>
              <strong>Cashier: </strong>
            </Col>
            <Col>
              <strong>{cashier}</strong>
            </Col>
          </Row>
          <Row>
            <Col sm={3}>
              <strong>Date: </strong>
            </Col>
            <Col>
              <strong>{dateTime}</strong>
            </Col>
          </Row>
        </div>

        <Row className="mb-3" style={{ borderBottom: "1px solid #bbb" }}>
          <Form.Group controlId="formGridRoom">
            <div
              className="room"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p style={{ fontWeight: "bold" }}>Room</p>
            </div>
            <Table>
              <thead>{renderHead}</thead>
              <tbody>{roomContent}</tbody>
            </Table>
            <Row>
              <Col sm={10}>
                <strong>Amount (USD): </strong>
              </Col>
              <Col>
                <strong style={{ color: "red" }}>
                  {receipt.booking.roomCharge}
                </strong>
              </Col>
            </Row>
          </Form.Group>
        </Row>

        {receipt.booking.services.length > 0 && (
          <Row className="mb-3" style={{ borderBottom: "1px solid #bbb" }}>
            <Form.Group as={Col} controlId="formGridService">
              <div
                className="service"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p style={{ fontWeight: "bold" }}>Service</p>
              </div>
              <div>{content}</div>
              <Row>
                <Col sm={10}>
                  <strong>Amount (USD): </strong>
                </Col>
                <Col>
                  <strong style={{ color: "red" }}>
                    {receipt.booking.serviceCharge}
                  </strong>
                </Col>
              </Row>
            </Form.Group>
          </Row>
        )}

        <div className="mb-3" style={{ borderBottom: "1px solid #bbb" }}>
          <Row>
            <Col sm={10}>
              <strong>Total Price: </strong>
            </Col>
            <Col>
              <strong>
                {(
                  receipt.booking.totalPrice /
                  (1 + receipt.booking.VAT / 100)
                ).toFixed()}
              </strong>
            </Col>
          </Row>
          <Row>
            <Col sm={10}>
              <strong>VAT: </strong>
            </Col>
            <Col>
              <strong>{receipt.booking.VAT}%</strong>
            </Col>
          </Row>
          <Row>
            <Col sm={10}>
              <strong>Discount: </strong>
            </Col>
            <Col>
              <strong>{receipt.booking.discount}%</strong>
            </Col>
          </Row>

          <Row>
            <Col sm={10}>
              <strong>Pay: </strong>
            </Col>
            <Col>
              <strong style={{ color: "red" }}>
                {receipt.booking.totalPrice}
              </strong>
            </Col>
          </Row>
          {/* <div style={{ textAlign: "center", fontSize: "13px" }}>
            <strong>(Above prices are inclusive 10% of value added tax)</strong>
          </div> */}
        </div>
        <div className="mb-3" style={{ borderBottom: "1px solid #bbb" }}>
          <Row>
            <Col sm={10}>
              <strong>Cash: </strong>
            </Col>
            <Col>
              <strong style={{ color: "red" }}>{receipt.paidOut}</strong>
            </Col>
          </Row>
          <Row>
            <Col sm={10}>
              <strong>Refund: </strong>
            </Col>
            <Col>
              <strong style={{ color: "red" }}>{receipt.refund}</strong>
            </Col>
          </Row>
        </div>
        <Row className="mb-3">
          <Col span={8}>
            <div style={{ textAlign: "center", fontSize: "13px" }}>
              <strong>Complaint or Suggestions: 1800 1010</strong>
            </div>

            <div style={{ textAlign: "center", fontSize: "13px" }}>
              <strong>
                Note: DTH only issues invoices within the day, please contact
                the staff for support.
              </strong>
            </div>

            <div style={{ textAlign: "center", fontSize: "13px" }}>
              <strong>Thank you. See you again</strong>
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
})
