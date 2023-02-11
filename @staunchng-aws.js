// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
var fs = require('fs');


module.exports = AMAZON_S3_UPLOAD =({
  accessKey:accessKey,
  secretKey:secretKey,
  Bucket:Bucket,
  FileDIR:FileDIR,
})=>{
  // Create S3 service object
var s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  accessKeyId: accessKey,
  secretAccessKey: secretKey,
}
);

// call S3 to retrieve upload file to specified bucket
var uploadParams = {
  Bucket: Bucket, 
  Key: '', 
  Body: '',
  ACL:'public-read'
};
var file = FileDIR;

// Configure the file stream and obtain the upload parameters
var fileStream = fs.createReadStream(file);
fileStream.on('error', function(err) {
console.log('File Error', err);
});
uploadParams.Body = fileStream;
var path = require('path');
uploadParams.Key = path.basename(file);

// call S3 to retrieve upload file to specified bucket
s3.upload (uploadParams, function (err, data) {
if (err) {
  console.log("Error", err);
} if (data) {
  console.log("Upload Success", data.Location);
}
});
}