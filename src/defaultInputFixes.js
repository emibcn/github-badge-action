const defaultInputFixes = {
  // Ensure string
  status: ({ status }) => `${status}`,

  // Ensure null if empty
  icon: ({ icon }) => (icon?.length ? icon : null),

  // Color gradient as Array
  gradient: ({ gradient }) =>
    gradient
      .split(',')

      // Clean spaces
      .map((color) => color.trim(' ')),
};

export default defaultInputFixes;
