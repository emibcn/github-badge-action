import { createBadgeFromInputs } from './index';

it('Does not crash', () => {
  createBadgeFromInputs({
    inputFixes: {
      gradient: () => 'green',
      status: () => 'true',
    },
  });
});
