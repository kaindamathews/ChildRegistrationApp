import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('childRegistration.db');

const createTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS children (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT, age INTEGER, gender TEXT, immunizations TEXT)',
      [],
      () => {
        console.log('Table created successfully');
      },
      (error) => {
        console.error('Error creating table: ', error);
      }
    );
  });
};

const insertChild = (childData, onSuccess, onError) => {
  db.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO children (firstName, lastName, age, gender, immunizations) VALUES (?, ?, ?, ?, ?)',
      [
        childData.firstName,
        childData.lastName,
        childData.age,
        childData.gender,
        JSON.stringify(childData.immunizations),
      ],
      (_, results) => {
        onSuccess(results.insertId);
      },
      (_, error) => {
        onError(error);
      }
    );
  });
};

const getAllChildren = (onSuccess, onError) => {
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM children',
      [],
      (_, results) => {
        const children = results.rows._array;
        onSuccess(children);
      },
      (_, error) => {
        onError(error);
      }
    );
  });
};

const getChildById = (childId, onSuccess, onError) => {
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM children WHERE id = ?',
      [childId],
      (_, results) => {
        const child = results.rows.length > 0 ? results.rows.item(0) : null;
        onSuccess(child);
      },
      (_, error) => {
        onError(error);
      }
    );
  });
};

const updateChild = (childId, updatedData, onSuccess, onError) => {
  db.transaction((tx) => {
    tx.executeSql(
      'UPDATE children SET firstName = ?, lastName = ?, age = ?, gender = ?, immunizations = ? WHERE id = ?',
      [
        updatedData.firstName,
        updatedData.lastName,
        updatedData.age,
        updatedData.gender,
        JSON.stringify(updatedData.immunizations),
        childId,
      ],
      (_, results) => {
        onSuccess(results.rowsAffected);
      },
      (_, error) => {
        onError(error);
      }
    );
  });
};

const deleteChild = (childId, onSuccess, onError) => {
  db.transaction((tx) => {
    tx.executeSql(
      'DELETE FROM children WHERE id = ?',
      [childId],
      (_, results) => {
        onSuccess(results.rowsAffected);
      },
      (_, error) => {
        onError(error);
      }
    );
  });
};

export { createTable, insertChild, getAllChildren, getChildById, updateChild, deleteChild };
