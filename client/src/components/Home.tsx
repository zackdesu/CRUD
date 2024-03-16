import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState<IProfile[]>([]);

  useEffect(() => {
    axios
      .get<IProfile[]>("http://localhost:3000/item")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <h1>Profile</h1>

      <Link
        to="/create"
        className="bg-green-600 px-6 py-4 my-5 rounded-md text-white"
      >
        Tambah Pengguna
      </Link>

      <table className="table-fixed mt-10 border-collapse border-slate-500">
        <thead>
          <tr>
            <th className="border-b border-slate-600 bg-slate-200 w-8 py-2">
              No
            </th>
            <th className="border-l border-b border-slate-600 bg-slate-200 w-64 py-2">
              Username
            </th>
            <th className="border-l border-b border-slate-600 bg-slate-200 w-64 py-2">
              Nama
            </th>
            <th className="border-l border-b border-slate-600 bg-slate-200 w-12 py-2">
              Umur
            </th>
            <th className="border-l border-b border-slate-600 bg-slate-200 w-32 py-2">
              Detail
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((e, i) => (
            <tr key={i}>
              <td className="border-b border-slate-700">{i + 1}</td>
              <td className="border-l border-b border-slate-700">
                {e.username}
              </td>
              <td className="border-l border-b border-slate-700">{e.nama}</td>
              <td className="border-l border-b border-slate-700">{e.umur}</td>
              <td className="border-l border-b border-slate-700 text-center py-2">
                <Link
                  to={`/${e.username}/editprofile`}
                  className="px-5 py-2 rounded-lg bg-cyan-500 text-white"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
