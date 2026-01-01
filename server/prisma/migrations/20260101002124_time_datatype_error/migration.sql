/*
  Warnings:

  - You are about to alter the column `end_time` on the `attendance_logs` table. The data in that column could be lost. The data in that column will be cast from `Time(0)` to `DateTime(3)`.
  - You are about to alter the column `start_time` on the `attendance_logs` table. The data in that column could be lost. The data in that column will be cast from `Time(0)` to `DateTime(3)`.
  - A unique constraint covering the columns `[user_id,course_code,start_time]` on the table `attendance_logs` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `attendance_logs` DROP FOREIGN KEY `fk_logs_user`;

-- DropIndex
DROP INDEX `unique_log_entry` ON `attendance_logs`;

-- AlterTable
ALTER TABLE `attendance_logs` MODIFY `end_time` DATETIME(3) NOT NULL,
    MODIFY `start_time` DATETIME(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `unique_log_entry` ON `attendance_logs`(`user_id`, `course_code`, `start_time`);

-- AddForeignKey
ALTER TABLE `attendance_logs` ADD CONSTRAINT `fk_logs_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;
