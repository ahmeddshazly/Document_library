const { app } = require("./Xpress");
const multer = require("multer");
const document = require("./models/document");
const path = require("path");
const fs = require("fs");

const { connect } = require("./database");
connect();

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./files"); //direct path from our current file to storage location
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngine });

app.post("/upload", upload.any("files"), async (req, res, next) => {
  let files = req.files;

  if (!files) {
    const error = new Error("Please choose files");
    error.httpStatusCode = 400;
    return next(error);
  }
  files = files.map((file) => {
    return {
      filename: file.originalname,

      filepath: file.destination + "/" + file.filename,
    };
  });

  document
    .insertMany(files)
    .then(function (newFiles) {
      return res
        .status(200)
        .json({ newFiles, result: true, msg: "file uploaded" });
    })
    .catch(function (error) {
      return res.status(400).json({ error });
    });
});

app.post("/getFile", (req, res) => {
  const filename = req.body.filename;
  document
    .findOne(filename)
    .then(function (file) {
      return res.status(200).json(file);
    })
    .catch(function (error) {
      return res.status(400).json({ error });
    });
});

app.get("/geturl/:id", async (req, res) => {
  const file = await document.findById(req.params.id);
  const filePathTruncate = file.filepath?.substring(1);
  const filepath = path.join(__dirname, filePathTruncate);

  if (fs.existsSync(filepath)) {
    return fs.createReadStream(filepath).pipe(res);
  } else {
    res.status(500);
    console.log("File not found");
    return res.send("File not found");
  }
});
app.get("/delete/:id", async (req, res) => {
  try {
    await document.findByIdAndDelete(req.params.id);
    res.json({ msg: "Document deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ err: error.message || "Error while deleting document" });
  }
});

app.get("/getAllFiles", async (req, res) => {
  document
    .find()
    .then(function (files) {
      return res.status(200).json(files);
    })
    .catch(function (error) {
      return res.status(400).json({ error });
    });
});

app.get("/download/:id", async (req, res) => {
  const file = await document.findById(req.params.id);
  const filePathTruncate = file.filepath?.substring(1);
  const filepath = path.join(__dirname, filePathTruncate);
  const numberOfDownloads = ++file.numberofdownloads;

  try {
    await document.findByIdAndUpdate(
      file._id,
      {
        numberofdownloads: numberOfDownloads,
      },
      { new: true }
    );
  } catch (e) {
    console.log(e);
  }
  return res.sendFile(filepath); // Set disposition and send it.
});

app.listen(8080, () => {
  console.log(`Server running on port 8080`);
});
