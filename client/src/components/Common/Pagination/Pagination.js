import React from "react"

const LEFT_PAGE = "LEFT"
const RIGHT_PAGE = "RIGHT"

function Pagination(props) {
  const { totalPages, pageNeighbours, onChangedPage, currentPage } = props

  const fetchPageNumbers = () => {
    const totalNumbers = pageNeighbours * 2 + 3
    const totalBlocks = totalNumbers + 2

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours)
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours)

      let pages = range(startPage, endPage)

      const hasLeftSpill = startPage > 2
      const hasRightSpill = totalPages - endPage > 1
      const spillOffset = totalNumbers - (pages.length + 1)

      switch (true) {
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = range(startPage - spillOffset, startPage - 1)
          pages = [LEFT_PAGE, ...extraPages, ...pages]
          break
        }
        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE]
          break
        }
      }
      return [1, ...pages, totalPages]
    }
    return range(1, totalPages)
  }
  const pages = fetchPageNumbers() || []
  return (
    <nav aria-label="Countries Pagination">
      <ul className="pagination ">
        {pages.map((page, index) => {
          if (page === LEFT_PAGE)
            return (
              <li key={index} className="page-item">
                <a
                  href="/"
                  className="page-link"
                  aria-label="Previous"
                  onClick={(e) => onChangedPage(e, pageNeighbours * 2 - 1)}
                >
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
            )
          if (page === RIGHT_PAGE)
            return (
              <li key={index} className="page-item">
                <a
                  href="/"
                  className="page-link"
                  aria-label="Next"
                  onClick={(e) => onChangedPage(e, pageNeighbours * 2 + 3)}
                >
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            )

          return (
            <li
              key={index}
              className={`page-item${currentPage === page ? "active" : ""}`}
            >
              <a
                href="/"
                className="page-link"
                onClick={(e) => onChangedPage(e, page)}
              >
                {page}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

const range = (from, to, step = 1) => {
  let i = from
  const range = []
  while (i <= to) {
    range.push(i)
    i += step
  }
  return range
}
export default Pagination
