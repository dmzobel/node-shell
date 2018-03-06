const commands = require('./commands');

// Output a prompt
process.stdout.write(`prompt > `);

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  const input = data.toString().trim().split(' ');
  const cmd = input[0];
  const args = input.slice(1);

  if (commands[cmd]) {
    commands[cmd](args);
  } else {
    process.stderr.write('Command not found: ' + cmd);
  }
});

// REVIEW REGEX CHARACTERS USED TO SPLIT WHITESPACE AND PIPING?
