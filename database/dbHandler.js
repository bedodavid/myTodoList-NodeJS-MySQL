//var User = require('../models/user');
//var List = require('../models/list');
var Task = require('../models/task');
var constants = require('../database/constants')

var mysql = require('mysql'),
   async = require('async');

var con = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "Ram4szesz26",
  database: "todolist"
});

exports.addUser = function(user) {
  return new Promise(function(resolve, reject){
   con.getConnection(function(err, tempCont) {
    if (err) {
      tempCont.release();
      throw err;
    } else {
      var sql = "INSERT INTO " + constants.user.USERS_TABLE + " (" + constants.user.USERS_NAME + ", " + constants.user.USERS_EMAIL + ", " +
        constants.user.USERS_PASSWORD + ", " + constants.user.USERS_REGISTER + ") VALUES ('" +
        user.getName + "', '" + user.getEmail + "', '" +
        user.getPassword + "', " + "now()" + ")";
      tempCont.query(sql, function(err, res) {
        if (err) {
          return reject(err);
        } else {
          resolve(res);
        }
      });
    }
    tempCont.release();
  });
});
};

exports.findUser = function(user) {
  return new Promise(function(resolve, reject){
    con.getConnection(function(err, tempCont) {
      if (err) {
        tempCont.release();
        throw err;
      } else {
        var sql = "SELECT * FROM " + constants.user.USERS_TABLE + " WHERE " + constants.user.USERS_EMAIL + " =? ";
        tempCont.query(sql, [user.getEmail], function(err, res) {
          if (err) {
            return reject(err);
          } else {
            resolve(res);
          }
          tempCont.release();
        });
      }
    });
  });
};


exports.addList = function(list) {
  return new Promise(function(resolve, reject){
  con.getConnection(function(err, tempCont) {
    if (err) {
      tempCont.release();
      throw err;
    } else {
      var sql = "INSERT INTO " + constants.list.LIST_TABLE + " (" + constants.list.LIST_USERID + ", " + constants.list.LIST_NAME + ") VALUES ?"
      tempCont.query(sql, [list], function(err, res) {
        if (err) {
          return reject(err);
        } else {
          resolve(res);
        }
      });
    }
  });
});
};

exports.getList = function(userID) {
  return new Promise(function(resolve, reject){
  con.getConnection(function(err, tempCont) {
    if (err) {
      tempCont.release();
      throw err;
    } else {
        var sql = "SELECT * FROM " + constants.list.LIST_TABLE + " WHERE " + constants.list.LIST_USERID + " =? ";
      tempCont.query(sql, [userID], function(err, res) {
        if (err) {
          return reject(err);
        } else {
          resolve(res);
        }
      });
    }
  });
});
};