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
        title: 'Home',
      },
      {
        route: 'profile',
        name: 'profile',
        moduleId: 'components/profile',
        nav: true,
        title: 'Profile',
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
