'use client';
import { useState } from "react";
import styles from './page.module.css'

export default function Home() {
  const [text,setText] = useState("")
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/dalle?query=${encodeURIComponent(text)}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setLoading(false)
      setData(result.data);
      setError(null);
    } catch (error) {
      setError(error.message);
      setLoading(false)
      setData(null);
    }
  };

  return (
    <main className={styles.main}>
      <textarea onChange={e => setText(e.target.value)}>{text}</textarea>
      <button onClick={fetchData}>{loading ? 'Generating...' : 'Generate'}</button>
      {data && <img src={data[0].url} />}
      {error && <div>Error: {error}</div>}
    </main>
  );
}
