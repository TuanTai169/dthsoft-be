import React, { useState, useMemo } from "react"
import { useSelector } from "react-redux"
import AddCustomerModal from "./AddCustomerModal"
import CustomerItem from "./CustomerItem"
import { Button, ButtonToolbar, Form, Table } from "react-bootstrap"
import FullLoading from "../../components/Common/FullLoading/FullLoading"

import TableHeader from "../../components/Common/table/TableHeader"
import PaginationComponent from "../../components/Common/Pagination/PaginationComponent"
import Search from "./../../components/Common/Search/Search"

function Customers() {
  const [totalItems, setTotalItems] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [isOpen, setIsOpen] = useState(false)
  const [limit, setLimit] = useState(6)
  const [sorting, setSorting] = useState({ field: "", order: "" })
  const [search, setSearch] = useState("")

  //GET LIST CUS
  const customers = useSelector((state) => state.customerReducer.customers)
  const isLoading = useSelector(
    (state) => state.customerReducer.isCustomerLoading
  )

  //Header table
  const headers = [
    { name: "No#", field: "id", sortable: false },
    { name: "Name", field: "name", sortable: true },
    { name: "Email", field: "email", sortable: true },
    { name: "Phone", field: "phone", sortable: false },
    { name: "Action", field: "action", sortable: false },
  ]

  const currentData = useMemo(() => {
    let computedCustomers = [...customers].sort((a, b) =>
      a.createdAt < b.createdAt ? 1 : -1
    )

    if (search) {
      computedCustomers = computedCustomers.filter(
        (comment) =>
          comment.name.toLowerCase().includes(search.toLowerCase()) ||
          comment.email.toLowerCase().includes(search.toLowerCase())
      )
    }

    setTotalItems(computedCustomers.length)

    //Sorting comments
    if (sorting.field) {
      computedCustomers.sort((a, b) => {
        if (a[sorting.field] < b[sorting.field]) {
          return sorting.order === "ascending" ? -1 : 1
        }
        if (a[sorting.field] > b[sorting.field]) {
          return sorting.order === "ascending" ? 1 : -1
        }
        return 0
      })
    }
    //Current Page slice
    const indexOfLastNews = currentPage * limit
    const indexOfFirstNews = indexOfLastNews - limit
    return computedCustomers.slice(indexOfFirstNews, indexOfLastNews)
  }, [customers, currentPage, limit, sorting, search])

  const handlerModalClose = () => setIsOpen(false)

  return (
    <div>
      <>
        {isLoading ? (
          <FullLoading />
        ) : (
          <div className="page">
            <div className="page__header">
              <div className="page__title">
                <h3>Customers</h3>
              </div>
              <div className="page__search">
                <Search
                  onSearch={(value) => {
                    setSearch(value)
                    setCurrentPage(1)
                  }}
                />
              </div>
              <div className="page__action">
                <ButtonToolbar>
                  <Button variant="success" onClick={() => setIsOpen(true)}>
                    Add Customer
                  </Button>
                  <AddCustomerModal
                    show={isOpen}
                    handlerModalClose={handlerModalClose}
                  />
                </ButtonToolbar>
              </div>
            </div>
            <div className="page__body">
              <Table striped>
                <TableHeader
                  headers={headers}
                  onSorting={(field, order) => setSorting({ field, order })}
                />
                <tbody>
                  {currentData.map((customer, index) => (
                    <tr key={customer._id}>
                      <td>{index + 1 + (currentPage - 1) * limit}</td>
                      <CustomerItem customer={customer} />
                    </tr>
                  ))}
                </tbody>
              </Table>
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

export default Customers
