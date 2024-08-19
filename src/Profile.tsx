import { useEffect, useState } from "react";

const Profile = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    const getProfile = async () => {
      const res = await fetch(
        "https://railway.bookreview.techtrain.dev/users",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      console.log(data);
      setName(data.name);
    };
    getProfile();
  }, []);

  const editName = async () => {
    const res = await fetch("https://railway.bookreview.techtrain.dev/users", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ name }),
    });
    const data = await res.json();
    console.log(data);
  };
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">ユーザー名変更</h1>
      <div className="flex flex-col items-center justify-center h-screen">
        <input
          className="mb-4"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={editName}>更新</button>
      </div>
    </>
  );
};

export default Profile;
