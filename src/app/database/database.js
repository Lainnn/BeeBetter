import * as SQLite from "expo-sqlite";

import { moodData } from "../constants/mooddata";
import {
  fontAwesomeIcons,
  featherIcons,
  materialIcons
} from "../constants/icons";

export default class Database {
  static db = SQLite.openDatabase("MoodDB.db", "0", "Mood Database");

  deleteAllTables = () => {
    return this.executeSql("drop table if exists moods;").then(() => {
      return this.executeSql("drop table if exists tags;").then(() => {
        return this.executeSql("drop table if exists tagmap;");
      });
    });
  };

  createAllTables = () => {
    return this.executeSql(
      "CREATE TABLE IF NOT EXISTS moods (id INTEGER PRIMARY KEY NOT NULL, rating REAL, date TEXT, note TEXT);"
    ).then(() => {
      return this.executeSql(
        "CREATE TABLE IF NOT EXISTS tags(id INTEGER PRIMARY KEY NOT NULL, iconType TEXT, iconName TEXT, displayName TEXT NOT NULL UNIQUE);"
      ).then(() => {
        return this.executeSql(
          "CREATE TABLE IF NOT EXISTS tagmap(id INTEGER PRIMARY KEY NOT NULL, moodId INTEGER, tagId INTEGER, FOREIGN KEY(moodId) REFERENCES moods(id), FOREIGN KEY(tagId) REFERENCES tags(id));"
        );
      });
    });
  };

  reseedDatabase = () => {
    console.log("Reseeding database...");
    return this.deleteAllTables()
      .then(() => {
        console.log("Deleted all tables");
        return this.createAllTables().then(() => {
          console.log("Recreated all tables");
          return this.seedTags().then(() => {
            console.log("Reseeded Tags");
            return this.seedMoods().then(() => {
              console.log("Reseeded Moods");
              return Promise.resolve("Done reseeding Database");
            });
          });
        });
      })
      .catch(error => {
        console.log("Error reseeding", error);
      });
  };

  seedTags = () => {
    console.log("Seeding tags...");
    let promises = [];
    fontAwesomeIcons.forEach(icon => {
      promises.push(this.insertTag("FontAwesome", icon));
    });
    materialIcons.forEach(icon => {
      promises.push(this.insertTag("MaterialIcons", icon));
    });
    featherIcons.forEach(icon => {
      promises.push(this.insertTag("Feather", icon));
    });
    return Promise.all(promises)
      .then(() => {
        return Promise.resolve("All reinserting of tags completed");
      })
      .catch(error => {
        console.log("Error with all seed promises", error);
      });
  };

  seedMoods = () => {
    console.log("Seeding moods...");
    let promises = [];
    moodData.forEach(mood => {
      promises.push(this.insertMood(mood));
    });
    return Promise.all(promises).then(() => {
      return Promise.resolve("Succesfully reseeded moods");
    });
  };

  executeFullSql = (sql, params = []) => {
    return new Promise((resolve, reject) => {
      Database.db.transaction(tx => {
        tx.executeSql(
          sql,
          params,
          (tx, result) => {
            resolve(result);
          },
          error => reject(error)
        );
      });
    });
  };

  executeSql = async (sql, params = []) => {
    return new Promise((resolve, reject) =>
      Database.db.transaction(tx => {
        tx.executeSql(
          sql,
          params,
          (_, { rows }) => {
            resolve(rows);
          },
          error => reject(error)
        );
      })
    );
  };

  insertMood = mood => {
    return this.executeFullSql(
      "INSERT INTO moods (rating, date, note) VALUES (?, ?, ?);",
      [mood.rating, mood.date, mood.note]
    )
      .then(result => {
        let promises = [];
        mood.tags.forEach(tag => {
          promises.push(
            this.executeSql(
              "INSERT INTO tagmap (moodId, tagId) VALUES (?, ?);",
              [result.insertId, tag]
            )
          );
        });
        return Promise.all(promises).then(() => {
          return Promise.resolve(
            "Successfully inserted mood " + result.insertId
          );
        });
      })
      .catch(error => {
        console.log("ERROR", error);
        reject(error);
      });
  };

  updateMood = mood => {
    return this.executeFullSql(
      "UPDATE moods SET rating=?, date=?, note=? WHERE id=?",
      [mood.rating, mood.date, mood.note, mood.id]
    ).then(result => {
      return this.executeFullSql("DELETE FROM tagmap WHERE moodId = ?", [
        mood.id
      ]).then(result => {
        let promises = [];
        mood.tags.forEach(tag => {
          promises.push(this.insertTagMap(mood.id, tag));
        });
        return Promise.all(promises).then(() => {
          return Promise.resolve("Succesfully updated mood " + mood.id);
        });
      });
    });
  };

  insertTag = (iconType, iconData) => {
    return this.executeSql(
      "INSERT OR IGNORE INTO tags(iconType, iconName, displayName) VALUES (?, ?, ?);",
      [iconType, iconData.iconName, iconData.displayName]
    );
  };

  insertTagMap = (moodId, tagId) => {
    return this.executeFullSql(
      "INSERT INTO tagmap (moodId, tagId) VALUES(?,?);",
      [moodId, tagId]
    );
  };

  getMoodsWithTags = () => {

    // query all moods, then subquery for each mood id, matching tag.id in tagmap.moodId = mood.id
    return this.executeFullSql(
      "SELECT * FROM moods ORDER BY moods.date DESC"
    ).then(result => {
      let promises = [];
      // have all moods, do a promise for each subquery for each mood matching mood id and tag id in tag map.
      result.rows._array.forEach(mood => {
        promises.push(
          this.getTagsForMood(mood).then(result => {
            mood.tags = [...result.rows._array];
          })
        );
      });
      return Promise.all(promises).then(r => {
        return Promise.resolve(result.rows);
      });
    });
  };

  getTags = () => {
    return this.executeSql("SELECT * FROM tags;");
  };

  getMoods = () => {
    return this.executeSql("SELECT * FROM moods;");
  };

  getTagsForMood = mood => {
    return this.executeFullSql(
      "SELECT * FROM tags t WHERE t.id IN (SELECT tagmap.tagId FROM tagmap WHERE moodId = ?);",
      [mood.id]
    );
  };

  getMoodsInCurrentDateMonth = date => {
    // change date object to beginning of month for querying > than this date.
    date.setDate(1);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    // Need to query between start of month and end of month.
    let nextMonth = new Date(date);
    let newMonth = date.getMonth() + 1;
    if (newMonth > 11) {
      newMonth = 0;
      nextMonth.setFullYear(nextMonth.getFullYear() + 1);
    }
    nextMonth.setMonth(newMonth);
    date = date.toISOString();
    nextMonth = nextMonth.toISOString();
    return this.executeFullSql(
      "SELECT * FROM moods WHERE DATE(moods.date) BETWEEN DATE(?) AND DATE(?) ORDER BY moods.date DESC",
      [date, nextMonth]
    ).then(result => {
      // for every mood we have, need to get the tags for the mood.
      let promises = [];
      result.rows._array.forEach(mood => {
        promises.push(
          this.getTagsForMood(mood).then(result => {
            mood.tags = [...result.rows._array];
          })
        );
      });
      // resolve all the promises together.
      return Promise.all(promises).then(() => {
        return Promise.resolve(result.rows);
      });
    });
  };

  deleteMood = moodId => {
    return this.executeFullSql("DELETE FROM moods WHERE id = ?", [moodId]).then(
      () => {
        return this.executeFullSql("DELETE FROM tagmap WHERE moodId = ?", [
          moodId
        ]);
      }
    );
  };
}