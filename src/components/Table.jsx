import React, { forwardRef, useImperativeHandle, useState } from 'react'
import Papa from 'papaparse'

const Table = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    PapaParsing(contents) {
      Papa.parse(contents, {
        header: true,
        delimiter: props.delimiter,
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
    },
  }))
  const [parsedData, setParsedData] = useState([])
  const [tableRows, setTableRows] = useState([])
  const [values, setValues] = useState([])
  return (
    <div>
      <h4>Table</h4>
      <table className="table table-striped table-hover table-bordered">
        <tbody>
          {values.slice(0, props.rows)?.map((value, index) => {
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
})

export default Table
