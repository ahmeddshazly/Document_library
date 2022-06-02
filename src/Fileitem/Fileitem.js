import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faFileAlt,
  faImage,
  faShare,
  faSpinner,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "./Fileitem.scss";

const Fileitem = ({
  file,
  deleteFile,
  sharefile,
  downloadfile,
  handleChange,
  checked,
}) => {
  let fileextension = "";
  let timeStamp = "";
  if (file.filename) {
    fileextension = file?.filename?.split(".").pop();
    timeStamp =
      file?.timestamp?.split("T")[0] +
      "," +
      file?.timestamp?.split("T")[1].split(".")[0];
  } else if (file[0]?.name) {
    fileextension = file[0]?.name?.split(".").pop();
    timeStamp =
      file[0]?.timestamp?.split("T")[0] +
      "," +
      file[0]?.timestamp?.split("T")[1].split(".")[0];
  }
  const x =
    fileextension === "jpg" ||
    fileextension === "png" ||
    fileextension === "jpeg" ||
    fileextension === "gif" ||
    fileextension === "bmp" ||
    fileextension === "webp" ||
    fileextension === "tif"
      ? true
      : false;

  return (
    <>
      <li className="file-item" key={file.filename}>
        <FontAwesomeIcon icon={x ? faImage : faFileAlt} className="fileicon" />

        <p>
          Upload date:
          {timeStamp}
        </p>
        <p>Number of downloads:{file.numberofdownloads}</p>
        <p>{file.name || file.filename}</p>
        <div className="actions">
          <div className="loading"></div>
          {file.isUploading && (
            <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
          )}
          {!file.isUploading && (
            <FontAwesomeIcon
              icon={faTrash}
              className="fa-trash"
              onClick={() => deleteFile(file._id, file.filename)}
            />
          )}
          {!file.isUploading && (
            <FontAwesomeIcon
              icon={faShare}
              className="fa-share"
              onClick={() => sharefile(file._id)}
            />
          )}
          {!file.isUploading && (
            <FontAwesomeIcon
              icon={faDownload}
              className="fa-download"
              onClick={() => downloadfile(file._id, file.filename)}
            />
          )}
        </div>
        <div className="check-list">
          <input
            type="checkbox"
            checked={checked}
            value={file._id}
            onChange={(e) => handleChange(e)}
          ></input>
        </div>
      </li>
    </>
  );
};

export default Fileitem;
