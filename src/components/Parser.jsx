import React, { forwardRef, useImperativeHandle, useState } from 'react'

const Parser = forwardRef((props, ref) => {
  const [values, setValues] = useState([])
  useImperativeHandle(ref, () => ({
    csvToArray(str) {
      const rows = str.split('\n')

      const headers = props.delimiter
        ? [
            ...Array(
              Math.max(
                ...rows.map((row) => (row.split(props.delimiter) ?? []).length),
              ),
            ).keys(),
          ]
        : [0]

      const arr = rows.map(function (row) {
        const values = props.delimiter ? row.split(props.delimiter) : [row]
        const el = headers.reduce(function (object, header, index) {
          object[header] = values[index]
          return object
        }, {})
        return el
      })
      const rowsArray = []
      const valuesArray = []
      arr.map((d) => {
        rowsArray.push(Object.keys(d))
        valuesArray.push(Object.values(d))
      })
      setValues(valuesArray)
      return arr
    },
  }))

  return (
    <>
      <h4>Table</h4>
      <table className="table table-striped table-hover table-bordered">
        <tbody>
          {values.slice(0, props.rows)?.map((value, index) => {
            return (
              <tr key={index}>
                {value?.map((val, i) => {
                  return <td key={i}>{val}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
})

export default Parser
