const { DynamoDB } = require('@aws-sdk/client-dynamodb');
const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb');

const bcrypt = require('bcryptjs');
const db = new DynamoDB();

exports.handler = async(event) => {
    const {
        email,
        password
    } = JSON.parse(event.body);
    try {
        const response = await db.getItem({
            TableName: 'Attendance',
            Key: marshall({ email })
        })
        // if(!response) 
        //     return {
        //         statusCode: 403,
        //         headers: {
        //             'Access-Control-Allow-Origin': '*',
        //             'Access-Control-Allow-Headers': '*',
        //         },
        //         body: JSON.stringify({ message: "Empty" })
        //     }
        // if()
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            },
            body: JSON.stringify(unmarshall(response))
        }
    } catch (error) {
        return {
            statusCode: 402,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            },
            body: JSON.stringify({ message: error.message })
        }
    }
}