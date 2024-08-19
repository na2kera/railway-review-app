import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import BooksData from "./BooksData";
import Book from "./types/book";
import Pagenation from "./Pagenation";
import Header from "./Header";

const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);

  const count = useSelector((state: RootState) => state.counter.value);

  useEffect(() => {
    const getBooks = async () => {
      const res = await fetch(
        `https://railway.bookreview.techtrain.dev/public/books?offset=${count}`
      );
      const data = await res.json();
      console.log(data);
      setBooks(data);
    };

    getBooks();
  }, [count]);

  return (
    <>
      <Header />
      <BooksData books={books} />
      <Pagenation />
    </>
  );
};

export default Books;
