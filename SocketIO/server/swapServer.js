const axios = require('axios');
const { Server } = require('socket.io');
const io = new Server(8080);
const fs = require('fs');
const fetch = require("node-fetch");
const FormData = require('form-data');

io.on('connection', (socket)=>{
    console.log('socket connected');

    socket.on("savePath", (data) => {
        console.log("save path is ", data);

        socket.broadcast.emit("sendPath", data);
    });

    socket.on("output", (data) => {
        console.log("Received output data:", data);
        if(data == undefined) {
            console.log(`output path is ${data}`);
            socket.broadcast.emit("noFaceDetected", "No Face Detected, Please Try again.");
        } else {
            console.log(`output path is ${data}`);
            const base64String = toBase64(data);
            const withPrefix = 'data:image/png;base64,' + base64String;
            // console.log(withPrefix);
            const url = 'https://funcslash.com/artistries/swapswap/UploadImgAPI.php'
            const formData = new FormData();
            formData.append('Image', withPrefix);
            
            fetch(url, {
                method: "POST",
                body: formData,
            })
                .then((response) => response.text())
                .then((data) => {
                    console.log(data);
                    socket.broadcast.emit("imgToQrCode", data);
                });
                
            socket.broadcast.emit("outputPath", data);
        }
    });
});

console.log('listening on port 8080');

function toBase64(filePath) {
    const img = fs.readFileSync(filePath);
  
    return Buffer.from(img).toString('base64');
}