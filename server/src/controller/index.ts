import { Request, Response } from "express";
import fs from "fs";

export const create = (req: Request, res: Response) => {
  try {
    const profile: Profile = req.body;
    const read: Profile[] = JSON.parse(fs.readFileSync("./data.json", "utf-8"));
    const isUsernameExist = read.find((e) => e.username === profile.username);
    if (isUsernameExist)
      throw "Username sudah digunakan, silahkan gunakan nama lain.";
    read.push(profile);
    fs.writeFileSync("./data.json", JSON.stringify(read));
    return res.json({ profile, message: "Berhasil membuat profil" });
  } catch (error) {
    res.json({ message: error });
  }
};

export const read = (req: Request, res: Response) => {
  const data = JSON.parse(fs.readFileSync("./data.json", "utf-8"));
  res.json(data.length < 1 ? { message: "Data tidak ditemukan" } : data);
};

export const update = (req: Request, res: Response) => {
  try {
    const profile: EditProfile = req.body;
    const read: Profile[] = JSON.parse(fs.readFileSync("./data.json", "utf-8"));
    const user = read.find((e) => e.username === profile.username);
    if (!user) throw "Username tidak ditemukan!";
    user.nama = profile.nama || user.nama;
    user.username = profile.newUsername || user.username;
    user.umur = profile.umur || user.umur;
    fs.writeFileSync("./data.json", JSON.stringify(read));
    return res.json({ user, message: "Berhasil mengedit profil" });
  } catch (error) {
    res.json({ message: error });
  }
};

export const del = (req: Request, res: Response) => {
  try {
    const { username }: Profile = req.body;
    const read: Profile[] = JSON.parse(fs.readFileSync("./data.json", "utf-8"));
    const user = read.find((e) => e.username === username);
    if (!user) throw "Username tidak ditemukan!";
    const newData = read.filter((e) => e.username !== user.username);
    fs.writeFileSync("./data.json", JSON.stringify(newData));
    return res.json({ user, message: "Berhasil menghapus profil" });
  } catch (error) {
    res.json({ message: error });
  }
};
