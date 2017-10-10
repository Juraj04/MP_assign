import {SQLiteObject} from "@ionic-native/sqlite";
import {SQLitePorter} from "@ionic-native/sqlite-porter";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";

export class DatabaseModel {
  //Table names
  static readonly TABLE_LOCATIONS: string = 'locations';
  static readonly TABLE_FOODS: string = 'foods';
  static readonly TABLE_PRODUCTS: string = 'products';
  static readonly TABLE_PRODUCT_TAGS: string = 'product_tags';
  static readonly TABLE_RECIPES: string = 'recipes';
  static readonly TABLE_RECIPE_TAGS: string = 'recipe_tags';
  static readonly TABLE_RECIPE_ITEMS: string = 'recipe_items';

  //Common column names
  static readonly COLUMN_ID: string = 'id';
  static readonly COLUMN_NAME: string = 'name';
  static readonly COLUMN_RATING: string = 'rating';
  static readonly COLUMN_PHOTO: string = 'photo';

  //TABLE_LOCATIONS column names
  static readonly COLUMN_X: string = 'x';
  static readonly COLUMN_Y: string = 'y';

  //TABLE_FOODS column names
  static readonly COLUMN_UNIT: string = 'unit';

  //TABLE_PRODUCT column names
  static readonly COLUMN_PRICE: string = 'price';
  static readonly COLUMN_DATE: string = 'date';
  static readonly COLUMN_QUANTITY: string = 'quantity';
  static readonly COLUMN_COUNT_FRIDGE: string = 'count_fridge';
  static readonly COLUMN_ID_LOCATION: string = 'id_location';
  static readonly COLUMN_ID_FOOD: string = 'id_food';

  //TABLE_PRODUCT_TAGS column names
  static readonly COLUMN_ID_PRODUCT: string = 'id_product';

  //TABLE_RECIPES column names
  static readonly COLUMN_PORTIONS: string = 'portions';
  static readonly COLUMN_TIME: string = 'time';
  static readonly COLUMN_DIFFICULTY: string = 'difficulty';
  static readonly COLUMN_DESCRIPTION: string = 'description';

  //TABLE_RECIPE_TAGS column names
  static readonly COLUMN_ID_RECIPE: string = 'id_recipe';

  //TABLE_RECIPE_ITEMS column names
  static readonly COLUMN_COUNT: string = 'count';

