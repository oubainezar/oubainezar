//ملاحظة لقد إستبدلت العربية بالإنجليزية لأنها لا تتوافق مع node js


const sqlite = require('sqlite3').verbose();
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const operations = ['a', 'd', 's', 'u', 'r', 'p', 'al', 'sl', 'ul', 'c'];
let date = new Date();

const dataBase = new sqlite.Database("./school.db", err => {
    if (err) return console.log(err.message);
});

dataBase.get('SELECT name FROM sqlite_master WHERE type = "table" AND name = "lessons" OR name = "students" OR name = "membership"', (err, row) => {
    if (err) console.log(err.message);
    else if (!row) {
        initializeTables();
    }
});

function initializeTables() {
    dataBase.run('CREATE TABLE students(student_id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, familyname TEXT, age INTEGER, class INTEGER, regDate TEXT)', err => {
        if (err) console.log(err.message);
    });
    dataBase.run('CREATE TABLE lessons(lesson_id INTEGER PRIMARY KEY AUTOINCREMENT, lesson_name TEXT)', err => {
        if (err) console.log(err.message);
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
        )`, err => {
            if (err) console.log(err.message);
        });
}

function askOperation() {
    rl.question("Please choose the method you want to do this:\n*To add a student, press the letter 'a'.\n*To delete a student, press the letter 'd'.\n*To modify a student’s information, press the letter 'u'.\n*To view a student's information, click on the letter 's'.\n*To register the student for lessons, click on the letter 'r'.\n*To delete a lesson from the lessons, click on a letter 'p'.\n*To add a new lesson, enter 'al'.\n*To show information about lessons, enter 'sl'.\n*To modify data for lessons, enter 'ul'\n*To cancel a student's registration for a lesson, click on a letter 'c'\n----------> ", (operation) => {
        operation = operation.toLowerCase()
        if (!operations.includes(operation)) {
            console.log('Operation not found.');
            askOperation();
        }
        executeOperation(operation);
    });
}

function executeOperation(operation) {
    switch(operation){
        case 'a':
            addStudent();
            break;
        case 'd':
            deleteStudent();
            break;
        case 'u':
            updateStudent();
            break;
        case 's':
            viewStudentInformation();
            break;
        case 'p':  
            deleteLesson();
            break; 
        case 'r':
            registerStudentForLesson();
            break;
        case 'al':
            addLessons();
            break;
        case 'sl':
            viewLessonInformation();
            break; 
        case 'ul':
            updateLesson();
            break;
        case 'c':
            cancelStudentRegistration();
            break;                          
    }
}
function InputValidation(input){
    const pattern = ['²', '&', "'", '(', '-', '_', 'ç', 'à', ')', '=', '/', '*', '-', '+', '.', '~', '#', '{', '}', '[', ']', '|', '@', '$', '^', '!', '<', '>', '"'];
    for(i of input){
        if(pattern.includes(i)){
            return true;
        }
    }
    return false;
}

function addStudent() {
    // Code for adding a student
    function askStudentID(){
        rl.question("Enter the student ID: ", (student_id)=>{
            if(isNaN(student_id) || student_id.trim() == ''){
                console.log("please enter only numbers.");
                askStudentID();
            }
            else if(student_id.length > 10){
                console.log('The student ID you entered must not exceed 10 numbers.');             
                askStudentID();
            }
            else {
                checkIFound(student_id);
            }
        })
    }
    function checkIFound(student_id){
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
                        askStudentName(student_id);
                    }else{
                        console.log('There is lesson has this ID.');
                        askStudentID();
                    }
                })
            }
            else{
                console.log('This ID already exists.');
                askStudentID();
            }
        })
    }
    function askStudentName(student_id){
        rl.question('Enter the name of student: ', (name)=>{
            if(!isNaN(name)){
                console.log('Please enter only characters.');
                askStudentName(student_id);
            }
            else if(InputValidation(name)){
                console.log('Please do not enter the regular expressions @=_"-]+$/');
                askStudentName(student_id);
            }
            else if(name.length > 20){
                console.log('The name you entered must not exceed 20 characters');             
                askStudentName(student_id);
            }
            else{
                askStudentFamilyname(student_id, name)
            }
        })
    }
    function askStudentFamilyname(student_id, name){
        rl.question('Enter the family name of student: ', (familyname)=>{
            if(!isNaN(familyname)){
                console.log('please enter only characters.');
                askStudentFamilyname(student_id, name);
            }
            else if(InputValidation(familyname)){
                console.log('Please do not enter the regular expressions @=_"-]+$/');
                askStudentFamilyname(student_id, name);
            }
            else if(familyname.length > 20){
                console.log('The family name you entered must not exceed 20 characters');             
                askStudentFamilyname(student_id, name);
            }
            else{
                askStudentAge(student_id, name, familyname)
            }
        })
    }
    function askStudentAge(student_id, name, familyname){
        rl.question('Enter the age of student: ', (age)=>{
            if(isNaN(age)){
                console.log("please enter only numbers.");
                askStudentAge(student_id, name, familyname);
            }
            else if(age>65 || age<5){
                console.log("The age value must be between 5 and 65.");
                askStudentAge(student_id, name, familyname);
            }
            else{
                askStudentClass(student_id, name, familyname, age)
            }
        })
    }
    function askStudentClass(student_id, name, familyname, age){
        rl.question('Enter the class of student: ', (clas)=>{
            if(isNaN(clas) || clas.trim() == ''){
                console.log("please enter only numbers.");
                askStudentClass(student_id, name, familyname, age);
            }
            else if(clas.length > 10){
                console.log('The student class you entered must not exceed 10 numbers.');
                askStudentClass(student_id, name, familyname, age)
            }
            else{
                askStudentRegDate(student_id, name, familyname, age, clas)
            }
        })
    }
    function askStudentRegDate(student_id, name, familyname, age, clas){
        console.log('Enter the date of registration: ')
        askYear(student_id,  name, familyname, age, clas);
        
    }
    function askDay(year, mounth, student_id, name, familyname, age, clas){
        rl.question('------->*Enter the Day of registration: ', day=>{
            if(isNaN(day)){
                console.log('please enter only numbers.');
                askDay(year, mounth, student_id, name, familyname, age, clas);
            }
            else if(day == 31 && mounth%2 !== 0 && mounth !== 2){
                console.log(`the ${mounth} has only 30 days.`);
                askDay(year, mounth, student_id, name, familyname, age, clas);
            }
            else if(day > 31){
                console.log(`There is no mounth has ${day} days!`);
                askDay(year, mounth, student_id, name, familyname, age, clas);
            }
            else if(day>28 && year%4 !== 0){
                console.log('The month of February this year has only 28 days.');
                askDay(year, mounth, student_id, name, familyname, age, clas)
            }
            else{   
                regDate = `${day}/${mounth}/${year}`;
                add(student_id, name, familyname, age, clas, regDate);
            }
        })
        
        
    }
    function askMounth(year, student_id, name, familyname, age, clas){
        rl.question('------->*Enter the Mounth of registration: ', mounth=>{
            if(isNaN(mounth)){
                console.log('please enter only numbers.');
                askMounth(year, student_id, name, familyname, age, clas);
            }
            else if(mounth > 12 || mounth < 1){
                console.log('The registration mounth must be between 1 and 12.');
                askMounth(year, student_id, name, familyname, age, clas);
            }
            else{
                askDay(year, mounth, student_id, name, familyname, age, clas);
            }
        })
        
    }
    function askYear(student_id, name, familyname, age, clas){
        rl.question('------->*Enter the Year of registration: ', year=>{
            if(isNaN(year)){
                console.log('please enter only numbers');
                askYear(student_id, name, familyname, age, clas);
            }
            else if(year > date.getFullYear() || year < 1900){
                console.log('The registration year must be between the current year and 1900');
                askYear(student_id, name, familyname, age, clas);
            }
            else{
                askMounth(year, student_id, name, familyname, age, clas);
            }
        })
        
        
    }
    function add(student_id, name, familyname, age, clas, regDate){
        dataBase.run(`INSERT INTO students(student_id, name, familyname, age, class, regDate) VALUES(${student_id}, "${name.toLowerCase()}", "${familyname.toLowerCase()}", ${age}, ${clas},"${regDate}")`, err=>{
            if(err) {
                rl.close();
                dataBase.close(err=>{
                    if(err) return console.log(err.message);
                    else return console.log("The database has been closed.");
                });
                return console.log(err.message);
            }
            else{
                console.log('operation accomplished successfully.');
                askContinue();
            }

        })
    }
    function askContinue(){
        rl.question('Do you want to add another stduents(Y/n): ', answer=>{
            const answers = ['yes', 'y', 'n', 'no'];
            answer = answer.toLowerCase();
            if(!answers.includes(answer)){
                console.log('operation not found.');
                askContinue();
            }
            else{
                if(answer == answers[0] || answer == answers[1]){
                    askStudentID();
                }
                else{
                    rl.close();
                    dataBase.close(err=>{
                        if(err) return console.log(err.message);
                        else return console.log("The database has been closed.");
                    });
                    return console.log('bye.');

                }
            }
        })
    }
    askStudentID(); 
}
function addLessons(){
    function askLessonID(){
        rl.question('Enter the ID of lesson: ', (lesson_id)=>{
            if(isNaN(lesson_id) || lesson_id.trim() == ''){
                console.log("please enter only numbers.");
                askLessonID();
            }
            else if(lesson_id.length > 10){
                console.log('The lesson ID you entered must not exceed 10 numbers.');
                askLessonID();
            }
            else{
                checkLesson(lesson_id);
            }
        })
    }
    function checkLesson(lesson_id){
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
                askLessonID();
            }
            else{
                dataBase.get(`SELECT * FROM lessons WHERE lesson_id = ${lesson_id}`, (err, data)=>{
                    if(err){
                        rl.close();
                        dataBase.close(err=>{
                            if(err) return console.log(err.message);
                            else return console.log("The database has been closed.");
                        });
                        return console.log(err.message);
                    }
                    else if(data){
                        console.log('There is a lesson who has this ID, please change it');
                        askLessonID();
                    }
                    else{
                        askLessonName(lesson_id);
                    }
                })
            }
        })
    }
    function askLessonName(lesson_id){
        rl.question('Enter the name of lesson: ', (lesson_name)=>{
            if(!isNaN(lesson_name)){
                console.log('please enter only characters.');
                askLessonName(lesson_id);
            }
            else if(InputValidation(lesson_name)){
                console.log('please do not enter the regular expressions @=_"-]+$/');
                askLessonName(lesson_id);
            }
            else if(lesson_name.length > 20){
                console.log('The name of lesson you entered must not exceed 20 characters');             
                askLessonName(lesson_id);
            }
            else{
                lesson_name = lesson_name.toLowerCase();
                checkIsFound(lesson_id, lesson_name)
            }
        })
    }
    function checkIsFound(lesson_id, lesson_name){
        dataBase.get(`SELECT * FROM lessons WHERE lesson_name = "${lesson_name}"`, (err, data)=>{
            if(err){
                rl.close();
                dataBase.close(err=>{
                    if(err) return console.log(err.message);
                    else return console.log("The database has been closed.");
                });
                return console.log(err.message);
            }
            else if(data){
                console.log('This lesson is already exists');
                askContinue();
            }
            else{
                addLesson(lesson_id, lesson_name);
            }
        })
    }
    
    function addLesson(lesson_id, lesson_name){
        dataBase.run(`INSERT INTO lessons(lesson_id, lesson_name) VALUES(${lesson_id}, "${lesson_name}")`, err=>{
            if(!err){
                console.log('operation accomplished successfully.');
                askContinue();
            }
        })
    }
    function askContinue(){
        rl.question('Do you want to add another lessons(Y/n): ', answer=>{
            const answers = ['yes', 'y', 'n', 'no'];
            answer = answer.toLowerCase();
            if(!answers.includes(answer)){
                console.log('operation not found.');
                askContinue();
            }
            else{
                if(answer == answers[0] || answer == answers[1]){
                    askLessonID();
                }
                else{
                    rl.close();
                    dataBase.close(err=>{
                        if(err) return console.log(err.message);
                        else return console.log("The database has been closed.");
                    });
                    return console.log('bye.');

                }
            }
        })
    }
    askLessonID();
}


function deleteStudent() {
    // Code for deleting a student
    function isClearAll(){
        rl.question("Do you want to delete all students informations(Y/n): ", (answer)=>{
            answer = answer.toLowerCase();
            const answers = ['yes', 'y', 'no', 'n'];
            if(!answers.includes(answer)){
                console.log("Operation not found.");
                isClearAll();
            }
            else{
                if(answer == answers[0] || answer == answers[1]){
                    dataBase.run(`DELETE FROM students`, err=>{
                        if(err){
                            rl.close();
                            dataBase.close(err=>{
                                if(err) return console.log(err.message);
                                else return console.log('The dataBase has been closed.');
                            })
                            return console.log(err.message);
                        }
                        else{
                            dataBase.run(`DELETE FROM membership`, err=>{
                                if(err){
                                    rl.close();
                                    dataBase.close(err=>{
                                        if(err) return console.log(err.message);
                                        else return console.log('The dataBase has been closed.');
                                    })
                                    return console.log(err.message);
                                }
                                else{
                                    rl.close();
                                    dataBase.close(err=>{
                                        if(err) return console.log(err.message);
                                        else return console.log('The dataBase has been closed.');
                                    })
                                    return console.log('operation accomplished successfully');
                                    
                                }
                            })
                        }
                    });
                }
                else{
                    askStudentID();
                }
            }
        })
    }
    function showStudentInfo(){
        dataBase.all(`SELECT name, familyname, student_id FROM students`, (err, data)=>{
            if(err){
                rl.close();
                dataBase.close(err=>{
                    if(err) return console.log(err.message);
                    else return console.log("The database has been closed.");
                });
                return console.log(err.message);
            }else if(data.length > 0){
                console.log(data);
                isClearAll();
            }else{
                rl.close();
                dataBase.close(err=>{
                    if(err) return console.log(err.message);
                    else return console.log("The database has been closed.");
                });
                return console.log('There are no students yet');
            }
        })
    }
    showStudentInfo();
    function askStudentID(){
        rl.question("Enter the student ID: ", (student_id)=>{
            if(isNaN(student_id) || student_id.trim() == ''){
                console.log("please enter only numbers.");
                askStudentID();
            }
            else{
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
                                        console.log('operation accomplished successfully');
                                        askContinue();
                                    }
                                });
                            }
                        });
                    }
                    else{
                        console.log("student ID not found.");
                        askStudentID();
                    }
                    
                })
            }
        })
    }
    function askContinue(){
        rl.question('Would you like to delete another student?(Y/n) ', answer=>{
            const answers = ['yes', 'y', 'no', 'n'];
            answer = answer.toLowerCase();
            if(answers.includes(answer)){
                if(answer == answers[0] || answer == answers[1]){
                    askStudentID()
                }
                else{
                    rl.close()
                    dataBase.close(err=>{
                        if(err) return console.log(err.message);
                        else return console.log('The dataBase has been closed.')
                    })
                    return console.log('bye.')
                }
            }
            else{
                console.log('operation not found.')
                askContinue();
            }
        })
    }
    

}

function updateStudent() {
    // Code for updating a student
    function showStudentInfo(){
        dataBase.all(`SELECT name, familyname, student_id FROM students`, (err, data)=>{
            if(err){
                rl.close();
                dataBase.close(err=>{
                    if(err) return console.log(err.message);
                    else return console.log("The database has been closed.");
                });
                return console.log(err.message);
            }else if(data.length > 0){
                console.log(data);
                askStudentID();
            }else{
                rl.close();
                dataBase.close(err=>{
                    if(err) return console.log(err.message);
                    else return console.log("The database has been closed.");
                });
                return console.log('There are no students yet');
            }
        })
    }
    showStudentInfo();   
    function askStudentID(){
        rl.question("Enter the student ID: ", (student_id)=>{
            if(isNaN(student_id) || student_id.trim() == ''){
                console.log("please enter only numbers.");
                askStudentID();
            }
            else {
                checkIFound(student_id);
            }
        })
    }
    function checkIFound(student_id){
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
                askStudentName(student_id);
            }
            else{
                console.log('student ID not found.');
                askStudentID();
            }
        })
    }
    function askStudentName(student_id){
        rl.question('Enter the new name of student: ', (name)=>{
            if(!isNaN(name)){
                console.log('please enter only characters');
                askStudentName(student_id);
            }
            else if(InputValidation(name)){
                console.log('please do not enter the regular expressions @=_"-]+$/"');
                askStudentName(student_id);
            }
            else if(name.length > 20){
                console.log('The name you entered must not exceed 20 characters');             
                askStudentName(student_id);
            }
            else{
                askStudentFamilyname(student_id, name)
            }
        })
    }
    function askStudentFamilyname(student_id, name){
        rl.question('Enter the new family name of student: ', (familyname)=>{
            if(!isNaN(familyname)){
                console.log('please enter only characters');
                askStudentFamilyname(student_id, name);
            }
            else if(InputValidation(familyname)){
                console.log('please do not enter the regular expressions @=_"-]+$/"');
                askStudentFamilyname(student_id, name);
            }
            else if(familyname.length > 20){
                console.log('The family name you entered must not exceed 20 characters');             
                askStudentFamilyname(student_id, name)
            }
            else{
                askStudentAge(student_id, name, familyname)
            }
        })
    }
    function askStudentAge(student_id, name, familyname){
        rl.question('Enter the new age of student: ', (age)=>{
            if(isNaN(age)){
                console.log("please enter only numbers.");
                askStudentAge(student_id, name, familyname);
            }
            else if(age>65 || age<5){
                console.log("The age value must be between 5 and 65.");
                askStudentAge(student_id, name, familyname);
            }
            else{
                askStudentClass(student_id, name, familyname, age)
            }
        })
    }
    function askStudentClass(student_id, name, familyname, age){
        rl.question('Enter the new class of student: ', (clas)=>{
            if(isNaN(clas) || clas.trim() == ''){
                console.log("please enter only numbers.");
                askStudentClass(student_id, name, familyname, age);
            }
            else if(clas.length > 10){
                console.log('The number of class you entered must not exceed 10 numbers.');             
                askStudentClass(student_id, name, familyname, age);
            }
            else{
                askStudentRegDate(student_id, name, familyname, age, clas)
            }
        })
    }
    function askStudentRegDate(student_id, name, familyname, age, clas){
        console.log('Enter the new date of registration: ')
        askYear(student_id,  name, familyname, age, clas);
        
    }
    function askDay(year, mounth, student_id, name, familyname, age, clas){
        rl.question('-------->*Enter the New Day of registration: ', day=>{
            if(isNaN(day)){
                console.log('please enter only numbers.');
                askDay(year, mounth, student_id, name, familyname, age, clas);
            }
            else if(day > 31){
                console.log(`There is no mounth has ${day} days!`);
                askDay(year, mounth, student_id, name, familyname, age, clas);
            }
            else if(day == 31 && mounth%2 !== 0 && mounth !== 2){
                console.log(`the ${mounth} has only 30 days!`);
                askDay(year, mounth, student_id, name, familyname, age, clas);
            }
            else if(day>28 && year%4 !== 0){
                console.log('The month of February this year has only 28 days!');
                askDay(year, mounth, student_id, name, familyname, age, clas)
            }
            else{   
                regDate = `${day}/${mounth}/${year}`;
                update(student_id, name, familyname, age, clas, regDate);
            }
        })
        
        
    }
    function askMounth(year, student_id, name, familyname, age, clas){
        rl.question('-------->*Enter the New Mounth of registration: ', mounth=>{
            if(isNaN(mounth)){
                console.log('Please enter only numbers.');
                askMounth(year, student_id, name, familyname, age, clas);
            }
            else if(mounth > 12 || mounth < 1){
                console.log('The registration mounth must be between 1 and 12.');
                askMounth(year, student_id, name, familyname, age, clas);
            }
            else{
                askDay(year, mounth, student_id, name, familyname, age, clas);
            }
        })
        
    }
    function askYear(student_id, name, familyname, age, clas){
        rl.question('-------->*Enter the New Year of registration: ', year=>{
            if(isNaN(year)){
                console.log('please enter only numbers');
                askYear(student_id, name, familyname, age, clas);
            }
            else if(year > date.getFullYear() || year < 1900){
                console.log('The registration year must be between the current year and 1900');
                askYear(student_id, name, familyname, age, clas);
            }
            else{
                askMounth(year, student_id, name, familyname, age, clas);
            }
        })
        
        
    }
    function update(student_id, name, familyname, age, clas, regDate){
        dataBase.run(`
        UPDATE students SET 
            name = "${name.toLowerCase()}",
            familyname = "${familyname.toLowerCase()}",
            age = ${age},
            class = ${clas},
            regDate = "${regDate}"
        WHERE student_id = ${student_id}    
        `, err=>{
            if(err){
                rl.close();
                dataBase.close(err=>{
                    if(err) return console.log(err.message);
                    else return console.log("The database has been closed.");
                });
                return console.log(err.message);
            }
            else{
                console.log("operation accomplished successfully.");
                askContinue();
            }

        })

        
    }
    function askContinue(){
        rl.question('Would you like to update information of another student?(Y/n) ', answer=>{
            const answers = ['yes', 'y', 'no', 'n'];
            answer = answer.toLowerCase();
            if(answers.includes(answer)){
                if(answer == answers[0] || answer == answers[1]){
                    showStudentInfo()
                }
                else{
                    rl.close()
                    dataBase.close(err=>{
                        if(err) return console.log(err.message);
                        else return console.log('The dataBase has been closed.')
                    })
                    return console.log('bye.')
                }
            }
            else{
                console.log('operation not found.')
                askContinue();
            }
        })
    }     
    
}

function viewStudentInformation() {
    // Code for viewing student information
    function isShowAll(){
        rl.question("Would you like to view all student information?(Y/n) ", (answer)=>{
            const answers = ['y', 'yes', 'no', 'n']
            if(!answers.includes(answer.toLowerCase())){
                console.log('Operation not found.');
                isShowAll(); 
            }
            else{
                if(answer.toLowerCase() == answers[0] || answer.toLowerCase() == answers[1]){
                    dataBase.all(`SELECT students.*, lessons.lesson_name
                    FROM students 
                    LEFT JOIN membership ON students.student_id = membership.student_id
                    LEFT JOIN lessons ON membership.lesson_id = lessons.lesson_id`, 
                    (err, data)=>{
                        if(err){
                            rl.close();
                            dataBase.close(err=>{
                                if(err) return console.log(err.message);
                                else return console.log("The database has been closed.");
                            });
                            return console.log(err.message);
                        }
                        else if(data.length > 0){
                            console.log(data);
                            askContinue();
                        }
                        else{
                            rl.close();
                            dataBase.close(err=>{
                                if(err) return console.log(err.message);
                                else return console.log("The database has been closed.");
                            });
                            return console.log('There are no students yet');
                        }
                        
                    })
                }
                else{
                    showStudents();
                }
                
            }
        })
    }
    function showStudents(){
        dataBase.all(`SELECT name, familyname, student_id FROM students`, (err, data)=>{
            if(err){
                rl.close();
                dataBase.close(err=>{
                    if(err) return console.log(err.message);
                    else return console.log("The database has been closed.");
                });
                return console.log(err.message);
            }else if(data.length > 0){
                console.log(data);
                console.log('For more information about a specific student, enter his or her ID,')
                askStudentID();

            }else{
                rl.close();
                dataBase.close(err=>{
                    if(err) return console.log(err.message);
                    else return console.log("The database has been closed.");
                });
                return console.log('There are no students yet');
            }
        })
    }


    function askStudentID(){
        rl.question("Enter the student ID: ", (student_id)=>{
            if(isNaN(student_id) || student_id.trim() == ''){
                console.log("please enter only numbers.");
                askStudentID();
            }
            else{
                dataBase.all(`SELECT * FROM membership WHERE student_id = ${student_id}`, (err, data1)=>{
                    if(err){
                        rl.close();
                        dataBase.close(err=>{
                            if(err) return console.log(err.message);
                            else return console.log("The database has been closed.");
                        });
                        return console.log(err.message);
                    }else if(data1.length > 0){
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
                            askStudentID();
                        }
                        else{
                            console.log(data);
                            askContinue()
                        }    
                            
                        })
                    }
                    else{
                        dataBase.all(`SELECT * FROM students WHERE student_id = ${student_id}`, (err, data)=>{
                            if(err){
                                rl.close();
                                dataBase.close(err=>{
                                    if(err) return console.log(err.message);
                                    else return console.log("The database has been closed.");
                                });
                                return console.log(err.message);
                            }else if(data.length > 0){
                                console.log(data);
                                askContinue();
                            }else{
                                console.log('stduent ID not found.');
                                askStudentID();
                            }
                        })
                    }
                })
            }
        })
    }
    function askContinue(){
        rl.question('Would you like to show informations about another student?(Y/n) ', answer=>{
            const answers = ['yes', 'y', 'no', 'n'];
            answer = answer.toLowerCase();
            if(answers.includes(answer)){
                if(answer == answers[0] || answer == answers[1]){
                    isShowAll();
                }
                else{
                    rl.close()
                    dataBase.close(err=>{
                        if(err) return console.log(err.message);
                        else return console.log('The dataBase has been closed.')
                    })
                    return console.log('bye.')
                }
            }
            else{
                console.log('operation not found.')
                askContinue();
            }
        })
    }
    isShowAll();
    
}

function registerStudentForLesson() {
    // Code for registering a student for lessons
    function showStudentInfo(){
        dataBase.all(`SELECT name, familyname, student_id FROM students`, (err, data)=>{
            if(err){
                rl.close();
                dataBase.close(err=>{
                    if(err) return console.log(err.message);
                    else return console.log("The database has been closed.");
                });
                return console.log(err.message);
            }else if(data.length > 0){
                console.log('###################### Students: #########################')
                console.log(data);
                askStudentID();
            }else{
                rl.close();
                dataBase.close(err=>{
                    if(err) return console.log(err.message);
                    else return console.log("The database has been closed.");
                });
                return console.log('There are no students yet');
            }
        })
    }
    showStudentInfo();
    function showLessonInfo(student_id){
        dataBase.all(`SELECT * FROM lessons`, (err, data)=>{
            if(err){
                return console.log(err.message);

            }else if(data.length > 0){
                console.log('##################### Lessons: ###########################')
                console.log(data);
                askLessonID(student_id);
            }else{
                rl.close();
                dataBase.close(err=>{
                    if(err) return console.log(err.message);
                    else return console.log("The database has been closed.");
                });
                return console.log('There are no lessons yet');
            }
        })
    }
    
    function askStudentID(){
        rl.question("Enter the student ID: ", (student_id)=>{
            if(isNaN(student_id) || student_id.trim() == ''){
                console.log("please enter only numbers.");
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
                        showLessonInfo(student_id);
                    }else{
                        console.log('student ID not found.');
                        askStudentID();
                    }
                })
            }
        })
    }
    function askLessonID(student_id){
        rl.question('Enter the lesson ID: ', lesson_id=>{
            if(isNaN(lesson_id) || lesson_id.trim() == ''){
                console.log('please enter only nubmers.')
                askLessonID(student_id)
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
                                        askContinue(student_id);
                                    }
                                })
                            }
                            else{
                                console.log('This student is already enrolled in this lesson.')
                                askContinue(student_id);
                                
                            }
                        })
                        
                    }else{
                        console.log('the lesson ID not found.');
                        askLessonID(student_id);
                    }
                    
                })
            }
        })
        
    }
    function askContinue(student_id){
        rl.question('Would you like to register another student?(Y/n) ', answer=>{
            const answers = ['yes', 'y', 'no', 'n'];
            answer = answer.toLowerCase();
            if(answers.includes(answer)){
                if(answer == answers[0] || answer == answers[1]){
                    showStudentInfo();
                }
                else{
                    rl.close()
                    dataBase.close(err=>{
                        if(err) return console.log(err.message);
                        else return console.log('The dataBase has been closed.')
                    })
                    return console.log('bye.')
                }
            }
            else{
                console.log('operation not found.')
                askContinue(student_id);
            }
        })
    }
}

function deleteLesson() {
    // Code for deleting a lesson
    function showLessonInfo(){
        dataBase.all(`SELECT * FROM lessons`, (err, data)=>{
            if(err){
                return console.log(err.message);

            }else if(data.length > 0){
                console.log(data);
                clearAll();
            }else{
                rl.close();
                dataBase.close(err=>{
                    if(err) return console.log(err.message);
                    else return console.log("The database has been closed.");
                });
                return console.log('There are no lessons yet');
            }
        })
    }
    showLessonInfo();
    function clearAll(){
        rl.question("Do you want to delete all lessons informations(Y/n): ", (answer)=>{
            answer.toLowerCase();
            const answers = ['yes', 'y', 'no', 'n'];
            if(!answers.includes(answer)){
                console.log("Operation not found.");
                clearAll();
            }
            else{
                if(answer == answers[0] || answer == answers[1]){
                    dataBase.run(`DELETE FROM lessons`, err=>{
                        if(err){
                            rl.close();
                            dataBase.close(err=>{
                                if(err) return console.log(err.message);
                                else return console.log('The dataBase has been closed.');
                            })
                            return console.log(err.message);
                        }
                        else{
                            dataBase.run(`DELETE FROM membership`, err=>{
                                if(err){
                                    rl.close();
                                    dataBase.close(err=>{
                                        if(err) return console.log(err.message);
                                        else return console.log('The dataBase has been closed.');
                                    })
                                    return console.log(err.message);
                                }
                                else{
                                    rl.close();
                                    dataBase.close(err=>{
                                        if(err) return console.log(err.message);
                                        else return console.log('The dataBase has been closed.');
                                    })
                                    return console.log('operation accomplished successfully');
                                    
                                }
                            })
                        }
                    });
                }
                else{
                    askLessonID();
                }
            }
        })
    }
    function askLessonID(){
        rl.question("Enter the lesson ID: ", (lesson_id)=>{
            if(isNaN(lesson_id) || lesson_id.trim() == ''){
                console.log("please enter only numbers.");
                askLessonID();
            }
            else{
                dataBase.get(`SELECT * FROM lessons WHERE lesson_id = ${lesson_id}`,(err, row)=>{
                    if(err) {
                        rl.close();
                        dataBase.close(err=>{
                        if(err) return console.log(err.message);
                        else return console.log('The dataBase has been closed.')
    
                    })
                    console.log(err.message);
                }
                    else if(row){
                        dataBase.run(`DELETE FROM lessons WHERE lesson_id = ${lesson_id}`, err=>{
                            if(err){
                                rl.close();
                                dataBase.close(err=>{
                                    if(err) return console.log(err.message);
                                    else return console.log('The dataBase has been closed.');
                                })
                                return console.log(err.message);
                            }
                            else{
                                dataBase.run(`DELETE FROM membership WHERE lesson_id = ${lesson_id}`, err=>{
                                    if(err){
                                        rl.close();
                                        dataBase.close(err=>{
                                            if(err) return console.log(err.message);
                                            else return console.log('The dataBase has been closed.');
                                        })
                                        return console.log(err.message);
                                    }
                                    else{
                                        console.log('operation accomplished successfully');
                                        askContinue()
                                    }
                                })
                            }
                        });
                    
                    }
                    else{
                        console.log("lesson ID not found.")
                        askLessonID();
                    }
                    
    
                })
            }
        })
    }
    function askContinue(){
        rl.question('Would you like to delete another lesson?(Y/n) ', answer=>{
            const answers = ['yes', 'y', 'no', 'n'];
            answer = answer.toLowerCase();
            if(answers.includes(answer)){
                if(answer == answers[0] || answer == answers[1]){
                    showLessonInfo();
                }
                else{
                    rl.close()
                    dataBase.close(err=>{
                        if(err) return console.log(err.message);
                        else return console.log('The dataBase has been closed.')
                    })
                    return console.log('bye.')
                }
            }
            else{
                console.log('operation not found.')
                askContinue();
            }
        })       
    }
}
function viewLessonInformation(){
    function showAll(){
        rl.question('Do you want to show all lessons informations(Y/n)? ', answer=>{
            const answers = ['yes', 'y', 'no', 'n'];
            answer = answer.toLowerCase();
            if(answers.includes(answer)){
                if(answer == answers[0] || answer == answers[1]){
                    dataBase.all(`SELECT lessons.*, students.name, students.familyname, students.age, students.class, students.regDate
                    FROM lessons
                    LEFT JOIN membership ON lessons.lesson_id = membership.lesson_id
                    LEFT JOIN students ON membership.student_id = students.student_id
                    `, (err, data)=>{
                        if(err){
                            rl.close();
                            dataBase.close(err=>{
                                if(err) return console.log(err.message);
                                else return console.log("The database has been closed.");
                            });
                            return console.log(err.message);
                        }else if(data.length > 0){
                            console.log(data);
                            askContinue();
                        }else{
                            rl.close();
                            dataBase.close(err=>{
                                if(err) return console.log(err.message);
                                else return console.log("The database has been closed.");
                            });
                            return console.log('There are no lessons yet');
                        }

                    }
                )}
                else{
                    showLessons();
                }
            }
            else{
                console.log('operation not found.')
                showAll();
            }
        })
    }
    showAll();
    function showLessons(){
        //show all information
        dataBase.all(`SELECT * FROM lessons`, (err, data)=>{
            if(err){
                rl.close();
                dataBase.close(err=>{
                    if(err) return console.log(err.message);
                    else return console.log("The database has been closed.");
                });
                return console.log(err.message);
            }else if(data.length > 0){
                console.log(data);
                askLessonID();
                
            }else{
                rl.close();
                dataBase.close(err=>{
                    if(err) return console.log(err.message);
                    else return console.log("The database has been closed.");
                });
                return console.log('there are no lessons yet.');
            }
        })
        
    }
    function askLessonID(){
        rl.question("Enter the lesson ID: ", (lesson_id)=>{
            if(isNaN(lesson_id) || lesson_id.trim() == ''){
                console.log("please enter only numbers.");
                askLessonID();
            }
            else{
                dataBase.get(`SELECT lesson_id FROM lessons WHERE lesson_id = ${lesson_id}`,(err, data1)=>{
                    if(err) {
                        rl.close();
                        dataBase.close(err=>{
                        if(err) return console.log(err.message);
                        else return console.log('The dataBase has been closed.')
    
                    })
                    console.log(err.message);
                }else if(data1){
                    dataBase.get(`SELECT lessons.*, students.name, students.familyname, students.age, students.class, students.regDate
                    FROM lessons
                    LEFT JOIN membership ON lessons.lesson_id = membership.lesson_id
                    LEFT JOIN students ON membership.student_id = students.student_id
                    WHERE lessons.lesson_id = ${lesson_id}`
                    ,(err, data)=>{
                    if(err) {
                        rl.close();
                        dataBase.close(err=>{
                            if(err) return console.log(err.message);
                            else return console.log("The database has been closed.");
                        });
                        return console.log(err.message);
                    }
                    else if(data){
                        console.log(data);
                        askContinue();
                    }    
                    })                    
                }
                else{
                    console.log("lesson ID not found.");
                    askLessonID();
                }
                })                
            }
        })
    }
    function askContinue(){
        rl.question('Do you want to show information about another lessons(Y/n): ', answer=>{
            const answers = ['yes', 'y', 'n', 'no'];
            answer = answer.toLowerCase();
            if(!answers.includes(answer)){
                console.log('operation not found.');
                askContinue();
            }
            else{
                if(answer == answers[0] || answer == answers[1]){
                    showLessons();
                }
                else{
                    rl.close();
                    dataBase.close(err=>{
                        if(err) return console.log(err.message);
                        else return console.log("The database has been closed.");
                    });
                    return console.log('bye.');

                }
            }
        })        
    }
}
function updateLesson(){
    function showLessons(){
        //show all lessons from table lesson
        dataBase.all(`SELECT * FROM lessons`, (err, data)=>{
            if(err){
                rl.close();
                dataBase.close(err=>{
                    if(err) return console.log(err.message);
                    else return console.log("The database has been closed.");
                });
                return console.log(err.message);
            }else if(data.length > 0){
                console.log(data);
                askLessonID();
            }else{
                rl.close();
                dataBase.close(err=>{
                    if(err) return console.log(err.message);
                    else return console.log("The database has been closed.");
                });
                return console.log('there are no lessons yet.');
            }
        })
    }
    function askLessonID(){
        rl.question("Enter the lesson ID: ", (lesson_id)=>{
            if(isNaN(lesson_id) || lesson_id.trim() == ''){
                console.log("please enter only numbers.");
                askLessonID();
            }
            else if(lesson_id.length > 10){
                console.log('The lesson ID you entered must not exceed 10 numbers.');
                askLessonID();
            }
            else{
                checkLesson(lesson_id);
            }
        })        
    }
    function checkLesson(lesson_id){
        dataBase.get(`SELECT * FROM lessons WHERE lesson_id = ${lesson_id}`, (err, data)=>{
            if(err){
                rl.close();
                dataBase.close(err=>{
                    if(err) return console.log(err.message);
                    else return console.log("The database has been closed.");
                });
                return console.log(err.message);
            }
            else if(data){
                askLessonName(lesson_id);
            }
            else{
                console.log('Lesson ID not found.');
                askLessonID();
            }
        })
    }

    function askLessonName(lesson_id){
        rl.question('Enter the new name of lesson: ', lesson_name=>{
            if(!isNaN(lesson_name) || lesson_name.trim() == ''){
                console.log('please enter only characters.');
                askLessonName(lesson_id);
            }
            else if(InputValidation(lesson_name)){
                console.log('please do not enter the regular expressions @=_"-]+$/');
                askLessonName(lesson_id);
            }
            else if(lesson_name.length > 20){
                console.log('the name of lesson you entered must not exceed 20 characters.');
                askLessonName(lesson_id);
            }
            else{
                dataBase.run(`UPDATE lessons SET 
                lesson_name = "${lesson_name.toLowerCase()}"
                WHERE lesson_id = ${lesson_id}
            `, (err)=>{
                if(err){
                    rl.close();
                    dataBase.close(err=>{
                        if(err) return console.log(err.message);
                        else return console.log("The database has been closed.");
                    });
                    return console.log(err.message);
                }
                else{
                    console.log("operation accomplished successfully.");
                    askContinue();
                }
            })
                
            }
        })
    }
    
    function askContinue(){
        rl.question('Would you like to update another lesson?(Y/n) ', answer=>{
            const answers = ['yes', 'y', 'no', 'n'];
            answer = answer.toLowerCase();
            if(answers.includes(answer)){
                if(answer == answers[0] || answer == answers[1]){
                    showLessons();
                }
                else{
                    rl.close()
                    dataBase.close(err=>{
                        if(err) return console.log(err.message);
                        else return console.log('The dataBase has been closed.')
                    })
                    return console.log('bye.')
                }
            }
            else{
                console.log('operation not found.')
                askContinue();
            }
        })
    }
    showLessons();
}
function cancelStudentRegistration(){
    //Show all registered students.
    function showAllRegStudents(){
        dataBase.all(`SELECT students.student_id, students.familyname, students.name, lessons.*
        FROM students
        JOIN membership ON students.student_id = membership.student_id
        JOIN lessons ON membership.lesson_id = lessons.lesson_id`
        ,(err, data)=>{
        if(err) {
            rl.close();
            dataBase.close(err=>{
                if(err) return console.log(err.message);
                else return console.log("The database has been closed.");
            });
            return console.log(err.message);
        }
        else if(data.length == 0){
            rl.close();
            dataBase.close(err=>{
                if(err) return console.log(err.message);
                else return console.log("The database has been closed.");
            });
            return console.log('No student registered for any lesson');
        }
        else{ 
            console.log('############### These are all students registered for lessons.#######################')
            console.log(data);
            askStudentID();
        }
    })    
    }
    showAllRegStudents();
    function askStudentID(){
        rl.question("Enter the student ID: ", (student_id)=>{
            if(isNaN(student_id) || student_id.trim() == ''){
                console.log("please enter only numbers.");
                askStudentID();
            }
            else{
                dataBase.get(`SELECT * FROM membership WHERE student_id = ${student_id}`, (err, row)=>{
                    if(err){
                        rl.close();
                        dataBase.close(err=>{
                            if(err) return console.log(err.message);
                            else return console.log("The database has been closed.");
                        });
                        return console.log(err.message);
                    }else if(row){
                        askLessonID(student_id);
                    }else{
                        console.log('This student is not registered in any lesson or student ID not found');
                        askContinue();
                    }
                })
                
            }
        })
    }
    function askLessonID(student_id){
        rl.question("Enter the lesson ID: ", (lesson_id)=>{
            if(isNaN(lesson_id) || lesson_id.trim() == ''){
                console.log("please enter only numbers.");
                askLessonID(student_id);
            }
            else{
                dataBase.get(`SELECT * FROM membership WHERE lesson_id = ${lesson_id}`, (err, row)=>{
                    if(err){
                        rl.close();
                        dataBase.close(err=>{
                            if(err) return console.log(err.message);
                            else return console.log("The database has been closed.");
                        });
                        return console.log(err.message);
                    }else if(row){
                        dataBase.get(`SELECT * FROM membership WHERE lesson_id = ${lesson_id} AND student_id = ${student_id}`, (err, row)=>{
                            if(err){
                                rl.close();
                                dataBase.close(err=>{
                                    if(err) return console.log(err.message);
                                    else return console.log("The database has been closed.");
                                });
                                return console.log(err.message);
                            }else if(row){
                                cancelRegistration(student_id, lesson_id);
                            }else{
                                console.log('This student is not registered for this lesson.');
                                askLessonID(student_id);
                            }
                        })
                    }else{
                        console.log('No students registered for this lesson or lesson ID not found.');
                        askContinue();
                    }
                })
            }
        })
    }
    function cancelRegistration(student_id, lesson_id){
        dataBase.run(`DELETE FROM membership WHERE lesson_id = ${lesson_id} AND student_id = ${student_id}`, err=>{
            if(err){
                rl.close();
                dataBase.close(err=>{
                    if(err) return console.log(err.message);
                    else return console.log("The database has been closed.");
                });
                return console.log(err.message);
            }else{
                console.log('operation accomplished successfully');
                askContinue();
            }
        })
    }
    function askContinue(){
        rl.question('Would you like to cancel registration of another student?(Y/n) ', answer=>{
            const answers = ['yes', 'y', 'no', 'n'];
            answer = answer.toLowerCase();
            if(answers.includes(answer)){
                if(answer == answers[0] || answer == answers[1]){
                    showAllRegStudents();
                }
                else{
                    rl.close()
                    dataBase.close(err=>{
                        if(err) return console.log(err.message);
                        else return console.log('The dataBase has been closed.')
                    })
                    return console.log('bye.')
                }
            }
            else{
                console.log('operation not found.')
                askContinue();
            }
        })
    }
}
askOperation();
