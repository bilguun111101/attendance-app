const { DynamoDB } = require('@aws-sdk/client-dynamodb');
const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb');

const bcrypt = require('bcryptjs');
const db = new DynamoDB();

exports.handler = async(event) => {
    const {
        email,
        password,
        username,
    } = JSON.parse(event.body);
    const hash = bcrypt.hashSync(password, 12);
    const user = marshall({
        email,
        username,
        password: hash
    });
    const response = await db.putItem({
        TableName: '',
        Item: user
    });
    return response;
}