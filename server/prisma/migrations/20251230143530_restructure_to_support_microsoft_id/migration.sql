/*
  Warnings:

  - The primary key for the `attendance_logs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `log_id` on the `attendance_logs` table. All the data in the column will be lost.
  - You are about to drop the column `uid` on the `attendance_logs` table. All the data in the column will be lost.
  - The primary key for the `course_attendance` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `uid` on the `course_attendance` table. All the data in the column will be lost.
  - The primary key for the `time_slots` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `slot_id` on the `time_slots` table. All the data in the column will be lost.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `uid` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[oid]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `attendance_logs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `attendance_logs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `course_attendance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `time_slots` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `users` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `oid` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `attendance_logs` DROP FOREIGN KEY `fk_logs_slot`;

-- DropForeignKey
ALTER TABLE `attendance_logs` DROP FOREIGN KEY `fk_logs_uid`;

-- DropForeignKey
ALTER TABLE `course_attendance` DROP FOREIGN KEY `fk_attendance_user`;

-- DropIndex
DROP INDEX `fk_logs_uid` ON `attendance_logs`;

-- AlterTable
ALTER TABLE `attendance_logs` DROP PRIMARY KEY,
    DROP COLUMN `log_id`,
    DROP COLUMN `uid`,
    ADD COLUMN `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `course_attendance` DROP PRIMARY KEY,
    DROP COLUMN `uid`,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`user_id`, `course_code`);

-- AlterTable
ALTER TABLE `time_slots` DROP PRIMARY KEY,
    DROP COLUMN `slot_id`,
    ADD COLUMN `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    DROP COLUMN `uid`,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ADD COLUMN `oid` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE INDEX `fk_logs_user` ON `attendance_logs`(`user_id`);

-- CreateIndex
CREATE UNIQUE INDEX `users_oid_key` ON `users`(`oid`);

-- AddForeignKey
ALTER TABLE `attendance_logs` ADD CONSTRAINT `fk_logs_slot` FOREIGN KEY (`slot_id`) REFERENCES `time_slots`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `attendance_logs` ADD CONSTRAINT `fk_logs_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `course_attendance` ADD CONSTRAINT `fk_attendance_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;
