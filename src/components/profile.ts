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
  user: User;
  deletable: boolean;

  activate(params) {
    if (params.id) {
      this.deletable = false;
      this.tweetService.getUsersTweets(params.id);
      this.tweetService.getUser(params.id);
    } else {
      this.deletable = true;
    }
  }

  constructor(ts: TweetService, ea: EventAggregator) {

    this.tweetService = ts;
    this.eventAggregator = ea;

    this.tweetService.getCurrentUser();
  }
}
