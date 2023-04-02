import { Component, Inject, LOCALE_ID, Renderer2 } from '@angular/core';
import { ConfigService } from '../@vex/config/config.service';
import { Settings } from 'luxon';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { NavigationService } from '../@vex/services/navigation.service';
import { LayoutService } from '../@vex/services/layout.service';
import { ActivatedRoute, Router } from '@angular/router';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SplashScreenService } from '../@vex/services/splash-screen.service';
import { VexConfigName } from '../@vex/config/config-name.model';
import { ColorSchemeName } from '../@vex/config/colorSchemeName';
import { MatIconRegistry, SafeResourceUrlWithIconOptions } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ColorVariable, colorVariables } from '../@vex/components/config-panel/color-variables';
import { JwtAuthenticationService } from './services/security/jwt-authentication.service';
import { Location } from '@angular/common';


@Component({
  selector: 'vex-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private currentUrl = '';

  specialPage: boolean;

  private specialPages: any[] = [    
    // '/login',
    // '/pages/register',
    // '/pages/lock',
    // '/pages/pricing',
    // '/pages/single-post',
    // '/pages/post-listing'
  ];

  constructor(private configService: ConfigService,
    private renderer: Renderer2,
    private platform: Platform,
    @Inject(DOCUMENT) private document: Document,
    @Inject(LOCALE_ID) private localeId: string,
    private layoutService: LayoutService,
    private route: ActivatedRoute,
    private navigationService: NavigationService,
    private splashScreenService: SplashScreenService,
    private readonly matIconRegistry: MatIconRegistry,
    private readonly domSanitizer: DomSanitizer,

    private router: Router,
    private location: Location,
    public jwtAuthenticationService: JwtAuthenticationService,
  ) {
    Settings.defaultLocale = this.localeId;

    if (this.platform.BLINK) {
      this.renderer.addClass(this.document.body, 'is-blink');
    }

    this.matIconRegistry.addSvgIconResolver(
      (
        name: string,
        namespace: string
      ): SafeResourceUrl | SafeResourceUrlWithIconOptions | null => {
        switch (namespace) {
          case 'mat':
            return this.domSanitizer.bypassSecurityTrustResourceUrl(
              `assets/img/icons/material-design-icons/two-tone/${name}.svg`
            );

          case 'logo':
            return this.domSanitizer.bypassSecurityTrustResourceUrl(
              `assets/img/icons/logos/${name}.svg`
            );

          case 'flag':
            return this.domSanitizer.bypassSecurityTrustResourceUrl(
              `assets/img/icons/flags/${name}.svg`
            );
        }
      }
    );

    /**
     * Customize the template to your needs with the ConfigService
     * Example:
     *  this.configService.updateConfig({
     *    sidenav: {
     *      title: 'Custom App',
     *      imageUrl: '//placehold.it/100x100',
     *      showCollapsePin: false
     *    },
     *    footer: {
     *      visible: false
     *    }
     *  });
     */

    /**
     * Config Related Subscriptions
     * You can remove this if you don't need the functionality of being able to enable specific configs with queryParams
     * Example: example.com/?layout=apollo&style=default
     */
    this.route.queryParamMap.subscribe(queryParamMap => {
      if (queryParamMap.has('layout')) {
        this.configService.setConfig(queryParamMap.get('layout') as VexConfigName);
      }

      if (queryParamMap.has('style')) {
        this.configService.updateConfig({
          style: {
            colorScheme: queryParamMap.get('style') as ColorSchemeName
          }
        });
      }

      if (queryParamMap.has('primaryColor')) {
        const color: ColorVariable = colorVariables[queryParamMap.get('primaryColor')];

        if (color) {
          this.configService.updateConfig({
            style: {
              colors: {
                primary: color
              }
            }
          });
        }
      }

      if (queryParamMap.has('rtl')) {
        this.configService.updateConfig({
          direction: coerceBooleanProperty(queryParamMap.get('rtl')) ? 'rtl' : 'ltr'
        });
      }
    });

    /**
     * Add your own routes here
     */
    this.navigationService.items = [

      {
        type: 'subheading',
        label: 'SETUP PAGE',
        children: [

          {
            type: 'link',
            label: 'Application Master',
            route: 'gums/application-master',
            routerLinkActiveOptions: { exact: true }
          },
          {
            type: 'link',
            label: 'Component Master',
            route: 'gums/component-master',
            routerLinkActiveOptions: { exact: true }
          },
          {
            type: 'link',
            label: 'Menu Master Setup',
            route: 'gums/menu-master',
            routerLinkActiveOptions: { exact: true }
          },
          {
            type: 'link',
            label: 'Event Master',
            route: 'gums/event-master',
            routerLinkActiveOptions: { exact: true }
          },
          {
            type: 'link',
            label: 'Component Wise Event Mapping',
            route: 'gums/component-wise-event-mapping',
            routerLinkActiveOptions: { exact: true }
          },
          {
            type: 'link',
            label: 'Event Wise Dynamic Item',
            route: 'gums/event-wise-dynamic-item',
            routerLinkActiveOptions: { exact: true }
          },
          {
            type: 'link',
            label: 'Workflow Design',
            route: 'gums/workflow-design',
            routerLinkActiveOptions: { exact: true }
          },
          {
            type: 'link',
            label: 'Event Wise Workflow Mapping',
            route: 'gums/event-wise-workflow-mapping',
            routerLinkActiveOptions: { exact: true }
          },
          {
            type: 'link',
            label: 'Role Master',
            route: 'gums/role-master',
            routerLinkActiveOptions: { exact: true }
          },
          {
            type: 'link',
            label: 'Activity Master',
            route: 'gums/activity-master',
            routerLinkActiveOptions: { exact: true }
          },
          {
            type: 'link',
            label: 'Component Wise Activity Mapping',
            route: 'gums/component-wise-activity-mapping',
            routerLinkActiveOptions: { exact: true }
          },
          {
            type: 'link',
            label: 'Data Type Setup',
            route: 'gums/data-type-setup',
            routerLinkActiveOptions: { exact: true }
          },
          {
            type: 'link',
            label: 'User Master Setup',
            route: 'gums/user-master',
            routerLinkActiveOptions: { exact: true }
          },

        ]
      },
      {
        type: 'subheading',
        label: 'APPROVAL PAGE',
        children: [

          {
            type: 'link',
            label: 'User Management Approval',
            route: 'gums/user-management-approval',
            routerLinkActiveOptions: { exact: true }
          },

        ]
      },
    ];

    this.router.events.subscribe((route: any) => {
      if (route.routerEvent) {
        this.currentUrl = route.routerEvent.url;
      } else {
        this.currentUrl = route.url;
      }
      this.specialPage = this.specialPages.indexOf(this.currentUrl) !== -1;
    });


  }

  goBack(): void {
    this.location.back();
  }


}
