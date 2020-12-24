var express = require('express')
var multer  = require('multer')
var fs = require('fs')
const path = require("path");
const imageJson = require("./images.json")
 


const storage = multer.diskStorage({
  destination: "./photo-gallary",
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage});

const port = 5000;

var app = express();

app.use(express.static("./photo-gallary/public"));
app.post("/save-image", upload.single("avatar"), (req, res, next) => {
  imageJson.push({ imageFile: req.file.filename, caption: req.body.caption });
  const data = JSON.stringify(imageJson, null, 2);
  fs.writeFile("./images.json", data, function (err) {
      res.redirect("./gallery.html")
      console.log('Saved!');
  });


  console.log(req.file);
  console.log(req.body)
  res.send("done");
});

app.get("/json",  (req, res) => { 
  res.sendFile(path.join(`${__dirname}/image.json`))
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


