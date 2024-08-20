import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Edit = () => {
  const pathname = useLocation().pathname;
  const id = pathname.split("/")[2];
  console.log(id);

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [detail, setDetail] = useState("");
  const [review, setReview] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const getBook = async () => {
      const res = await fetch(
        `https://railway.bookreview.techtrain.dev/books/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      setTitle(data.title);
      setUrl(data.url);
      setDetail(data.detail);
      setReview(data.review);
      console.log(data);
    };
    getBook();
  }, [id, token]);

  const handleUpdate = async () => {
    const res = await fetch(
      `https://railway.bookreview.techtrain.dev/books/${id}`,
      {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title, url, detail, review }),
      }
    );
    console.log(res);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">
            書籍情報の編集
          </h2>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              タイトル
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="url"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              URL
            </label>
            <input
              type="text"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="detail"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              詳細
            </label>
            <textarea
              id="detail"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="review"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              レビュー
            </label>
            <textarea
              id="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={5}
            />
          </div>
          <button
            onClick={handleUpdate}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            更新
          </button>
        </div>
      </div>
    </>
  );
};

export default Edit;
