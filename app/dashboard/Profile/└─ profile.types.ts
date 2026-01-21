export type ProfileVisibility = "public" | "private";

export type ProfilePhoto = {
  id: string;
  url: string;
  verified: boolean;
};

export type UserProfile = {
  id: string;
  name: string;
  age: number;
  city: string;

  headline?: string;
  bio?: string;

  photos: ProfilePhoto[];

  interests: string[];
  personality?: "Listener" | "Talker" | "Balanced";

  verified: {
    phone: boolean;
    photo: boolean;
  };

  completion: number; // 0–100

  privateData: {
    phone?: string;
    email?: string;
  };
};
