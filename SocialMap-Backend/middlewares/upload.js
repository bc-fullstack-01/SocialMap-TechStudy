const multer = require("multer")
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3")

const bucketName = process.env.BUCKET_NAME

const config = {
    region: "us-east-1",
    endpoint: process.env.BUCKET_ENDPOINT || "http://localhost:9000/",
    forcePathStyle: true,
    sslEnable: false,
    signatureVersion: "v4",
    credentials: {
        accessKeyId: process.env.BUCKET_ACCESS_KEY || "ednoAlmeida",
        secretAccessKey: process.env.BUCKET_SECRET_KEY || "sysMapCamp"
    }
}

const s3Client = new S3Client(config)


function saveFileInBucketS3(req, res, next) {
    if (req.file) {
        const filename = `${req.user.user}/${req.file.originalname}`
        return s3Client.send(new PutObjectCommand({
            Bucket: bucketName,
            Key: filename,
            ContentType: req.file.mimetype,
            Body: req.file.buffer
        })).then(() => {
            req.body.image = true
            req.body.midia = `${process.env.BUCKET_HOST || config.endpoint}${bucketName}/${filename}`
            return next()
        }).catch((err => {
            next(err)
        }))

    } else {
        next()
    }
}



module.exports = [
    multer({ storage: multer.memoryStorage() }).single("file"),
    saveFileInBucketS3
]
