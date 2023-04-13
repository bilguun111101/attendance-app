const AWS = require('aws-sdk');
const rekognition = new AWS.Rekognition();

const Bucket = "leaf3bbbilguun0426"
const BucketAttendance = "leaf3bbbilguun0426attendance"

exports.handler = async(event) => {
    const { Name } = JSON.parse(event.body);
    const params = {
        SourceImage: {
          S3Object: {
            Bucket,
            Name,
          },
        },
        TargetImage: {
          S3Object: {
            Bucket: BucketAttendance,
            Name,
          },
        },
        SimilarityThreshold: 70,
    };
    try {
        const { FaceMatches } = await rekognition.compareFaces(params).promise();
        if(!FaceMatches) {
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                },
                body: JSON.stringify({ message: "bad request" })
            }
        }
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            },
            body: JSON.stringify({ FaceMatches: FaceMatches.at(0).Similarity })
        }
    } catch (error) {
        return {
            statusCode: 401,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            },
            body: JSON.stringify({ message: error.message })
        }
    }
}