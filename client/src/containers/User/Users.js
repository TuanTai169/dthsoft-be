import React, { useState, useMemo } from "react"
import { Button, ButtonToolbar, Spinner, Form, Table } from "react-bootstrap"
import { useSelector } from "react-redux"
import UserItem from "./UserItem"
import AddUserModal from "./AddUserModal"

import TableHeader from "../../components/Common/table/TableHeader"
import PaginationComponent from "../../components/Common/Pagination/PaginationComponent"
import Search from "./../../components/Common/Search/Search"

function Users() {
  const [totalItems, setTotalItems] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [isOpen, setIsOpen] = useState(false)
  const [limit, setLimit] = useState(6)
  const [sorting, setSorting] = useState({ field: "", order: "" })
  const [search, setSearch] = useState("")

  //GET LIST CUS
  const users = useSelector((state) => state.userReducer.users)
  const isLoading = useSelector((state) => state.userReducer.isUserLoading)
  const roles = useSelector((state) => state.auth.user.roles)

  //Header table
  const headers = [
    { name: "No#", field: "id", sortable: false },
    { name: "Name", field: "name", sortable: true },
    { name: "Email", field: "email", sortable: true },
    { name: "Phone", field: "phone", sortable: false },
    { name: "Action", field: "action", sortable: false },
  ]

  const currentData = useMemo(() => {
    let computedUsers = [...users].sort((a, b) =>
      a.createdAt < b.createdAt ? 1 : -1
    )

    if (search) {
      computedUsers = computedUsers.filter(
        (comment) =>
          comment.name.toLowerCase().includes(search.toLowerCase()) ||
          comment.email.toLowerCase().includes(search.toLowerCase())
      )
    }

    setTotalItems(computedUsers.length)

    //Sorting comments
    if (sorting.field) {
      computedUsers.sort((a, b) => {
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
    return computedUsers.slice(indexOfFirstNews, indexOfLastNews)
  }, [users, currentPage, limit, sorting, search])

  const handlerModalClose = () => setIsOpen(false)

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
              <Table striped>
                <TableHeader
                  headers={headers}
                  onSorting={(field, order) => setSorting({ field, order })}
                />
                <tbody>
                  {currentData.map((user, index) => (
                    <tr key={user._id}>
                      <td>{index + 1 + (currentPage - 1) * limit}</td>
                      <UserItem user={user} />
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

export default Users
