//ملاحظة لقد إستبدلت الإنجليزية بالعربية لأنها لا تتوافق مع node js



const sqlite = require(`sqlite3`).verbose();
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const dataBase = new sqlite.Database(`./school.db`, err=>{
    if(err) console.log(err.message);
})
dataBase.run('CREATE TABLE students(student_id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, familyname TEXT, age INTEGER, class INTEGER, regDate TEXT)', err=>{
    if(err) console.log(err.message);
});
dataBase.run('CREATE TABLE lessons(lesson_id INTEGER PRIMARY KEY AUTOINCREMENT, lesson_name TEXT)', err=>{
    if(err) console.log(err.message);
});
dataBase.run(
    `CREATE TABLE membership(
       student_id INTEGER NOT NULL,  
       lesson_id INTEGER NOT NULL,
       PRIMARY KEY(student_id, lesson_id),
       CONSTRAINT cons_student
           FOREIGN KEY(student_id) REFERENCES students(student_id)
           ON DELETE CASCADE ON UPDATE CASCADE,
       CONSTRAINT cons_lesson
           FOREIGN KEY(lesson_id) REFERENCES lessons(lesson_id)
           ON DELETE CASCADE ON UPDATE CASCADE
    )`, err=>{
        if(err) console.log(err.message);
});

rl.question("Please choose the method you want to do this\n*To add a student, press the letter a\n*To delete a student, press the letter d\n*To modify a student’s information, press the letter u\n*To view a student's information, click on the letter s", (operation) => {
    rl.question("Enter the student ID: ", (student_id)=>{
        if(operation == "a"){
            rl.question('Enter the name of student: ', (name)=>{
                rl.question('Enter the family name of student: ', (familyname)=>{
                    rl.question('Enter the age of student: ', (age)=>{
                        rl.question('Enter the class of student: ', (clas)=>{
                            rl.question('Enter the date of registration: ', (regDate)=>{
                                dataBase.run(`INSERT INTO students(name, familyname, age, class, regDate) VALUES("${name}", "${familyname}", ${age}, ${clas}," ${regDate}")`, err=>{
                                    if(err) console.log(err.message);
                                });
                                rl.question('Enter the lesson ID: ', (lesson_id)=>{
                                    rl.question('Enter the name of lesson: ', (lesson_name)=>{
                                        dataBase.run(`INSERT INTO lessons(lesson_name) VALUES("${lesson_name}")`, err=>{
                                            if(err) console.log(err.message);
                                        });
                                        dataBase.run(`INSERT INTO membership(student_id, lesson_id) VALUES(${student_id}, ${lesson_id})`, err=>{
                                            if(err) console.log(err.message);
                                            console.log("operation accomplished successfully.");
                                            rl.close();
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        }
        else if(operation == "d"){
            dataBase.run(`DELETE FROM students WHERE student_id = ${student_id}`, err=>{
                if(err) console.log(err.message);
                console.log("operation accomplished successfully.");
                rl.close();
            });
        }
        else if(operation == "u"){
            rl.question("Enter the new name: ", newName =>{
                rl.question("Enter the new family name: ", newFamilyname =>{
                    rl.question("Enter the new age: ", newAge =>{
                        rl.question("Enter the new class: ", newClass =>{
                            rl.question("Enter the new registration date: ", newRegDate =>{
                                dataBase.run(`UPDATE students SET name = "${newName}", familyname = "${newFamilyname}", age = ${newAge}, class = ${newClass}, regDate = "${newRegDate}" WHERE student_id = ${student_id}`, err=>{
                                    if(err) console.log(err.message);
                                    console.log("operation accomplished successfully.");
                                    rl.close();
                                });
                            });
                        });
                    });
                });
            });
        }
        else if(operation == "s"){
            dataBase.all(`SELECT * FROM students JOIN membership ON students.student_id = membership.student_id
            WHERE students.student_id = ${student_id}
            `, (err, data)=>{
                if(err) {
                    console.log(err.message)
                    rl.close();
                }
                else{
                    console.log(data);
                    rl.close();
                }
                
            });
        }
        else{
            console.log("operation not found.");
            rl.close();
        }
    });
});










