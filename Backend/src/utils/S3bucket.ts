require('dotenv').config();

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
// import { isArray } from "util";

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
export const s3BucketForProperty = async (files: any) => {
  try {
      let cretificateUrl: string | undefined;
      let imageUrl: string[] = [];

      if (files.propertyCertificate) {
          const certificateParams = {
              Bucket: bucketName,
              Key: files.propertyCertificate[0].originalname,
              Body: files.propertyCertificate[0].buffer,
              ContentType: files.propertyCertificate[0].mimetype,
          };
          await s3Client.send(new PutObjectCommand(certificateParams));
          cretificateUrl = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${files.propertyCertificate[0].originalname}`;
      }

      if (files.propertyImages) {
          for (const file of files.propertyImages) {
              const imageParams = {
                  Bucket: bucketName,
                  Key: file.originalname,
                  Body: file.buffer,
                  ContentType: file.mimetype,
              };
              await s3Client.send(new PutObjectCommand(imageParams));
              let url = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${file.originalname}`;
              imageUrl.push(url);
          }
      }


      if (Array.isArray(files)) {
        for (const file of files) {
            const imageParams = {
                Bucket: bucketName,
                Key: file.originalname,
                Body: file.buffer,
                ContentType: file.mimetype,
            };
            await s3Client.send(new PutObjectCommand(imageParams));
            let url = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${file.originalname}`;
            imageUrl.push(url);
        }
    }

      return { cretificateUrl, imageUrl };
  } catch (error: any) {
      console.log(error.message);
      return { cretificateUrl: undefined, imageUrl: [] }; 
  }
}

