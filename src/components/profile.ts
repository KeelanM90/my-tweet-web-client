import { inject } from 'aurelia-framework';
import { TweetService } from '../services/tweet-service';
import { EventAggregator } from 'aurelia-event-aggregator';
import {Tweet, User} from '../services/models';
import {CurrentUser, Tweets} from "../services/messages";

@inject(TweetService , EventAggregator)
export class Profile {
  tweets: Array<Tweet>;
  user: User;

  constructor(ts, ea) {
    ts.getCurrentUser();

    ea.subscribe(CurrentUser, msg => {
      this.user = msg.user as User;
      console.log(this.user);

      ts.getUsersTweets(this.user._id);

      ea.subscribe(Tweets, msg => {
        this.tweets = msg.tweets;
      });
    });


  }
}
