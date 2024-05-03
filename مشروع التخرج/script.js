//ملاحظة لقد إستبدلت العربية بالإنجليزية لأنها لا تتوافق مع node js


const sqlite = require(`sqlite3`).verbose();
const readline = require('readline');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const operations = ['a', 'd', 's', 'u', 'r', 'p'];
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
function askOperation(){
    rl.question("Please choose the method you want to do this\n*To add a student, press the letter a\n*To delete a student, press the letter d\n*To modify a student’s information, press the letter u\n*To view a student's information, click on the letter s\n*To register the student for lessons, click on the letter r\n*ToTo delete a lesson from the lessons, click on a letter p\n------>  ", (operation) => {
        operation = operation.toLowerCase();
        if(!operations.includes(operation)){
            console.log('Operation not found.');
            askOperation();
        }
        if(operation == 'p'){
            function askLessonID(){
                rl.question('Enter the ID of lesson: ', id_lesson=>{
                    if(isNaN(id_lesson)|| id_lesson.trim() == ''){
                        console.log('you must enter only characters.')
                        askLessonID();
                        return
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
                            dataBase.run(`DELETE FROM lessons WHERE lesson_id = ${id_lesson}`, err=>{
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
                            console.log("The lesson ID not found")
                            askLessonID();
                        }
                        

                    })
                })
            }
            askLessonID();
        }
        else if (operation == "r") {
            function askStudentID(){
                rl.question('Enter the ID of student: ', student_id=>{
                    if(isNaN(student_id) || student_id.trim() == ''){
                        console.log('Please enter only numbers.')
                        askStudentID();
                    }
                    else{
                        dataBase.get(`SELECT * FROM students WHERE student_id = ${student_id}`, (err, student_id)=>{
                            if(err){
                                rl.close();
                                dataBase.close(err=>{
                                    if(err) return console.log(err.message);
                                    else return console.log("The database has been closed.");
                                });
                                return console.log(err.message);
                            }else if(student_id){
                                dataBase.all(`SELECT * FROM lessons`, (err, data1)=>{
                                    if(err){
                                        rl.close();
                                        dataBase.close(err=>{
                                            if(err) return console.log(err.message);
                                            else return console.log("The database has been closed.");
                                        });
                                        return console.log(err.message);
                                    }else if(data1){
                                        console.log('These are all the lessons: \n');
                                        for(let i of data1){
                                            console.log(i);
                                        }
                                        function askLessonID3(){
                                            rl.question('Enter the lesson ID: ', lesson_id=>{
                                                if(isNaN(lesson_id) || lesson_id.trim() == ''){
                                                    console.log('please enter only nubmers.')
                                                    askLessonID3()
                                                }
                                                else{
                                                    dataBase.get(`SELECT * FROM lessons WHERE lesson_id = ${lesson_id}`, (err, lesson_id)=>{
                                                        if(err){
                                                            rl.close();
                                                            dataBase.close(err=>{
                                                                if(err) return console.log(err.message);
                                                                else return console.log("The database has been closed.");
                                                            });
                                                            return console.log(err.message);
                                                        }else if(lesson_id){
                                                            dataBase.get(`SELECT * FROM membership WHERE student_id = ${student_id.student_id} AND lesson_id = ${lesson_id.lesson_id}`, (err, row)=>{
                                                                if(err){
                                                                    rl.close();
                                                                    dataBase.close(err=>{
                                                                        if(err) return console.log(err.message);
                                                                        else return console.log("The database has been closed.");
                                                                    });
                                                                    return console.log(err.message);
                                                                }
                                                                else if(!row){
                                                                    dataBase.run(`INSERT INTO membership(student_id, lesson_id) VALUES(${student_id.student_id}, ${lesson_id.lesson_id})`, err=>{
                                                                        if(err){
                                                                            rl.close()
                                                                            dataBase.close(err=>{
                                                                                if(err) return console.log(err.message);
                                                                                else return console.log('The dataBase has been closed.')
                                                                            })
                                                                            return console.log(err.message)
                                                                        }else{
                                                                            console.log('operation accomplished successfully');
                                                                            function askContinue(){
                                                                                rl.question('Would you like to add another student? ', answer=>{
                                                                                    const answers = ['yes', 'y', 'no', 'n'];
                                                                                    answer = answer.toLowerCase();
                                                                                    if(answers.includes(answer)){
                                                                                        if(answer == answers[0] || answer == answers[1]){
                                                                                            askLessonID3();
                                                                                        }
                                                                                        else{
                                                                                            rl.close()
                                                                                            dataBase.close(err=>{
                                                                                                if(err) return console.log(err.message);
                                                                                                else return console.log('The dataBase has been closed.')
                                                                                            })
                                                                                            return console.log('thank you.')
                                                                                        }
                                                                                    }
                                                                                    else{
                                                                                        console.log('operation not found.')
                                                                                        askContinue();
                                                                                    }
                                                                                })
                                                                            }
                                                                            askContinue();
                                                                        }
                                                                    })
                                                                }
                                                                else{
                                                                    console.log('This student is already enrolled in this lesson.')
                                                                    askLessonID3();
                                                                    
                                                                }
                                                            })
                                                            
                                                        }else{
                                                            console.log('the lesson ID not found.');
                                                            askLessonID3();
                                                        }
                                                        
                                                    })
                                                }
                                            })
                                            
                                        }
                                        askLessonID3();
                                        
                                    }else{
                                        rl.close();
                                        dataBase.close(err=>{
                                            if(err) return console.log(err.message);
                                            else return console.log("The database has been closed.");
                                        });
                                        return console.log('There are no stduents.');
                                    }
                                })

                            }else{
                                console.log('the student ID not found.');
                                askStudentID();
                            }
                        })
                    }
                })
            }
            askStudentID();
        }    
        

        function askStudentID1(){
            rl.question("Enter the student ID: ", (student_id)=>{
                if(isNaN(student_id) || student_id.trim() == ''){
                    console.log("please enter only numbers.");
                    askStudentID1();
                    return;
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
                            dataBase.get(`SELECT * FROM lessons WHERE lesson_id = ${student_id}`, row2=>{
                                if(err){
                                    rl.close();
                                    dataBase.close(err=>{
                                        if(err) return console.log(err.message);
                                        else return console.log("The database has been closed.");
                                    });
                                    return console.log(err.message);
                                }else if(!row2){
                                    function askNameStudent(){
                                        rl.question('Enter the name of student: ', (name)=>{
                                            if(!isNaN(name)){
                                                console.log("please enter only characters.");
                                                askNameStudent();
                                            }
                                            function askFamilynameStudent(){
                                                rl.question('Enter the family name of student: ', (familyname)=>{
                                                    if(!isNaN(familyname)){
                                                        console.log("please enter only characters.");
                                                        askFamilynameStudent();
                                                    }
                                                    function askAgeOfStudent(){
                                                        rl.question('Enter the age of student: ', (age)=>{
                                                            //عمر الطالب يجب أن يكون مابين 5 و 65 سنة
                                                            if(isNaN(age) || age>65 || age<5){
                                                                console.log("please enter only numbers and the age must be between 5 and 65.")
                                                                askAgeOfStudent();
                                                            }
                                                            function askClassOfStudent(){
                                                                rl.question('Enter the class of student: ', (clas)=>{
                                                                    if(isNaN(clas)){
                                                                        console.log("please enter only numbers.")
                                                                        askClassOfStudent();
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
                                                                            function askLessonID1(){
                                                                                rl.question('Enter the lesson ID: ', (lesson_id)=>{
                                                                                    //لا يمكن أن يكون رقم المعرف الخاص بالجدول الطلاب هو نفسه رقم المعرف الخاص بجدول الدروس
                                                                                    if(isNaN(lesson_id) || lesson_id == student_id || lesson_id.trim() == ''){
                                                                                        console.log("please enter only numbers or choose an author ID.");
                                                                                        askLessonID1();
                                                                                        
                                                                                    }
                                                                                    else{
                                                                                        
                                                                                        dataBase.get(`SELECT * FROM students WHERE student_id = ${lesson_id}`, (err, data)=>{
                                                                                            if(err){
                                                                                                rl.close();
                                                                                                dataBase.close(err=>{
                                                                                                    if(err) return console.log(err.message);
                                                                                                    else return console.log("The database has been closed.");
                                                                                                });
                                                                                                return console.log(err.message);
                                                                                            }
                                                                                            else if(data){
                                                                                                console.log('There is a student who has this ID, please change it');
                                                                                                askLessonID1();
                                                                                            }
                                                                                            else{
                                                                                                function askLessonName(){
                                                                                                    rl.question('Enter the name of lesson: ', (lesson_name)=>{
                                                                                                        if(!isNaN(lesson_name)){
                                                                                                            console.log("please enter only characters.");
                                                                                                            askLessonName();
                                                                                                            return;
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
                                                                                                }
                                                                                                askLessonName(); 
                                                                                                
                                                                                            }
                                                                                        })
                                                                                        
                                                                                    }
        
                                                                                     
                                                                                });
                                                                            }
                                                                            askLessonID1();
                                                                        });
                                                                    });
                                                                });
                                                            }
                                                            askClassOfStudent();
                                                        });
                                                    }
                                                    askAgeOfStudent();
                                                });
                                            }
                                            askFamilynameStudent();
                                        });
                                    }
                                    askNameStudent();
                                }
                                else{
                                    console.log('There is a lesson that has this ID.')
                                    askStudentID1()
                                }
                            })
                        }
                        else{
                            console.log('This ID already exists.')
                            askStudentID1();
                        }
                    });
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
                                else{
                                    dataBase.run(`DELETE FROM membership WHERE student_id = ${student_id}`, err=>{
                                        if(err) {
                                            rl.close();
                                            dataBase.close(err=>{
                                                if(err) return console.log(err.message);
                                                else return console.log("The database has been closed.");
                                            });
                                            return console.log(err.message);
                                        }
                                        else{
                                            rl.close();
                                            dataBase.close(err=>{
                                                if(err) return console.log(err.message);
                                                else return console.log("The database has been closed.");
                                            });
                                            return console.log('operation accomplished successfully');
                                        }
                                    });
                                }
                            });
                        }
                        else{
                            
                            console.log("student ID not found.");
                            askStudentID1();
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
                            
                            console.log("student ID not found.");
                            askStudentID1();
                            
                        }else {
                            function askNewName(){
                                rl.question("Enter the new name: ", newName =>{
                                    if(!isNaN(newName)){
                                        console.log("please enter only characters.");
                                        askNewName();
                                    }
                                    function askNewFamilyname(){
                                        rl.question("Enter the new family name: ", newFamilyname =>{
                                            if(!isNaN(newFamilyname)){
                                                console.log("please enter only characters.");
                                                askNewFamilyname();
                                            }
                                            function askNewAge(){
                                                rl.question("Enter the new age: ", newAge =>{
                                                    if(isNaN(newAge) && newAge < 5 || newAge > 65){
                                                        console.log("please enter only numbers and the age must be between 5 and 65.");
                                                        askNewAge();
                                                        return;
                                                    }
                                                    function askNewClass(){
                                                        rl.question("Enter the new class: ", newClass =>{
                                                            if(isNaN(newClass)){
                                                                console.log("please enter only numbers.");
                                                                askNewClass(); 
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
                                                    }
                                                    askNewClass();
                                                });
                                            }
                                            askNewAge();
                                            
                                        });
                                    }
                                    askNewFamilyname();
                                    
                                });
                            }
                            askNewName();
                        }
                    });
                }        
                else if(operation == "s"){
                    dataBase.get(`SELECT students.*, lessons.lesson_name
                        FROM students
                        JOIN membership ON students.student_id = membership.student_id
                        JOIN lessons ON membership.lesson_id = lessons.lesson_id
                        WHERE students.student_id = ${student_id}`
                        ,(err, data)=>{
                        if(err) {
                            rl.close();
                            dataBase.close(err=>{
                                if(err) return console.log(err.message);
                                else return console.log("The database has been closed.");
                            });
                            return console.log(err.message);
                        }
                        else if(!data){
                            console.log("student ID not found.");
                            askStudentID1();
                        }
                        else{
                            rl.close();
                            dataBase.close(err=>{
                                if(err) return console.log(err.message);
                                else return console.log("The database has been closed.");
                            });
                            return console.log(data);
                        }    
                            
                        })
            
                }
                
            });
        }
        askStudentID1();
    });
}
askOperation();
