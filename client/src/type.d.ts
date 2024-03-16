interface IProfile {
  username: string;
  nama: string;
  umur: string;
}

interface IEditProfile {
  username?: string;
  newUsername?: string;
  nama?: string;
  umur?: string;
}

interface ISuccess {
  message: string;
  profile: IProfile;
}
