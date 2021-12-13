const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: "config.ACCESS_KEY_ID",
    secretAccessKey: "config.SECRET_ACCESS_KEY"
});

const unixTime = () => {
    var u = new Date();
    return u.getFullYear() +
        '' + ('0' + u.getUTCMonth()).slice(-2) +
        '' + ('0' + u.getUTCDate()).slice(-2) +
        'T' + ('0' + u.getUTCHours()).slice(-2) +
        '' + ('0' + u.getUTCMinutes()).slice(-2) +
        '' + ('0' + u.getUTCSeconds()).slice(-2)
};

const uploadFile = async (req, buffer) => {
    return new Promise(async (resolve, reject) => {
        try {
            let fileName = req.filename;
            let filePath = req.filePath;
            
            s3.putObject({
                // ACL: 'public',
                Bucket: "config.BUCKET_NAME",
                Key: "anup-aws/" + filePath + fileName,
                Body: buffer,
                ContentType: "aplication/json"
            }, (error, response) => {
                if (error) {
                    console.log(error);
                    resolve({ "status": false, "message": "Something went wrong, upload failed." });
                } else {
                    var urlParams = { Bucket: "config.BUCKET_NAME", Key: "anup-aws/" + filePath + fileName };
                    s3.getSignedUrl('getObject', urlParams, (err, url) => {
                        if (error) {
                            resolve({ "status": false, "message": "Something went wrong, upload failed." });
                        } else {
                            resolve({
                                'status': true,
                                'message': "your file upload successfully.",
                                'URL': url[0],
                                'name': fileName
                            });
                        }
                    });
                }
            });
        } catch (e) {
            console.log(e.message);
            reject({ "status": false, "message": "Something went wrong, upload failed." });
        }
    });

}

const utils = {
    uploadFile
} 

export default uploadFile