import { inject } from 'aurelia-framework';
import { TweetService } from '../services/tweet-service';
import { EventAggregator } from 'aurelia-event-aggregator';
import {Tweet, User} from '../services/models';
import {Tweets} from "../services/messages";

@inject(TweetService , EventAggregator)
export class Timeline {
  tweetService: TweetService;
  tweets: Array<Tweet>;

  constructor(ts, ea) {
    ts.getTweets();

    ea.subscribe(Tweets, msg => {
      this.tweets = msg.tweets;
    });
  }
}
