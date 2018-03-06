const fs = require('fs');

var exports = module.exports = {}

exports.pwd = function () {
  process.stdout.write(process.mainModule.filename);
  process.stdout.write(`\nprompt > `);
}

exports.date = function () {
  process.stdout.write(Date());
  process.stdout.write(`\nprompt > `);
}

exports.ls = function () {
  fs.readdir('.', function (err, files) {
    if (err) throw err;
    files.forEach(file => {
      process.stdout.write(file.toString() + '\n');
    });
    process.stdout.write(`prompt > `);
  });
}

exports.echo = function (args) {
  if (args[0][0] === '$') {
    var env = process.env[args[0].slice(1)];
    process.stdout.write(env);
  } else {
    process.stdout.write(args.join(' '));
  }
  process.stdout.write(`\nprompt > `);
}

exports.cat = function (args) {
  if (args.length > 1) {
    let data = args.slice();
    let counter = 0;

    data.forEach((filename, index) => {
      let thisIndex = index;

      fs.readFile(filename, 'utf8', function (err, contents) {
        if (err) throw err;

        data[thisIndex] = contents;
        counter++;

        if (counter === data.length) {
          process.stdout.write(data.join('\n'));
          process.stdout.write(`prompt > `);
        }

      });
    });
  }
  else {
    fs.readFile(args[0], 'utf8', function (err, contents) {
      if (err) throw err;

      process.stdout.write(contents);
      process.stdout.write(`prompt > `);
    });
  }
}

exports.head = function (args, n = 5) {
  fs.readFile(args[0], 'utf8', function (err, contents) {
    if (err) throw err;

    process.stdout.write(contents.split('\n').slice(0, n).join('\n'));
    process.stdout.write(`\nprompt > `);
  });
}

exports.tail = function (args, n = 5) {
  fs.readFile(args[0], 'utf8', function (err, contents) {
    if (err) throw err;

    process.stdout.write(contents.split('\n').slice(-n).join('\n'));
    process.stdout.write(`\nprompt > `);
  });
}

// WHAT'S HAPPENING HERE
exports.sort = function (args) {
  fs.readFile(args[0], 'utf8', function (err, contents) {

    if (err) throw err;

    // let contentsArr = contents.split('\n').map(line => {
    //   let containsCharacter = /[a-z]/i.exec(line);
    //   if (containsCharacter) line = line.slice(containsCharacter.index);
    //   return line;
    // });

    // process.stdout.write(contentsArr.sort(
    //   (a, b) => a.toLowerCase() > b.toLowerCase()
    // ).join('\n') + '\n');

    // process.stdout.write(`prompt > `);
    process.stdout.write(contents.split('\n').sort().join('\n'));
    process.stdout.write(`\nprompt > `);
  });
}

exports.wc = function () {}

exports.uniq = function () {}
