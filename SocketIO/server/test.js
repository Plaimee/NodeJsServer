const fs = require('fs');
const fetch = require("node-fetch");
const FormData = require('form-data');

// 👇️ if you use CommonJS require()
// const fs = require('fs')

function toBase64(filePath) {
  const img = fs.readFileSync(filePath);

  return Buffer.from(img).toString('base64');
}

const base64String = toBase64('E:\\work\\ADI\\SocketIO\\outputImg\\28_02_2024_210646.png');
// console.log(base64String);

const withPrefix = 'data:image/png;base64,' + base64String;
// console.log(withPrefix);

const url = 'http://localhost/swapAPI/UploadImgAPI.php'
const formData = new FormData();
formData.append('Image', withPrefix);

fetch(url, {
    method: "POST",
    body: formData,
})
    .then((response) => response.text())
    .then((data) => {
        console.log(data);
    });