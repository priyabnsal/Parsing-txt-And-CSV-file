import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import './React-Drop.css'
import uploadImg from '../assets/cloud-upload-regular-240.png'
import Papa from 'papaparse'

function Try(props) {
  const [parsedData, setParsedData] = useState([])

  //State to store table Column name
  const [tableRows, setTableRows] = useState([])

  //State to store the values
  const [values, setValues] = useState([])
  const onDrop = async ([file]) => {
    var reader = new FileReader()
    reader.onload = function (e) {
      var contents = e.target.result
      //   displayContents(contents)
      console.log(contents)
      Papa.parse(contents, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          const rowsArray = []
          const valuesArray = []

          // Iterating data to get column name and their values
          results.data.map((d) => {
            rowsArray.push(Object.keys(d))
            valuesArray.push(Object.values(d))
          })

          // Parsed Data Response in array format
          setParsedData(results.data)

          // Filtered Column Names
          setTableRows(rowsArray[0])

          // Filtered Values
          setValues(valuesArray)
        },
      })
    }
    reader.readAsText(file)
  }
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
  } = useDropzone({
    // noClick: true,
    onDrop,
    accept: {
      'image/jpeg': [],
      'text/csv': [],
      'text/txt': ['.txt'],
    },
  })

  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ))

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ))

  return (
    <>
      <div className="drop-file-input">
        <div className="drop-file-input__label">
          <img src={uploadImg} alt="" />
          <p>Drag 'n' drop some files here</p>
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />

            <em>(Only *.csv and *.txt files will be accepted)</em>
          </div>
        </div>
      </div>
      <aside>
        {/* <p className="drop-file-preview__title">Accepted files</p>

        <ul>{acceptedFileItems}</ul> */}
        {/* <h4>Rejected files</h4>
        <ul>{fileRejectionItems}</ul> */}
      </aside>
      <h3>Filters</h3>
      <label>Delimeter</label>
      <input type="text" />
      <label>Total Rows</label>
      <input type="number" />
      <h4>Table Loading</h4>
      <table style={{ border: '1px solid black' }}>
        <thead>
          <tr>
            {tableRows.map((rows, index) => {
              return <th key={index}>{rows}</th>
            })}
          </tr>
        </thead>
        <tbody>
          {values.map((value, index) => {
            return (
              <tr key={index}>
                {value.map((val, i) => {
                  return <td key={i}>{val}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default Try
