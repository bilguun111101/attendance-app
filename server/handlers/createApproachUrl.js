const { S3 } = require('aws-sdk');

const s3 = new S3();
const Expires = 3000;
// const Bucket = "leaf3bbbilguun0426";

exports.handler = async(event) => {
    const {
        Key,
        Bucket,
        ContentType
    } = JSON.parse(event.body);
    // const Bucket = "leaf3bbbilguun0426";

    try {
        const params = {
            Key,
            Bucket,
            Expires,
            ContentType,
        };
        const url = s3.getSignedUrl('putObject', params);
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            },
            body: JSON.stringify({ url })
        }
    } catch (error) {
        return {
            statusCode: 400,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Headers': '*',
            },
            body: JSON.stringify({ error: error.message }),
          };
    }
}