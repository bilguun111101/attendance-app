const { S3 } = require('@aws-sdk/client-dynamodb');

const s3 = new S3();
const Expires = 3000;
const Bucket = "leaf3bbbilguun0426";

exports.handler = async(event) => {
    const {
        Key,
        ContentType
    } = JSON.parse(event.body);

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
            "Access-Control-Allow-Headers" : "*",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ url })
    }
}