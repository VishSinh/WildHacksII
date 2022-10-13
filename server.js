const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const ejs = require("ejs");


const upload = multer({
    dest: "image/"
});
const app = express();

let infoList = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));


app.get(`/`, function (req, res) {
    res.render(`index`);
});

app.get(`/form`, function (req, res) {
    res.render(`form`);
});

app.get(`/list`, function (req, res) {
    res.render(`list`, {
        infoList: infoList
    });
})

app.post(`/form`, upload.single("image"), function (req, res) {
    let info = {
        animal: req.body.animal,
        breed: req.body.breed,
        location: req.body.location,
        description: req.body.description,
        phoneNumber: req.body.phoneNumber
    }

    console.log(req.body);
    console.log(req.files);

    console.log(info);

    infoList.push(info);
    res.redirect(`/`);
})

app.listen(3000, function () {
    console.log(`Server running on port 3000`);
});