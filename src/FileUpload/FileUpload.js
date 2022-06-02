import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./FileUpload.scss";
import axios from "axios";

const FileUpload = ({ files, setFiles, removefile }) => {
  const uploadHandler = (event) => {
    const file = event.target.files;

    if (!file) return;
    file.isUploading = true;
    setFiles([...files, file]);
    // upload
    const formData = new FormData();
    for (const f of file) {
      formData.append("new file", f, f.name);
    }

    axios
      .post("http://localhost:8080/upload", formData)
      .then((res) => {
        file.isUploading = false;

        setFiles([...files, ...res.data.newFiles]);
      })
      .catch((err) => {
        // inform user with errors
        console.error(err);
        removefile(file.name);
      });
  };

  return (
    <>
      <div className="file-box">
        <div className="file-input">
          <input
            type="file"
            accept="image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf,.csv"
            name="files"
            onChange={(e) => uploadHandler(e)}
            multiple
          />

          <button>
            <i>
              <FontAwesomeIcon icon={faPlus} />
            </i>
            Upload
          </button>
        </div>

        <p className="main">Supported files</p>
        <p className="info">PDF,Excel,Word,Powerpoint,txt,images</p>
      </div>
    </>
  );
};

export default FileUpload;
