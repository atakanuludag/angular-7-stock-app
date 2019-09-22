import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription, Observable } from 'rxjs';
import { map, filter, mergeMap } from 'rxjs/operators';
import { AuthenticationService } from '../../services/authentication.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  loading: boolean = false;
  loadingSubscription: Subscription;

  pageTitle: string = "";
  navigationMenu: object[] = [
    {
      "title": "Dashboard",
      "routerLink": "/dashboard",
      "icon": "dashboard"
    },
    {
      "title": "Markalar",
      "routerLink": "/brand",
      "icon": "settings"
    },
    {
      "title": "Stoklar",
      "routerLink": "/stock",
      "icon": "settings"
    },
  ];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private auth: AuthenticationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private loadingService: LoadingService
  ) {

    this.getRouterPageTitle();

  }

  ngOnInit() {
    this.loadingSubscription = this.loadingService.loadingStatus.subscribe((value) => {
      this.loading = value;
    });
  }

  ngOnDestroy() {
    if (typeof this.loadingSubscription != "undefined") this.loadingSubscription.unsubscribe();
  }


  getRouterPageTitle() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map((route) => {
        while (route.firstChild) {
          route = route.firstChild;
        };

        return route;
      }),
      filter((route) => route.outlet === 'primary'),
      mergeMap((route) => route.data),
    ).subscribe((event) => {
      this.titleService.setTitle(event['title'])
      this.pageTitle = event['title'];
    });
  }

  logout = () => {
    this.auth.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }


}
