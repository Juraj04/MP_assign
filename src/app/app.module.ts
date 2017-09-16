import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

import {AboutPage} from '../pages/about/about';
import {ContactPage} from '../pages/contact/contact';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';
import {ProductsPage} from '../pages/products/products'

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {DatabaseProvider} from '../providers/database/database';
import {SQLitePorter} from '@ionic-native/sqlite-porter';
import {SQLite} from '@ionic-native/sqlite';
import {DummyDatabaseProvider} from '../providers/dummy-database/dummy-database';
import {SelectRightProviderProvider} from '../providers/select-right-provider/select-right-provider';
import {RecipesPage} from "../pages/recipes/recipes";


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ProductsPage,
    RecipesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ProductsPage,
    RecipesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider,
    SQLitePorter,
    SQLite,
    DummyDatabaseProvider,
    SelectRightProviderProvider
  ]
})
export class AppModule {
}
