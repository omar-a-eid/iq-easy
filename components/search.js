import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import styles from "../styles/Header.module.css";
import { useRouter } from "next/router";

export default function Search() {
  const router = useRouter();
  const searchRef = useRef();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(false);
  const [results, setResults] = useState([]);

  const onChange = (e) => {
    const query = e.target.value;
    //fetch and set the results
    fetch(`/api/searchCourses?search=${query}`)
      .then((res) => res.json())
      .then((data) => setResults(data.results));
  };
  const onFocus = () => {
    setActive(true);
    window.addEventListener("click", onClick);
  };

  const onClick = useCallback((event) => {
    if (event.target.id !== "search") {
      setActive(false);
      setQuery("");
      setResults([]);
      window.removeEventListener("click", onClick);
    }
  }, []);

  return (
    <div>
      <div className={styles.icon_search}>
        <div className={styles.search_container}>
          <label htmlFor="search">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width={20}
              height={20}
            >
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z" />
            </svg>
          </label>
          <input
            ref={searchRef}
            onChange={onChange}
            onFocus={onFocus}
            type="search"
            id="search"
            placeholder="What do you want to learn?"
          />
          {active && results.length > 0 ? (
            <div className={styles.results}>
              {results.map((result, id) => (
                <Link key={id} href={`/courses/${result._id}`}>
                  {result.name}
                </Link>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
