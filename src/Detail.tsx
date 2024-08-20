import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BookDetail from "./types/bookDetail";

const Detail = () => {
  const pathname = useLocation().pathname;
  const id = pathname.split("/")[2];
  console.log(id);

  const [book, setBook] = useState<BookDetail>();

  useEffect(() => {
    const getBook = async () => {
      const res = await fetch(
        `https://railway.bookreview.techtrain.dev/books/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const data = await res.json();
      console.log(data);
      setBook(data);
    };
    getBook();
  }, [id]);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h3 className="text-2xl font-bold mb-4">タイトル：{book?.title}</h3>
        <p className="text-lg mb-2">著者：{book?.reviewer}</p>
        <p className="text-lg mb-2">出版社：{book?.detail}</p>
        <p className="text-lg mb-2">出版日：{book?.detail}</p>
        <p className="text-lg mb-2">ISBN：{book?.detail}</p>
      </div>
    </>
  );
};

export default Detail;
