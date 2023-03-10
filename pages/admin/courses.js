import styles from "../../styles/Home.module.css";
import Layout from "../../components/layout-admin";
import { useRef, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Home({ data }) {
  const [success, setSuccess] = useState("");
  const [prog, setProg] = useState("");

  const categoryRef = useRef();
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
        onUploadProgress: (event) => {
          setProg(Math.round((event.loaded * 100) / event.total));
          console.log(
            `Current progress:`,
            Math.round((event.loaded * 100) / event.total)
          );
        },
      })
      .then((res) => {
        setSuccess(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function submitHandler(event) {
    event.preventDefault();

    const enteredCategory = categoryRef.current.value;
    const enteredName = nameRef.current.value;
    const enteredIcon = iconRef.current.files[0];
    const enteredAvatar = avatarRef.current.files[0];
    const enteredVideos = videosRef.current.files;

    const formData = new FormData();
    formData.append("category", enteredCategory);
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
            <label htmlFor="category">Category: </label>
            <select name="category" id="category" ref={categoryRef}>
              {data ? (
                data.categories.map((cat, id) => (
                  <option key={id} value={cat._id}>
                    {cat.name}
                  </option>
                ))
              ) : (
                <option value={"enter a category"}>
                  Please Enter a category
                </option>
              )}
            </select>
          </div>
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
      <div>{prog}</div>
      <div>{success}</div>
      <Link href={"/admin/category"} style={{ color: "blue" }}>
        Back
      </Link>
    </Layout>
  );
}

export async function getServerSideProps(req) {
  const res = await fetch(`${process.env.DOMAIN}/api/getCategory`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}
