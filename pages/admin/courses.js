import styles from "../../styles/Home.module.css";
import Layout from "../../components/layout-admin";
import { useRef, useState } from "react";
import axios from "axios";

export default function Home() {
  const [success, setSuccess] = useState("");
  const nameRef = useRef();
  const iconRef = useRef();
  const avatarRef = useRef();
  const videosRef = useRef();

  function onAddCourse(formData) {
    axios
      .post(`/api/addCourse`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setSuccess(res.data.data);
      });
  }
  function submitHandler(event) {
    event.preventDefault();

    const enteredName = nameRef.current.value;
    const enteredIcon = iconRef.current.files[0];
    const enteredAvatar = avatarRef.current.files[0];
    const enteredVideos = videosRef.current.files;

    const formData = new FormData();
    formData.append("name", enteredName);
    formData.append("icon", enteredIcon);
    formData.append("avatar", enteredAvatar);
    for (let i = 0; i < enteredVideos.length; i++) {
      formData.append("videos", enteredVideos[i]);
    }

    onAddCourse(formData, enteredName);
  }
  return (
    <Layout page="/admin/courses" width={100}>
      <div className={styles.main}>
        <form onSubmit={submitHandler}>
          <div>
            <label htmlFor="name">Name: </label>
            <input type="text" id="name" name="name" ref={nameRef} required />
          </div>
          <div>
            <label htmlFor="icon">Icon: </label>
            <input
              type="file"
              id="icon"
              name="icon"
              accept="image/*"
              ref={iconRef}
              required
            />
          </div>
          <div>
            <label htmlFor="avatar">Avatar: </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              ref={avatarRef}
              accept="image/png"
              required
            />
          </div>
          <div>
            <label htmlFor="videos">Videos: </label>
            <input
              type="file"
              id="videos"
              name="videos"
              ref={videosRef}
              accept="video/mp4,video/x-m4v,video/*"
              multiple
              required
            />
          </div>
          <button>Add</button>
        </form>
      </div>
      <div>{success}</div>
    </Layout>
  );
}
