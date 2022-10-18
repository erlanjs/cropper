//CONTROL EDITOR--------------------------
export const crop = (cropperRef, value) => {
  if (value) {
    cropperRef.current.crop();
  } else {
    cropperRef.current.clear();
  }
};
export const rotate = (cropperRef, value) => {
  cropperRef.current.rotate(value);
};
export const scaleY = (cropperRef, value) => {
  cropperRef.current.scaleY(value);
};
//CONTROL EDITOR------------------------------

//UPFILE
export const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const getDownloadByBase64 = (data, file) => {
  try {
    const link = document.createElement("a");
    link.download = "download_" + file.name;
    link.href = data;
    link.setAttribute("download", "download_" + file.name);
    document.body.appendChild(link);
    link.click();
  } catch {
    alert("Error Download");
  }
};

export const reduceLosingQuality = (base64) => {
  return base64;
};
