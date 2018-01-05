import {inject} from 'aurelia-framework';
import {TweetService} from '../services/tweet-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Tweet, User} from '../services/models';
import {ActiveUser, CurrentUser, Tweets} from "../services/messages";

@inject(TweetService, EventAggregator)
export class Userprofile {
  tweetService: TweetService;
  eventAggregator: EventAggregator;
  tweets: Array<Tweet>;

  activate(params) {
      this.tweetService.getUsersTweets(params.id);
      this.tweetService.getUser(params.id);
  }

  constructor(ts: TweetService, ea: EventAggregator) {

    this.tweetService = ts;
    this.eventAggregator = ea;
  }
}
