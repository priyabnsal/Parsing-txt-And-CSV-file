import React from 'react'
import { useDropzone } from 'react-dropzone'
import './React-Drop.css'
import uploadImg from '../assets/cloud-upload-regular-240.png'
function ReactDrop(props) {
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
  } = useDropzone({
    // noClick: true,
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
        <p className="drop-file-preview__title">Accepted files</p>

        <ul>{acceptedFileItems}</ul>
        <h4>Rejected files</h4>
        <ul>{fileRejectionItems}</ul>
      </aside>
    </>
  )
}

export default ReactDrop
