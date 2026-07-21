-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `oid` VARCHAR(191) NOT NULL,
    `email` VARCHAR(75) NOT NULL,
    `first_name` VARCHAR(50) NOT NULL,
    `last_name` VARCHAR(50) NULL,
    `roll_number` VARCHAR(10) NOT NULL,
    `branch` VARCHAR(100) NOT NULL,
    `semester` TINYINT UNSIGNED NOT NULL,
    `image_url` VARCHAR(200) NULL,
    `batch` SMALLINT UNSIGNED NOT NULL,

    UNIQUE INDEX `users_oid_key`(`oid`),
    UNIQUE INDEX `email`(`email`),
    UNIQUE INDEX `roll_number`(`roll_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `attendance_logs` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `course_code` VARCHAR(6) NOT NULL,
    `lecture_date` DATE NOT NULL,
    `start_time` DATETIME(3) NOT NULL,
    `end_time` DATETIME(3) NOT NULL,
    `status` ENUM('present', 'absent', 'medical', 'cancelled') NULL,

    INDEX `fk_logs_course`(`course_code`),
    INDEX `idx_user_lecture_date`(`user_id`, `lecture_date`),
    UNIQUE INDEX `unique_log_entry`(`user_id`, `course_code`, `start_time`, `status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `course_attendance` (
    `user_id` VARCHAR(191) NOT NULL,
    `course_code` VARCHAR(6) NOT NULL,
    `present_total` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `absent_total` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `medical_total` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `total_classes` INTEGER UNSIGNED NOT NULL DEFAULT 45,

    INDEX `fk_attendance_course`(`course_code`),
    PRIMARY KEY (`user_id`, `course_code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `courses` (
    `course_code` VARCHAR(6) NOT NULL,
    `course_name` VARCHAR(150) NOT NULL,
    `semester` TINYINT UNSIGNED NOT NULL,
    `branch` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`course_code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `attendance_logs` ADD CONSTRAINT `fk_logs_course` FOREIGN KEY (`course_code`) REFERENCES `courses`(`course_code`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `attendance_logs` ADD CONSTRAINT `fk_logs_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `course_attendance` ADD CONSTRAINT `fk_attendance_course` FOREIGN KEY (`course_code`) REFERENCES `courses`(`course_code`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `course_attendance` ADD CONSTRAINT `fk_attendance_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;
