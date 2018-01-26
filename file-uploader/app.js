var express = require('express');
var app = express();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var xml2js = require('xml2js');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'views/upload.html'));
});

app.get('/synchro', function(req, res){
  res.sendFile(path.join(__dirname, 'views/player.html'));
});

app.get('/preview', function(req, res){
  res.sendFile(path.join(__dirname, 'views/preview.html'));
});

app.post('/upload', function(req, res){
  // create an incoming form object
  var form = new formidable.IncomingForm();

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '/public/uploads');

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
  });

  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });
  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    res.end('success');
  });

  // parse the incoming request containing the form data
  form.parse(req);

});

app.post('/',function(req,res){

  'use strict';

  console.log('Starting');
  const child_process = require('child_process');
  console.log('exec info.sh');
  const process = child_process.exec('./info.sh public/uploads/Rvideo.mp4 public/uploads/Lvideo.mp4 public/uploads/Gvideo.mp4');
  process.on('exit', () => {
    console.log('process exit');
  });
  process.stdout.on('data', (data) => {
    console.log('Output: ' + data.toString('utf8'));
  });

/*
      var parser = new xml2js.Parser();
      fs.readFile('./data.xml', function(err, data) {
          parser.parseString(data, function (err, result) {
              console.dir(result);
              console.log('Done');
          });
        });*/
})


var server = app.listen(8080, function(){
  console.log('Server listening on port 8080');
});
