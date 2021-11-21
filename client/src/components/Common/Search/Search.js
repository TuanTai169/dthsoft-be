import React, { useState } from "react"
import { InputGroup, FormControl } from "react-bootstrap"

const Search = ({ onSearch }) => {
  const [search, setSearch] = useState("")

  const onInputChange = (value) => {
    setSearch(value)
    onSearch(value)
  }
  return (
    <>
      <InputGroup className="mb-3">
        <FormControl
          type="text"
          value={search}
          onChange={(e) => onInputChange(e.target.value)}
        />
        <InputGroup.Text>
          <i className="bx bx-search"></i>
        </InputGroup.Text>
      </InputGroup>
    </>
  )
}

export default Search
