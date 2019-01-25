import AWS from "aws-sdk";
import { failure, success } from './http-response';

const call = (action, params) => {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();

    return dynamoDb[action](params).promise();
};

export const put = async params => {
    try {
        await call("put", params);
        return success(params.Item);
    }
    catch (e) {
        console.log(e);
        return failure({ status: false });
    }
};

export const get = async params => {
    try {
        const result = await call('get', params);
        return result.Item
            ? success(result.Item)
            : failure({ status: false, error: "Item not found." });
    }
    catch (e) {
        console.log(e);
        return failure({ status: false });
    }
};

export const query = async params => {
    try {
        const result = await call('query', params);
        return success(result.Items);
    }
    catch (e) {
        return failure({ status: false });
    }
};

export const update = async params => {
    try {
        await call("update", params);
        return success(params.Item);
    }
    catch (e) {
        console.log(e);
        return failure({ status: false });
    }
};

export const del = async params => {
    try {
        const result = await call('delete', params);
        return success({ status: true });
    }
    catch (e) {
        return failure({ status: false });
    }
};

