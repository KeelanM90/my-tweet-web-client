import {inject} from 'aurelia-framework';
import {TweetService} from '../services/tweet-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Tweet, User} from '../services/models';
import {ActiveUser, CurrentUser, Tweets} from "../services/messages";

@inject(TweetService, EventAggregator)
export class Deletabletimeline {
  tweetService: TweetService;
  tweets: Array<Tweet>;
  checkboxes: Array<string> = [];
  user: User;

  constructor(ts, ea) {
    this.tweetService = ts;
    ea.subscribe(Tweets, msg => {
      this.tweets = msg.tweets;
    });
  }

  deleteAll() {
    for (let tweet of this.tweets) {
      this.tweetService.deleteTweet(tweet._id);
    }
  }

  deleteSelected() {
    for (let id of this.checkboxes) {
      this.tweetService.deleteTweet(id);
    }
  }
}
