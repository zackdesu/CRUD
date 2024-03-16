import axios from "axios";
import { FormEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";

const CreateProfile = () => {
  const refUsername = useRef<HTMLInputElement>(null);
  const refNama = useRef<HTMLInputElement>(null);
  const refUmur = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!refUsername.current || !refNama.current || !refUmur.current) return;

    const data: IProfile = {
      username: refUsername.current.value,
      nama: refNama.current.value,
      umur: refUmur.current.value,
    };

    axios
      .post<ISuccess>("http://localhost:3000/item", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data.message);
        navigate("/");
      })
      .catch((err) => console.error(err));
  };
  return (
    <div className="flex items-center flex-col">
      <h1>Buat Profil</h1>
      <form onSubmit={onSubmit} className="flex items-center flex-col mt-8">
        <label className="w-64" htmlFor="username">
          Username
        </label>
        <input
          className="border w-64"
          type="text"
          name="username"
          ref={refUsername}
        />
        <label className="w-64" htmlFor="nama">
          Nama
        </label>
        <input className="border w-64" type="text" name="nama" ref={refNama} />
        <label className="w-64" htmlFor="umur">
          Umur
        </label>
        <input
          className="border w-64"
          type="number"
          name="umur"
          ref={refUmur}
        />
        <button className="px-3 py-2 bg-cyan-500 rounded-md mt-3 text-white">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateProfile;
