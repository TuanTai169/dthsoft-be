import React, { useCallback, useState } from "react"
import { useSelector } from "react-redux"
import ServiceTable from "./ServiceTable"
import Pagination from "../../components/Common/Pagination/Pagination"
import AddServiceModal from "./AddServiceModal"
import { Button, ButtonToolbar, Spinner } from "react-bootstrap"

function Services() {
  const [currentPage, setCurrentPage] = useState(1)
  const [isOpen, setIsOpen] = useState(false)

  //GET LIST SERVICE
  const services = useSelector((state) => state.serviceReducer.services)
  const isLoading = useSelector((state) => state.serviceReducer.serviceLoading)
  const role = useSelector((state) => state.auth.user.roles)

  const totalItems = services.length
  const limit = 6
  const totalPages = Math.ceil(totalItems / limit)

  const currentData = services.slice(
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
    <>
      {isLoading === false ? (
        <div className="spinner-container">
          <Spinner animation="border" variant="info" />
        </div>
      ) : (
        <div className="page">
          <div className="page__header">
            <div className="page__title">
              <h3>Services</h3>
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
            <ServiceTable role={role} services={currentData} />
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
  )
}

export default Services
