import React, { useRef, useState } from "react";
import "./styles.css";
import * as Actions from "./handle";
import * as PhotoEditor from "./photoRestoration";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

export default function App() {
  const cropperRef = useRef(null);
  const fileRef = useRef(null);
  const [fileOrigin, setFileOrigin] = useState();

  const download = () => {
    const base64Value = PhotoEditor.getPhotoDataRestoration(cropperRef.current);
    if (base64Value === false) return alert("Base 64 false");
    const base64 = Actions.reduceLosingQuality(base64Value);
    Actions.getDownloadByBase64(base64, fileOrigin);
  };

  const handleScroper = (e) => {
    // setScopper(cropperRef.current);
    // console.log('current: ', cropperRef.current.getCroppedCanvas().toDataURL()); //Base 64
    // console.log('val : ', e);
  };

  const upload = async (event) => {
    const { files } = event.target;
    setSrc(await Actions.toBase64(files[0]));
    setFileOrigin(files[0]);
  };
  const [src, setSrc] = useState(
    "https://karryon.com.au/wp-content/uploads/2022/06/Mr-Bean.jpg"
  );
  return (
    <div>
      <Cropper
        ref={cropperRef}
        src={src}
        style={{ height: 500, width: "100%" }}
        // Cropper.js options
        // aspectRatio={3 / 4}
        guides={false}
        crop={(e) => handleScroper(e)}
        dragMode={true}
        autoCrop={false}
      />
      <div>
        <button onClick={() => Actions.crop(cropperRef, true)}>crop</button>
        <button onClick={() => Actions.crop(cropperRef, false)}>
          dont crop
        </button>
        <button onClick={() => Actions.rotate(cropperRef, -90)}>
          rotate right
        </button>
        <button onClick={() => Actions.rotate(cropperRef, 90)}>
          rotate left
        </button>
        <button onClick={() => Actions.scaleY(cropperRef, -1)}>
          scale Y +
        </button>
        <button onClick={() => Actions.scaleY(cropperRef, 1)}>scale Y -</button>
      </div>
      <div>
        <button onClick={download}>Download</button>
      </div>
      <div>
        <input
          type="file"
          ref={fileRef}
          name="logo"
          className="inputFileBtnHide"
          onChange={(e) => upload(e)}
          onClick={(e) => {
            // ,同じファイルを上げれるようにvalueを初期化する
            e.target.value = "";
          }}
        />
      </div>
    </div>
  );
}
