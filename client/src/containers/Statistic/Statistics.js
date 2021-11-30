import React, { useState } from "react"
import { Tabs, Tab } from "react-bootstrap"
import InvoiceRevenue from "./InvoiceRevenue"
import RoomRevenue from "./RoomRevenue"
import ServiceRevenue from "./ServiceRevenue"

const Statistics = () => {
  const [key, setKey] = useState("invoice-revenue")

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="invoice-revenue" title="Invoice revenue">
        <InvoiceRevenue />
      </Tab>
      <Tab eventKey="room-revenue" title="Room revenue">
        <RoomRevenue />
      </Tab>
      <Tab eventKey="service-revenue" title="Service revenue">
        <ServiceRevenue />
      </Tab>
    </Tabs>
  )
}

export default Statistics
