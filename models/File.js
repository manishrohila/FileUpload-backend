const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const fileSchema = new mongoose.mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    imageUrl:{
        type:String
    },
    tags:{
        type:String
    },
    email:{
        type: String,
    }
});

fileSchema.post("save",async function(doc){
    try{
        console.log("doc",doc);
        //transporter
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth : {
                user : process.env.MAIL_USER,
                pass : process.env.MAIL_PASS,
            },
        })

        // send mail
        let info = await transporter.sendMail({
            from : `Manish Rohila`,
            to: doc.email,
            subject: "New File Uploaded on Cloudinary",
            html: `<h2> hello jee </h2> <p> File Uploaded <p> View here : <a href="${doc.imageUrl}" > ${doc.imageUrl}</a> </p>`,

        })
        console.log(info);
    }
    catch(error){
        console.log(error);
        
    }
})
const File = mongoose.model("File",fileSchema);
module.exports = File;