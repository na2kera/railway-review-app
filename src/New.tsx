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
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-bold mb-4">新規投稿</h2>
        <label htmlFor="title">タイトル</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded-md p-2 mb-2 w-full"
        />
        <label htmlFor="url">URL</label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border border-gray-300 rounded-md p-2 mb-2 w-full"
        />
        <label htmlFor="detail">詳細</label>
        <textarea
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          className="border border-gray-300 rounded-md p-2 mb-2 w-full h-32"
        />
        <label htmlFor="review">レビュー</label>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="border border-gray-300 rounded-md p-2 mb-2 w-full h-32"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          投稿
        </button>
      </div>
    </>
  );
};

export default New;
