import * as $ from 'jquery';
import {inject} from 'aurelia-framework';
import {TweetService} from '../services/tweet-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import {User} from '../services/models';
import {ActiveUser, CurrentUser} from "../services/messages";

@inject(TweetService, EventAggregator)
export class Viewuser {
  user: User;
  currentUser: User;
  eventAggregator: EventAggregator;
  tweetService: TweetService;
  isFollowing: boolean = false;

  attached() {
    $('.ui .accordion')
      .accordion({
        selector: {
          trigger: '.title'
        }
      });
  }

  constructor(ts, ea) {
    this.tweetService = ts;
    this.eventAggregator = ea;
    this.updateFollowing();
  }

  followToggle() {
    if (this.isFollowing) {
      this.tweetService.unfollow(this.user);
    } else {
      this.tweetService.follow(this.user);
    }
    this.isFollowing = !this.isFollowing;
  }

  updateFollowing() {
    this.eventAggregator.subscribe(CurrentUser, msg => {
      this.currentUser = msg.user;
      this.eventAggregator.subscribe(ActiveUser, msg => {
        this.user = msg.user;
        for (let follower of this.user.followers) {
          if (follower._id === this.currentUser._id) {
            this.isFollowing = true;
          }
        }
      });
    });
  }
}
