import { inject } from 'aurelia-framework';
import { TweetService } from '../services/tweet-service';

@inject(TweetService)
export class Home {
  tweetService: TweetService;

  activate() {
    this.tweetService.getTweets();
  }

  constructor(ts: TweetService) {
    this.tweetService = ts;
    ts.getTweets();
  }

}
