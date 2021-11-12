import React, { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllCustomer } from "../../redux/actions/customerAction"
import CustomerTable from "./CustomerTable"
import Pagination from "../../components/Common/Pagination/Pagination"
import AddCustomerModal from "./AddCustomerModal"
import { Button, ButtonToolbar, Spinner } from "react-bootstrap"

function Customers() {
  const [currentPage, setCurrentPage] = useState(1)
  const [isOpen, setIsOpen] = useState(false)

  //GET LIST CUS
  const customers = useSelector((state) => state.customerReducer.customers)
  const isLoading = useSelector(
    (state) => state.customerReducer.isCustomerLoading
  )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllCustomer())
  }, [dispatch])

  const totalItems = customers.length
  const limit = 6
  const totalPages = Math.ceil(totalItems / limit)

  const currentData = customers.slice(
    (currentPage - 1) * limit,
    (currentPage - 1) * limit + limit
  )

  const handlerModalClose = () => setIsOpen(false)
  const onChangedPage = useCallback(
    (event, page) => {
      event.preventDefault()
      setCurrentPage(page)
    },
    [setCurrentPage]
  )

  return (
    <div>
      <>
        {isLoading === false ? (
          <div className="spinner-container">
            <Spinner animation="border" variant="info" />
          </div>
        ) : (
          <div className="page">
            <div className="page__header">
              <div className="page__title">
                <h3>Customers</h3>
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
              <CustomerTable customers={currentData} />
            </div>
            <div className="page__footer">
              <Pagination
                totalPages={totalPages}
                pageNeighbours={2}
                onChangedPage={onChangedPage}
                currentPage={currentPage}
              />
            </div>
          </div>
        )}
      </>
    </div>
  )
}

export default Customers
