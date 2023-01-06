import fs from 'fs'
import inquirer from 'inquirer'

console.log("Let's create a new slice!")

const existingSlices = fs.readdirSync('src/state/slices')

const questions = [
  {
    type: 'input',
    name: 'sliceName',
    message: 'Name of slice (without file extension)',
    validate(value) {
      if (existingSlices.includes(`${value}.ts`)) {
        return 'Such slice is already exist'
      }

      const valid = !/[^a-zA-Z]/.test(value)
      return valid || 'Please use letters only'
    },
  },
]

inquirer
  .prompt(questions)
  .then(createSliceFile)
  .then(updateStore)
  .catch(error => {
    error.isTtyError
      ? console.error("Prompt couldn't be rendered in the current environment. Error: ", error)
      : console.error('Unknown Error: ', error)
  })

function createSliceFile(answers) {
  fs.appendFile(
    `src/state/slices/${answers.sliceName}.ts`,
    createSliceFileTemplate(answers.sliceName),
    err => {
      if (err) throw err
      console.log(`${answers.sliceName}.ts was successfully created!`)
    },
  )
  return answers.sliceName
}

function updateStore(sliceName) {
  const STORE_PATH = 'src/state/store.ts'

  // Add import
  const importString = `import ${sliceName}Reducer from './slices/${sliceName}'`
  const lines = fs.readFileSync(STORE_PATH).toString().split('\n')
  const indexOfLastLineWithImport = lines.map(line => line.startsWith('import')).lastIndexOf(true)
  lines.splice(indexOfLastLineWithImport + 1, 0, importString)

  // Add key/value to reducer object
  const reducerString = `  ${sliceName}: ${sliceName}Reducer,`
  const reducerStartIndex = lines.findIndex(line => line.startsWith('const reducers = {'))
  lines.splice(reducerStartIndex + 1, 0, reducerString)
  const reducerEndIndex =
    lines.slice(reducerStartIndex).findIndex(line => line.startsWith('}')) + reducerStartIndex

  const text = [
    ...lines.slice(0, reducerStartIndex + 1),
    ...lines.slice(reducerStartIndex + 1, reducerEndIndex).sort((a, b) => a.localeCompare(b)),
    ...lines.slice(reducerEndIndex),
  ].join('\n')

  fs.writeFile(STORE_PATH, text, err => {
    if (err) throw err
    console.log(`${STORE_PATH} was successfully updated!`)
  })
}

const createSliceFileTemplate = sliceName =>
  `import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type ${capitalize(sliceName)}State = undefined
const initialState: ${capitalize(sliceName)}State = undefined

export const ${sliceName}Slice = createSlice({
  name: '${sliceName}',
  initialState,
  reducers: {
    set${capitalize(sliceName)}(state: ${capitalize(sliceName)}State, action: PayloadAction<.>) {
      return action.payload
    },
  },
})

export const { set${capitalize(sliceName)} } = ${sliceName}Slice.actions
export default ${sliceName}Slice.reducer
`

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
