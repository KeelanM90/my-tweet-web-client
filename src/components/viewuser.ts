import * as $ from 'jquery';
import { inject } from 'aurelia-framework';
import { TweetService } from '../services/tweet-service';
import { EventAggregator } from 'aurelia-event-aggregator';
import {Tweet, User} from '../services/models';
import {ActiveUser, Tweets} from "../services/messages";

@inject(TweetService , EventAggregator)
export class Viewuser {
  user: User;

  attached() {
    $('.ui .accordion')
      .accordion({
        selector: {
          trigger: '.title'
        }
      })
    ;
  }

  constructor(ts, ea) {
    ea.subscribe(ActiveUser, msg => {
      this.user = msg.user;
    });
  }
}
