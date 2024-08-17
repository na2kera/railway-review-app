import { useDispatch } from "react-redux";
import { decrement, increment } from "./features/counter/counterSlice";

const Pagenation = () => {
  const dispatch = useDispatch();
  return (
    <>
      <button
        aria-label="Decrement value"
        onClick={() => dispatch(decrement())}
      >
        前へ
      </button>
      <button
        aria-label="Increment value"
        onClick={() => dispatch(increment())}
      >
        次へ
      </button>
    </>
  );
};

export default Pagenation;
