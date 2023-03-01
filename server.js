const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");

const PORT = process.env.PORT || 3001;
const app = express();

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "guitar",
    database: "employees_db",
  },
  console.log("Connected to the employees_db database.")
);

const init = () => {
  inquirer
    .prompt({
      type: "list",
      message: "What would you like to do?",
      name: "initialize",
      choices: [
        "view all departments",
        "view all roles",
        "view all employees",
        "add a department",
        "add a role",
        "add an employee",
        "update employee role",
      ],
    })
    .then((choice) => {
      switch (choice.initialize) {
        case "view all departments":
          viewDepts();
          break;
        case "view all roles":
          viewRoles();
          break;
        case "view all employees":
          viewEmps();
          break;
        case "add a department":
          addDept();
          break;
        case "add a role":
          addRole();
          break;
        case "add an employee":
          break;
        case "update employee role":
          break;
      }
    });
};

const viewDepts = () => {
  // db.query('SELECT * FROM department', function (err, results) {
  //     console.log(results);
  // }).then(() => init())
  db.promise()
    .query("SELECT * FROM department")
    .then(([result]) => {
      console.table(result);
    })
    .then(() => init());
};

const viewRoles = async () => {
  // db.query('SELECT * FROM role', function (err, results) {
  //     console.log(results);
  // })
  const [asyncResult] = await db.promise().query("SELECT * FROM role");
  console.log(asyncResult);
};

const viewEmps = () => {
  db.query("SELECT * FROM employee", function (err, results) {
    console.table(results);
  });
};

//add a department function
const addDept = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the department?",
        name: "name",
      },
    ])
    .then((DeptInfo) => {
      db.query(`INSERT INTO department (name) VALUE (${DeptInfo.name})`);
    })
    .then(() => {
      init();
    });
};

//add a role function
const addRole = () => {
  db.query("SELECT * FROM department", function (err, results) {
    console.log(results);
    const listOfDepts = results.map((dept) => {
        return { value: dept.id, name: dept.name }
    });
    inquirer.prompt([
        {
          type: "input",
          message: "What is the name of the role?",
          name: "title",
        },
        {
          type: "input",
          message: "What is the salary of the role?",
          name: "salary",
        },
        {
          type: "list",
          message: "What department is the role in?",
          name: "department_id",
          choices: listOfDepts,
        },
      ])
      .then((answers) => {
        db.query('INSERT INTO role SET ?', answers, function(err, result) {
            err
            ? console.error(error)
            : console.log(`New role, ${answers.title}, created!`);
            init()
        })
      })
      
      ;
    
  });
  
};

let queryData = new Promise((res, rej) => {});
//add an employee function
const addEmp = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the first name of the employee?",
        name: "addEmpFirstName",
      },
      {
        type: "input",
        message: "What is the last name of the employee?",
        name: "addEmpLastName",
      },
      {
        type: "list",
        message: "What is the employee's role?",
        name: "addEmpRole",
        choices: listOfRoles,
      },
      {
        type: "list",
        message: "Who is the employee's manager?",
        name: "addEmpMgr",
        choices: listOfMgrs,
      },
    ])
    .then();
};

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

init();
