import React, { useState, useRef } from 'react'
import Input from './Input'
import Parser from './Parser'
import DragAndDrop from './DragAndDrop'

const Main = () => {
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
      <Input
        delimiterValue={delimiterHandler}
        rowsValue={rowHandler}
        delimiter={delimiter}
        rows={rows}
      />
      <Parser ref={tableRef} delimiter={delimiter} rows={rows} />
      <br />
      <br />
      <br />
      <br />
    </div>
  )
}

export default Main
