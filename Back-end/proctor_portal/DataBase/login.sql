use proctor_portal;
alter table student drop constraint fk_login;
drop table login;
select * from login;
describe login;
create table login(g_id varchar(30), role varchar(30));
alter table login add constraint PK_login_g_id primary key (g_id);
alter table login add constraint add_specific check (role = "Student" or role = "Proctor");
insert into login values("1", "Student");
insert into login values("2", "Student");
insert into login values("3", "Student");
insert into login values("4", "Student");
insert into login values("10", "Proctor");
insert into login values("12", "Proctor");
insert into login values("21", "Proctor");
insert into login values("22", "Proctor");
insert into login values("23", "Proctor");
delete from login where g_id = "108960148661406427027";

drop table student;
select * from student;
describe student;
create table student(g_id varchar(30),role varchar(30), name varchar(50), usn varchar(20),
					department varchar(20), email varchar(50), mobile_no varchar(20), dob varchar(20),
                    proctor_id varchar(50), semester int, section varchar(3), batch varchar(10));
alter table student add constraint PK_student_g_id primary key(g_id);
alter table student drop column role;
alter table student drop primary key;
alter table student add constraint PK_student primary key(usn);
alter table student add constraint fk_student_to_login foreign key (g_id) references login(g_id) on delete cascade;
alter table student add constraint fk_student_to_proctor foreign key (proctor_id) references proctor(p_id) on delete cascade;
alter table student drop constraint fk_student_to_proctor;
describe student;
insert into student values("1",  "Jeevan", "1BM", "CSE", "j@V.C", "+321","13-05-2001", "10", 4, "D", "2023");
insert into student values("2",  "Jeevan1", "1BM1", "CSE", "j@V1.C", "+321","13-05-2001", "10", 4, "D", "2023");
insert into student values("3",  "Jeevan2", "1BM2", "CSE", "j@V1.C", "+321","13-05-2001", "12", 4, "D", "2023");
insert into student values("4",  "Jeevan3", "1BM3", "CSE", "j@V1.C", "+321","13-05-2001", "12", 4, "D", "2023");
delete from student where batch = "2023";
select * from student s, proctor p where s.proctor_id = 12 and p.p_id and s.proctor_id = p.p_id;
select * from student s, proctor p where s.g_id = 1 and s.proctor_id = p.p_id;

select * from proctor;
describe proctor;
drop table proctor;
create table proctor(p_id varchar(30), p_name varchar(50), p_email varchar(50), p_mobile_no varchar(20));
alter table proctor add constraint PK_Proctor primary key (name);
alter table proctor drop primary key;
alter table proctor change name p_name varchar(50);
alter table proctor change email p_email varchar(50);
alter table proctor change mobile_no p_mobile_no varchar(20);
alter table proctor add constraint fk_proctor_to_login foreign key(p_id) references login(g_id) on delete cascade;
insert into proctor values("10", "Test sir", "T@S.c", "+4321");
insert into proctor values("12", "Test1 sir", "T@12S.c", "+4321");
insert into proctor values("21", "Selva Kumar sir", "sks.cse@bmsce.ac.in", "+4321");
insert into proctor values("22", "Vikranth BM sir", "vbm.cse@bmsce.ac.in", "+4321");
insert into proctor values("23", "Rekha GS", "rekha.cse@bmsce.ac.in", "+4321");
delete from proctor where mobile_no = "+4321";
select count(*) from student where proctor_id = 10;

select * from courses;
describe courses;
create table courses (course_id varchar(20), course_name varchar(100), credits int, course_semester int, course_department varchar(10));
alter table courses add primary key (course_id);
insert into courses values("19MA3BSSDM", "Statistics and Discrete Mathematics", 4, 3, "CSE");
insert into courses values("19CS3ESMMC", "Microprocessors and Microcontrollers", 4, 3, "CSE");
insert into courses values("19CS3PCOOJ", "Object Oriented Java Programming", 4, 3, "CSE");
insert into courses values("19CS3PCDST", "Data Structures", 4, 3, "CSE");
insert into courses values("19CS3PCCOA", "Computer Organization and Architecture", 3, 3, "CSE");
insert into courses values("19CS3PCLOD", "Logic Design", 3, 3, "CSE");
insert into courses values("19HS4PCEVS", "Environmental Studies", 2, 3, "CSE");
insert into courses values("19CS3PWPW1", "Project Work-1", 2, 3, "CSE");
insert into courses values("19CS3NCNC3", "Physical Activity (Sports/ Yoga Etc.)", 0, 3, "CSE");
insert into courses values("18MA1BSEM1", "Engineering Mathematics-1", 4, 1, "CSE");
insert into courses values("18CY1BSCHY", "Engineering Chemistry", 5, 1, "CSE");
insert into courses values("18EE1ESELE", "Elememts of Electrical Engineering", 3, 1, "CSE");
insert into courses values("18ME1ESEED", "Elememts of Engineering Drawing", 4, 1, "CSE");
insert into courses values("18CV1ESENM", "Engineering Mechanics", 4, 1, "CSE");
insert into courses values("18HS1NCENG", "Functional English", 0, 1, "CSE");
insert into courses values("18MA2BSEM2", "Engineering Mathematics-2", 4, 2, "CSE");
insert into courses values("18PY2BSPHY", "Applied Physics", 5, 1, "CSE");
insert into courses values("18EC2ESECE", "Elememts of Electronics Engineering", 3, 2, "CSE");
insert into courses values("18ME2ESEME", "Elememts of Mechanical Engineering", 4, 2, "CSE");
insert into courses values("18CS2ESCCP", "C Programming", 4, 2, "CSE");
insert into courses values("18HS2NCKAN", "Functional English", 0, 2, "CSE");




