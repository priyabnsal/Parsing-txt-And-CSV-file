import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from 'react'

const Parser = forwardRef((props, ref) => {
  const [values, setValues] = useState([])
  const [rows, setRow] = useState([])
  useImperativeHandle(ref, () => ({
    csvToArray(str) {
      if (str === '') {
        console.log('DEBUG')
        setValues([])
        return
      } else {
        let row = str.split('\n')

        setRow(row)
        console.log(row)
      }
    },
  }))
  useEffect(() => {
    if (!rows.length === 0) {
      return
    } else {
      newthing()
    }
  }, [rows, props.rows, props.delimiter])

  function newthing() {
    let newRows = rows.slice(0, props.rows)
    if (newRows.length === 0) {
      return
    } else {
      const headers = props.delimiter
        ? [
            ...Array(
              Math.max(
                ...newRows.map(
                  (row) => (row.split(props.delimiter) ?? []).length,
                ),
              ),
            ).keys(),
          ]
        : [0]

      const arr = newRows.map(function (row) {
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
    }
  }
  return (
    <>
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
    </>
  )
})

export default Parser
