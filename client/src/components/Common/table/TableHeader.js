import React, { useState } from "react"

const TableHeader = ({ headers, onSorting }) => {
  const [sortingField, setSortingField] = useState("")
  const [sortingOrder, setSortingOrder] = useState("ascending")

  const onSortingChange = (field) => {
    const order =
      field === sortingField && sortingOrder === "ascending"
        ? "descending"
        : "ascending"

    setSortingField(field)
    setSortingOrder(order)
    onSorting(field, order)
  }

  const getClassNamesFor = (field) => {
    if (!sortingField) {
      return
    }
    return field === sortingField ? sortingOrder : undefined
  }

  return (
    <thead>
      <tr>
        {headers.map(({ name, field, sortable }) => (
          <th
            key={name}
            onClick={() => (sortable ? onSortingChange(field) : null)}
            className={getClassNamesFor(field)}
          >
            {name}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default TableHeader
