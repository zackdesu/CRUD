import { Request, Response } from "express";
import fs from "fs";

export const create = (req: Request, res: Response) => {
  try {
    const profile: Profile = req.body;
    const read: Profile[] = JSON.parse(fs.readFileSync("./data.json", "utf-8"));
    const isUsernameExist = read.find((e) => e.username === profile.username);
    if (isUsernameExist)
      throw {
        code: 403,
        message: "Username sudah digunakan, silahkan gunakan nama lain.",
      };
    read.push(profile);
    fs.writeFileSync("./data.json", JSON.stringify(read));
    return res.json({ profile, message: "Berhasil membuat profil" });
  } catch (error: any) {
    res.status(error.code).json({ message: error.message });
  }
};

export const read = (req: Request, res: Response) => {
  try {
    const data = JSON.parse(fs.readFileSync("./data.json", "utf-8"));
    if (data.length < 1) throw { code: 404, message: "Data tidak ditemukan" };
    return res.json(data);
  } catch (error: any) {
    res.status(error.code).json({ message: error.message });
  }
};

export const update = (req: Request, res: Response) => {
  try {
    const profile: EditProfile = req.body;
    const read: Profile[] = JSON.parse(fs.readFileSync("./data.json", "utf-8"));
    const user = read.find((e) => e.username === profile.username);
    if (!user) throw { code: 404, message: "Username tidak ditemukan!" };
    const isUsernameExist = read.find(
      (e) => e.username === profile.newUsername
    );
    if (isUsernameExist)
      throw { code: 403, message: "Username sudah digunakan!" };
    user.nama = profile.nama || user.nama;
    user.username = profile.newUsername || user.username;
    user.umur = profile.umur || user.umur;
    fs.writeFileSync("./data.json", JSON.stringify(read));
    return res.json({ user, message: "Berhasil mengedit profil" });
  } catch (error: any) {
    res.status(error.code).json({ message: error.message });
  }
};

export const del = (req: Request, res: Response) => {
  try {
    const { username }: Profile = req.body;
    const read: Profile[] = JSON.parse(fs.readFileSync("./data.json", "utf-8"));
    const user = read.find((e) => e.username === username);
    if (!user) throw { code: 404, message: "Username tidak ditemukan!" };
    const newData = read.filter((e) => e.username !== user.username);
    fs.writeFileSync("./data.json", JSON.stringify(newData));
    return res.json({ user, message: "Berhasil menghapus profil" });
  } catch (error: any) {
    res.status(error.code).json({ message: error.message });
  }
};

export const readSingle = (req: Request, res: Response) => {
  try {
    const id = (req.params as { id: string }).id;
    const data: Profile[] = JSON.parse(fs.readFileSync("./data.json", "utf-8"));
    const user = data.find((e) => e.username === id);
    if (!user) throw { code: 404, message: "Data tidak ditemukan" };
    return res.json(user);
  } catch (error: any) {
    res.status(error.code).json({ message: error.message });
  }
};
