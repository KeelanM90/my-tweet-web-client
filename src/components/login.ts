import { inject } from 'aurelia-framework';
import { TweetService } from '../services/tweet-service';

@inject(TweetService)
export class Login {
  tweetService: TweetService;
  email = '';
  password = '';

  constructor(ts: TweetService) {
    this.tweetService = ts;
  }

  login(e) {
    console.log(`Trying to log in ${this.email}`);
    this.tweetService.login(this.email, this.password);
  }
}
