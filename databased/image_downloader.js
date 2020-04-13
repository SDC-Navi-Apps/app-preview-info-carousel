var fs = require('fs');
var https = require('https');
var Promise = require('bluebird');

const streamToFile = (i) => {
  var url = `https://i.picsum.photos/id/${i}/300/300.jpg`;
  var path = FULL_PATH;
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(path)
    https.get(url, (response) => {response.pipe(file)})
      .on('finish', resolve)
      .on('error', reject)
  })
}


var massDownload = function(i) {
  for (var j = (i); j <= (i + 100); j++) {
    streamToFile(j)
  }
};

massDownload(1001);




