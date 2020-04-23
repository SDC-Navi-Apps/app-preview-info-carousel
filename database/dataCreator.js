const fastLorem = require('fast-lorem-ipsum');
const faker = require('faker');
const fs = require('fs');

const writeCSV = fs.createWriteStream('data.csv');
writeCSV.write('id|description|body|images|createdAt|updatedAt\n', 'utf8');

// var date = Date.now();


function destroyCPU(writer, encoding, callback) {
  var endpoint = 10000000;
  var i = 0;

  function createEntry() {
    let okay = true;

    do {
      var id = i;
      endpoint--;
      i++;
      if (i % 100000 === 0) {
        console.log(`${i/100000}%`)
      }
      var sentenceNumber = Math.round(Math.random() * 44) + 16;
      var description = fastLorem(sentenceNumber, 'w');
      var paragraphNumber = Math.round(Math.random() * 2) + 2;
      var body = '';
      for (var k = 0; k < paragraphNumber; k++) {
        body += `${faker.lorem.paragraph(6, false)}&#92n`;
      }
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