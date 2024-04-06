import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import {
    getSignedUrl,
} from "@aws-sdk/s3-request-presigner";


const client = new S3Client({});
const BUCKET_NAME = process.env.S3_BUCKET_NAME 





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