  //Database creation SQL statement
  private static readonly TABLES: string[] = [
    'CREATE TABLE IF NOT EXISTS ' + DatabaseModel.TABLE_LOCATIONS
    + ' ('
    + DatabaseModel.COLUMN_ID + ' INTEGER PRIMARY KEY AUTOINCREMENT, '
    + DatabaseModel.COLUMN_NAME + ' TEXT, '
    + DatabaseModel.COLUMN_X + ' REAL, '
    + DatabaseModel.COLUMN_Y + ' REAL'
    + ');',

    'CREATE TABLE IF NOT EXISTS ' + DatabaseModel.TABLE_FOODS
    + ' ('
    + DatabaseModel.COLUMN_ID + ' INTEGER PRIMARY KEY AUTOINCREMENT, '
    + DatabaseModel.COLUMN_NAME + ' TEXT, '
    + DatabaseModel.COLUMN_UNIT + ' INTEGER'
    + ');',

    'CREATE TABLE IF NOT EXISTS ' + DatabaseModel.TABLE_PRODUCTS
    + ' ('
    + DatabaseModel.COLUMN_ID + ' INTEGER PRIMARY KEY AUTOINCREMENT, '
    + DatabaseModel.COLUMN_NAME + ' TEXT, '
    + DatabaseModel.COLUMN_PRICE + ' REAL, '
    + DatabaseModel.COLUMN_DATE + ' TEXT, '
    + DatabaseModel.COLUMN_RATING + ' INTEGER, '
    + DatabaseModel.COLUMN_QUANTITY + ' INTEGER, '
    + DatabaseModel.COLUMN_COUNT_FRIDGE + ' INTEGER, '
    + DatabaseModel.COLUMN_PHOTO + ' TEXT, '
    + DatabaseModel.COLUMN_ID_LOCATION + ' INTEGER, '
    + DatabaseModel.COLUMN_ID_FOOD + ' INTEGER, '
    + 'FOREIGN KEY (' + DatabaseModel.COLUMN_ID_LOCATION + ') REFERENCES ' + DatabaseModel.TABLE_LOCATIONS + '(' + DatabaseModel.COLUMN_ID + '), '
    + 'FOREIGN KEY (' + DatabaseModel.COLUMN_ID_FOOD + ') REFERENCES ' + DatabaseModel.TABLE_FOODS + '(' + DatabaseModel.COLUMN_ID + ')'
    + ');',

    'CREATE TABLE IF NOT EXISTS ' + DatabaseModel.TABLE_PRODUCT_TAGS
    + ' ('
    + DatabaseModel.COLUMN_ID_PRODUCT + ' INTEGER, '
    + DatabaseModel.COLUMN_NAME + ' TEXT, '
    + 'FOREIGN KEY (' + DatabaseModel.COLUMN_ID_PRODUCT + ') REFERENCES ' + DatabaseModel.TABLE_PRODUCTS + '(' + DatabaseModel.COLUMN_ID + '), '
    + 'PRIMARY KEY (' + DatabaseModel.COLUMN_ID_PRODUCT + ', ' + DatabaseModel.COLUMN_NAME + ')'
    + ');',

    'CREATE TABLE IF NOT EXISTS ' + DatabaseModel.TABLE_RECIPES
    + ' ('
    + DatabaseModel.COLUMN_ID + ' INTEGER PRIMARY KEY AUTOINCREMENT, '
    + DatabaseModel.COLUMN_NAME + ' TEXT, '
    + DatabaseModel.COLUMN_RATING + ' INTEGER, '
    + DatabaseModel.COLUMN_PORTIONS + ' INTEGER, '
    + DatabaseModel.COLUMN_TIME + ' INTEGER, '
    + DatabaseModel.COLUMN_DIFFICULTY + ' TEXT, '
    + DatabaseModel.COLUMN_DESCRIPTION + ' TEXT, '
    + DatabaseModel.COLUMN_PHOTO + ' TEXT'
    + ');',

    'CREATE TABLE IF NOT EXISTS ' + DatabaseModel.TABLE_RECIPE_TAGS
    + ' ('
    + DatabaseModel.COLUMN_ID_RECIPE + ' INTEGER, '
    + DatabaseModel.COLUMN_NAME + ' TEXT, '
    + 'FOREIGN KEY (' + DatabaseModel.COLUMN_ID_RECIPE + ') REFERENCES ' + DatabaseModel.TABLE_RECIPES + '(' + DatabaseModel.COLUMN_ID + '), '
    + 'PRIMARY KEY (' + DatabaseModel.COLUMN_ID_RECIPE + ', ' + DatabaseModel.COLUMN_NAME + ')'
    + ');',

    'CREATE TABLE IF NOT EXISTS ' + DatabaseModel.TABLE_RECIPE_ITEMS
    + ' ('
    + DatabaseModel.COLUMN_ID_RECIPE + ' INTEGER, '
    + DatabaseModel.COLUMN_ID_FOOD + ' INTEGER, '
    + DatabaseModel.COLUMN_COUNT + ' INTEGER, '
    + 'FOREIGN KEY (' + DatabaseModel.COLUMN_ID_RECIPE + ') REFERENCES ' + DatabaseModel.TABLE_RECIPES + '(' + DatabaseModel.COLUMN_ID + '), '
    + 'FOREIGN KEY (' + DatabaseModel.COLUMN_ID_FOOD + ') REFERENCES ' + DatabaseModel.TABLE_FOODS + '(' + DatabaseModel.COLUMN_ID + '), '
    + 'PRIMARY KEY (' + DatabaseModel.COLUMN_ID_RECIPE + ', ' + DatabaseModel.COLUMN_ID_FOOD + ')'
    + ');',

  ];

  private static databaseReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {
    console.log('Hello ModelDatabase');
  }

  static createTables(sqlitePorter: SQLitePorter, database: SQLiteObject) {
    this.databaseReady.next(false);
    console.log('DBREADY: ', this.databaseReady.getValue());
    for (let table of DatabaseModel.TABLES) {
      sqlitePorter.importSqlToDb(database, table)
        .then(() => {
          console.log('Executed: ', table);
        })
        .catch(err => console.error(err));
    }
    this.databaseReady.next(true);
    console.log('DBREADY: ', this.databaseReady.getValue());
  }

  /**
   * Wipes all data from a database by dropping all existing tables!
   *
   * @param {SQLitePorter} sqlitePorter
   * @param {SQLiteObject} database
   */
  static dropAllTables(sqlitePorter: SQLitePorter, database: SQLiteObject): Promise<any> {
    return sqlitePorter.wipeDb(database)
      .then((count) => console.log('Successfully wiped ' + count + ' tables'))
      .catch(err => console.error(err));
  }

  static getDatabaseState(): Observable<boolean> {
    return this.databaseReady.asObservable();
  }
}
