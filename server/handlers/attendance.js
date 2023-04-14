const { DynamoDB } = require('@aws-sdk/client-dynamodb');
const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb');

const db = new DynamoDB();
const Bucket = "Attendance";

exports.handler = async(event) => {
    const {
        day,
        hour,
        month,
        email,
        userID,
        minutes,
    } = JSON.parse(event.body);
    try {
        let response;
        if(hour - 9 === 0) {
            if(minutes === 0) response = 'Ирсэн';
            if(minutes > 30) response = "Хоцорсон";
        }
        if(hour - 9 < 0) response = "Ирсэн";
        if(hour - 9 > 0) {
            response = 'Хоцорсон';
            if(hour - 12 >= 0) response = "Тасалсан";
        }
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            },
            body: JSON.stringify({ attendance: response })
        }
    } catch (error) {
        return {
            statusCode: 405,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            },
            body: JSON.stringify({ message: error.message })
        }
    }
}