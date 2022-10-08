import React, { useState, useEffect } from 'react'
import { DropzoneArea } from 'material-ui-dropzone'

const DragAndDrop = ({ delimiter, tableRef }) => {
  const [files, setFiles] = useState([])
  const [globalFile, setGlobalFile] = useState()

  useEffect(() => {
    if (globalFile) tableRef.current.PapaParsing(globalFile)
  }, [delimiter])

  const onDrop = ([file]) => {
    var reader = new FileReader()
    reader.onload = function (e) {
      var contents = e.target.result
      console.log(contents)
      setGlobalFile(contents)
      tableRef.current.PapaParsing(contents)
    }
    reader.readAsText(file)
  }

  const handleChange = (files) => {
    setFiles({ files: files })
  }
  return (
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
  )
}

export default DragAndDrop
