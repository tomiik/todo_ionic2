import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ListPage } from '../pages/list/list';
import { ListDonePage } from '../pages/list-done/list-done';
import { ListTrashPage } from '../pages/list-trash/list-trash';
import { AngularFireModule } from 'angularfire2';
import { Firebase } from '../providers/firebase';
import { Util } from './util';


export const firebaseConfig = {
  apiKey: 'AIzaSyDWL6Tm8w2IziPpVRO0xohPEqwQw8EQhc4',
  authDomain: 'mutter-347a3.firebaseapp.com',
  databaseURL: 'https://mutter-347a3.firebaseio.com',
  storageBucket: 'mutter-347a3.appspot.com',
  messagingSenderId: '194559638524'
};

@NgModule({
  declarations: [
    MyApp,
    ListPage,
    ListDonePage,
    ListTrashPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListPage,
    ListDonePage,
    ListTrashPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
    Firebase
  ]
})
export class AppModule {}
