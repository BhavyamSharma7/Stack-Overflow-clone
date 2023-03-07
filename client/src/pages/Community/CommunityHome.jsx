import React, { useEffect, useState } from "react";
import "./Community.css";
import Poster from "../../assets/community-bg.png";
import Logo from "../../assets/icon.png";
import AboutCommunity from "./AboutCommunity";
import Post from "../../components/Post/Post";
import { GrAdd, GrClose } from "react-icons/gr";
import { RxCross1 } from "react-icons/rx";
import Modal from "react-modal";
import {storage} from "../../firebase";
import { uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllPosts, sharePost } from "../../actions/posts";
import Preview from "../../assets/img-preview.jpg";
import { useNavigate } from "react-router-dom";

const CommunityHome = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const PostsList = useSelector((state) => state.postReducer);
  const currentUser = useSelector((state) => state.currentUserReducer);
  const [refresh, setRefresh] = useState(true);
  const [activeTab, setActiveTab] = useState("post");
  const navigate = useNavigate();
  useEffect(() => {
    currentUser === null && navigate("/auth")
  },[currentUser, navigate]);

  return (
    <div className="community-container">
      <ModelBox
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        setRefresh={setRefresh}
        refresh={refresh}
      />
      {currentUser &&
        (!modalIsOpen ? (
          <div className="add-post-button" onClick={() => setIsOpen(true)}>
            <GrAdd className="add-button" />
          </div>
        ) : (
          <div className="add-post-button" onClick={() => setIsOpen(false)}>
            <RxCross1 className="add-button" />
          </div>
        ))}
      <div className="wrapper">
        <div className="community-poster">
          <img src={Poster} alt="" />
        </div>
        <div className="community-header">
          <div className="community-profile-image">
            <img src={Logo} alt="" />
          </div>
          <span className="title">Stack Overflow Community</span>
        </div>
        <div className="tab-bar">
          <span
            className={activeTab === "post" ? "post active-tab" : "post"}
            onClick={() => setActiveTab("post")}
          >
            Posts
          </span>
          <span
            className={activeTab === "video" ? "video active-tab" : "video"}
            onClick={() => setActiveTab("video")}
          >
            Videos
          </span>
          <span
            className={
              activeTab === "about" ? "about-tab active-tab" : "about-tab"
            }
            onClick={() => setActiveTab("about")}>
            About
          </span>
        </div>
        {/* --- posts --- */}
        {activeTab === "post" || activeTab === "video" ? (
          <div className="community-body">
            <div className="left-sidebar">
              <AboutCommunity />
            </div>
            <div className="posts">
              {activeTab === "post" &&
                PostsList.data?.map((post) => {
                  return <Post post={post} key={post._id} />;
                })}
              {activeTab === "video" &&
                PostsList.data
                  ?.filter(
                    (item) =>
                      ((item.videoUrl !== undefined || item.videoUrl !== null) &&
                        item.desc !== "") ||
                      ((item.videoUrl !== undefined || item.videoUrl !== null) &&
                        item.desc === "")
                  )
                  .map((post) => {
                    return <Post post={post} key={post._id} />;
                  })}
            </div>
          </div>
        ) : (
          <div className="community-about-body">
              <AboutCommunity />
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityHome;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export const ModelBox = ({ modalIsOpen, setIsOpen, setRefresh, refresh }) => {
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [videoPerc, setVideoPerc] = useState(0);
  const [imagePerc, setImagePerc] = useState(0);
  const [desc, setDesc] = useState("");
  const [fileUrl, setFileUrl] = useState(null);
  const currentUser = useSelector((state) => state.currentUserReducer);
  const dispatch = useDispatch();

  function closeModal() {
    setIsOpen(false);
  }

  const uploadFile = (file, urlType) => {
    // const storage = getStorage(app);
    // const fileName = new Date().getTime() + file.name;
    const remoteFilePath = `uploads/${file.name}`;
    const storageRef = storage.ref(remoteFilePath);
    const uploadTask = uploadBytesResumable(storageRef, file);
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imageType"
          ? setImagePerc(Math.round(progress))
          : setVideoPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFileUrl(downloadURL);
        });
      }
    );
  };

  useEffect(() => {
    if (currentUser) {
      imageFile && uploadFile(imageFile, "imageType");
      setVideoFile(null);
      setVideoPerc(0);
    }
  }, [imageFile, currentUser]);

  useEffect(() => {
    if (currentUser) {
      videoFile && uploadFile(videoFile, "videoType");
      setImageFile(null);
      setImagePerc(0);
    }
  }, [videoFile, currentUser]);

  const handleSubmitImage = async (e) => {
    e.preventDefault();
    if (currentUser) {
      dispatch(sharePost({ desc, imageUrl: fileUrl }));
    } else {
      alert("Please login");
    }
    setIsOpen(false);
    dispatch(fetchAllPosts());
    setRefresh(!refresh);
  };

  const handleSubmitVideo = async (e) => {
    e.preventDefault();
    if (currentUser) {
      dispatch(sharePost({ desc, videoUrl: fileUrl }));
    } else {
      alert("Please login");
    }
    setIsOpen(false);
    dispatch(fetchAllPosts());
    setRefresh(!refresh);
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="sharepost-container">
        <GrClose className="close-icon" onClick={closeModal} />
        <div className="wrapper">
          <h4 className="title">Create Post</h4>
          <form
            action=""
            onSubmit={imagePerc > 0 ? handleSubmitImage : handleSubmitVideo}
          >
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="Type something..."
              value={desc}
              maxLength="1500"
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
            <div className="share-buttons">
              <div className="upload-button">
                <label htmlFor="imageFile">
                  {imagePerc > 0
                    ? "Uploading " + imagePerc + "%"
                    : "Upload Image"}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  id="imageFile"
                />
              </div>
              <span style={{ margin: "10px" }}>or</span>
              <div className="upload-button">
                <label htmlFor="videoFile">
                  {videoPerc > 0
                    ? "Uploading " + videoPerc + "%"
                    : "Upload Video"}
                </label>

                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setVideoFile(e.target.files[0])}
                  id="videoFile"
                />
              </div>
            </div>
            {fileUrl ? (
              imagePerc > 0 ? (
                <img
                  src={fileUrl}
                  alt=""
                  style={{
                    width: "100%",
                    maxHeight: "200px",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <video src={fileUrl} alt="" />
              )
            ) : (
              <img
                src={Preview}
                alt=""
                style={{
                  width: "100%",
                  maxHeight: "200px",
                  objectFit: "contain",
                }}
              />
            )}
            <button type="submit">Share</button>
          </form>
        </div>
      </div>
    </Modal>
  );
};
