import {
  createBadgeFromInputs,
  defaultInputMap,
  defaultInputFixes
} from './index'

it('Does not crash', () => {
  createBadgeFromInputs({
    inputMap: {
      ...defaultInputMap
    },
    inputFixes: {
      ...defaultInputFixes,

      // Use default fix using a test gradient
      gradient: () =>
        defaultInputFixes.gradient({
          gradient: 'green,yellow'
        }),

      // Use default fix with a non string value
      status: () =>
        defaultInputFixes.status({
          status: true
        })
    }
  })
})
