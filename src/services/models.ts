export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  _id?: string;
  followers: User[];
  following: User[];
}

export interface Tweet {
  _id?: string;
  tweet: string;
  date: Date;
  readableDate: string;
  tweeter: User;
  img: string
}
