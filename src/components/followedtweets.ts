import { inject } from 'aurelia-framework';
import { TweetService } from '../services/tweet-service';
import { EventAggregator } from 'aurelia-event-aggregator';
import {Tweet, User} from '../services/models';
import {Tweets} from "../services/messages";

@inject(TweetService , EventAggregator)
export class Followedtweets {
  tweets: Array<Tweet>;

  constructor(ts, ea) {
    ts.getFollowedTweets();
  }
}
