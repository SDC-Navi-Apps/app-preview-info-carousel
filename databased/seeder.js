const LoremIpsum = require('lorem-ipsum').LoremIpsum;
const fs = require('fs');

const writeCSV = fs.createWriteStream('data2.csv');
writeCSV.write('id,description,body,images\n', 'utf8');

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 10,
    min: 4
  }
});

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
      var sentenceNumber = Math.round(Math.random() * 2) + 4;
      var description = lorem.generateSentences(sentenceNumber);
      var paragraphNumber = Math.round(Math.random() * 4) + 2;
      var body = lorem.generateParagraphs(paragraphNumber);
      var imageNumber = Math.round(Math.random() * 9) + 1;
      var images = '';
      for (var k = 0; k < imageNumber; k++) {
        if (k === 0) {
          images += `[${Math.round(Math.random() * 1000)},`;
        } if (k === imageNumber - 1) {
          images += `${Math.round(Math.random() * 1000)}]`
        } else {
          images += `${Math.round(Math.random() * 1000)},`;
        }
      }
      var line = `${id},  ${description},  ${body},  ${images}\n`;
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