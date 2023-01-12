import { useRef, useState } from "react";
import styles_admin from "../../styles/Admin.module.css";
import Layout from "../../components/layout-admin";

export default function Admin() {
  const searchRef = useRef();
  const subRef = useRef();

  const [error, setError] = useState();
  const [code, setCode] = useState();

  function onSearch(event) {
    event.preventDefault();
    const enteredSearch = searchRef.current.value;

    fetch(`/api/search?search=${enteredSearch}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        if (resData.message) {
          throw new Error(resData.message);
        }
        setError("");
        setCode(resData.code);
      })
      .catch((err) => {
        setCode("");
        setError(err.message);
      });
  }

  function onUpdate(event) {
    event.preventDefault();
    const enteredSub = subRef.current.value;
    fetch(`/api/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        codeValue: code.value,
        sub: enteredSub,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        if (resData.message) {
          throw new Error(resData.message);
        }
        setError("");
        setCode(resData.code);
      })
      .catch((err) => {
        setError(err.message);
      });
  }
  return (
    <Layout page="/admin">
      <form onSubmit={onSearch}>
        <div className={styles_admin.search_container}>
          <input
            id="search"
            type="text"
            placeholder="Search.."
            ref={searchRef}
            className={styles_admin.search}
          />
          <button className={styles_admin.button}>Search</button>
        </div>
      </form>

      <div className={styles_admin.result_container}>
        {error ? <div>{error}</div> : ""}

        {code ? (
          <div>
            <p>Email: {code.email ? code.email.email : ""}</p>
            <p>Code: {code.value}</p>
            <form onSubmit={onUpdate}>
              <div>
                <label htmlFor="sub">Subscription: </label>
                <select name="sub" id="sub" ref={subRef}>
                  <option
                    value="0"
                    selected={code.subscription == 0 ? true : false}
                  >
                    0
                  </option>
                  <option
                    value="1"
                    selected={code.subscription == 1 ? true : false}
                  >
                    1
                  </option>
                  <option
                    value="6"
                    selected={code.subscription == 6 ? true : false}
                  >
                    6
                  </option>
                  <option
                    value="12"
                    selected={code.subscription == 12 ? true : false}
                  >
                    12
                  </option>
                </select>
              </div>
              <button className={styles_admin.update}>Update</button>
            </form>
          </div>
        ) : (
          ""
        )}
      </div>
    </Layout>
  );
}

// export async function getStaticProps(params) {
//   const client = await MongoClient.connect(
//     "mongodb+srv://omar:fF04J6Mi7kB9WjC6@cluster0.gsxtcow.mongodb.net/?retryWrites=true&w=majority  "
//   );
//   const db = client.db();

//   const codeCollection = db.collection("codes");

//   const codes = await codeCollection.find().toArray();

//   client.close();

//   return {
//     props: {
//       codes: codes.map((code) => ({
//         value: code.value,
//         sub: code.subscription,
//         email: code.email,
//         id: code._id.toString(),
//       })),
//     },
//     revalidate: 10,
//   };
// }
