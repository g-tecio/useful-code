'use strict';

console.log('Starting Function...');
const doc = require('dynamodb-doc');
const AWS = require('aws-sdk');
var s3 = new AWS.S3();
const docClient = new doc.DynamoDB();
var img;
exports.handler = (event, context, callback) => {
   
    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : res,
        headers: {
            'img': img+"j",
            'Content-Type': 'application/json'+img+'m'
        },
    });


    switch (event.httpMethod) {
        case 'GET':
           if (event.queryStringParameters !== undefined) {
                docClient.scan({ TableName: event.queryStringParameters.TableName }, done);
            }
            else {
                docClient.getItem(event.body, done);
            }    
            break;
        case 'DELETE':
            docClient.deleteItem(event.body, done);
            
        case 'POST':
            event.body.Item.id = generateID();
            if(event.body.Item.src) {
                //let encodedImage = JSON.parse(event.body.Item.src);
                let encodedImage = event.body.Item.src;
                var buf = encodedImage.replace(/^data:image\/\w+;base64,/, "");
                let decodedImage = Buffer.from(buf, 'base64');
                //var filePath = event.queryStringParameters.name + "-" + Date.now() + ".jpg";
                var filePath = "" + Date.now() + ".jpg";
                var params = {
                    "Body": decodedImage,
                    "Bucket": "cmsimagesfromlabda",
                    "Key": filePath,
                    "ContentType": "image/jpg"
                };
                s3.upload(params, function(err, data){
                    if(err) {
                        callback(err, null);
                    } else {
                        
                        let response = {
                            "statusCode": 200,
                            "headers": {
                                "my_header": "my_value"
                            },
                            "body": JSON.stringify(data),
                            "isBase64Encoded": false
                        };
                        callback(null, response);
                        event.body.Item.src= data.Location;
                        
                        docClient.putItem(event.body, done);
                    }
                });
            } else {
                docClient.putItem(event.body, done);
            }
            break;
            
            default:
            done(new Error(`Unsupported method "${event.httpMethod}"`));
    }
};

function generateID(){
    const NUMS_TO_REPLACE = 2;
  let date = new Date().getTime();
  date = date.toString();
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (let i = 0; i < NUMS_TO_REPLACE; i++) {
      let random = chars.charAt(Math.floor(Math.random() * 10));
      date += random;
  }
  date += Math.floor(Math.random() * 10).toString();
  return date;
}
