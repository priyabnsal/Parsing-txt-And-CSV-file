import React from 'react'
import { DropzoneArea } from 'material-ui-dropzone'

const DragAndDrop = ({ setUploaded, setFileContent }) => {
  const onDrop = ([file]) => {
    var reader = new FileReader()
    reader.onload = function (e) {
      var contents = e.target.result
      console.log(contents)
      setFileContent(contents)
      setUploaded(true)
    }
    reader.readAsText(file)
  }
  function onDelete() {
    setFileContent('')
    setUploaded(false)
  }

  return (
    <div className="drop-zone">
      <DropzoneArea
        acceptedFiles={['.txt', '.csv']}
        showFileNames
        dropzoneText="Drop File Here"
        showAlerts={false}
        filesLimit={1}
        onDrop={onDrop}
        onDelete={onDelete}
      />
    </div>
  )
}

export default DragAndDrop
