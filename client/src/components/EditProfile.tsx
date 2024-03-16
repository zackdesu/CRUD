import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { Params, useNavigate, useParams } from "react-router-dom";

const CreateProfile = () => {
  const [user, setUser] = useState<IEditProfile>();
  const id: Readonly<Params<string>> | { id: string } = useParams();
  const refUsername = useRef<HTMLInputElement>(null);
  const refNama = useRef<HTMLInputElement>(null);
  const refUmur = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!refUsername.current || !refNama.current || !refUmur.current) return;

    const data: IEditProfile = {
      username: id.id!,
      newUsername: refUsername.current.value,
      nama: refNama.current.value,
      umur: refUmur.current.value,
    };

    axios
      .put<ISuccess>("http://localhost:3000/item", data, {
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

  const deleteProfile = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .delete("http://localhost:3000/item", {
        headers: {
          "Content-Type": "application/json",
        },
        data: { username: id.id },
      })
      .then((res) => {
        console.log(res.data);
        navigate("/");
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/item/${id.id}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));
  }, [id.id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex items-center flex-col">
      <h1>Edit Profil</h1>
      <form onSubmit={onSubmit} className="flex items-center flex-col mt-8">
        <label className="w-64" htmlFor="username">
          Username
        </label>
        <input
          className="border w-64"
          type="text"
          name="username"
          ref={refUsername}
          defaultValue={user?.username}
          onChange={handleChange}
        />
        <label className="w-64" htmlFor="nama">
          Nama
        </label>
        <input
          className="border w-64"
          type="text"
          name="nama"
          ref={refNama}
          onChange={handleChange}
          defaultValue={user?.nama}
        />
        <label className="w-64" htmlFor="umur">
          Umur
        </label>
        <input
          className="border w-64"
          type="number"
          name="umur"
          ref={refUmur}
          onChange={handleChange}
          defaultValue={user?.umur}
        />
        <button className="px-3 py-2 bg-cyan-500 rounded-md mt-3 text-white">
          Submit
        </button>
      </form>
      <form onSubmit={deleteProfile}>
        <button className="px-3 py-2 bg-red-500 rounded-md mt-3 text-white">
          Hapus Profil
        </button>
      </form>
    </div>
  );
};

export default CreateProfile;
