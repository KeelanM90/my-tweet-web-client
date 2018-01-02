import {Tweet, User} from "./models";

export class Tweets{
  tweets: Array<Tweet>;

  constructor(tweets: Array<Tweet>){
    this.tweets = tweets;
  }
}

export class CurrentUser {
  user: User;

  constructor(currentUser: User){
    this.user = currentUser;
  }
}

export class ActiveUser {
  user: User;

  constructor(activeUser: User){
    this.user = activeUser;
    console.log(activeUser);
  }
}

export class LoginStatus {
  status: boolean;
  message: string;
  constructor(status: boolean, message: string = '') {
    this.status = status;
    this.message = message;
  }
}
