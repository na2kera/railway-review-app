import { useState } from "react";

const New = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [detail, setDetail] = useState("");
  const [review, setReview] = useState("");

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("https://railway.bookreview.techtrain.dev/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, url, detail, review }),
    });
    const data = await res.json();
    console.log(data);
  };
  return (
    <>
      <label htmlFor="title">タイトル</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="url">URL</label>
      <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} />
      <label htmlFor="detail">詳細</label>
      <textarea value={detail} onChange={(e) => setDetail(e.target.value)} />
      <label htmlFor="review">レビュー</label>
      <textarea value={review} onChange={(e) => setReview(e.target.value)} />
      <button onClick={handleSubmit}>投稿</button>
    </>
  );
};

export default New;
