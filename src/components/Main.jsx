import React, { useState, useEffect } from 'react'
import Input from './Input'
import Parser from './Parser'
import DragAndDrop from './DragAndDrop'
import { csvToArray } from '../utils/parser.util'

const Main = () => {
  const [delimiter, setDelimiter] = useState(',')
  const [rows, setRows] = useState(2)
  const [fileContent, setFileContent] = useState() //originalFile
  const [uploaded, setUploaded] = useState(false)
  const [fileContentArray, setFileContentArray] = useState([]) // newFile

  const delimiterHandler = (delimiter) => {
    setDelimiter(delimiter)
  }
  const rowHandler = (rows) => {
    setRows(rows)
  }
  useEffect(() => {
    if (!uploaded) return
    else {
      setFileContentArray(csvToArray(fileContent, rows, delimiter))
    }
  }, [fileContent, delimiter, rows])

  return (
    <div>
      <DragAndDrop setUploaded={setUploaded} setFileContent={setFileContent} />
      <br />
      <br />
      <Input
        delimiterValue={delimiterHandler}
        rowsValue={rowHandler}
        delimiter={delimiter}
        rows={rows}
      />
      <Parser
        fileContentArray={fileContentArray}
        rows={rows}
        isFileUploaded={uploaded}
      />
      <br />
      <br />
    </div>
  )
}

export default Main
