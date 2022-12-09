import * as core from '@actions/core'
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
        [key]: core.getInput(inputName)
      }),
      {}
    )

    core.debug('Received inputs:', inputs)

    // Fix some inputs
    for (const [key, fn] of Object.entries(inputFixes)) {
      inputs[key] = fn(inputs)
    }

    core.info('Generate badge using the given inputs and defaults:', inputs)

    // Generate the badge
    const { path, ...gradientBadgeOptions } = inputs
    const svgString = gradientBadge(gradientBadgeOptions)

    // Output badge contents to Action output
    if (outputName?.length) {
      core.info("Write data to action's output 'badge'...")
      core.setOutput(outputName, svgString)
    }

    // If path is defined, save SVG data to that file
    if (path?.length) {
      core.info(`Write data to file ${path}...`)

      // In case an error occurred writing file,
      // exception is thrown and success messsage is not printed
      fs.writeFileSync(path, svgString)
      core.info('Data saved succesfully.')
    }
  } catch (error) {
    core.error(error)
    core.setFailed(error.message)
  }
}

export { createBadgeFromInputs, defaultInputMap, defaultInputFixes }
