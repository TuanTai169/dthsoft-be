import "../../components/Common/table/table.css"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Chart from "react-apexcharts"
import { Badge } from "react-bootstrap"

import StatusCard from "../../components/Common/status-card/StatusCard"
import { numberWithCommas } from "./../../utils/convertWithCommas"
import { getStatistic } from "./../../redux/actions/receiptAction"
import { convertStringToDate } from "./../../utils/convertDateTime"
import lodash from "lodash"
import ScrollToTop from "../../components/Common/ScrollToTop/ScrollToTop"

const topRoomHeads = ["#", "Room", "Type", "total spending"]

const latestOrdersHead = [
  "#",
  "booking id",
  "user",
  "date",
  "mode of payment",
  "total price",
]

const generalStatus = {
  CASH: "primary",
  PAYPAL: "warning",
  SINGLE: "success",
  DOUBLE: "info",
  DELUXE: "danger",
}

const Dashboard = () => {
  const themeReducer = useSelector((state) => state.themeReducer.mode)
  const rooms = useSelector((state) => state.roomReducer.rooms)
  const services = useSelector((state) => state.serviceReducer.services)
  const bookings = useSelector((state) => state.bookingReducer.bookings)
  const receipts = useSelector((state) => state.receiptReducer.receipts)
  const statistic = useSelector((state) => state.receiptReducer.statistic)

  const dispatch = useDispatch()
  useEffect(() => dispatch(getStatistic()), [dispatch, bookings, receipts])

  // TOP ROOM
  let topRoomData = statistic.rooms
    ? statistic.rooms
        .sort((a, b) => (a.totalPrice < b.totalPrice ? 1 : -1))
        .slice(0, 5)
    : null

  const totalRevenue = statistic.totalRevenue
    ? numberWithCommas(statistic.totalRevenue)
    : 0

  const topData = [
    {
      icon: "bx bx-dollar-circle",
      count: totalRevenue,
      title: "Total income",
    },
    {
      icon: "bx bx-receipt",
      count: receipts.length,
      title: "Total receipts",
    },
    {
      icon: "bx bx-dialpad",
      count: rooms.length,
      title: "Total Rooms",
    },
    {
      icon: "bx bx-shopping-bag",
      count: services.length,
      title: "Total Services",
    },
  ]

  // RECEIPT
  let receiptData = receipts
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    .slice(0, 5)

  let latestReceipt = receiptData.map((item) => {
    let receipt = {
      id: item.booking.code,
      customer: item.booking.customer.name,
      createdAt: convertStringToDate(item.createdAt),
      modeOfPayment: item.modeOfPayment,
      price: item.booking.totalPrice,
    }
    return receipt
  })

  // CHART

  // BOOKING BY DAY
  const dayNames = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]

  let dayData = []
  const map_booking_day = statistic.map_booking_day
    ? statistic.map_booking_day
    : []

  if (map_booking_day !== []) {
    lodash.forEach(dayNames, (day) => {
      let count = 0
      lodash.forEach(map_booking_day, (item) => {
        if (item.day === day) {
          dayData.push(item.amount)
          count = 1
        }
      })
      if (count === 0) {
        dayData.push(0)
      }
    })
  }

  const chartBooking = {
    series: [
      {
        name: "Booking",
        data: dayData,
      },
    ],
    options: {
      color: ["#6ab04c", "#2980b9"],
      chart: {
        background: "transparent",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: dayNames,
      },
      legend: {
        position: "top",
      },
      grid: {
        show: false,
      },
      title: {
        text: "Bookings ",
      },
    },
  }

  // ROOM STATUS
  const statusRoom = statistic.statusRoom ? statistic.statusRoom : []
  const statusData = statusRoom.map((item) => item.count)
  const statusLabel = statusRoom.map((item) => item.type)

  const chartStatusRoom = {
    series: statusData,
    options: {
      chart: {
        width: "100%",
        type: "pie",
      },
      labels: statusLabel,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
      title: {
        text: "Room rate",
      },
    },
  }

  // SERVICES

  const topService = statistic.services ? statistic.services : []
  const dataService = topService.map((item) => item.count)
  const labelService = topService.map((item) => item.service)

  const chartTopServices = {
    series: [
      {
        name: "Quantity",
        data: dataService,
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 380,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: labelService,
      },
      title: {
        text: "Services",
      },
    },
  }

  return (
    <>
      <h2 className="page-header">Dashboard</h2>
      <div className="row">
        <div className="col-12">
          <div className="row">
            {topData.map((item, index) => (
              <div className="col-3" key={index}>
                <StatusCard
                  icon={item.icon}
                  count={item.count}
                  title={item.title}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="col-5">
          <div className="card">
            <div className="card__header">
              <h3>Top Rooms</h3>
            </div>
            <div className="card__body">
              <div className="table-wrapper">
                <table>
                  {topRoomHeads && (
                    <thead>
                      <tr>
                        {topRoomHeads.map((item, index) => (
                          <th key={index}>{item}</th>
                        ))}
                      </tr>
                    </thead>
                  )}
                  {topRoomData ? (
                    <tbody>
                      {topRoomData.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.room}</td>
                          <td>
                            <Badge
                              className="badge-status"
                              pill
                              bg={generalStatus[item.type]}
                            >
                              {item.type}
                            </Badge>
                          </td>

                          <td>{`$` + item.totalPrice}</td>
                        </tr>
                      ))}
                    </tbody>
                  ) : null}
                </table>
              </div>
            </div>
            <div className="card__footer">
              <Link to="/room-diagram">view all</Link>
            </div>
          </div>
        </div>

        <div className="col-7">
          <div className="card">
            {/* chart */}
            <Chart
              options={chartTopServices.options}
              series={chartTopServices.series}
              type="bar"
              height={380}
            />
          </div>
        </div>

        <div className="col-5">
          <div className="card full-height">
            {/* chart */}
            <Chart
              options={chartStatusRoom.options}
              series={chartStatusRoom.series}
              type="pie"
              width={380}
            />
          </div>
        </div>

        <div className="col-7">
          <div className="card full-height">
            {/* chart */}
            <Chart
              options={
                themeReducer === "theme-mode-dark"
                  ? {
                      ...chartBooking.options,
                      theme: { mode: "dark" },
                    }
                  : {
                      ...chartBooking.options,
                      theme: { mode: "light" },
                    }
              }
              series={chartBooking.series}
              type="line"
              height={240}
            />
          </div>
        </div>

        <div className="col-12">
          <div className="card">
            <div className="card__header">
              <h3>latest receipts</h3>
            </div>
            <div className="card__body">
              <div className="table-wrapper">
                <table>
                  {latestOrdersHead && (
                    <thead>
                      <tr>
                        {latestOrdersHead.map((item, index) => (
                          <th key={index}>{item}</th>
                        ))}
                      </tr>
                    </thead>
                  )}
                  {latestReceipt ? (
                    <tbody>
                      {latestReceipt.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.id}</td>
                          <td>{item.customer}</td>
                          <td>{item.createdAt}</td>
                          <td>
                            <Badge
                              className="badge-status"
                              pill
                              bg={generalStatus[item.modeOfPayment]}
                            >
                              {item.modeOfPayment}
                            </Badge>
                          </td>
                          <td>{`$` + item.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  ) : null}
                </table>
              </div>
            </div>
            <div className="card__footer">
              <Link to="/receipts">view all</Link>
            </div>
          </div>
        </div>
      </div>
      <ScrollToTop />
    </>
  )
}

export default Dashboard
