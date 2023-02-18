INSERT INTO department (name)
VALUES  ("Executive"),
        ("Products"),
        ("Marketing");

INSERT INTO role (title, salary, department_id)
VALUES ('CEO', 294593.00, 1),
        ('Products director', 592538, 2),
        ('Marketing director', 48529, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('John', 'Smith', 1, 0),
        ('Kathy', 'Jones', 2, 1),
        ('Frank', "Miller", 3, 1)