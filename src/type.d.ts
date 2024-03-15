interface Profile {
  username: string;
  nama: string;
  umur: number;
}

interface EditProfile extends Profile {
  newUsername?: string;
  nama?: string;
  umur?: number;
}
