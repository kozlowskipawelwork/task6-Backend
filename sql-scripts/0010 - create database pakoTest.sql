-- Script to create database with some tables

-- upgrade root account (only once!)
-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
-- flush privileges;

-- 1. Drop whole database if exists
drop database if exists PakoTest;

-- 2. Create database if not exists
create database PakoTest;

-- table Users
create table PakoTest.Users (
	UserId int auto_increment,
    UserName nvarchar(50) not null,
    UserPassword varchar(100) not null,
    UserEmail nvarchar(50) not null,
    LastLoginTime datetime, 
    RegistrationTime datetime,
    UserStatus int default 1,
    primary key(UserId)
);

insert into PakoTest.Users(UserName, UserPassword, UserEmail, LastLoginTime, RegistrationTime) values('Edek',	'Bezkredek',	'edek@gmail.com',	null,	'2022-11-03 13:42:21');
insert into PakoTest.Users(UserName, UserPassword, UserEmail, LastLoginTime, RegistrationTime) values('Witek',	'Prytek',		'witek@gmail.com',	null,	'2022-11-03 13:42:21');
insert into PakoTest.Users(UserName, UserPassword, UserEmail, LastLoginTime, RegistrationTime) values('Ala',	'Makota',		'ala@gmail.com',	null,	'2022-11-03 13:42:21');

select * from PakoTest.Users;

-- create table emails
create table PakoTest.Messages (
	MsgId int auto_increment,
    MsgSender nvarchar(50) not null,
    MsgRecipient varchar(50) not null,
    MsgTitle nvarchar(50) not null,
    MsgBody  nvarchar(1000) not null,
    SendTime datetime default CURRENT_TIMESTAMP,
    primary key(MsgId)
);

insert into PakoTest.Messages(MsgSender, MsgRecipient, MsgTitle, MsgBody) values ( 'Edek', 'Ala', 'Test', ' Test text as sample insert SQL query');

select * from PakoTest.Messages;

-- end of script