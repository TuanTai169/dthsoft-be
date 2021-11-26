import React, { useState, useMemo } from "react"
import { useSelector } from "react-redux"
import AddServiceModal from "./AddServiceModal"
import { Button, ButtonToolbar, Form, Table } from "react-bootstrap"
import ServiceItem from "./ServiceItem"
import TableHeader from "../../components/Common/table/TableHeader"
import PaginationComponent from "../../components/Common/Pagination/PaginationComponent"
import Search from "./../../components/Common/Search/Search"
import FullLoading from "../../components/Common/FullLoading/FullLoading"

function Services() {
  const [totalItems, setTotalItems] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [isOpen, setIsOpen] = useState(false)
  const [limit, setLimit] = useState(6)
  const [sorting, setSorting] = useState({ field: "", order: "" })
  const [search, setSearch] = useState("")

  //GET LIST SERVICE
  const services = useSelector((state) => state.serviceReducer.services)
  const isLoading = useSelector(
    (state) => state.serviceReducer.isServiceLoading
  )
  const role = useSelector((state) => state.auth.user.roles)

  //Header table
  const headers = [
    { name: "No#", field: "id", sortable: false },
    { name: "Name", field: "name", sortable: true },
    { name: "Price (USD)", field: "price", sortable: true },
    { name: "Action", field: "action", sortable: false },
  ]

  const currentData = useMemo(() => {
    let computedServices = [...services].sort((a, b) =>
      a.createdAt < b.createdAt ? 1 : -1
    )

    if (search) {
      computedServices = computedServices.filter((comment) =>
        comment.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    setTotalItems(computedServices.length)

    //Sorting comments
    if (sorting.field) {
      computedServices.sort((a, b) => {
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
    return computedServices.slice(indexOfFirstNews, indexOfLastNews)
  }, [services, currentPage, limit, sorting, search])

  const handlerModalClose = () => setIsOpen(false)
  return (
    <>
      {isLoading ? (
        <FullLoading />
      ) : (
        <div className="page">
          <div className="page__header">
            <div className="page__title">
              <h3>Services</h3>
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
                <Button
                  variant="success"
                  className={role === "EMPLOYEE" ? "disabled" : ""}
                  onClick={() => setIsOpen(true)}
                >
                  Add Service
                </Button>
                <AddServiceModal
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
                {currentData.map((service, index) => (
                  <tr key={service._id}>
                    <td>{index + 1 + (currentPage - 1) * limit}</td>
                    <ServiceItem service={service} />
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
  )
}

export default Services
