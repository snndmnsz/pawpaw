import { db } from "../database";


export const getAllMedicalbyPetId = (petId) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `select * from medical where petId = ?`,
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

export const addAMedical = (petId, medicalName, date, startDate, endDate) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `insert into medical (
                petId,
                date, 
                medicalName,
                startDate,
                endDate
            ) values (?, ?, ?, ?, ?)`,
        [+petId, date, medicalName, startDate, endDate],
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

export const deleteAMedical = (id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `delete from medical where id = ?`,
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
