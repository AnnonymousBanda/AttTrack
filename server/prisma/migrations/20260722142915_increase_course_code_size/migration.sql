/*
  Warnings:

  - The primary key for the `course_attendance` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `courses` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `attendance_logs` DROP FOREIGN KEY `fk_logs_course`;

-- DropForeignKey
ALTER TABLE `course_attendance` DROP FOREIGN KEY `fk_attendance_course`;

-- AlterTable
ALTER TABLE `attendance_logs` MODIFY `course_code` VARCHAR(7) NOT NULL;

-- AlterTable
ALTER TABLE `course_attendance` DROP PRIMARY KEY,
    MODIFY `course_code` VARCHAR(7) NOT NULL,
    ADD PRIMARY KEY (`user_id`, `course_code`);

-- AlterTable
ALTER TABLE `courses` DROP PRIMARY KEY,
    MODIFY `course_code` VARCHAR(7) NOT NULL,
    ADD PRIMARY KEY (`course_code`);

-- AddForeignKey
ALTER TABLE `attendance_logs` ADD CONSTRAINT `fk_logs_course` FOREIGN KEY (`course_code`) REFERENCES `courses`(`course_code`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `course_attendance` ADD CONSTRAINT `fk_attendance_course` FOREIGN KEY (`course_code`) REFERENCES `courses`(`course_code`) ON DELETE CASCADE ON UPDATE RESTRICT;
