import AWS from "aws-sdk";

export const callDynamoDB = (action, params) => {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();

    return dynamoDb[action](params).promise();
};
