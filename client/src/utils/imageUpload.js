export const checkImage = (file) => {
  let err = '';
  if (!file) return (err = 'File does not exist.');
  if (file.size > 1024 * 1024)
    //1mb
    err = 'The image largest size is 1mb';
  if (file.type !== 'image/jpeg' && file.type !== 'image/png') err = 'Image format is incorrect.';
  return err;
};

export const imageUpload = async (images) => {
  let imgArr = [];
  for (const item of images) {
    const formData = new FormData();

    if (item.camera) {
      formData.append('file', item.camera);
    } else {
      formData.append('file', item);
    }

    formData.append('upload_preset', 'atmnffwf');
    formData.append('cloud_name', 'dp5ku4grg');

    const res = await fetch('https://api.cloudinary.com/v1_1/dp5ku4grg/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    imgArr.push({ public_id: data.public_id, fileName: data.original_filename, url: data.secure_url });
  }
  return imgArr;
};
