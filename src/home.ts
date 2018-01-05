import { RouterConfiguration, Router } from 'aurelia-router';

export class Home {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.map([
      {
        route: ['', 'home'],
        name: 'home',
        moduleId: 'components/home',
        nav: true,
        title: 'Global Timeline',
      },
      {
        route: 'followedtweets',
        name: 'followedtweets',
        moduleId: 'components/followedtweets',
        nav: true,
        title: 'Followed Timeline'
      },
      {
        route: 'profile',
        name: 'profile',
        moduleId: 'components/profile',
        nav: true,
        title: 'My Profile',
      },
      {
        route: 'userprofile/:id',
        name: 'userprofile',
        moduleId: 'components/userprofile',
        nav: false,
        title: 'Profile',
      },
      {
        route: 'settings',
        name: 'settings',
        moduleId: 'components/settings',
        nav: true,
        title: 'Settings'
      },
      {
        route: 'logout',
        name: 'logout',
        moduleId: 'components/logout',
        nav: true,
        title: 'Logout',
      },
    ]);
    this.router = router;
  }
}
