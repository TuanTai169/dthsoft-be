import React, { useCallback, useEffect, useState } from "react"
import { Button, ButtonToolbar, Spinner } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { getAllUser } from "../../redux/actions/userAction"
import Pagination from "../../components/Common/Pagination/Pagination"
import UserTable from "./UserTable"
import AddUserModal from "./AddUserModal"

function Users() {
  const [currentPage, setCurrentPage] = useState(1)
  const [isOpen, setIsOpen] = useState(false)

  //GET LIST CUS
  const users = useSelector((state) => state.userReducer.users)
  users.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
  const isLoading = useSelector((state) => state.userReducer.isUserLoading)
  const roles = useSelector((state) => state.auth.user.roles)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllUser())
  }, [dispatch])

  const totalItems = users.length
  const limit = 10
  const totalPages = Math.ceil(totalItems / limit)

  const currentData = users.slice(
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
                <h3>Users</h3>
              </div>
              <div className="page__action">
                <ButtonToolbar>
                  <Button
                    variant="success"
                    className={roles === "EMPLOYEE" ? "disabled" : ""}
                    onClick={() => setIsOpen(true)}
                  >
                    Add user
                  </Button>
                  {
                    <AddUserModal
                      show={isOpen}
                      handlerModalClose={handlerModalClose}
                    />
                  }
                </ButtonToolbar>
              </div>
            </div>
            <div className="page__body">
              <UserTable roles={roles} users={currentData} />
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

export default Users
