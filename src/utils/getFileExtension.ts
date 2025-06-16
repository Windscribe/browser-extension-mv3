export const getFileExtension = (fileName: string): string => {
  /*
        Gets the file extension, this check is just to loosely prevent uploading the wrong file
        https://stackoverflow.com/a/12900504

        ""                            -->   ""
        "name"                        -->   ""
        "name.txt"                    -->   "txt"
        ".htpasswd"                   -->   ""
        "name.with.many.dots.myext"   -->   "myext"
    */
  return fileName.slice((Math.max(0, fileName.lastIndexOf('.')) || Infinity) + 1)
}
