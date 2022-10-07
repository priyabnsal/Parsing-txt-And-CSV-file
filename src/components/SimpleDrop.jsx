import React, { useState, useEffect } from 'react'
import { DropzoneArea } from 'material-ui-dropzone'
import Papa from 'papaparse'

const SimpleDrop = () => {
  const [files, setFiles] = useState([])

  const [parsedData, setParsedData] = useState([])
  const [tableRows, setTableRows] = useState([])
  const [values, setValues] = useState([])

  const [delimiter, setDelimiter] = useState(',')
  const [rows, setRows] = useState(4)
  const [globalFile, setGlobalFile] = useState()

  const onDelimiterChange = (event) => {
    setDelimiter(event.target.value)
  }
  const PapaParsing = (contents) => {
    Papa.parse(contents, {
      header: true,
      delimiter: delimiter,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = []
        const valuesArray = []

        // Iterating data to get column name and their values
        results?.data?.map((d) => {
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
  useEffect(() => {
    if (globalFile) PapaParsing(globalFile)
  }, [delimiter])

  const onDrop = ([file]) => {
    var reader = new FileReader()
    reader.onload = function (e) {
      var contents = e.target.result
      console.log(contents)
      setGlobalFile(contents)
      PapaParsing(contents)
    }
    reader.readAsText(file)
  }

  const handleChange = (files) => {
    setFiles({ files: files })
  }
  function onRowChange(e) {
    setRows(parseInt(e.target.value))
  }
  return (
    <div>
      <div className="drop-zone">
        <DropzoneArea
          acceptedFiles={['.txt', '.csv']}
          onChange={handleChange.bind(this)}
          showFileNames
          dropzoneText="Drop File Here"
          showAlerts={false}
          filesLimit={1}
          onDrop={onDrop}
          dropzoneProps={{ noClick: true }}
        />
      </div>
      <br />
      <br />
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          Delimeter
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Delimiter"
          value={delimiter}
          onChange={onDelimiterChange}
        />
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          Rows
        </span>
        <input
          type="number"
          className="form-control"
          placeholder="Enter a number"
          value={rows}
          onChange={onRowChange}
        />
      </div>

      <h4>Table</h4>
      <table className="table table-striped table-hover table-bordered">
        <thead>
          {/* <tr>
            {tableRows.slice(0, rows)?.map((rows, index) => {
              return <th key={index}>{rows}</th>
            })}
          </tr> */}
        </thead>
        <tbody>
          {values.slice(0, rows)?.map((value, index) => {
            return (
              <tr key={index}>
                {value.slice(0, 4)?.map((val, i) => {
                  return <td key={i}>{val}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default SimpleDrop
