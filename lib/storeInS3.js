import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import {
    getSignedUrl,
} from "@aws-sdk/s3-request-presigner";

const client = new S3Client({});
// import fs from 'fs'
const BUCKET_NAME = "designfly"


// export const StoreInS3 = async (objectKey, file) => {


//     const command = new PutObjectCommand({
//         Bucket: BUCKET_NAME,
//         Key: objectKey,
//         Body: imageData,
//     });

//     try {
//         const response = await client.send(command);
//         console.log(response);
//         return response
//     } catch (err) {
//         console.error(err);
//         return err
//     }
// };



export const getPresignedUrl = async (objectKey) => {

    try {


        const getUrl = (BUCKET_NAME, objectKey) => {

            const command = new PutObjectCommand({ Bucket: BUCKET_NAME, Key: objectKey });
            return getSignedUrl(client, command, { expiresIn: 3600 });
        };

        const url = await getUrl(BUCKET_NAME, objectKey)

        console.log("data from the pregined url ")
        console.log(url)

        return url
    }

    catch (error) {

        console.log(error)
        return error
    }
}