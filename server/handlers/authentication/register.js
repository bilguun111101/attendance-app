const { DynamoDB } = require('@aws-sdk/client-dynamodb');
const { marshall } = require('@aws-sdk/util-dynamodb');

const bcrypt = require('bcryptjs');
const db = new DynamoDB();

exports.handler = async(event) => {
    const {
        email,
        userID,
        username,
        password,
    } = JSON.parse(event.body);
    try {
        const hash = bcrypt.hashSync(password, 12);
        const user = marshall({
            email,
            userID,
            username,
            password: hash
        });
        const response = await db.putItem({
            TableName: 'Attendance',
            Item: user
        });
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            },
            body: JSON.stringify({ message: response.$metadata }),
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