import React, { useState, useMemo } from "react"
import { ButtonToolbar, Form, Table, Button } from "react-bootstrap"
import DatePicker from "react-datepicker"
import { useDispatch, useSelector } from "react-redux"
import { getStatistic } from "./../../redux/actions/receiptAction"

import TableHeader from "../../components/Common/table/TableHeader"
import PaginationComponent from "../../components/Common/Pagination/PaginationComponent"
import FullLoading from "../../components/Common/FullLoading/FullLoading"
import InvoiceRevenueItem from "./InvoiceRevenueItem"
import ExportToExcel from "../../utils/ExportToExcel"

const InvoiceRevenue = () => {
  const [totalItems, setTotalItems] = useState(0)
  const [currentItems, setCurrentItems] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [limit, setLimit] = useState(6)
  const [sorting, setSorting] = useState({ field: "", order: "" })
  const [dateRange, setDateRange] = useState([Date.now(), Date.now()])
  const [startDate, endDate] = dateRange
  const fileName = "invoiceRevenue" + Date.now().toString()

  const dispatch = useDispatch()

  //Get all Receipt
  const statistic = useSelector((state) => state.receiptReducer.statistic)
  const isLoading = useSelector(
    (state) => state.receiptReducer.isReceiptLoading
  )

  //Header table
  const headers = [
    { name: "No#", field: "id", sortable: false },
    { name: "Booking Code", field: "code", sortable: false },
    { name: "Customer", field: "customer", sortable: false },
    { name: "CheckIn", field: "checkIn", sortable: false },
    { name: "CheckOut", field: "checkOut", sortable: false },
    { name: "Deposit", field: "deposit", sortable: false },
    { name: "Service", field: "service", sortable: false },
    { name: "Room", field: "room", sortable: false },
    { name: "Discount", field: "discount", sortable: false },
    { name: "VAT", field: "vat", sortable: false },
    { name: "Total Price", field: "totalPrice", sortable: false },
    { name: "Paid Out", field: "paidOut", sortable: false },
    { name: "Refund", field: "refund", sortable: false },
  ]

  const currentData = useMemo(() => {
    let computedReceipts = statistic.invoiceRevenue
      ? statistic.invoiceRevenue
          .sort((a, b) => (a.checkOutDate < b.checkOutDate ? 1 : -1))
          .filter(
            (item) =>
              new Date(item.checkOutDate) < endDate &&
              new Date(item.checkOutDate) > startDate
          )
      : []

    //Sorting comments
    if (sorting.field) {
      computedReceipts.sort((a, b) => {
        if (a[sorting.field] < b[sorting.field]) {
          return sorting.order === "ascending" ? -1 : 1
        }
        if (a[sorting.field] > b[sorting.field]) {
          return sorting.order === "ascending" ? 1 : -1
        }
        return 0
      })
    }

    setTotalItems(computedReceipts.length)
    setCurrentItems(computedReceipts)

    const indexOfLastNews = currentPage * limit
    const indexOfFirstNews = indexOfLastNews - limit
    return computedReceipts.slice(indexOfFirstNews, indexOfLastNews)
  }, [
    statistic.invoiceRevenue,
    currentPage,
    limit,
    sorting,
    endDate,
    startDate,
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
                <h4>Invoice</h4>
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
                    {currentData.map((receipt, index) => (
                      <tr key={receipt.bookingId}>
                        <td>{index + 1 + (currentPage - 1) * limit}</td>
                        <InvoiceRevenueItem receipt={receipt} />
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

export default InvoiceRevenue
