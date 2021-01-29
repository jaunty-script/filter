const shell = require('shelljs');

const commandLineArguments = process.argv.slice(2);
const [
  ...files
] = commandLineArguments;

const date = new Date();
shell.sed('-i', /^<small>(File last updated:).*<\/small>$/, `$1 ${date.toISOString()}`, files);
