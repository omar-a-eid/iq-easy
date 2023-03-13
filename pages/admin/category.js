import styles from "../../styles/Home.module.css";
import Layout from "../../components/layout-admin";
import { useRef, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Home() {
  const [success, setSuccess] = useState("");
  const [prog, setProg] = useState("");

  const nameRef = useRef();
  const iconRef = useRef();
  const descRef = useRef();

  function onAddCourse(formData) {
    axios
      .post(`/api/category`, formData, {
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

    const enteredName = nameRef.current.value;
    const enteredDesc = descRef.current.value;
    const enteredIcon = iconRef.current.files[0];

    const formData = new FormData();
    formData.append("name", enteredName);
    formData.append("desc", enteredDesc);
    formData.append("icon", enteredIcon);

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
            <label htmlFor="avatar">Description: </label>
            <input type="text" id="desc" name="desc" ref={descRef} required />
          </div>
          <button>Add</button>
        </form>
      </div>
      <div>{prog}</div>
      <div>{success}</div>
      <Link href="/admin/courses" style={{ color: "blue" }}>
        Add course
      </Link>
    </Layout>
  );
}
