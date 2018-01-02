import { inject } from 'aurelia-framework';
import { TweetService } from '../services/tweet-service';
import { EventAggregator } from 'aurelia-event-aggregator';
import {Tweet, User} from '../services/models';
import {Tweets} from "../services/messages";

@inject(TweetService , EventAggregator)
export class Timeline {
  tweets: Array<Tweet>;

  constructor(ts, ea) {
    ea.subscribe(Tweets, msg => {
      this.tweets = msg.tweets;
    });
  }
}
