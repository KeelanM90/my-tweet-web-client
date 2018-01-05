import {inject} from 'aurelia-framework';
import AsyncHttpClient from './async-http-client';
import Fixtures from './fixtures';
import {ActiveUser, CurrentUser, LoginStatus, Tweets} from './messages';
import {EventAggregator} from 'aurelia-event-aggregator';
import {User, Tweet} from './models';
import * as moment from 'moment';

@inject(Fixtures, EventAggregator, AsyncHttpClient)
export class TweetService {
  ea: EventAggregator;
  ac: AsyncHttpClient;
  tweets: Array<Tweet> = [];
  users: Map<string, User> = new Map();
  currentUser: User;
  user: User;

  constructor(data: Fixtures, ea: EventAggregator, ac: AsyncHttpClient) {
    this.ea = ea;
    this.ac = ac;
  }

  isAuthenticated() {
    return this.ac.isAuthenticated();
  }

  getCurrentUser() {
    this.ac.get('/api/users/current').then(res => {
      this.currentUser = res.content as User;
      this.ac.get('/api/followers/' + this.currentUser._id).then(res2 => {
        this.currentUser.followers = res2.content as Array<User>;
      }).then(res => {
          this.ac.get('/api/following/' + this.currentUser._id).then(res2 => {
            this.currentUser.following = res2.content as Array<User>;
          }).then(res => {
            this.ea.publish(new CurrentUser(this.currentUser));
          });
        });
    });
  }

  getUser(id) {
    this.ac.get('/api/users/' + id).then(res => {
      this.user = res.content as User;
      this.ac.get('/api/followers/' + this.user._id).then(res2 => {
        this.user.followers = res2.content as Array<User>;
      }).then(res => {
        this.ac.get('/api/following/' + this.user._id).then(res2 => {
          this.user.following = res2.content as Array<User>;
        }).then(res => {
          this.ea.publish(new ActiveUser(this.user));
        });
      });
    });
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

  getUsersTweets(id) {
    let count = 0;
    this.ea.publish(new Tweets([]));
    this.ac.get('/api/users/' + id + '/tweets').then(res => {
      this.tweets = res.content;
      this.tweets.forEach(tweet => {
        tweet.readableDate = moment(tweet.date).format('lll')
        count++;
        if (count == this.tweets.length) {
          this.ea.publish(new Tweets(this.tweets));
          console.log(this.tweets);
        }
      });
    });
  }

  getTweets() {
    this.ac.get("/api/tweets").then(res => {
      this.tweets = res.content;
      this.tweets.forEach(tweet => {
        tweet.readableDate = moment(tweet.date).format('lll');
      })
      this.ea.publish(new Tweets(this.tweets));
    });
  }

  getFollowedTweets() {
    this.ac.get("/api/tweets/followed").then(res => {
      this.tweets = res.content;
      this.tweets.forEach(tweet => {
        tweet.readableDate = moment(tweet.date).format('lll');
      })
      console.log(this.tweets);
      this.ea.publish(new Tweets(this.tweets));
    });
  }

  tweet(tweetmsg, image) {
    const tweet = {
      tweet: tweetmsg,
      image: image
    };
    this.ac
      .post('/api/tweets', tweet)
      .then(res => {
        let returnedTweet = res.content as Tweet;
        returnedTweet.readableDate = moment(returnedTweet.date).format('lll');
        this.tweets.unshift(returnedTweet);
      });
  }

  deleteTweet(id: string) {
    this.ac
      .delete('/api/tweets/' + id)
      .then(res => {
        this.getUsersTweets(this.currentUser._id);
      });
  }

  follow(user) {
    const relationship = {
      followee: user._id
    }
    this.ac
      .post('/api/follow', relationship)
      .then(res => {
        this.getUser(user._id);
      });
  }

  unfollow(user) {
    this.ac
      .delete('/api/follow/' + user._id)
      .then(res => {
        this.getUser(user._id);
      });
  }

  register(firstName: string,
           lastName: string,
           email: string,
           password: string,) {
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

  update(updatedUser) {
    this.ac.put('/api/users', updatedUser).then(res => {
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
