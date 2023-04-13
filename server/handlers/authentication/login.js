const { DynamoDB } = require('@aws-sdk/client-dynamodb');
const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb');
// const AWS = require('aws-sdk');

const bcrypt = require('bcryptjs');
const db = new DynamoDB();

exports.handler = async(event) => {
    const {
        email,
        password
    } = JSON.parse(event.body);

    try {
        const { Item } = await db.getItem({
            TableName: 'attendance',
            Key: marshall({ email })
        })
        const { password: hash, username, userID } = unmarshall(Item);
        const isPasswordTrue = await bcrypt.compare(password ,hash);
        if(!isPasswordTrue) {
            return {
                statusCode: 201,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                },
                body: JSON.stringify({ message: 'Bad request' })
            }
        }
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            },
            body: JSON.stringify({
                email,
                userID,
                username
            })
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