const File = require("../models/File");
const cloudinary = require("cloudinary").v2;
//localfileUpload --> handler function

exports.localFileUpload = async (req, res) => {
    try {
        const file = req.files.file;
        console.log("file aa gayi", file);

        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        file.mv(path, (err) => {
            console.log(err);
        });
        res.json({
            success: true,
            message: "local file uploaded successfully"
        })
    }
    catch (error) {
        console.log(error);
    }
}
async function uploadFileToCloudinary(file, folder,quality) {
    const options = { folder };
    options.resource_type = "auto";
    if(quality){
        options.quality=quality;
    }
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}
function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

//image upload ka handler
exports.imageUpload = async (req, res) => {
    try {
        //data fetch
        const { name, tags, email } = req.body;
        console.log(name, tags, email);
        const file = req.files.imageFile;
        console.log(file);
        // validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log(fileType);

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File format not supported",
            })
        }

        // file format supported
        const response = await uploadFileToCloudinary(file, "codehelp");


        console.log("checking the response", response);
        // db me entry save kerni hai 

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })
        res.json({

            success: true,
            imageUrl: response.secure_url,
            message: "image uploaded successfully"
        })

    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong",
        })
    }


}

// video upload handler

exports.videoUpload = async (req, res) => {
    try {
        //data fetch
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const file = req.files.videoFile;

        //validation
        const supportedTypes = ["mp4", "mov"];

        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("file Type: ", fileType);

        // add a upper limit of 5MB for video

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "file format not supported",
            })
        }
        const response = await uploadFileToCloudinary(file, "codehelp");


        console.log("checking the response", response);
        // db me entry save kerni hai 

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })
        res.json({

            success: true,
            imageUrl: response.secure_url,
            message: "image uploaded successfully"
        })



    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "something went wrong"
        })
    }
}

exports.imageSizeReducer = async (req, res) => {
    try {
        const { name, tags, email } = req.body;
        console.log(name, tags, email);
        const file = req.files.imageFile;
        console.log(file);
        // validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log(fileType);

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File format not supported",
            })
        }
 
        // file format supported

        //TODO : height attribute
        const response = await uploadFileToCloudinary(file, "codehelp",80);


        console.log("checking the response", response);
        // db me entry save kerni hai 

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })
        res.json({

            success: true,
            imageUrl: response.secure_url,
            message: "image uploaded successfully"
        })

    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong",
        })
    }
}