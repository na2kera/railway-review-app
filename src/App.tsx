import { useState } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      alert("メールアドレスとパスワードを入力してください");
      return;
    } else if (!email.includes("@")) {
      alert("メールアドレスは正しい形式ではありません");
      return;
    }
  };

  return (
    <>
      <div>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">メールアドレス</label>
          <input
            type="email"
            id="email"
            className="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="password">パスワード</label>
          <input
            type="password"
            id="password"
            className="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <input type="submit" value={"ログイン"} className="login" />
        </form>
      </div>
    </>
  );
}

export default App;
