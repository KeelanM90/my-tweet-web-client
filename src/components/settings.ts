import {inject} from 'aurelia-framework';
import {TweetService} from '../services/tweet-service';

import {EventAggregator} from 'aurelia-event-aggregator';
import {CurrentUser} from "../services/messages";
import {User} from "../services/models";

@inject(TweetService, EventAggregator)
export class Settings {
  tweetService: TweetService;
  eventAggregator: EventAggregator;

  currentUser: User;
  firstName = '';
  lastName = '';
  email = ''
  password = '';

  constructor(ts, ea) {
    this.tweetService = ts;
    this.eventAggregator = ea;
    ts.getCurrentUser();
  }

  attached() {
    this.eventAggregator.subscribe(CurrentUser, msg => {
      this.currentUser = msg.user;
      this.firstName = this.currentUser.firstName;
      this.lastName = this.currentUser.lastName;
      this.email = this.currentUser.email;
    });
  }

  update(e) {
    this.currentUser.firstName = this.firstName;
    this.currentUser.lastName = this.lastName;
    this.currentUser.email = this.email;
    this.currentUser.password = this.password;
    this.tweetService.update(
      this.currentUser
    );
  }
}
