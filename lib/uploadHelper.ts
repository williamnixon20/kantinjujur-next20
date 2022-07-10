import AWS from "aws-sdk";

const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export default async function upload(imageName: string, base64Image: string) {
    const params = {
        Bucket: `${BUCKET_NAME}`,
        Key: imageName,
        //@ts-ignore
        Body: new Buffer.from(
            base64Image.replace(/^data:image\/\w+;base64,/, ""),
            "base64"
        ),
    };

    try {
        let data = await promiseUpload(params);
        return data.Location;
    } catch (err) {
        throw Error(err.message);
    }
}

function promiseUpload(params) {
    return new Promise(function (resolve, reject) {
        s3.upload(params, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}
