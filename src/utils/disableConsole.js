export const disableConsoleInProduction = () => {
  if (process.env.NODE_ENV === "production") {
    const noop = () => { };
    console.log = noop;
    console.warn = noop;
    console.error = noop;
    console.info = noop;
    console.debug = noop;
  }
};
