import SQLite from "react-native-sqlite-storage";

const databaseName = "docsapp.db";
const databaseVersion = "1.0";
const databaseDisplayname = "DocsApp";
const databaseSize = 200000;
let db;
const STR_EMPTY = "";
const TABLE_USER = "user";
const TABLE_INI = "ini";

//CREATE queries *****************************************************************************
const CREATE_TABLE_USER =
  "CREATE TABLE IF NOT EXISTS " +
  TABLE_USER +
  " (id INTEGER PRIMARY KEY AUTOINCREMENT, mobile VARCHAR(10) NOT NULL, installed_date VARCHAR(40) NOT NULL, premium_user INTEGER DEFAULT 0, logged_status INTEGER DEFAULT 1, token TEXT, user_type INTEGER)";

//INSERT queries *****************************************************************************
const INSERT_USER =
  "INSERT INTO " +
  TABLE_USER +
  " (mobile, installed_date, token, user_type) VALUES (:mobile, :installedDate, :token, :userType)";

//UPDATE queries *****************************************************************************
const UPDATE_LOGIN_STATUS_FOR_USER =
  "UPDATE " +
  TABLE_USER +
  " SET logged_status=1, user_type=(:userType) WHERE mobile=(:mobile)";

const UPDATE_USER_FOR_LOGOUT =
  "UPDATE " + TABLE_USER + " SET logged_status=0 WHERE token=(:token)";

//SELECT queries *****************************************************************************
const SELECT_LOGGED_USER =
  "SELECT * FROM " + TABLE_USER + " WHERE logged_status=1";

const SELECT_USER_WITH_MOBILE =
  "SELECT * FROM " + TABLE_USER + " WHERE mobile=(:mobile)";

export const DBService = {
  initDB: callback => {
    SQLite.DEBUG(true);
    SQLite.enablePromise(false);
    db = SQLite.openDatabase(
      databaseName,
      databaseVersion,
      databaseDisplayname,
      databaseSize
    );

    db.transaction(tx => {
      // tx.executeSql("DROP TABLE IF EXISTS " + TABLE_USER, [], () =>
      //   console.log("***** Dropped " + TABLE_USER + " successfully.")
      // );

      tx.executeSql(
        CREATE_TABLE_USER,
        [],
        () => {
          console.log("**** " + TABLE_USER + " table created successfully.");
          callback();
        },
        err => {
          console.log("*** " + TABLE_USER + " table creation error!");
          console.log(err.message);
        }
      );
    });
  },

  setLoginStatus: (user, callback) => {
    DBService.checkIfUserExists(user, (tx, status) => {
      if (status) {
        // user available so update
        DBService.updateLoginStatus(tx, user, () => {
          callback();
        });
      } else {
        // user not available s insert
        DBService.insertUser(tx, user, () => {
          callback();
        });
      }
    });
  },

  checkIfUserExists: (user, callback) => {
    const mobile = user.mobile;
    db.transaction(tx => {
      tx.executeSql(
        SELECT_USER_WITH_MOBILE,
        [mobile],
        (tx, res) => {
          if (res.rows.length === 1) {
            callback(tx, true);
          } else {
            callback(tx, false);
          }
        },
        err => {
          console.log("***** Error fetching user! " + err.message);
        }
      );
    });
  },

  updateLoginStatus: (tx, user, callback) => {
    const { mobile, userType } = user;
    tx.executeSql(
      UPDATE_LOGIN_STATUS_FOR_USER,
      [userType, mobile],
      () => {
        callback();
        console.log("***** updated login status successfully.");
      },
      err => {
        console.log("***** Error updating login status." + err.message);
      }
    );
  },

  insertUser: (tx, user, callback) => {
    const installedDate = new Date();
    const { mobile, token, userType } = user;
    tx.executeSql(
      INSERT_USER,
      [mobile, installedDate, token, userType],
      () => {
        callback();
        console.log("***** Added user successfully.");
      },
      err => {
        console.log("***** Error adding user!");
      }
    );
  },

  getLoggedUserToken: callback => {
    db.transaction(tx => {
      tx.executeSql(
        SELECT_LOGGED_USER,
        [],
        (tx, res) => {
          if (res.rows.length === 0) {
            //no user data
            callback(null, null);
          } else {
            let row = res.rows.item(0);
            console.log("***** DB token - " + row.token);
            console.log("***** DB userType - " + row.user_type);
            callback(row.token, row.user_type);
          }
        },
        err => {
          console.log("***** Error fetching loggin in user!");
        }
      );
    });
  },

  logoutUser: () => {
    DBService.getLoggedUserToken(token => {
      db.transaction(tx => {
        tx.executeSql(
          UPDATE_USER_FOR_LOGOUT,
          [token],
          () => {
            console.log("***** logged_status set to 0 successfully.");
          },
          err => {
            console.log(
              "***** Error setting logged_status to 0." + err.message
            );
          }
        );
      });
    });
  },

  printUsers: () => {
    db.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM " + TABLE_USER,
        [],
        (tx, res) => {
          console.log("***********************************");
          for (let i = 0; i < res.rows.length; i++) {
            console.log(JSON.stringify(res.rows.item(i)));
          }
        },
        err => {}
      );
    });
  },

  openCB: () => {
    console.log("Database opened");
  },

  successCB: () => {
    console.log("Database success");
  },

  errorCB: err => {
    console.log("Database error: ", err);
  },

  closeDB: () => {
    if (db) {
      console.log("Closing database ...");
    }
  }
};
