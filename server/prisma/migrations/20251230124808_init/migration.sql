-- CreateTable
CREATE TABLE `attendance_logs` (
    `log_id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `uid` INTEGER UNSIGNED NOT NULL,
    `course_code` VARCHAR(6) NOT NULL,
    `semester` TINYINT UNSIGNED NOT NULL,
    `slot_id` INTEGER UNSIGNED NOT NULL,
    `lecture_date` DATE NOT NULL,
    `status` ENUM('present', 'absent', 'medical') NULL,

    INDEX `fk_logs_course`(`course_code`),
    INDEX `fk_logs_slot`(`slot_id`),
    INDEX `fk_logs_uid`(`uid`),
    PRIMARY KEY (`log_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `course_attendance` (
    `uid` INTEGER UNSIGNED NOT NULL,
    `course_code` VARCHAR(6) NOT NULL,
    `semester` TINYINT UNSIGNED NOT NULL,
    `present_total` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `absent_total` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `medical_total` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `total_classes` INTEGER UNSIGNED NOT NULL DEFAULT 0,

    INDEX `fk_attendance_course`(`course_code`),
    PRIMARY KEY (`uid`, `course_code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `courses` (
    `course_code` VARCHAR(6) NOT NULL,
    `course_name` VARCHAR(150) NOT NULL,
    `semester` TINYINT UNSIGNED NOT NULL,
    `branch` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`course_code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `time_slots` (
    `slot_id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `day_of_week` ENUM('MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN') NOT NULL,
    `start_time` TIME(0) NOT NULL,
    `end_time` TIME(0) NOT NULL,

    PRIMARY KEY (`slot_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `uid` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(50) NOT NULL,
    `first_name` VARCHAR(50) NOT NULL,
    `last_name` VARCHAR(50) NULL,
    `roll_number` VARCHAR(10) NOT NULL,
    `branch` VARCHAR(100) NOT NULL,
    `semester` TINYINT UNSIGNED NOT NULL,
    `image_url` VARCHAR(200) NULL,
    `batch` DATE NOT NULL,

    UNIQUE INDEX `email`(`email`),
    UNIQUE INDEX `roll_number`(`roll_number`),
    PRIMARY KEY (`uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `attendance_logs` ADD CONSTRAINT `fk_logs_course` FOREIGN KEY (`course_code`) REFERENCES `courses`(`course_code`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `attendance_logs` ADD CONSTRAINT `fk_logs_slot` FOREIGN KEY (`slot_id`) REFERENCES `time_slots`(`slot_id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `attendance_logs` ADD CONSTRAINT `fk_logs_uid` FOREIGN KEY (`uid`) REFERENCES `users`(`uid`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `course_attendance` ADD CONSTRAINT `fk_attendance_course` FOREIGN KEY (`course_code`) REFERENCES `courses`(`course_code`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `course_attendance` ADD CONSTRAINT `fk_attendance_user` FOREIGN KEY (`uid`) REFERENCES `users`(`uid`) ON DELETE CASCADE ON UPDATE RESTRICT;
