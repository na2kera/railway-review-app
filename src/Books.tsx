import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { decrement, increment } from "./features/counter/counterSlice";
type Book = {
  id: "";
  review: "";
  reviewer: "";
  title: "";
  url: "";
};

const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);

  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

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
      <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold  mb-4">書籍レビュー</h2>
        {books.map((book) => (
          <div
            key={book.id}
            className="border border-gray-300 rounded-lg p-4 w-full mb-4"
          >
            <h2 className="text-xl font-semibold">{book.title}</h2>
            <p className="mt-2">{book.review}</p>
            <p className="mt-1 text-sm text-gray-600">
              レビュアー: {book.reviewer}
            </p>
          </div>
        ))}
      </div>
      <button
        aria-label="Decrement value"
        onClick={() => dispatch(decrement())}
      >
        前へ
      </button>
      <span>{count}</span>
      <button
        aria-label="Increment value"
        onClick={() => dispatch(increment())}
      >
        次へ
      </button>
    </>
  );
};

export default Books;
