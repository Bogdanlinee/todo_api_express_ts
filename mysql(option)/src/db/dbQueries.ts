import { db } from './db';
import { MysqlError, } from 'mysql';
import { TaskInterface } from '../models/Tasks';

const selectAllQuery = async () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM tasks';
    db.query(query, (err: MysqlError, result?: any) => {
      if (err) {
        reject('Something wrong with database');
      }
      let data = JSON.parse(JSON.stringify(result));
      data = data.map((item: TaskInterface) => {
        item.checked ? item.checked = true : item.checked = false;
        return item;
      });
      resolve(data);
    });
  });
}

const insertOneQuery = async (text: string, checked: boolean) => {
  const checkedValue: number = checked ? 1 : 0;

  return new Promise((resolve, reject) => {
    const query = "INSERT INTO `tasksDatabse`.`tasks` (`text`,`checked`) VALUES ('" + text + "','" + checkedValue + "');";
    db.query(query, (err, result) => {
      if (err) {
        reject('Something wrong with database');
      }
      resolve(result.insertId);
    });
  })
}

const updateOneQuery = async (text: string, id: number, checked: boolean) => {
  const checkedValue: number = checked ? 1 : 0;

  return new Promise((resolve, reject) => {
    const query = "UPDATE `tasksDatabse`.`tasks` SET text = '" + text + "', checked = '" + checkedValue + "'  WHERE id = '" + id + "'";
    db.query(query, (err, result) => {
      if (err) {
        reject('Something wrong with database');
      }
      resolve(true);
    });
  })
}

const deleteOneQuery = async (id: number) => {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM `tasksDatabse`.`tasks` WHERE id = '" + id + "'";
    db.query(query, (err, result) => {
      if (err) {
        reject('Something wrong with database');
      }
      resolve(true);
    });
  })
}

export { selectAllQuery, insertOneQuery, updateOneQuery, deleteOneQuery };