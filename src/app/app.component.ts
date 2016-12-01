import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { ListPage } from '../pages/list/list';
import { ListDonePage } from '../pages/list-done/list-done';
import { ListTrashPage } from '../pages/list-trash/list-trash';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  tab1: any;
  tab2: any;
  tab3: any;

  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = ListPage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController
  ) {
    this.initializeApp();
    // set our app's pages
    this.pages = [
      { title: 'Todo', component: ListPage },
      { title: 'Done', component: ListDonePage },
      { title: 'Trash', component: ListTrashPage }
    ];

    this.tab1 = ListPage;
    this.tab2 = ListDonePage;
    this.tab3 = ListTrashPage;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
