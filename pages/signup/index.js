import { useRef } from "react";
import styles from "../../styles/Form.module.css";
import Signing from "../../components/signing";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Signup(props) {
  const [error, setError] = useState();
  const router = useRouter();

  function onAddStudent(data) {
    fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
        code: data.code,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        if (resData.message) {
          throw new Error(resData.message);
        }
        router.push("/dashboard");
      })
      .catch((err) => {
        setError(err.message);
      });
  }
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const codeRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredName = nameRef.current.value;
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const enteredCode = codeRef.current.value;

    const studentData = {
      name: enteredName,
      email: enteredEmail,
      password: enteredPassword,
      code: enteredCode,
    };

    onAddStudent(studentData);
  }
  return (
    <Signing page="/signup">
      <div>
        <div className={error ? styles.error : ""}>{error}</div>
        <form className={styles.form} onSubmit={submitHandler}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Jhon Max"
              ref={nameRef}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="example@gmail.com"
              ref={emailRef}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="********"
              ref={passwordRef}
              required
            />
          </div>
          <div>
            <label htmlFor="code">Activation code</label>
            <input
              type="text"
              id="code"
              name="code"
              placeholder="8888G$885"
              ref={codeRef}
              required
            />
          </div>
          <button className={styles.button}>Sign up</button>
        </form>
      </div>
    </Signing>
  );
}
