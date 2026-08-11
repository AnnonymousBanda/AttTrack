/*
  Warnings:

  - You are about to drop the column `branch` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `semester` on the `courses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `courses` DROP COLUMN `branch`,
    DROP COLUMN `semester`;

-- CreateTable
CREATE TABLE `course_branches` (
    `course_code` VARCHAR(7) NOT NULL,
    `branch` VARCHAR(100) NOT NULL,
    `semester` TINYINT UNSIGNED NOT NULL,

    INDEX `fk_course_branches_course`(`course_code`),
    PRIMARY KEY (`course_code`, `branch`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `course_branches` ADD CONSTRAINT `fk_course_branches_course` FOREIGN KEY (`course_code`) REFERENCES `courses`(`course_code`) ON DELETE CASCADE ON UPDATE RESTRICT;
