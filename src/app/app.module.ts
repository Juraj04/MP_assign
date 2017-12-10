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
import {RecipeDetailPage} from "../pages/recipe-detail/recipe-detail";
import {NewRecipePage} from "../pages/new-recipe/new-recipe";
import {DifficultyPipe} from "../pipes/difficulty/difficulty";
import {UnitPipe} from "../pipes/unit/unit";
import {LongTextPipe} from "../pipes/long-text/long-text";
import {AddFoodComponent} from "../components/add-food/add-food";
import {RecipeStore} from '../providers/recipe-store/recipe-store';
import {ProductDetailPage} from "../pages/product-detail/product-detail";
import {NewProductPage} from "../pages/new-product/new-product";
import {ProductStoreProvider} from '../providers/product-store/product-store';
import {ImagePicker} from "@ionic-native/image-picker";
import {Camera} from "@ionic-native/camera";
import {FridgePage} from "../pages/fridge/fridge";
import {FridgeProvider} from '../providers/fridge/fridge';
import {LocationStoreProvider} from '../providers/location-store/location-store';
import {GoogleMaps} from "@ionic-native/google-maps";
import {GoogleMapsWindowPage} from "../pages/google-maps-window/google-maps-window";
import {Geolocation} from '@ionic-native/geolocation';
import {EditProductPage} from "../pages/edit-product/edit-product";
import {PictureManagerProvider} from '../providers/picture-manager/picture-manager';
import {AddProductToFridgeComponent} from "../components/add-product-to-fridge/add-product-to-fridge";
import {ScreenOrientation} from "@ionic-native/screen-orientation";

import {RecipeDetailPopoverComponent} from '../components/recipe-detail-popover/recipe-detail-popover';
import {CreateNewFoodComponent} from "../components/create-new-food/create-new-food";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ProductsPage,
    RecipesPage,
    RecipeDetailPage,
    NewRecipePage,
    DifficultyPipe,
    UnitPipe,
    LongTextPipe,
    AddFoodComponent,
    ProductDetailPage,
    NewProductPage,
    FridgePage,
    GoogleMapsWindowPage,
    EditProductPage,
    RecipeDetailPopoverComponent,
    AddProductToFridgeComponent,
    CreateNewFoodComponent

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {tabsHideOnSubPages: true})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ProductsPage,
    RecipesPage,
    RecipeDetailPage,
    NewRecipePage,
    AddFoodComponent,
    ProductDetailPage,
    NewProductPage,
    FridgePage,
    GoogleMapsWindowPage,
    EditProductPage,
    RecipeDetailPopoverComponent,
    AddProductToFridgeComponent,
    CreateNewFoodComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider,
    SQLitePorter,
    SQLite,
    DummyDatabaseProvider,
    SelectRightProviderProvider,
    RecipeStore,
    ProductStoreProvider,
    ImagePicker,
    Camera,
    FridgeProvider,
    LocationStoreProvider,
    GoogleMaps,
    Geolocation,
    PictureManagerProvider,
    ScreenOrientation
  ]
})
export class AppModule {
}
