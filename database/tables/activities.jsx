import { db } from "../database";

export const activitiesInit = () => {
  const promise = new Promise((resolve, reject) => {
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
          resolve();
        },
        (_, err) => {
          console.log(err);
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const getAllActivities = (petId) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `select * from activities where petId = ?`,
        [+petId],
        (_, { rows }) => {
          resolve(rows._array);
        },
        (_, err) => {
          console.log(err);
          reject(err);
        }
      );
    });
  });
  return promise;
};

// export const getATypeOfActivities = (petId, type) => {
//   const promise = new Promise((resolve, reject) => {
//     db.transaction((tx) => {
//       tx.executeSql(
//         `select * from activities where petId = ? and activityType = ?`,
//         [petId, type],
//         (_, { rows }) => {
//           resolve(rows._array);
//         },
//         (_, err) => {
//           console.log(err);
//           reject(err);
//         }
//       );
//     });
//   });
//   return promise;
// };

export const getActivitiesForADate = (petId, date) => {
  const dateObj = date.split("T")[0];
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `select * from activities where petId = ? and SUBSTR(date,1, 10) = ?`,
        [+petId, dateObj],
        (_, { rows }) => {
          resolve(rows._array);
        },
        (_, err) => {
          console.log(err);
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const addAnActivity = (petId, activity) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `insert into activities (
                petId,
                activityType,
                date,
                note,
                startTime,
                endTime,
                calorie,
                meter) values(?,?,?,?,?,?,?,?)`,
        [
          +petId,
          activity.activityType,
          activity.date,
          activity.note,
          activity.startTime,
          activity.endTime,
          activity.calorie,
          activity.meter,
        ],
        (_, { rows }) => {
          resolve(rows._array);
        },
        (_, err) => {
          console.log(err);
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const deleteAActivity = (id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `delete from activities where id = ?`,
        [+id],
        (_, { rows }) => {
          resolve(rows._array);
        },
        (_, err) => {
          console.log(err);
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const getVetVaccinationByPetiD = (petId, date) => {
  const dateObj = date.split("T")[0];
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `select * from activities 
        where petId = ? 
        and activityType in ('vet', 'vaccine') 
        and SUBSTR(date,1, 10) = ?`,
        [+petId, dateObj],
        (_, { rows }) => {
          resolve(rows._array);
        },
        (_, err) => {
          console.log(err);
          reject(err);
        }
      );
    });
  });
  return promise;
};
