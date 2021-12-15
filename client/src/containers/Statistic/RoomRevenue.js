import React, { useState, useMemo } from "react"
import {
  ButtonToolbar,
  Button,
  Form,
  Table,
  FloatingLabel,
} from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import DatePicker from "react-datepicker"
import { getStatistic } from "./../../redux/actions/receiptAction"

import TableHeader from "../../components/Common/table/TableHeader"
import PaginationComponent from "../../components/Common/Pagination/PaginationComponent"
import FullLoading from "../../components/Common/FullLoading/FullLoading"
import RoomRevenueItem from "./RoomRevenueItem"
import ExportToExcel from "../../utils/ExportToExcel"

const RoomRevenue = () => {
  const dispatch = useDispatch()
  const [totalItems, setTotalItems] = useState(0)
  const [currentItems, setCurrentItems] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [limit, setLimit] = useState(6)
  const [sorting, setSorting] = useState({ field: "", order: "" })
  const [dateRange, setDateRange] = useState([Date.now(), Date.now()])
  const [startDate, endDate] = dateRange
  const [roomType, setRoomType] = useState("ALL")

  const fileName = "roomRevenue" + Date.now().toString()

  //Get all Receipt
  const statistic = useSelector((state) => state.receiptReducer.statistic)
  const isLoading = useSelector(
    (state) => state.receiptReducer.isReceiptLoading
  )

  //Header table
  const headers = [
    { name: "No#", field: "id", sortable: false },
    { name: "Room", field: "room", sortable: false },
    { name: "Type", field: "type", sortable: false },
    { name: "CheckInDate", field: "checkIn", sortable: false },
    { name: "CheckOutDate", field: "checkOut", sortable: false },
    { name: "Price", field: "price", sortable: false },
    { name: "Additional", field: "additional", sortable: false },
    { name: "Total Price", field: "totalPrice", sortable: false },
  ]

  const currentData = useMemo(() => {
    let computedRooms = statistic.map_room
      ? statistic.map_room
          .sort((a, b) => (a.checkOutDate < b.checkOutDate ? 1 : -1))
          .filter(
            (item) =>
              new Date(item.checkOutDate) < endDate &&
              new Date(item.checkOutDate) > startDate &&
              (roomType === "ALL" ? true : item.type === roomType)
          )
      : []

    setTotalItems(computedRooms.length)
    setCurrentItems(computedRooms)

    //Sorting comments
    if (sorting.field) {
      computedRooms.sort((a, b) => {
        if (a[sorting.field] < b[sorting.field]) {
          return sorting.order === "ascending" ? -1 : 1
        }
        if (a[sorting.field] > b[sorting.field]) {
          return sorting.order === "ascending" ? 1 : -1
        }
        return 0
      })
    }

    const indexOfLastNews = currentPage * limit
    const indexOfFirstNews = indexOfLastNews - limit
    return computedRooms.slice(indexOfFirstNews, indexOfLastNews)
  }, [
    statistic.map_room,
    currentPage,
    limit,
    sorting,
    endDate,
    startDate,
    roomType,
  ])

  return (
    <div>
      <>
        {isLoading ? (
          <FullLoading />
        ) : (
          <div className="page">
            <div className="page__header">
              <div className="page__title">
                <h4>Rooms</h4>
              </div>
              <div
                className="page__selectDate"
                style={{
                  padding: "4px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              >
                <DatePicker
                  selectsRange={true}
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(update) => {
                    setDateRange(update)
                  }}
                  dateFormat="dd/MM/yyyy"
                />
              </div>
              <div className="page_selectRoomType" style={{ width: "150px" }}>
                <FloatingLabel
                  controlId="floatingSelectType"
                  label="Select Type"
                  className="mb-3"
                >
                  <Form.Control
                    as="select"
                    name="roomType"
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                  >
                    <option value="ALL">ALL</option>
                    <option value="SINGLE">SINGLE</option>
                    <option value="DOUBLE">DOUBLE</option>
                    <option value="DELUXE">DELUXE</option>
                  </Form.Control>
                </FloatingLabel>
              </div>
              <div className="page__action">
                <ButtonToolbar>
                  <Button
                    variant="info"
                    style={{ marginRight: "10px", color: "#fff" }}
                    onClick={() => dispatch(getStatistic())}
                  >
                    <i className="bx bx-refresh"></i> Refresh
                  </Button>
                  {currentData.length > 0 && (
                    <ExportToExcel csvData={currentItems} fileName={fileName} />
                  )}
                </ButtonToolbar>
              </div>
            </div>
            <div className="page__body">
              {currentData.length ? (
                <Table responsive>
                  <TableHeader
                    headers={headers}
                    onSorting={(field, order) => setSorting({ field, order })}
                  />
                  <tbody>
                    {currentData.map((room, index) => (
                      <tr key={index}>
                        <td>{index + 1 + (currentPage - 1) * limit}</td>
                        <RoomRevenueItem room={room} />
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p>Note! There are currently no records found!</p>
              )}
            </div>
            <div className="page__footer">
              <div className="page__select">
                <Form.Select
                  name="limit"
                  defaultValue={limit}
                  onChange={(e) => setLimit(e.target.value)}
                >
                  <option value="6">6</option>
                  <option value="8">8</option>
                  <option value="10">10</option>
                </Form.Select>
              </div>
              <div className="page__sumOfRecord">
                <h6>Total number of records: {totalItems} </h6>
              </div>
              <div className="page__pagination">
                <PaginationComponent
                  total={totalItems}
                  itemsPerPage={limit}
                  onPageChange={(page) => setCurrentPage(page)}
                  currentPage={currentPage}
                />
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  )
}

export default RoomRevenue
