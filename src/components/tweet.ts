import { inject } from 'aurelia-framework';
import { TweetService } from '../services/tweet-service';

@inject(TweetService)
export class Tweet {
  tweetService: TweetService;
  tweet = ''

  constructor(ts: TweetService) {
    this.tweetService = ts;
    this.tweet = this.tweet;
  }

  makeTweet() {
    this.tweetService.tweet(
      this.tweet,
    );
  }
}
