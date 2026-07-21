/*
  Warnings:

  - A unique constraint covering the columns `[user_id,course_code,start_time,status]` on the table `attendance_logs` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `attendance_logs` DROP FOREIGN KEY `fk_logs_user`;

-- DropIndex
DROP INDEX `unique_log_entry` ON `attendance_logs`;

-- AlterTable
ALTER TABLE `course_attendance` MODIFY `total_classes` INTEGER UNSIGNED NOT NULL DEFAULT 45;

-- AlterTable
ALTER TABLE `users` MODIFY `batch` VARCHAR(4) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `unique_log_entry` ON `attendance_logs`(`user_id`, `course_code`, `start_time`, `status`);

-- AddForeignKey
ALTER TABLE `attendance_logs` ADD CONSTRAINT `fk_logs_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;
