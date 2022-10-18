export const getPhotoDataRestoration = cropperRef => {
  if (cropperRef.getCroppedCanvas() == null) return false;
  const base64 = cropperRef.getCroppedCanvas().toDataURL();
  return base64;
};
