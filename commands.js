const fs = require('fs');

function done(output) {
  process.stdout.write(output);
  process.stdout.write('\nprompt > ');
}

function evaluateCmd(userInput) {
  const userInputArray = userInput.split(' ');
  const command = userInputArray[0];

  switch (command) {
    case 'echo':
      commandLibrary.echo(userInputArray.slice(1).join(' '));
      break;
    case 'cat':
      commandLibrary.cat(userInputArray.slice(1));
      break;
    case 'sorted':
      commandLibrary.sorted(userInputArray.slice(1));
      break;
    case 'head':
      commandLibrary.head(userInputArray.slice(1));
      break;
    case 'tail':
      commandLibrary.tail(userInputArray.slice(1));
      break;
    default:
      commandLibrary.error(userInputArray.join(' '))
  }
}

const commandLibrary = {
  'echo': (userInput) => {
    done(userInput);
  },
  'cat': (fullPath) => {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      done(data);
    })
  },
  'sorted': (fullPath) => {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      let dataArr = data.toString().split('\n');
      done(dataArr.slice(0,dataArr.length).sort().join('\n'));
    })
  },
  'head': (fullPath) => {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      let dataArr = data.toString().split('\n');
      done(dataArr.slice(0, 5).join('\n'));
    })
  },
  'tail': (fullPath) => {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      let dataArr = data.toString().split('\n');
      done(dataArr.slice(dataArr.length - 5).join('\n'));
    })
  },

  'error': (userInput) => {
    done(`Error. Command not found: ${userInput}`)
  }
};

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;
