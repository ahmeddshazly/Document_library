import axios from "axios";
import React, { useState } from "react";
import Fileitem from ".././Fileitem/Fileitem";
import fileDownload from "js-file-download";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./FileList.scss";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

const FileList = ({ files, removefile, setFiles }) => {
  const deleteFileHandler = (id, _name) => {
    axios
      .get(`http://localhost:8080/delete/${id}`)

      .then((res) => removefile(_name))
      .catch((err) => console.error(err));
  };
  const sharefilehandler = async (id) => {
    if (navigator.share) {
      navigator
        .share({
          title: "Shared document",
          text: "Check my document",

          url: `http://localhost:8080/geturl/${id}`,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    }
  };
  const downloadfilehandler = (id, name) => {
    axios
      .get(`http://localhost:8080/download/${id}`, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, name);

        const newArr = files.map((obj) => {
          if (obj._id === id) {
            return { ...obj, numberofdownloads: ++obj.numberofdownloads };
          }

          return obj;
        });
        setFiles([...newArr]);
      });
  };
  const [checked, setChecked] = React.useState(false);

  const [checkedfiles, setCheckedfiles] = useState([]);

  const downloadmulti = () => {
    for (const checkfile of checkedfiles) {
      const selectedFile = files.find((file) => file._id === checkfile);

      downloadfilehandler(selectedFile._id, selectedFile.filename);
    }
  };
  const handleChangehandler = (event) => {
    setChecked(!checked);
    if (event.target.checked == true) {
      setCheckedfiles([...checkedfiles, event.target.value]);
    } else {
      setCheckedfiles([
        ...checkedfiles.splice(checkedfiles.indexOf(event.target.value), 1),
      ]);
    }
  };

  return (
    <ul className="file-list">
      <div className="downloadMulti">
        <button onClick={() => downloadmulti()}>
          <i>
            <FontAwesomeIcon icon={faDownload} />
          </i>
          Download selected files
        </button>
      </div>
      {files &&
        files.map((f) => (
          <Fileitem
            key={f.name}
            file={f}
            deleteFile={deleteFileHandler}
            sharefile={sharefilehandler}
            downloadfile={downloadfilehandler}
            handleChange={handleChangehandler}
          />
        ))}
    </ul>
  );
};

export default FileList;
