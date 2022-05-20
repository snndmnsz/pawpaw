import { db } from "../database";

export const vetInit = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `create table if not exists vet (
                id integer primary key not null, 
                petId integer,
                date text
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

export const getAllVetbyPetId = (petId) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `select * from vet where petId = ?`,
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

export const addVet = (petId, date) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `insert into vet (
                        petId,
                        date
                        ) values (?, ?)`,
        [+petId, date],
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

export const deleteAVet = (id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `delete from vet where id = ?`,
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
