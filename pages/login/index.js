import styles from "../../styles/Form.module.css";
import Signing from "../../components/signing";
import { useRef } from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";

export default function Login(params) {
  const [error, setError] = useState();
  const router = useRouter();

  function onLogin(data) {
    fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        remember: data.remember,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        if (resData.message) {
          throw new Error(resData.message);
        }
        if (resData.admin == true) {
          return router.push("/admin");
        }
        return router.push("/dashboard");
      })
      .catch((err) => {
        setError(err.message);
      });
  }
  const emailRef = useRef();
  const passwordRef = useRef();
  const rememberRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const enteredRemember = rememberRef.current.value;

    const studentData = {
      email: enteredEmail,
      password: enteredPassword,
      remember: enteredRemember,
    };

    onLogin(studentData);
  }
  return (
    <Signing page="/login">
      <div>
        <div className={error ? styles.error : ""}>{error}</div>
        <form className={styles.form} onSubmit={submitHandler}>
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
          <button className={styles.button}>Login</button>
          <div>
            <div className={styles.rem_for}>
              <div>
                <input
                  type="checkbox"
                  name="remember"
                  id="remember"
                  ref={rememberRef}
                />
                <label htmlFor="remember">Remember me</label>
              </div>
              <div>
                <Link href="forget">Forget password?</Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Signing>
  );
}
