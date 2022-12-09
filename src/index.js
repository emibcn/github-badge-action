import {
  getInput,
  debug,
  info,
  setOutput,
  error,
  setFailed
} from '@actions/core'
import gradientBadge from 'gradient-badge'
import fs from 'fs'
import defaultInputMap from './defaultInputMap'
import defaultInputFixes from './defaultInputFixes'

const createBadgeFromInputs = ({
  inputMap = defaultInputMap,
  inputFixes = defaultInputFixes,
  outputName = 'badge'
} = {}) => {
  try {
    // Get action inputs
    const inputs = Object.entries(inputMap).reduce(
      (acc, [key, inputName]) => ({
        ...acc,
        [key]: getInput(inputName)
      }),
      {}
    )

    debug('Received inputs:', inputs)

    // Fix some inputs
    for (const [key, fn] of Object.entries(inputFixes)) {
      inputs[key] = fn(inputs)
    }

    info('Generate badge using the given inputs and defaults:', inputs)

    // Generate the badge
    const { path, ...gradientBadgeOptions } = inputs
    const svgString = gradientBadge(gradientBadgeOptions)

    // Output badge contents to Action output
    if (outputName?.length) {
      info("Write data to action's output 'badge'...")
      setOutput(outputName, svgString)
    }

    // If path is defined, save SVG data to that file
    if (path?.length) {
      info(`Write data to file ${path}...`)

      // In case an error occurred writing file,
      // exception is thrown and success messsage is not printed
      fs.writeFileSync(path, svgString)
      info('Data saved succesfully.')
    }
  } catch (err) {
    error(err)
    setFailed(err.message)
  }
}

export { createBadgeFromInputs, defaultInputMap, defaultInputFixes }
