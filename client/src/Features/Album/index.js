import React from "react";
import AlbumList from "./components/AlbumList";

AlbumFeature.propTypes = {};

function AlbumFeature(props) {
  const albumList = [
    {
      id: 1,
      title: "Nhạc Sĩ Hát",
      thumbnaiUrl:
        "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/5/d/a/7/5da7f2c1b6b33ed1c1ad7a4010947d42.jpg",
    },
    {
      id: 2,
      title: "Những Sự Kết Hớp Mới",
      thumbnaiUrl:
        "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/f/2/2/7/f227136f424d34ad2082199b97df1f13.jpg",
    },
    {
      id: 3,
      title: "Giọng Hát Mới Nỗi Bật",
      thumbnaiUrl:
        "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/c/0/1/b/c01b58ccfdee5a9354f814addeb4badf.jpg",
    },
  ];
  return (
    <div>
      <h3>KHÁM PHÁ ÂM NHẠC</h3>
      <AlbumList albumList={albumList} />
    </div>
  );
}

export default AlbumFeature;
