import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

import {TabsPage} from '../pages/tabs/tabs';
import {ProductsPage} from '../pages/products/products'

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {DatabaseProvider} from '../providers/database/database';
import {SQLitePorter} from '@ionic-native/sqlite-porter';
import {SQLite} from '@ionic-native/sqlite';
import {RecipesPage} from "../pages/recipes/recipes";
import {RecipeDetailPage} from "../pages/recipe-detail/recipe-detail";
import {NewRecipePage} from "../pages/new-recipe/new-recipe";
import {DifficultyPipe} from "../pipes/difficulty/difficulty";
import {UnitPipe} from "../pipes/unit/unit";
import {AddFoodComponent} from "../components/add-food/add-food";
import {RecipeStoreProvider} from '../providers/recipe-store/recipe-store';
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
import {PictureManagerProvider} from '../providers/picture-manager/picture-manager';
import {AddProductToFridgeComponent} from "../components/add-product-to-fridge/add-product-to-fridge";
import {ScreenOrientation} from "@ionic-native/screen-orientation";

import {RecipeDetailPopoverComponent} from '../components/recipe-detail-popover/recipe-detail-popover';
import {CreateNewFoodComponent} from "../components/create-new-food/create-new-food";

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    ProductsPage,
    RecipesPage,
    RecipeDetailPage,
    NewRecipePage,
    DifficultyPipe,
    UnitPipe,
    AddFoodComponent,
    ProductDetailPage,
    NewProductPage,
    FridgePage,
    GoogleMapsWindowPage,
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
    RecipeStoreProvider,
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
