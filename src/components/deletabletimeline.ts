import { inject } from 'aurelia-framework';
import { TweetService } from '../services/tweet-service';
import { EventAggregator } from 'aurelia-event-aggregator';
import {Tweet, User} from '../services/models';
import {ActiveUser, CurrentUser, Tweets} from "../services/messages";

@inject(TweetService , EventAggregator)
export class Deletabletimeline {
  tweetService: TweetService;
  tweets: Array<Tweet>;
  user: User;

  constructor(ts, ea) {
    this.tweetService = ts;

    ea.subscribe(CurrentUser, msg => {
      this.user = msg.user as User;
      ts.getUsersTweets(this.user._id);
    });

    ea.subscribe(Tweets, msg => {
      this.tweets = msg.tweets;
    });
  }

  deleteAll(){
    for (let tweet of this.tweets) {
      this.tweetService.deleteTweet(tweet._id);
    }
  }
}
