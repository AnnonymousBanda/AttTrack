/*
  Warnings:

  - The primary key for the `attendance_logs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `semester` on the `attendance_logs` table. All the data in the column will be lost.
  - You are about to drop the column `slot_id` on the `attendance_logs` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `attendance_logs` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `VarChar(191)`.
  - You are about to drop the column `semester` on the `course_attendance` table. All the data in the column will be lost.
  - You are about to drop the `time_slots` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[user_id,course_code,lecture_date,start_time]` on the table `attendance_logs` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `end_time` to the `attendance_logs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_time` to the `attendance_logs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `attendance_logs` DROP FOREIGN KEY `fk_logs_slot`;

-- DropIndex
DROP INDEX `fk_logs_slot` ON `attendance_logs`;

-- AlterTable
ALTER TABLE `attendance_logs` DROP PRIMARY KEY,
    DROP COLUMN `semester`,
    DROP COLUMN `slot_id`,
    ADD COLUMN `end_time` TIME(0) NOT NULL,
    ADD COLUMN `start_time` TIME(0) NOT NULL,
    MODIFY `status` ENUM('present', 'absent', 'medical', 'cancelled') NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `course_attendance` DROP COLUMN `semester`;

-- DropTable
DROP TABLE `time_slots`;

-- CreateIndex
CREATE INDEX `idx_user_lecture_date` ON `attendance_logs`(`user_id`, `lecture_date`);

-- CreateIndex
CREATE UNIQUE INDEX `unique_log_entry` ON `attendance_logs`(`user_id`, `course_code`, `lecture_date`, `start_time`);
