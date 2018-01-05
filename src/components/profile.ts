import {inject} from 'aurelia-framework';
import {TweetService} from '../services/tweet-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Tweet, User} from '../services/models';
import {ActiveUser, CurrentUser, Tweets} from "../services/messages";

@inject(TweetService, EventAggregator)
export class Profile {
  tweetService: TweetService;
  tweets: Array<Tweet>;
  deletable: boolean;

  activate(params) {
    if (params.id) {
      this.deletable = false;
      this.tweetService.getUsersTweets(params.id);
      this.tweetService.getUser(params.id);
    } else {
      this.tweetService.getCurrentUser();
      console.log(this.tweetService.currentUser);
      this.tweetService.getUsersTweets(this.tweetService.currentUser._id);
      this.deletable = true;
    }
  }

  constructor(ts: TweetService, ea: EventAggregator) {

    this.tweetService = ts;

    this.tweetService.getCurrentUser();
  }
}
