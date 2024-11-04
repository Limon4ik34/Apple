// const mysql = require("mysql2");
// const mysql = require("mysql2");
import mysql from 'mysql2'
const connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  database: "apple",
  password: "цщщл1812"
});

export default {
  connect() {
    connection.connect((err) => {
      if (err) {
        console.log('Ошибка ДБ', err)
      } else {
        console.log('Подключение успешно установленно')
      }
    })
  },
  async createUser(newUser) {
    let res = new Promise((resolve, reject) => {
      const sql = `
            INSERT INTO users (name, lastName, login, password, role) VALUES('${newUser.name}',
            '${newUser.lastName}', '${newUser.login}', '${newUser.password}', 'user')
            `
      connection.query(sql, function(err, results) {
        if(err) {
          reject(err)
        } else {
          console.log(results);
          resolve(results)
        }
      });
    })
    return res
  },
  async getUser(user) {
    let res = new Promise((resolve, reject) => {
      const sql = `SELECT * FROM users WHERE login='${user.login}' AND password='${user.password}'`;
      connection.query(sql, function(err, results) {
        if(err || !results[0]) {
          console.log('reject')
          reject(err)
        } else {
          resolve(results)
          console.log('resolve')
        }
      });
    })
    return res
  },
  async createCategory(newCategory) {
    let res = new Promise((resolve, reject) => {
      const sql = `
            INSERT INTO categories (title, slug)
             VALUES('${newCategory.title}', '${newCategory.slug}')
            `
      connection.query(sql, function(err, results) {
        if(err) {
          reject(err)
        } else {
          console.log(results);
          resolve(results)
        }
      });
    })
    return res
  },
  async getCategories() {
    let res = new Promise((resolve, reject) => {
      let sql = `SELECT * FROM categories`;
      connection.query(sql, function(err, results) {
        if(err) {
          console.log('err', err)
          console.log('reject')
          reject(err)
        } else {
          resolve(results)
          console.log('resolve')
        }
      });
    })
    return res
  },
  async updateCategory(category) {
    let res = new Promise((resolve, reject) => {
      const sql = `UPDATE categories SET title='${category.title}', slug='${category.slug}' WHERE id=${category.id}`;
      connection.query(sql, function(err, results) {
        if(err) {
          console.log('err', err)
          console.log('reject')
          reject(err)
        } else {
          resolve(results)
          console.log('resolve')
        }
      });
    })
    return res
  },
  async deleteCategory(id) {
    let res = new Promise((resolve, reject) => {
      const sql = `DELETE FROM categories WHERE id=${id}`;
      connection.query(sql, function(err, results) {
        if(err) {
          console.log('err', err)
          console.log('reject')
          reject(err)
        } else {
          resolve(results)
          console.log('resolve')
        }
      });
    })
    return res
  },
}