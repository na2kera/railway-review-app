import { useState, useEffect } from "react";
import Book from "./types/book";

type Props = {
  books: Book[];
};

const BooksData: React.FC<Props> = ({ books }) => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }

    const getUser = async () => {
      const res = await fetch(
        "https://railway.bookreview.techtrain.dev/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      console.log(data.name);
      setUserName(data.name);
    };
    getUser();
  }, []);

  const deleteBook = async (id: string) => {
    const token = localStorage.getItem("token");
    const res = await fetch(
      `https://railway.bookreview.techtrain.dev/books/${id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log(res);
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto mt-10">
      {books.map((book) => (
        <div
          className="border border-gray-300 rounded-lg p-4 w-full mb-4"
          key={book.id}
        >
          {userName === book.reviewer && (
            <div>
              <button
                className="bg-blue-500 text-white p-2 rounded-lg"
                onClick={() => {
                  window.location.href = `/edit/${book.id}`;
                }}
              >
                編集
              </button>
              <button
                className="bg-red-500 text-white p-2 rounded-lg"
                onClick={() => deleteBook(book.id)}
              >
                削除
              </button>
            </div>
          )}
          <a href={`/detail/${book.id}`}>
            <h2 className="text-xl font-semibold">{book.title}</h2>
            <p className="mt-2">{book.review}</p>
            <p className="mt-1 text-sm text-gray-600">
              レビュアー: {book.reviewer}
            </p>
          </a>
        </div>
      ))}
    </div>
  );
};

export default BooksData;
