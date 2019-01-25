import uuid from 'uuid';

import { callDynamoDB } from '../libs/dynamodb';
import { failure, success } from '../libs/http-response';


export const create = async event => {
    const data = JSON.parse(event.body);
    const params = {
        TableName: "notes",
        Item: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: uuid.v1(),
            content: data.content,
            attachment: data.attachment,
            createdAt: Date.now()
        }
    };

    try {
        await callDynamoDB("put", params);
        return success(params.Item);
    }
    catch (e) {
        console.log(e);
        return failure({ status: false });
    }
};

export const get = async event => {
    const params = {
        TableName: "notes",
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: event.pathParameters.id
        }
    };

    try {
        const result = await callDynamoDB('get', params);
        return result.Item
            ? success(result.Item)
            : failure({ status: false, error: "Item not found." });
    }
    catch (e) {
        console.log(e);
        return failure({ status: false });
    }
};
