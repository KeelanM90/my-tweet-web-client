import { inject } from 'aurelia-framework';
import { TweetService } from '../services/tweet-service';
import {User} from '../services/models';

@inject(TweetService)
export class Viewusers {
  users: Array<User>;

  constructor(ts) {
    ts.getUsers();
    this.users = ts.users;
    console.log(this.users);
  }
}
