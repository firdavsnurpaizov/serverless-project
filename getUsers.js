'use strict';
const AWS = require('aws-sdk');

module.exports.handler = async (event) => {
    const { users_table } = process.env
    const scanParams = {
        TableName: users_table,
    };

    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const result = await dynamodb.scan(scanParams).promise();

    if (result.Count === 0) {
        return {
            statusCode: 404,
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify({
            total: result.Count,
            items: await result.Items.map((user) => {
                return {
                    name: user.name,
                };
            }),
        }),
    };
};