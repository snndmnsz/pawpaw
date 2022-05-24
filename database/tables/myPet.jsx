import { db } from "../database";

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
        [+id],
        () => {
          // resolve();
        },
        (_, err) => {
          console.log(err);
          // reject(err);
        }
      );
      tx.executeSql(
        `delete from vet where petId = ?`,
        [+id],
        () => {
          // resolve();
        },
        (_, err) => {
          console.log(err);
          // reject(err);
        }
      );

      tx.executeSql(
        `delete from weight where petId = ?`,
        [+id],
        () => {
          // resolve();
        },
        (_, err) => {
          console.log(err);
          // reject(err);
        }
      );

      tx.executeSql(
        `delete from vaccine where petId = ?`,
        [+id],
        () => {
          // resolve();
        },
        (_, err) => {
          console.log(err);
          // reject(err);
        }
      );

      tx.executeSql(
        `delete from medical where petId = ?`,
        [+id],
        () => {
          // resolve();
        },
        (_, err) => {
          console.log(err);
          // reject(err);
        }
      );

      tx.executeSql(
        `delete from activities where petId = ?`,
        [+id],
        () => {
          // resolve();
        },
        (_, err) => {
          console.log(err);
          // reject(err);
        }
      );
    });

    resolve();
  });
  return promise;
};
