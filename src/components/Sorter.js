import React, { useState } from 'react'

const Sorter = ({onSort}) => {

    const [order, setOrder] = useState("ASC")

    const handleSort = (key) => {
        onSort(order, key)
        if (order === "ASC") return setOrder ("DSC")
        if (order === "DSC") return setOrder ("ASC")
    }

  return (
    <div>
        <label className='sort-title'>Sort by:</label>
        <button type="button" className="sort-btn" onClick={() => handleSort('component')}>
            Component
        </button>
        <button type="button" className="sort-btn" onClick={() => handleSort('severity')}>
            Severity
        </button>
        <button type="button" className="sort-btn" onClick={() => handleSort('priority')}>
            Priority
        </button>       
        <button type="button" className="sort-btn" onClick={() => handleSort('status')}>
            Status
        </button>
        <button type="button" className="sort-btn" onClick={() => handleSort('assignee')}>
            Assignee
        </button>
        <button type="button" className="sort-btn" onClick={() => handleSort('date')}>
            Date
        </button>
    </div>
  )
}

export default Sorter