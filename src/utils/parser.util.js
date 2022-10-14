export const csvToArray = (fileContent, rows, delimiter) => {
  let splittedFileContent = fileContent?.split('\n')
  let newRows = splittedFileContent.slice(0, rows)

  if (newRows.length === 0) {
    return
  } else {
    // Counting max delimiter and
    //Splitting columns based on max delimiters in the splitterFileContent based on user Input
    const headers = delimiter
      ? [
          ...Array(
            Math.max(
              ...newRows.map((row) => (row.split(delimiter) ?? []).length),
            ),
          ).keys(),
        ]
      : [0]

    const arr = newRows.map((row) => {
      const values = delimiter ? row.split(delimiter) : [row]
      const el = headers.reduce(function (object, header, index) {
        object[header] = values[index]
        return object
      }, {})
      return el
    })
    //converting array of object into array of array
    const result = arr.map(Object.values)
    return result
  }
}
