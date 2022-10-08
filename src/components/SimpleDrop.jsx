import React, { useState, useRef } from 'react'
import Input from './Input'
import Table from './Table'
import DragAndDrop from './DragAndDrop'

const SimpleDrop = () => {
  const [delimiter, setDelimiter] = useState(',')
  const [rows, setRows] = useState(2)
  const tableRef = useRef(null)

  const delimiterHandler = (delimiter) => {
    setDelimiter(delimiter)
  }
  const rowHandler = (rows) => {
    setRows(rows)
  }

  return (
    <div>
      <DragAndDrop delimiter={delimiter} tableRef={tableRef} />
      <br />
      <br />
      <Input delimiter={delimiterHandler} rows={rowHandler} />
      <Table ref={tableRef} delimiter={delimiter} rows={rows} />
    </div>
  )
}

export default SimpleDrop
