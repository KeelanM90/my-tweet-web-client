import {inject} from 'aurelia-framework';
import {TweetService} from '../services/tweet-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Tweet, User} from '../services/models';
import {ActiveUser, CurrentUser, Tweets} from "../services/messages";

@inject(TweetService, EventAggregator)
export class Profile {
  tweetService: TweetService;
  eventAggregator: EventAggregator;
  tweets: Array<Tweet>;

  constructor(ts: TweetService, ea: EventAggregator) {

    this.tweetService = ts;
    this.eventAggregator = ea;
    ts.getCurrentUser();
    this.tweetService.getUsersTweets(ts.currentUser._id);
  }
}
