import React from 'react'

const Parser = ({ isFileUploaded, fileContentArray, rows }) => {
  return (
    <>
      <h4>Table</h4>
      <table>
        <tbody>
          {isFileUploaded &&
            fileContentArray &&
            fileContentArray.slice(0, rows)?.map((value, index) => {
              return (
                <tr key={index}>
                  <table className="table table-bordered table-stripped">
                    <tbody>
                      <tr>
                        {value.slice(0, 4)?.map((val, i) => {
                          return <td key={i}>{val}</td>
                        })}
                      </tr>
                    </tbody>
                  </table>
                </tr>
              )
            })}
        </tbody>
      </table>
    </>
  )
}
// )

export default Parser
