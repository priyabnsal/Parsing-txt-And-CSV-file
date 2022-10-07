import React, { useState, useEffect } from 'react'
import { DropzoneArea } from 'material-ui-dropzone'
import '../App.css'
import Papa from 'papaparse'

const SimpleDrop = () => {
  const [files, setFiles] = useState([])

  const [parsedData, setParsedData] = useState([])
  const [tableRows, setTableRows] = useState([])
  const [values, setValues] = useState([])

  const [delimiter, setDelimiter] = useState('')
  console.log(delimiter)
  const [rows, setRows] = useState(4)
  const [globalFile, setGlobalFile] = useState()

  const onDelimiterChange = (event) => {
    console.log(event.target.value)
    setDelimiter(event.target.value)
    console.log([files])
    if (globalFile) {
      //   setIsLoading(true)
    }
  }
  const PapaParsing = (contents) => {
    Papa.parse(contents, {
      header: true,
      delimiter: delimiter,
      skipEmptyLines: true,
      // newline: { delimiter },
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
    // parseFile(files)
  }
  function onRowChange(e) {
    setRows(parseInt(e.target.value))
  }
  return (
    <div className="drop-zone">
      <DropzoneArea
        acceptedFiles={['text/*']}
        onChange={handleChange.bind(this)}
        showFileNames
        dropzoneText="Drop File Here"
        showAlerts={false}
        filesLimit={1}
        onDrop={onDrop}
      />
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">
          Delimeter
        </span>
        <input
          type="text"
          class="form-control"
          placeholder="Delimiter"
          aria-label="Username"
          aria-describedby="basic-addon1"
          value={delimiter}
          onChange={onDelimiterChange}
        />
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">
          Rows
        </span>
        <input
          type="text"
          class="form-control"
          placeholder="Delimiter"
          aria-label="Username"
          aria-describedby="basic-addon1"
          value={rows}
          onChange={onRowChange}
        />
      </div>

      <h4>Table Loading</h4>
      <table className="table table-hover border">
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
