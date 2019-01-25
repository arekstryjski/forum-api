import uuid from 'uuid';

import { callDynamoDB } from '../libs/dynamodb';
import { failure, success } from '../libs/http-response';


export const main = async event => { //(event, context) => {
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
        return failure({ status: false });
    }
};
