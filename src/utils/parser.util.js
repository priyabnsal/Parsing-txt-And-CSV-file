export const csvToArray = (fileContent, rows, delimiter) => {
  let splittedFileContent = fileContent?.split('\n')
  let newRows = splittedFileContent.slice(0, rows)

  if (newRows.length === 0) {
    return
  } else {
    const headers = delimiter
      ? newRows.map((row) => row.split(delimiter))
      : newRows.map((row) => row.split())
    return headers
  }
}
