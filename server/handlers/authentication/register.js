const { DynamoDB } = require('@aws-sdk/client-dynamodb');
const { marshall } = require('@aws-sdk/util-dynamodb');

const bcrypt = require('bcryptjs');
const db = new DynamoDB();

exports.handler = async(event) => {
    const {
        email,
        userId,
        username,
        password,
    } = JSON.parse(event.body);
    const hash = bcrypt.hashSync(password, 12);
    const user = marshall({
        email,
        userId,
        username,
        password: hash
    });
    const response = await db.putItem({
        TableName: '',
        Item: user
    });
    return response;
}