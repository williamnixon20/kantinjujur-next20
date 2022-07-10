import AWS from "aws-sdk";

const BUCKET_NAME = process.env.BUCKET_NAME_AWS;
const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID_AWS,
    secretAccessKey: process.env.SECRET_ACCESS_KEY_AWS,
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
        let data = <any>await promiseUpload(params);
        return data.Location;
    } catch (err: any) {
        throw Error(err.message);
    }
}

function promiseUpload(params: any) {
    return new Promise(function (resolve, reject) {
        s3.upload(params, function (err: any, data: any) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}
