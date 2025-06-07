-- Role
CREATE TABLE `Role` (
    `Id` INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `Name` VARCHAR(120) NOT NULL,
    `Code` VARCHAR(120) NOT NULL
);

-- User
CREATE TABLE `User` (
    `Id` INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `RoleId` INT(11),
    `Username` VARCHAR(120) NOT NULL UNIQUE,
    `Password` VARCHAR(11) NOT NULL,
    `IsActive` TINYINT(1) DEFAULT 1,
    `CreateBy` INT(11),
    `CreateAt` TIMESTAMP NOT NULL DEFAULT current_timestamp(),
    FOREIGN KEY (`RoleId`) REFERENCES `Role`(`Id`),
    FOREIGN KEY (`CreateBy`) REFERENCES `User`(`Id`)
);

-- Category
CREATE TABLE `Category` (
    `Id` INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `Name` VARCHAR(120) NOT NULL UNIQUE,
    `Description` TEXT DEFAULT NULL,
    `ParentId` INT(11) DEFAULT NULL,
    `Image` VARCHAR(255) DEFAULT NULL,
    `IsActive` TINYINT(1) DEFAULT 1,
    `CreateBy` INT(11),
    `CreateAt` TIMESTAMP NOT NULL DEFAULT current_timestamp(),
    FOREIGN KEY (`ParentId`) REFERENCES `Category`(`Id`),
    FOREIGN KEY (`CreateBy`) REFERENCES `User`(`Id`)
);

-- Teacher
CREATE TABLE `Teacher` (
   `Id` INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
   `FirstName` VARCHAR(120) NOT NULL,
   `LastName` VARCHAR(120) NOT NULL,
   `Gender` TINYINT(1) DEFAULT 1,
   `Dob` DATETIME DEFAULT NULL,
   `Tel` VARCHAR(18) NOT NULL UNIQUE,
   `Image` VARCHAR(255) DEFAULT NULL,
   `Email` VARCHAR(120) DEFAULT NULL UNIQUE,
   `Current_Address` TEXT DEFAULT NULL,
   `Note` TEXT DEFAULT NULL,
   `IsActive` TINYINT(1) DEFAULT 1,
   `CreateBy` INT(11),
   `CreateAt` TIMESTAMP NOT NULL DEFAULT current_timestamp(),
   FOREIGN KEY (`CreateBy`) REFERENCES `User`(`Id`)
);

-- Student
CREATE TABLE `Student` (
   `Id` INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
   `FirstName` VARCHAR(120) NOT NULL,
   `LastName` VARCHAR(120) NOT NULL,
   `Gender` TINYINT(1) DEFAULT 1,
   `Dob` DATETIME DEFAULT NULL,
   `Tel` VARCHAR(18) NOT NULL UNIQUE,
   `Image` VARCHAR(255) DEFAULT NULL,
   `Email` VARCHAR(120) DEFAULT NULL UNIQUE,
   `Current_Address` TEXT DEFAULT NULL,
   `Note` TEXT DEFAULT NULL,
   `IsActive` TINYINT(1) DEFAULT 1,
   `CreateBy` INT(11),
   `CreateAt` TIMESTAMP NOT NULL DEFAULT current_timestamp(),
   FOREIGN KEY (`CreateBy`) REFERENCES `User`(`Id`)
);

-- Course
CREATE TABLE `Course` (
    `Id` INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `CategoryId` INT(11),
    `Name` VARCHAR(120) NOT NULL UNIQUE,
    `Description` TEXT DEFAULT NULL,
    `Image` VARCHAR(255) DEFAULT NULL,
    `TotalHour` DECIMAL(6,2) DEFAULT 0,
    `Price` DECIMAL(6,2) DEFAULT 0,
    `IsActive` TINYINT(1) DEFAULT 1,
    `CreateBy` INT(11),
    `CreateAt` TIMESTAMP NOT NULL DEFAULT current_timestamp(),
    FOREIGN KEY (`CategoryId`) REFERENCES `Category`(`Id`),
    FOREIGN KEY (`CreateBy`) REFERENCES `User`(`Id`)
);

-- ClassRoom
CREATE TABLE `ClassRoom`(
    `Id` INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `TeacherId` INT(11),
    `CourseId` INT(11),
    `CourseGeneration` INT(5),
    `Course_Price` DECIMAL(6,2) DEFAULT 0,
    `Class_Discount` DECIMAL(6,2) DEFAULT 0,
    `Class_Discount_Price` DECIMAL(6,2) DEFAULT 0,
    `Class_Price` DECIMAL(6,2) DEFAULT 0,
    `LearingType` ENUM('Online', 'Offline', 'Hybrid') NOT NULL,
    `ClassStatus` ENUM('Pending', 'Ongoing', 'Completed', 'Cancelled') NOT NULL,
    `ClassShiff` ENUM('Morning', 'Afternoon', 'Evening') NOT NULL,
    `StartDate` DATETIME DEFAULT NULL,
    `EndDate` DATETIME DEFAULT NULL,
    `IsActive` TINYINT(1) DEFAULT 1,
    `Note` TEXT DEFAULT NULL,
    `CreateBy` INT(11),
    `CreateAt` TIMESTAMP NOT NULL DEFAULT current_timestamp(),
    FOREIGN KEY (`TeacherId`) REFERENCES `Teacher`(`Id`),
    FOREIGN KEY (`CourseId`) REFERENCES `Course`(`Id`),
    FOREIGN KEY (`CreateBy`) REFERENCES `User`(`Id`)
);

-- StudentRegister
CREATE TABLE `StudentRegister`(
    `Id` INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `ClassRoomId` INT(11),
    `StudentId` INT(11),
    `Discount` DECIMAL(6,2) DEFAULT 0,
    `Discount_Price` DECIMAL(6,2) DEFAULT 0,
    `TotalToPay` DECIMAL(6,2) DEFAULT 0,
    `IsCompletedPaid` TINYINT(1) DEFAULT 0,
    `Note` TEXT DEFAULT NULL,
    `RegisterAt` VARCHAR(120) DEFAULT NULL,
    `CreateBy` INT(11),
    `CreateAt` TIMESTAMP NOT NULL DEFAULT current_timestamp(),
    FOREIGN KEY (`ClassRoomId`) REFERENCES `ClassRoom`(`Id`),
    FOREIGN KEY (`StudentId`) REFERENCES `Student`(`Id`),
    FOREIGN KEY (`CreateBy`) REFERENCES `User`(`Id`),
    UNIQUE KEY `unique_registration` (`ClassRoomId`, `StudentId`)
);

-- StudentPayment
CREATE TABLE `StudentPayment` (
    `ClassRoomId` INT(11),
    `StudentId` INT(11),
    `Payment` DECIMAL(6,2) DEFAULT 0,
    `PaymentMethod` VARCHAR(120) NOT NULL,
    `PaymentDate` DATETIME NOT NULL,
    `ImageRef` VARCHAR(255) DEFAULT NULL,
    `Note` TEXT DEFAULT NULL,
    `CreateBy` INT(11),
    `CreateAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    PRIMARY KEY (`ClassRoomId`, `StudentId`),
    FOREIGN KEY (`ClassRoomId`) REFERENCES `ClassRoom`(`Id`),
    FOREIGN KEY (`StudentId`) REFERENCES `Student`(`Id`),
    FOREIGN KEY (`CreateBy`) REFERENCES `User`(`Id`)
);