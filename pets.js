// Your first task is to build a command-line application that displays its usage, ideally to the [standard error]['stderr'] channel, when invoked without a subcommand. The app should [exit the process]['exit'] with a non-zero exit code to indicate that it failed to complete any work.

// $ node pets.js
// Usage: node pets.js [read | create | update | destroy]
var fs = require('fs');

(function() {
  let arg = process.argv[2] || 'error';
  let recordIndex = process.argv[3];
  let kind = process.argv[4];
  let name = process.argv[5];

  let petShop = {
    error: function() {
      console.error(`Usage: node pets.js [read | create | update | destroy]`);
      process.exit(1);
    },

    read: function() {
      // fs.readFile
      fs.readFile('./pets.json', (err, data) => {
        if (err) throw err;
        data = JSON.parse(data);

        if (recordIndex) {
          if ((recordIndex >= 0) && (recordIndex <= data.length)) {
            let record = data[recordIndex];
            console.log(record);
          } else {
            console.log(`Usage: node pets.js index`);
            process.exit(1);
          }
        } else {
          console.log(data);
        }
      })
    },

    create: function() {
      let newPet = {};
      let newPetIndex = undefined;
      let Pets = {};
      if (process.argv[3] && process.argv[4] && process.argv[5]) {
        let addPet = new Promise(function(resolve, reject) {
          fs.readFile('./pets.json', (err, data) => {
            if (err) throw err;
            data = JSON.parse(data);
            Pets = data;
            newPet.age = parseInt(process.argv[3]);
            newPet.kind = process.argv[4];
            newPet.name = process.argv[5];
            Pets.push(newPet);
            console.log(newPet);
            // console.log(Pets);
            resolve(JSON.stringify(Pets));
          });
        });

        addPet.then((data) => {

          fs.writeFile('./pets.json', data, (err) => {
            if (err) throw err;
          });
        });
      } else {
        console.error(`Usage: node pets.js create AGE KIND NAME`);
        process.exit(1);
      }
    }
  }

  petShop[arg]();
})();
