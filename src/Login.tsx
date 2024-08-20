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

              <input
                type="email"
                name="email"
                id="email"
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="example@email.com"
                value={values.email}
              />
              {errors.email && touched.email && errors.email}

              <label htmlFor="password">パスワード</label>

              <input
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="password"
              />
              {errors.password && touched.password && errors.password}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit
              </button>
            </form>
          )}
        </Formik>
        <a href="/signup" className="mt-4">
          ユーザー登録画面へ
        </a>
      </div>
    </>
  );
};

export default Login;
