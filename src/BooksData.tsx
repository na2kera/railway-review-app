import Book from "./types/book";

type Props = {
  books: Book[];
};

const BooksData: React.FC<Props> = ({ books }) => {
  return (
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
  );
};

export default BooksData;
