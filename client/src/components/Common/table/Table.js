import React from "react"

import "./table.css"

const Table = (props) => {
  const { headData, bodyData } = props

  return (
    <div>
      <div className="table-wrapper">
        <table>
          {headData && (
            <thead>
              <tr>
                {props.headData.map((item, index) => (
                  <th key={index}>{item}</th>
                ))}
              </tr>
            </thead>
          )}
          {bodyData && (
            <tbody>
              {bodyData.map((item, index) => (
                <tr key={index}>
                  <td>{item.room}</td>
                  <td>{item.type}</td>
                  <td>{item.totalPrice}</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  )
}

export default Table
