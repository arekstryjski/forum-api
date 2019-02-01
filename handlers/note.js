import uuid from 'uuid';

import { del, get, put, query, update } from '../libs/dynamodb';


export const createNote = event => {
    const data = JSON.parse(event.body);
    const params = {
        TableName: "notes",
        Item: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: uuid.v1(),
            content: data.content,
            attachment: data.attachment,
            nowy: data.extra,
            createdAt: Date.now()
        }
    };

    return put(params);
};

export const getNote = event => {
    const params = {
        TableName: "notes",
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: event.pathParameters.id
        }
    };

    return get(params);
};

export const listNotes = event => {
    const params = {
        TableName: 'notes',
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': event.requestContext.identity.cognitoIdentityId
        }
    };

    return query(params);
};


export const updateNote = event => {
    const data = JSON.parse(event.body);
    const params = {
        TableName: "notes",
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: event.pathParameters.id
        },
        UpdateExpression: "SET content = :content, attachment = :attachment",
        ExpressionAttributeValues: {
            ":attachment": data.attachment || null,
            ":content": data.content || null
        },
        ReturnValues: "ALL_NEW"
    };

    return update(params);
};

export const deleteNote = event => {
    const params = {
        TableName: "notes",
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: event.pathParameters.id
        }
    };

    return del(params);
};