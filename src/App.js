import "./App.css";
import { useState, useEffect } from "react";
import FileUpload from "./FileUpload/FileUpload";
import FileList from "./FileList/FileList";
import axios from "axios";

function App() {
  useEffect(() => {
    const getAllFiles = async () => {
      axios
        .get(`http://localhost:8080/getAllFiles`)
        .then((res) => {
          setFiles(res.data);
        })
        .catch((err) => console.error(err));
    };
    getAllFiles();
  }, []);

  const [files, setFiles] = useState([]);
  const removefile = (filename) => {
    setFiles(files.filter((file) => file.filename !== filename));
  };
  console.log(files);
  return (
    <div className="App">
      <p className="title">Upload file</p>
      <FileUpload files={files} setFiles={setFiles} removefile={removefile} />
      <FileList files={files} removefile={removefile} setFiles={setFiles} />
    </div>
  );
}

export default App;
