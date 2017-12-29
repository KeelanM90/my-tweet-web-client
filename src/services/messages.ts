import {Tweet} from "./models";

export class Tweets{
  tweets: Array<Tweet>;

  constructor(tweets: Array<Tweet>){
    this.tweets = tweets;
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
