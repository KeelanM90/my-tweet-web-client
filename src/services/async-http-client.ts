import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-http-client';
import Fixtures from './fixtures';
import { EventAggregator } from 'aurelia-event-aggregator';
import { LoginStatus } from './messages';

@inject(HttpClient, Fixtures, EventAggregator)
export default class AsyncHttpClient {
  http: HttpClient;
  ea: EventAggregator;

  constructor(httpClient, fixtures, ea) {
    this.http = httpClient;
    this.http.configure(http => {
      http.withBaseUrl(fixtures.baseUrl);
    });
    this.ea = ea;
  }

  isAuthenticated() {
    let authenticated = false;
    if (localStorage.tweeter !== 'null') {
      authenticated = true;
      this.http.configure(http => {
        const auth = JSON.parse(localStorage.tweeter);
        http.withHeader('Authorization', 'bearer ' + auth.token);
      });
    }
    return authenticated;
  }

  authenticate(url: string, credentials: {email:string, password:string}) {
    this.http
      .post(url, credentials)
      .then(response => {
        const status = response.content;
        if (status.success) {
          localStorage.tweeter = JSON.stringify(response.content);
          this.http.configure(configuration => {
            configuration.withHeader(
              'Authorization',
              'bearer ' + response.content.token,
            );
          });
        }
        this.ea.publish(new LoginStatus(true));
      })
      .catch(error => {
        this.ea.publish(new LoginStatus(false, 'service not available'));
      });
  }

  clearAuthentication() {
    localStorage.tweeter = null;
    this.http.configure(configuration => {
      configuration.withHeader('Authorization', '');
    });
  }

  get(url: string) {
    return this.http.get(url);
  }

  post(url: string, obj: any) {
    return this.http.post(url, obj);
  }

  delete(url: string) {
    return this.http.delete(url);
  }
}
