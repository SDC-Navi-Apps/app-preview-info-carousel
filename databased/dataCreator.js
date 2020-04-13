const fastLorem = require('fast-lorem-ipsum');
const faker = require('faker');
const fs = require('fs');

const writeCSV = fs.createWriteStream('data3.csv');
writeCSV.write('id|description|body|images|createdAt|updatedAt\n', 'utf8');

// var date = Date.now();


function destroyCPU(writer, encoding, callback) {
  var endpoint = 1;
  var i = 0;

  function createEntry() {
    let okay = true;

    do {
      var id = i;
      endpoint--;
      i++;
      if (i % 1 === 0) {
        console.log(`${i/1}%`)
      }
      var sentenceNumber = Math.round(Math.random() * 44) + 16;
      var description = fastLorem(sentenceNumber, 'w');
      var paragraphNumber = Math.round(Math.random() * 600) + 100;
      var body = fastLorem(paragraphNumber, 'w');
      var imageNumber = Math.round(Math.random() * 9) + 1;
      var images = '';
      for (var k = 0; k < imageNumber; k++) {
        if (k === 0) {
          images += `{${Math.round(Math.random() * 1000)},`;
        } if (k === imageNumber - 1) {
          images += `${Math.round(Math.random() * 1000)}}`
        } else {
          images += `${Math.round(Math.random() * 1000)},`;
        }
      }
      var createdAt = faker.date.past().toISOString();
      var updatedAt = faker.date.recent().toISOString();
      var line = `${id}|${description}|${body}|${images}|${createdAt}|${updatedAt}\n`;
      // console.log(line);
      if (i === 0) {
        writer.write(line, encoding, callback);
      } else {
        okay = writer.write(line, encoding);
      }
    } while (endpoint > 0 && okay);

    if (endpoint > 0) {
      writer.once('drain', createEntry);
    }
  }
  createEntry();
}



destroyCPU(writeCSV, 'utf-8', () => {
  writeCSV.end();
});