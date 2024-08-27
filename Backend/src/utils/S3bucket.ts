require('dotenv').config();

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const bucketName = process.env.BUCKET_NAME as string;
const bucketAccessKey = process.env.BUCKET_ACCESS_KEY as string;
const bucketSecretKey = process.env.BUCKET_SECRET_KEY as string;
const bucketRegion = process.env.BUCKET_REGION as string;

const s3Client = new S3Client({
    region: bucketRegion, 
    credentials: {
        accessKeyId: bucketAccessKey, 
        secretAccessKey: bucketSecretKey, 
    }
});


export const s3Upload=async(file:any)=>{
    try {
        const params:any={
            Bucket:bucketName,
            Key:file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype,
        }

        await  s3Client.send(new PutObjectCommand(params));
        const url = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${file.originalname}`;

        return url
        
    } catch (error:any) {
        console.log(error.message);
        
    }
}
