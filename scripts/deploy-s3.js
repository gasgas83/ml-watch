import fs from 'fs'
import path from 'path'
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import deployOpts from '../deploy-opts.js'
import open from 'open'
import mime from 'mime-types'

const credentialsJSON = fs.readFileSync('s3Credentials.json');
const srCredentials = JSON.parse(credentialsJSON);

process.env.AWS_ACCESS_KEY_ID = srCredentials.key;
process.env.AWS_SECRET_ACCESS_KEY = srCredentials.secret;
process.env.AWS_REGION = 'us-east-1';


const s3 = new S3Client({ region: "us-east-1" });

async function uploadFile(filePath, bucketName, s3KeyPrefix) {
    let extn = filePath.split('.').pop();
    let contentType = mime.lookup(extn) || 'application/octet-stream';

    const fileStream = fs.createReadStream(filePath);
    const fileName = path.basename(filePath);
    const s3Key = path.posix.join(s3KeyPrefix, fileName);
    const uploadParams = {
        Bucket: bucketName,
        Key: s3Key,
        Body: fileStream,
        ContentType: contentType,
    };

    try {
        const result = await s3.send(new PutObjectCommand(uploadParams));
        return result;
    } catch (err) {
        console.error("Error uploading file: ", err);
        throw err;
    }
}

async function uploadFolder(folderPath, bucketName, s3KeyPrefix) {
    const files = fs.readdirSync(folderPath);

    for (const file of files) {
        const filePath = path.join(folderPath, file);
        const stat = fs.statSync(filePath);
        if (stat.isFile()) {
            await uploadFile(filePath, bucketName, s3KeyPrefix);
        } else if (stat.isDirectory()) {
            const newPrefix = path.posix.join(s3KeyPrefix, file);
            await uploadFolder(filePath, bucketName, newPrefix);
        }
    }
}

// Usage
const folderPath = "./dist/";
const bucketName = srCredentials.bucket;
const s3KeyPrefix = deployOpts.assetsPublicPath

uploadFolder(folderPath, bucketName, s3KeyPrefix)
    .then(() => {
        console.log("Carpetas y archivos subidos a S3!")
        open(deployOpts.BASE_APP + '/index.html');
    })
    .catch((err) => console.error("Folder upload failed: ", err));
