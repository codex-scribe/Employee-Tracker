const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'guitar',
        database: 'employees_db'
    },
    console.log('Connected to the employees_db database.')
);

const init = () => {
inquirer.prompt(
    {type: 'list',
    message: 'What would you like to do?',
    name: "initialize",
    choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update employee role']
}).then((choice) => {
    switch(choice.initialize) {
        case 'view all departments':
        viewDepts();
        break;
        case 'view all roles':
        viewRoles();
        break;
        case 'view all employees':
        
        break;
        case 'add a department':

        break;
        case 'add a role':

        break;
        case 'add an employee':

        break;
        case 'update employee role':

        break;
    }

})
}

const viewDepts = () => {
    db.query('SELECT * FROM department', function (err, results) {
        console.log(results);
    })
}

const viewRoles = () => {
    db.query('SELECT * FROM role', function (err, results) {
        console.log(results);
    })
}

//add a department function
const addDept = () => {
    inquirer.prompt([
        {type: 'input',
        message: 'What is the name of the department?',
        name: "addDeptName"
        },    
    ]).then();
}


//add a role function
const addRole = () => {
    inquirer.prompt([
        {type: 'input',
        message: 'What is the name of the role?',
        name: "addRoleName"
        },    
        {
        type: 'input',
        message: 'What is the salary of the role?',
        name: "addRoleSalary"
        },
        {
        type: 'list',
        message: 'What is the name of the role?',
        name: "addRoleDept",
        choices: listOfDepts
        }
    ]).then();
}


//add an employee function
const addEmp = () => {
    inquirer.prompt([
        {type: 'input',
        message: 'What is the first name of the employee?',
        name: "addEmpFirstName"
        },    
        {type: 'input',
        message: 'What is the last name of the employee?',
        name: "addEmpLastName"
        },
        {
        type: 'list',
        message: 'What is the employee\'s role?',
        name: "addEmpRole",
        choices: listOfRoles
        },
        {
        type: 'list',
        message: 'Who is the employee\'s manager?',
        name: "addEmpMgr",
        choices: listOfMgrs
        }
    ]).then();
}


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  init();