import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const client = new S3Client({});
import fs from 'fs'
const BUCKET_NAME = "designfly"


export const StoreInS3 = async (objectKey, file) => {


    const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: objectKey,
        Body: imageData,
    });

    try {
        const response = await client.send(command);
        console.log(response);
        return response
    } catch (err) {
        console.error(err);
        return err
    }
};
