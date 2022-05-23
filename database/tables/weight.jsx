import { db } from "../database";

export const getAllWeightbyPetId = (petId) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `select * from weight where petId = ?`,
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

export const getAllWeightForADate = (petId) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `select * from weight where petId = ?`,
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

export const addWeight = (petId, weight, date) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `insert into weight (
                        petId,
                        date, 
                        weight
                        ) values (?, ?, ?)`,
        [+petId, date, weight],
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
