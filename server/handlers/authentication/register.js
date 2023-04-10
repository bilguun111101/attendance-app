const { DynamoDB } = require('@aws-sdk/client-dynamodb');
const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb');

const bcrypt = require('bcryptjs');

exports.handler = async(event) => {}