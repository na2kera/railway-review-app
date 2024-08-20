import { useEffect, useState } from "react";

const Header = () => {
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

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <>
      <header className="bg-blue-500 text-white p-4 shadow-md fixed top-0 left-0 right-0 z-10">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">書籍レビュー</h1>
          <div className="flex items-center ml-auto">
            <p className="mr-4">{userName}</p>
            <a href="/profile" className="text-white">
              プロフィール変更
            </a>
            <button
              className="bg-red-500 px-4 py-2 rounded-md ml-4"
              onClick={logout}
            >
              ログアウト
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
