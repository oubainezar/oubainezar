//ملاحظة لقد إستبدلت العربية بالإنجليزية لأنها لا تتوافق مع node js



const sqlite = require(`sqlite3`).verbose();
const readline = require('readline');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
//لقد أضفت عملية خامسة وهي تسجيل الطالب بالدروس
const operations = ['a', 'd', 's', 'u', 'r'];
const dataBase = new sqlite.Database("./school.db", err=>{
    if(err) return console.log(err.message);
})
dataBase.get('SELECT name FROM  sqlite_master WHERE type = "table" AND name = "lessons" OR name = "students" OR name = "membership"', (err, row)=>{
    if(err) console.log(err.message);
    else if(!row){
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
    }
})

rl.question("Please choose the method you want to do this\n*To add a student, press the letter a\n*To delete a student, press the letter d\n*To modify a student’s information, press the letter u\n*To view a student's information, click on the letter s\n*To register the student for lessons, click on the letter r\n-------->  ", (operation) => {
    if(!operations.includes(operation.toLowerCase())){
        rl.close();
        dataBase.close(err=>{
            if(err) return console.log(err.message);
            else return console.log("The database has been closed.");
        });
        return console.log("operation not found.");
    }
    if(operation == "r"){
        rl.question('Enter the ID of student: ', id1=>{
            if(isNaN(id1)){
                rl.close();
                dataBase.close(err=>{
                    if(err) return console.log(err.message);
                    else return console.log("The dataBase has been closed.")
                })
                return console.log('you must enter only characters.')
            }
            dataBase.get(`SELECT student_id FROM students WHERE student_id = "${id1}"`,(err, id_student)=>{
                if(err) {
                    rl.close();
                    dataBase.close(err=>{
                        if(err) return console.log(err.message);
                        else return console.log('The dataBase has been closed.')
                    })
                    return console.log(err.message);
                }
                else if(id_student){
                    rl.question('Enter the ID of lesson: ', id_lesson=>{
                        if(isNaN(id_lesson)){
                            rl.close();
                            dataBase.close(err=>{
                                if(err) return console.log(err.message);
                                else return console.log("The dataBase has been closed.")
                            })
                            return console.log('you must enter only characters.')
                        }
                        dataBase.get(`SELECT lesson_id FROM lessons WHERE lesson_id = "${id_lesson}"`,(err, id2)=>{
                            if(err) {
                                rl.close();
                                dataBase.close(err=>{
                                if(err) return console.log(err.message);
                                else return console.log('The dataBase has been closed.')

                            })
                            console.log(err.message);
                        }
                            if(id2){
                            
                                dataBase.run(`INSERT INTO membership(student_id, lesson_id) VALUES(${id_student[0].student_id}, ${id2[0].lesson_id})`, err=>{
                                    if(err){
                                        rl.close();
                                        dataBase.close(err=>{
                                            if(err) return console.log(err.message);
                                            else return console.log('The dataBase has been closed.');
                                        })
                                        return console.log(err.message);
                                    }
                                    rl.close();
                                    return console.log('operation accomplished successfully.')
                                });
                            
                                
                                
                            }
                            else{
                                rl.close();
                                dataBase.close(err=>{
                                    if(err) return console.log(err.message);
                                    else return console.log('The dataBase has been closed.');
                                })
                                return console.log("The lesson ID not found")
                            }
                            

                        })
                    })
                }
                else{
                    rl.close();
                    dataBase.close(err=>{
                        if(err) return console.log(err.message);
                        else return console.log('The dataBase has been closed.');
                    })
                    return console.log("The student ID not found")
                }
                
            });
        })
    }
    rl.question("Enter the student ID: ", (student_id)=>{
        if(isNaN(student_id)){
            rl.close();
            dataBase.close(err=>{
                if(err) return console.log(err.message);
                else return console.log("The database has been closed.");
            });
            return console.log("please enter only numbers.");
        }
        if(operation == "a"){
            dataBase.get(`SELECT * FROM students WHERE student_id = ${student_id}`, (err, row)=>{
                if(err){
                    rl.close();
                    dataBase.close(err=>{
                        if(err) return console.log(err.message);
                        else return console.log("The database has been closed.");
                    });
                    return console.log(err.message);
                }
                else if(!row){
                    rl.question('Enter the name of student: ', (name)=>{
                        if(!isNaN(name)){
                            rl.close();
                            dataBase.close(err=>{
                            if(err) return console.log(err.message);
                            else return console.log("The database has been closed.");
                            });
                            return console.log("please enter only characters.");
                        }
                        rl.question('Enter the family name of student: ', (familyname)=>{
                            if(!isNaN(familyname)){
                                rl.close();
                                dataBase.close(err=>{
                                    if(err) return console.log(err.message);
                                    else return console.log("The database has been closed.");
                                });
                                return console.log("please enter only characters.");
                            }
                            rl.question('Enter the age of student: ', (age)=>{
                                //عمر الطالب يجب أن يكون مابين 5 و 65 سنة
                                if(isNaN(age) || age>=65 || age<=5){
                                    rl.close();
                                    dataBase.close(err=>{
                                        if(err) return console.log(err.message);
                                        else return console.log("The database has been closed.");
                                    });
                                    return console.log("please enter only numbers and the age must be between 5 and 65.")
                                }
                                rl.question('Enter the class of student: ', (clas)=>{
                                    if(isNaN(clas)){
                                        rl.close();
                                        dataBase.close(err=>{
                                            if(err) return console.log(err.message);
                                            else return console.log("The database has been closed.");
                                        });
                                        return console.log("please enter only numbers.")
                                    }
                                    //هنا يمكن أن يكون المدخل إما عددا أو تاريخ بالحروف
                                    rl.question('Enter the date of registration: ', (regDate)=>{
                                        dataBase.run(`INSERT INTO students(student_id, name, familyname, age, class, regDate) VALUES(${student_id}, "${name}", "${familyname}", ${age}, ${clas}," ${regDate}")`, err=>{
                                            if(err) {
                                                rl.close();
                                                dataBase.close(err=>{
                                                    if(err) return console.log(err.message);
                                                    else return console.log("The database has been closed.");
                                                });
                                                return console.log(err.message);
                                            }
                                        });
                                            rl.question('Enter the lesson ID: ', (lesson_id)=>{
                                                //لا يمكن أن يكون رقم المعرف الخاص بالجدول الطلاب هو نفسه رقم المعرف الخاص بجدول الدروس
                                                if(isNaN(lesson_id) || lesson_id == student_id){
                                                    rl.close();
                                                    dataBase.close(err=>{
                                                        if(err) return console.log(err.message);
                                                        else return console.log("The database has been closed.");
                                                    });
                                                    return console.log("please enter only numbers or change the ID.");
                                                }
                                                rl.question('Enter the name of lesson: ', (lesson_name)=>{
                                                    if(!isNaN(lesson_name)){
                                                        rl.close();
                                                        dataBase.close(err=>{
                                                            if(err) return console.log(err.message);
                                                            else return console.log("The database has been closed.");
                                                        });
                                                        return console.log("please enter only characters.");
                                                    }
                                                    dataBase.run(`INSERT INTO lessons(lesson_id, lesson_name) VALUES(${lesson_id}, "${lesson_name}")`, err=>{
                                                        if(err){
                                                            rl.close();
                                                            dataBase.close(err=>{
                                                                if(err) return console.log(err.message);
                                                                else return console.log("The database has been closed.");
                                                            });
                                                            return console.log(err.message);
                                                        }
                                                        rl.close();
                                                        dataBase.close(err=>{
                                                            if(err) return console.log(err.message);
                                                            else return console.log("The database has been closed.");
                                                        });
                                                        return console.log('operation accomplished successfully.')
                                                    })
                                                    
                                                });
                                            });
                                            
                                        
                                        })
                                        
                                    });
                                });
                            });
                        });
                }
                else{
                    rl.close();
                    dataBase.close(err=>{
                        if(err) return console.log(err.message);
                        else return console.log("The database has been closed.");
                    });
                    return console.log('This ID already exists.')
                }
            })
            
        }
        else if(operation == "d"){
            dataBase.get(`SELECT * FROM students WHERE student_id = ${student_id}`, (err, row)=>{
                if(err){
                    rl.close();
                    dataBase.close(err=>{
                        if(err) return console.log(err.message);
                        else return console.log("The database has been closed.");
                    });
                    return console.log(err.message);
                }
                else if(row){
                    dataBase.run(`DELETE FROM students WHERE student_id = ${student_id}`, err=>{
                        if(err) {
                            rl.close();
                            dataBase.close(err=>{
                                if(err) return console.log(err.message);
                                else return console.log("The database has been closed.");
                            });
                            return console.log(err.message);
                        }
                        rl.close();
                        dataBase.close(err=>{
                            if(err) return console.log(err.message);
                            else return console.log("The database has been closed.");
                        });
                        return console.log("operation accomplished successfully.");
                    });
                }
                else{
                    rl.close(); 
                    dataBase.close(err=>{
                        if(err) return console.log(err.message);
                        else return console.log("The database has been closed.");
                    });
                    return console.log("student ID not found.");
                }
                
            })
        }
        else if(operation == "u"){
            dataBase.get(`SELECT * FROM students WHERE student_id = ${student_id}`, (err, row)=>{
                if(err) {
                    rl.close();
                    dataBase.close(err=>{
                        if(err) return console.log(err.message);
                        else return console.log("The database has been closed.");
                    });
                    return console.log(err.message);
                } else if(!row){
                    rl.close();
                    dataBase.close(err=>{
                        if(err) return console.log(err.message);
                        else return console.log("The database has been closed.");
                    });
                    return console.log("student ID not found.");
                    
                }else {
                    rl.question("Enter the new name: ", newName =>{
                        if(!isNaN(newName)){
                            rl.close();
                            dataBase.close(err=>{
                                if(err) return console.log(err.message);
                                else return console.log("The database has been closed.");
                            });
                            return console.log("please enter only characters.");
                            
                        }
                        rl.question("Enter the new family name: ", newFamilyname =>{
                            if(!isNaN(newFamilyname)){
                                rl.close();
                                dataBase.close(err=>{
                                    if(err) return console.log(err.message);
                                    else return console.log("The database has been closed.");
                                });
                                return console.log("please enter only characters.");
                            }
                            rl.question("Enter the new age: ", newAge =>{
                                if(isNaN(newAge) && newAge <= 5 || newAge >= 65){
                                    rl.close();
                                    dataBase.close(err=>{
                                        if(err) return console.log(err.message);
                                        else return console.log("The database has been closed.");
                                    });
                                    return console.log("please enter only numbers and the age must be between 5 and 65.");
                                }
                                rl.question("Enter the new class: ", newClass =>{
                                    if(isNaN(newClass)){
                                        rl.close();
                                        console.log("please enter only numbers.");
                                        dataBase.close(err=>{
                                            if(err) return console.log(err.message);
                                            else return console.log("The database has been closed.");
                                        });
                                        
                                    }
                                    //هنا يمكن أن يكون المدخل إما عددا أو تاريخ بالحروف
                                    rl.question("Enter the new registration date: ", newRegDate =>{
                                        dataBase.run(`UPDATE students SET name = "${newName}", familyname = "${newFamilyname}", age = ${newAge}, class = ${newClass}, regDate = "${newRegDate}" WHERE student_id = ${student_id}`, err=>{
                                            if(err) {
                                                rl.close();
                                                dataBase.close(err=>{
                                                    if(err) return console.log(err.message);
                                                    else return console.log("The database has been closed.");
                                                });
                                                return console.log(err.message);
                                            }
                                            rl.close();
                                            dataBase.close(err=>{
                                                if(err) return console.log(err.message);
                                                else return console.log("The database has been closed.");
                                            });
                                            return console.log("operation accomplished successfully.");
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    
                }
            });
        }        
        else{
            dataBase.all(`SELECT students.*, lessons.lesson_name
            FROM students
            JOIN membership ON students.student_id = membership.student_id
            JOIN lessons ON membership.lesson_id = lessons.lesson_id
            WHERE students.student_id = ${student_id}
            `, (err, data)=>{
                if(err) {
                    rl.close();
                    dataBase.close(err=>{
                        if(err) return console.log(err.message);
                        else return console.log("The database has been closed.");
                    });
                    return console.log(err.message);
                }
                else{
                    if(data.length == 0){
                        rl.close();
                        console.log("student ID not found.");
                        dataBase.close(err=>{
                            if(err) return console.log(err.message);
                            else return console.log("The database has been closed.");
                        });
                        
                    }
                    rl.close();
                    dataBase.close(err=>{
                        if(err) return console.log(err.message);
                        else return console.log("The database has been closed.");
                    });
                    return console.log(data);
                }
                
            });
        }
    });
});
        
    });
});
