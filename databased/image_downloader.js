var fs = require('fs');
var https = require('https');
var Promise = require('bluebird');

const streamToFile = (i) => {
  var url = `https://i.picsum.photos/id/${i}/200/300.jpg`;
  var path = `./images/${i}.jpg`;
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(path)
    https.get(url, (response) => {response.pipe(file)})
      .on('finish', resolve)
      .on('error', reject)
  })
}


var massDownload = function(i) {
  for (var j = (i + 1); j <= (i + 500); j++) {
    streamToFile(j)
  }
};

massDownload(0);




