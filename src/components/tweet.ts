import { inject } from 'aurelia-framework';
import { TweetService } from '../services/tweet-service';

@inject(TweetService)
export class Tweet {
  tweetService: TweetService;
  tweet = '';
  image = [];

  constructor(ts: TweetService) {
    this.tweetService = ts;
    this.tweet = this.tweet;
  }

  makeTweet() {
    const reader = new FileReader();
    reader.onload = () => {
      let image = reader.result;
      this.tweetService.tweet(this.tweet, image);
    };

    if (this.image[0]) {
      reader.readAsDataURL(this.image[0]);
    } else {
      this.tweetService.tweet(this.tweet, this.image);
    }
  }
}
