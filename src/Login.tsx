import "./App.css";
import { Formik } from "formik";

const Login = () => {
  return (
    <>
      <div>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors: {
              email?: string;
              password?: string;
            } = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            setTimeout(async () => {
              const res = await fetch(
                "https://railway.bookreview.techtrain.dev/signin",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(values),
                }
              );
              const data = await res.json();
              console.log(data);
              if (!res.ok) {
                alert(`エラー: ${data.message || "ログインに失敗しました"}`);
                return;
              }
              const token = data.token;
              console.log(token);
              localStorage.setItem("token", token);
              console.log(JSON.stringify(values));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">メールアドレス</label>
              <br />
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && errors.email}
              <br />
              <label htmlFor="password">パスワード</label>
              <br />
              <input
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password && errors.password}
              <br />
              <br />
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </form>
          )}
        </Formik>
        <a href="/signup">ユーザー登録画面へ</a>
      </div>
    </>
  );
};

export default Login;
