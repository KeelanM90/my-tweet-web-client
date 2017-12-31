import { inject } from 'aurelia-framework';
import AsyncHttpClient from './async-http-client';
import Fixtures from './fixtures';
import {LoginStatus, Tweets} from './messages';
import { EventAggregator } from 'aurelia-event-aggregator';
import { User, Tweet } from './models';
import * as moment from 'moment';

@inject(Fixtures, EventAggregator, AsyncHttpClient)
export class TweetService {
  ea: EventAggregator;
  ac: AsyncHttpClient;
  tweets: Array<Tweet> = [];
  users: Map<string, User> = new Map();

  constructor(data: Fixtures, ea: EventAggregator, ac: AsyncHttpClient) {
    this.ea = ea;
    this.ac = ac;
  }

  isAuthenticated() {
    return this.ac.isAuthenticated();
  }

  getUsers() {
    this.ac.get('/api/users').then(res => {
      const users = res.content as Array<User>;
      users.forEach(user => {
        this.ac.get('/api/followers/' + user._id).then(res2 => {
          user.followers = res2.content as Array<User>;
        });
        this.ac.get('/api/following/' + user._id).then(res2 => {
          user.following = res2.content as Array<User>;
        });
        this.users.set(user.email, user);
      });
      this.ea.publish(users);
    });
  }

  getTweets() {
    this.ac.get("/api/tweets").then(res => {
      this.tweets = res.content;
      this.tweets.forEach( tweet => {
        tweet.readableDate = moment(tweet.date).format('lll');
      })
      this.ea.publish(new Tweets(this.tweets));
    });
  }

  tweet(tweetmsg: string) {
    const tweet = {
      tweet: tweetmsg
    };
    this.ac
      .post('/api/tweets', tweet)
      .then(res => {
        let returnedTweet = res.content as Tweet;
        returnedTweet.readableDate = moment(returnedTweet.date).format('lll');
        this.tweets.unshift(returnedTweet);
      });
  }

  register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) {
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };
    this.ac.post('/api/users', newUser).then(res => {
      this.getUsers();
    });
  }

  login(email: string, password: string) {
    const user = {
      email: email,
      password: password,
    };
    this.ac.authenticate('/api/users/authenticate', user);
  }

  logout() {
    this.ac.clearAuthentication();
    this.ea.publish(new LoginStatus(false));
  }
}
