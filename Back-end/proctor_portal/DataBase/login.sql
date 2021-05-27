use proctor_portal;
alter table student drop constraint fk_login;
drop table login;
select * from login;
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
create table proctor(p_id varchar(30), name varchar(50), email varchar(50), mobile_no varchar(20));
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


























