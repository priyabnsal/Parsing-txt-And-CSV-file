import React from 'react'

const Input = (props) => {
  const onDelimiterChange = (delimiter) => {
    props.delimiterValue(delimiter.target.value)
  }
  function onRowChange(rows) {
    props.rowsValue(rows.target.value)
  }
  return (
    <div>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          Delimeter
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Delimiter"
          value={props.delimiter}
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
          value={props.rows}
          onChange={onRowChange}
        />
      </div>
    </div>
  )
}

export default Input