drop table marks;
select * from marks;
describe marks;
create table marks(m_usn varchar(20), m_course_id varchar(20), cie1 int, cie2 int, cie3 int,lab int, internal int, see int, status varchar(20));
alter table marks add constraint fk_marks_to_student foreign key (m_usn) references student(usn) on delete cascade on update cascade;
alter table marks add constraint fk_marks_to_courses foreign key(m_course_id) references courses(course_id) on delete cascade on update cascade;
insert into marks values("1BM19CS084", "19MA3BSSDM", 36, 35, 39, null, 47, 78, "pass");
insert into marks values("1BM19CS084", "19CS3ESMMC", 34, 39, 36, 23, 47, 80, "pass");
insert into marks values("1BM19CS084", "19CS3PCOOJ", 40, 20, 35, 23, 46, 65, "pass");
insert into marks values("1BM19CS084", "19CS3PCDST", 36, 35, 39, null, 47, 78, "pass");
insert into marks values("1BM19CS084", "19CS3PCCOA", 36, 35, 39, null, 47, 78, "pass");
insert into marks values("1BM19CS084", "19CS3PCLOD", 36, 35, 39, null, 47, 78, "pass");
insert into marks values("1BM19CS084", "19HS4PCEVS", 36, 35, 39, null, 47, 78, "pass");
insert into marks values("1BM19CS084", "19CS3PWPW1", 36, 35, 39, null, 47, 78, "pass");
insert into marks values("1BM19CS084", "19CS3NCNC3", 36, 35, 39, null, 47, 78, "pass");
insert into marks values("1BM19CS084", "18MA2BSEM2", 36, 35, 39, null, 47, 78, "pass");
insert into marks values("1BM19CS084", "18PY2BSPHY", 34, 39, 36, 23, 47, 80, "pass");
insert into marks values("1BM19CS084", "18EC2ESECE", 40, 20, 35, 23, 46, 65, "pass");
insert into marks values("1BM19CS084", "18ME2ESEME", 36, 35, 39, 25, 47, 78, "pass");
insert into marks values("1BM19CS084", "18CS2ESCCP", 36, 35, 39, null, 47, 78, "pass");
insert into marks values("1BM19CS084", "18HS2NCKAN", 36, 35, 39, null, 47, 78, "pass");
insert into marks values("1BM19CS084", "18MA1BSEM1", 36, 35, 39, null, 47, 78, "pass");
insert into marks values("1BM19CS084", "18CY1BSCHY", 34, 39, 36, 23, 47, 80, "pass");
insert into marks values("1BM19CS084", "18EE1ESELE", 40, 20, 35, 23, 46, 65, "pass");
insert into marks values("1BM19CS084", "18ME1ESEED", 36, 35, 39, null, 47, 78, "pass");
insert into marks values("1BM19CS084", "18CV1ESENM", 36, 35, 39, null, 47, 78, "pass");
insert into marks values("1BM19CS084", "18HS1NCENG", 36, 35, 39, null, 47, 78, "pass");




create table details(g_id varchar(30),f_name varchar(100),f_occupation varchar(100),
					f_mobile_no varchar(20),f_email varchar(100),m_name varchar(100),m_occupation varchar(100),
					m_mobile_no varchar(20),m_email varchar(100));

alter table details add foreign key (g_id) references login(g_id) on delete cascade on update cascade;
select * from details ;

insert into details values ('1','xyz','wxyz','+9876','xyz@g.com','mno','mnop','+6789','mno@g.com');
insert into details values ('108960148661406427027', 'M Eswaraiah', 'Pharmacist', '+91805098125', 'eswar_1969@rediffmail.com', 'B K Neeraja', 'Teacher', '+918553782343', 'bkneeraja19@gmail.com');



