import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabase("db.db");

export const dbInit = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `create table if not exists myPets (
            id integer primary key not null, 
            name text, 
            spicie text,
            photoURL text,
            birthDate text,
            breed text,
            gender text,
            weight text,
            ownerName text
            )`,
        [],
        () => {
          //   resolve();
        },
        (_, err) => {
          console.log(err);
          reject(err);
        }
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        `create table if not exists activities (
              id integer primary key not null,
              petId integer,
              activityType text,
              date text,
              note text,
              startTime text,
              endTime text,
              calorie text,
              meter text
              )`,
        [],
        () => {
          // resolve();
        },
        (_, err) => {
          console.log(err);
          reject(err);
        }
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        `create table if not exists medical (
              id integer primary key not null, 
              petId integer,
              date text,
              startDate text,
              endDate text,
              medicalName text
          )`,
        [],
        () => {
          // resolve();
        },
        (_, err) => {
          console.log(err);
          reject(err);
        }
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        `create table if not exists vaccine (
                      id integer primary key not null, 
                      petId integer,
                      date text,
                      vaccineName text
                      )`,
        [],
        () => {
          // resolve();
        },
        (_, err) => {
          console.log(err);
          reject(err);
        }
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        `create table if not exists vet (
              id integer primary key not null, 
              petId integer,
              date text
              )`,
        [],
        () => {
          // resolve();
        },
        (_, err) => {
          console.log(err);
          reject(err);
        }
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        `create table if not exists weight (
          id integer primary key not null, 
          petId integer,
          date text,
          weight text
          )`,
        [],
        () => {
          // resolve();
        },
        (_, err) => {
          console.log(err);
          reject(err);
        }
      );
    });
    resolve();
  });

  return promise;
};

export const dropDatabase = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `drop table myPets`,
        [],
        () => {
          // resolve();
        },
        (_, err) => {
          console.log(err);
          reject(err);
        }
      );

      tx.executeSql(
        `drop table activities`,
        [],
        () => {
          // resolve();
        },
        (_, err) => {
          console.log(err);
          reject(err);
        }
      );
      tx.executeSql(
        `drop table medical`,
        [],
        () => {
          // resolve();
        },
        (_, err) => {
          console.log(err);
          reject(err);
        }
      );
      tx.executeSql(
        `drop table vaccine`,
        [],
        () => {
          // resolve();
        },
        (_, err) => {
          console.log(err);
          reject(err);
        }
      );
      tx.executeSql(
        `drop table vet`,
        [],
        () => {
          // resolve();
        },
        (_, err) => {
          console.log(err);
          reject(err);
        }
      );
      tx.executeSql(
        `drop table weight`,
        [],
        () => {
          // resolve();
        },
        (_, err) => {
          console.log(err);
          reject(err);
        }
      );
    });
    resolve();
  });

  return promise;
};
