// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract chai {
  
struct Teacher{
    string name;
    string password;
  }
  struct Homework{
    string work;
    string post_date;
    string due_date;
  }
  struct Student{
    string name;
    string password;
  }
  struct Classroom{
    string classname;
    string classcode;
  }

  Teacher[] teacher;
  Student[]  student;
  Classroom[]  classroom;
  Homework[] homework;
  address payable owner;
  constructor(){
        owner = payable(msg.sender);
    }
  mapping(string=>address) public teacher_access; 
  mapping(string=>address) public student_access; 
  mapping(string=>mapping(string=>string)) public classcode; // Which class has what code...  
  mapping(string=>mapping(string=>uint)) public no_classes; // Record no of classes 
  mapping(string=>Classroom[]) public classroomlist; // List of classrooms teachers wise
  mapping(string=>Classroom[]) public classroomlist_studentwise; // List of classrooms student wise
  mapping(string=>mapping(string=>Student[])) public classlist; // List of students in each class
  mapping(string=>mapping(string=>Homework[])) public home_work; // List of homework teacher and class wise
  mapping(string=>mapping(string=>mapping(string=>mapping(string=>bool)))) public check; // To check whether student submitted the work or not 
  mapping(string=>mapping(string=>mapping(string=>uint))) public attendance; // To maintain attendance

  function teacher_signup(string memory _name,string memory _password) public payable {
    owner.transfer(msg.value);   
    teacher.push(Teacher({name: _name,password: _password}));
    teacher_access[_name]=msg.sender;  
  }
  
  function getTeachers() public view returns(Teacher[] memory){
        return teacher;
  }
  function getStudents() public view returns(Student[] memory){
        return student;
  }
  function getClasses_teachers_wise(string memory _name) public view returns(Classroom[] memory){
        return classroomlist[_name];
  }
  
  function student_signup(string memory _name,string memory _password) public payable {
    student.push(Student({name: _name,password: _password}));
    student_access[_name]=msg.sender;
  }
  
  // Teacher create classroom
  function create_classroom(string memory teacher_name,string memory _classname,string memory _classcode) public payable {
    require(teacher_access[teacher_name]==msg.sender,"ACCESS DENIED");
    classroomlist[teacher_name].push(Classroom({classname:_classname,classcode:_classcode}));
    classcode[teacher_name][_classname]=_classcode;
    no_classes[teacher_name][_classname]=0;
    
  }
 
 // Add in classroom 
  function add_in_classroom(string memory teacher_name,string memory class_name,string memory student_name,string memory student_password,string memory class_code) public payable {
    require(keccak256(abi.encodePacked(classcode[teacher_name][class_name]))==keccak256(abi.encodePacked(class_code)),"WRONG INFO");
    require(student_access[student_name]==msg.sender,"ACCESS DENIED");
    classlist[teacher_name][class_name].push(Student({name:student_name,password:student_password}));
    classroomlist_studentwise[student_name].push(Classroom({classname:class_name,classcode:class_code}));
  }
  function getClasses_Student_Wise(string memory _name) public view returns(Classroom[] memory){
        return classroomlist_studentwise[_name];
  }

  function getStudents_Class_Wise(string memory teacher_name,string memory class_name) public view returns(Student[] memory){
        return classlist[teacher_name][class_name];
  }

  // Add homework in classroom
  function add_homework(string memory teacher_name,string memory class_name,string memory _work,string memory postdate,string memory duedate) public payable {
    require(teacher_access[teacher_name]==msg.sender,"ACCESS DENIED"); 
    home_work[teacher_name][class_name].push(Homework({work:_work,post_date:postdate,due_date:duedate}));
    for(uint i=0;i<classlist[teacher_name][class_name].length;i++){
      check[teacher_name][class_name][ _work][(classlist[teacher_name][class_name][i]).name]=false;
    }
  }

  // View students of any class
   function view_students(string memory teacher_name,string memory class_name) public view returns(Student[] memory) {
    return classlist[teacher_name][class_name];
  }

  // Submit homework
  function submit_homework(string memory teacher_name,string memory class_name,string memory _work,string memory student_name) public payable {
   for(uint i=0;i<classlist[teacher_name][class_name].length;i++){
     if( keccak256(abi.encodePacked(classlist[teacher_name][class_name][i].name))==keccak256(abi.encodePacked(student_name))){
       check[teacher_name][class_name][ _work][student_name]=true;
       break;
     }
   }
  }

  // Book a Class Slot
  function book_class(string memory teacher_name,string memory class_name) public payable{
    no_classes[teacher_name][class_name]=no_classes[teacher_name][class_name]+1; 
  }
   
  // Mark the attendance
  function mark_attendance(string memory teacher_name,string memory class_name,string memory student_name) public payable{
    for(uint i=0;i<classlist[teacher_name][class_name].length;i++){
     if( keccak256(abi.encodePacked(classlist[teacher_name][class_name][i].name))==keccak256(abi.encodePacked(student_name))){
       attendance[teacher_name][class_name][student_name]=attendance[teacher_name][class_name][student_name]+1;
       break;
     }
   }  
  }

  // View the attendance
  function view_attendance(string memory teacher_name,string memory class_name,string memory student_name) public view returns(uint){

    return (attendance[teacher_name][class_name][student_name]*100)/no_classes[teacher_name][class_name];
  }



}





