import { db } from "../database";

export const myPetInit = () => {
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

export const getMyPets = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `select * from myPets`,
        [],
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

export const addAPet = (pet) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `insert into myPets (
                    name,
                    spicie, 
                    photoURL,
                    birthDate, 
                    breed,
                    gender,
                    weight,
                    ownerName) values(?,?,?,?,?,?,?,?)`,
        [
          pet.name,
          pet.spicie,
          pet.photoURL,
          pet.birthDate,
          pet.breed,
          pet.gender,
          pet.weight,
          pet.ownerName,
        ],
        (tx, results) => {
          resolve(results.insertId);
        },
        (_, err) => {
          console.log(err);
          reject(err);
        }
      );
    });

    //TODO WEIGHT attir bunun icine
  });
  return promise;
};

export const deleteAPet = (id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `delete from myPets where id = ?`,
        [id],
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
