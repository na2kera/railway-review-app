import Compressor from "compressorjs";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  name: string;
  email: string;
  password: string;
  file: string;
};

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data, event) => {
    console.log(data);
    const body = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    console.log(body);
    // ユーザー登録処理
    const res = await fetch("https://railway.bookreview.techtrain.dev/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const json = await res.json();
    console.log(json);
    const token = json.token;

    // 画像アップロード処理
    const fileInput = event?.target.file as HTMLInputElement;
    const file = fileInput?.files?.[0];

    const maxSizeInBytes = 1000 * 1024;

    if (file) {
      new Compressor(file, {
        quality: 0.6,
        convertSize: maxSizeInBytes,
        async success(result) {
          const formData = new FormData();
          console.log(result);
          formData.append("icon", result as File, (result as File).name);
          console.log(token);
          try {
            const response = await fetch(
              "https://railway.bookreview.techtrain.dev/uploads",
              {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${token}`, // トークンを使用して認証
                },
                body: formData,
              }
            );
            const json2 = await response.json();
            console.log(json2);
          } catch (error) {
            console.error(error);
          }
        },
      });
    }

    console.log(file);
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <label htmlFor="name">Name</label>

        <input
          {...register("name", { required: true })}
          className="w-full px-3 py-2 mt-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
        />
        {errors.name && <span>This field is required</span>}
        {/* include validation with required or other standard HTML validation rules */}
        <label htmlFor="email">Email</label>

        <input
          {...register("email", { required: true })}
          type="email"
          className="w-full px-3 py-2 mt-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
        />
        {errors.email && <span>This field is required</span>}

        <label htmlFor="password">Password</label>

        <input
          {...register("password", { required: true })}
          type="password"
          className="w-full px-3 py-2 mt-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
        />
        {errors.password && <span>This field is required</span>}

        <label htmlFor="file">File</label>

        <input
          {...register("file", { required: true })}
          type="file"
          id="file"
          accept="image/jpg, image/png"
          className="mt-2"
        />
        {/* errors will return when field validation fails  */}
        <input
          type="submit"
          className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </form>
      <a href="/login">ログイン画面へ</a>
    </>
  );
};

export default Signup;
