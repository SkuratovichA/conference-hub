--
-- Create model ConferenceUserModel
--
CREATE TABLE `users_conferenceusermodel` (
    `id` bigint AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `password` varchar(128) NOT NULL,
    `last_login` datetime(6) NULL,
    `username` varchar(64) NOT NULL UNIQUE,
    `email` varchar(64) NOT NULL UNIQUE,
    `name` varchar(64) NOT NULL,
    `is_active` bool NOT NULL,
    `is_superuser` bool NOT NULL,
    `is_staff` bool NOT NULL,
    `is_researcher` bool NOT NULL,
    `is_organization` bool NOT NULL,
    `is_verified` bool NOT NULL,
    `date_joined` datetime(6) NOT NULL,
    `status` bool NOT NULL,
    `country` varchar(64) NULL,
    `city` varchar(64) NULL,
    `balance_currency` varchar(3) NOT NULL,
    `balance` numeric(10, 2) NOT NULL
);

CREATE TABLE `users_conferenceusermodel_groups` (
    `id` bigint AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `conferenceusermodel_id` bigint NOT NULL,
    `group_id` integer NOT NULL
);

CREATE TABLE `users_conferenceusermodel_user_permissions` (
    `id` bigint AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `conferenceusermodel_id` bigint NOT NULL,
    `permission_id` integer NOT NULL
);

--
-- Create model OrganizationModel
--
CREATE TABLE `users_organizationmodel` (
    `user_id` bigint NOT NULL PRIMARY KEY
);
--
-- Create model ResearcherModel
--
CREATE TABLE `users_researchermodel` (
    `user_id` bigint NOT NULL PRIMARY KEY,
    `last_name` varchar(64) NOT NULL,
    `date_of_birth` date NULL
);
--
-- Create model ProfileModel
--
CREATE TABLE `users_profilemodel` (
    `id` bigint AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `image` varchar(100) NOT NULL,
    `user_id` bigint NOT NULL UNIQUE
);
--
-- Create model OrganizationEmployeeModel
--
CREATE TABLE `users_organizationemployeemodel` (
    `id` bigint AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `brief` varchar(64) NULL,
    `date_fired` date NULL,
    `date_hired` date NULL,
    `date_sent` date NOT NULL,
    `role` varchar(32) NOT NULL,
    `approved` bool NOT NULL,
    `rejected` bool NOT NULL,
    `finished` bool NOT NULL,
    `organization_id` bigint NOT NULL,
    `researcher_id` bigint NOT NULL
);

ALTER TABLE `users_conferenceusermodel_groups` ADD CONSTRAINT `users_conferenceusermode_conferenceusermodel_id_g_0b20751e_uniq` UNIQUE (`conferenceusermodel_id`, `group_id`);
ALTER TABLE `users_conferenceusermodel_groups` ADD CONSTRAINT `users_conferenceuser_conferenceusermodel__95594fff_fk_users_con` FOREIGN KEY (`conferenceusermodel_id`) REFERENCES `users_conferenceusermodel` (`id`);
ALTER TABLE `users_conferenceusermodel_groups` ADD CONSTRAINT `users_conferenceuser_group_id_cd30007c_fk_auth_grou` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);
ALTER TABLE `users_conferenceusermodel_user_permissions` ADD CONSTRAINT `users_conferenceusermode_conferenceusermodel_id_p_99e1793f_uniq` UNIQUE (`conferenceusermodel_id`, `permission_id`);
ALTER TABLE `users_conferenceusermodel_user_permissions` ADD CONSTRAINT `users_conferenceuser_conferenceusermodel__8715b22c_fk_users_con` FOREIGN KEY (`conferenceusermodel_id`) REFERENCES `users_conferenceusermodel` (`id`);
ALTER TABLE `users_conferenceusermodel_user_permissions` ADD CONSTRAINT `users_conferenceuser_permission_id_609e9435_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`);
ALTER TABLE `users_organizationmodel` ADD CONSTRAINT `users_organizationmo_user_id_dabf75de_fk_users_con` FOREIGN KEY (`user_id`) REFERENCES `users_conferenceusermodel` (`id`);
ALTER TABLE `users_researchermodel` ADD CONSTRAINT `users_researchermode_user_id_8400b53a_fk_users_con` FOREIGN KEY (`user_id`) REFERENCES `users_conferenceusermodel` (`id`);
ALTER TABLE `users_profilemodel` ADD CONSTRAINT `users_profilemodel_user_id_a5e98934_fk_users_con` FOREIGN KEY (`user_id`) REFERENCES `users_conferenceusermodel` (`id`);
ALTER TABLE `users_organizationemployeemodel` ADD CONSTRAINT `users_organizationem_organization_id_1875a939_fk_users_org` FOREIGN KEY (`organization_id`) REFERENCES `users_organizationmodel` (`user_id`);
ALTER TABLE `users_organizationemployeemodel` ADD CONSTRAINT `users_organizationem_researcher_id_6eae895a_fk_users_res` FOREIGN KEY (`researcher_id`) REFERENCES `users_researchermodel` (`user_id`);

--
-- Create model ConferenceModel
--
CREATE TABLE `conferences_conferencemodel` (
    `id` bigint AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `name` varchar(250) NOT NULL,
    `slug` varchar(50) NOT NULL UNIQUE,
    `date_from` date NOT NULL,
    `date_to` date NOT NULL,
    `address` varchar(250) NOT NULL,
    `price_currency` varchar(3) NULL,
    `price` numeric(10, 2) NULL
);

--
-- Create model EventModel
--
CREATE TABLE `conferences_eventmodel` (
    `event_id` integer AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `name` varchar(250) NOT NULL,
    `date_time` datetime(6) NOT NULL,
    `duration` bigint NOT NULL,
    `location` varchar(250) NOT NULL,
    `description` varchar(250) NULL,
    `type` varchar(7) NOT NULL
);

--
-- Create model InviteModel
--
CREATE TABLE `conferences_invitemodel` (
    `id` bigint AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `approved` bool NOT NULL
);

--
-- Create model LectureModel
--
CREATE TABLE `conferences_lecturemodel` (
    `event_id` integer NOT NULL PRIMARY KEY
);

--
-- Create model LunchModel
--
CREATE TABLE `conferences_lunchmodel` (
    `event_id` integer NOT NULL PRIMARY KEY,
    `price_currency` varchar(3) NOT NULL,
    `price` numeric(10, 2) NOT NULL,
    `menu` varchar(250) NOT NULL
);

ALTER TABLE `conferences_lecturemodel` ADD CONSTRAINT `conferences_lecturem_event_id_16cb8b35_fk_conferenc` FOREIGN KEY (`event_id`) REFERENCES `conferences_eventmodel` (`event_id`);
ALTER TABLE `conferences_lunchmodel` ADD CONSTRAINT `conferences_lunchmod_event_id_a6c25379_fk_conferenc` FOREIGN KEY (`event_id`) REFERENCES `conferences_eventmodel` (`event_id`);

--
-- Add field user to invitemodel
--
ALTER TABLE `conferences_invitemodel` ADD COLUMN `user_id` bigint NOT NULL , ADD CONSTRAINT `conferences_invitemo_user_id_bce054c4_fk_users_con` FOREIGN KEY (`user_id`) REFERENCES `users_conferenceusermodel`(`id`);
--
-- Add field conference to eventmodel
--
ALTER TABLE `conferences_eventmodel` ADD COLUMN `conference_id` bigint NOT NULL , ADD CONSTRAINT `conferences_eventmod_conference_id_f8f07fbb_fk_conferenc` FOREIGN KEY (`conference_id`) REFERENCES `conferences_conferencemodel`(`id`);
--
-- Add field organization to conferencemodel
--
ALTER TABLE `conferences_conferencemodel` ADD COLUMN `organization_id` bigint NOT NULL , ADD CONSTRAINT `conferences_conferen_organization_id_5f7539d1_fk_users_org` FOREIGN KEY (`organization_id`) REFERENCES `users_organizationmodel`(`user_id`);
--
-- Add field visitors to conferencemodel
--
CREATE TABLE `conferences_conferencemodel_visitors` (`id` bigint AUTO_INCREMENT NOT NULL PRIMARY KEY, `conferencemodel_id` bigint NOT NULL, `conferenceusermodel_id` bigint NOT NULL);
--
-- Add field customers to lunchmodel
--
CREATE TABLE `conferences_lunchmodel_customers` (`id` bigint AUTO_INCREMENT NOT NULL PRIMARY KEY, `lunchmodel_id` integer NOT NULL, `conferenceusermodel_id` bigint NOT NULL);
--
-- Add field lecture to invitemodel
--
ALTER TABLE `conferences_invitemodel` ADD COLUMN `lecture_id` integer NOT NULL , ADD CONSTRAINT `conferences_invitemo_lecture_id_635ffc58_fk_conferenc` FOREIGN KEY (`lecture_id`) REFERENCES `conferences_lecturemodel`(`event_id`);
--
-- Alter unique_together for eventmodel (1 constraint(s))
--
ALTER TABLE `conferences_eventmodel` ADD CONSTRAINT `conferences_eventmodel_conference_id_event_id_facd50c3_uniq` UNIQUE (`conference_id`, `event_id`);
--
-- Alter unique_together for invitemodel (1 constraint(s))
--
ALTER TABLE `conferences_invitemodel` ADD CONSTRAINT `conferences_invitemodel_lecture_id_user_id_1bb0d4ff_uniq` UNIQUE (`lecture_id`, `user_id`);
ALTER TABLE `conferences_conferencemodel_visitors` ADD CONSTRAINT `conferences_conferencemo_conferencemodel_id_confe_a033251b_uniq` UNIQUE (`conferencemodel_id`, `conferenceusermodel_id`);
ALTER TABLE `conferences_conferencemodel_visitors` ADD CONSTRAINT `conferences_conferen_conferencemodel_id_fab7beb4_fk_conferenc` FOREIGN KEY (`conferencemodel_id`) REFERENCES `conferences_conferencemodel` (`id`);
ALTER TABLE `conferences_conferencemodel_visitors` ADD CONSTRAINT `conferences_conferen_conferenceusermodel__36e8f9ac_fk_users_con` FOREIGN KEY (`conferenceusermodel_id`) REFERENCES `users_conferenceusermodel` (`id`);
ALTER TABLE `conferences_lunchmodel_customers` ADD CONSTRAINT `conferences_lunchmodel_c_lunchmodel_id_conference_646c08aa_uniq` UNIQUE (`lunchmodel_id`, `conferenceusermodel_id`);
ALTER TABLE `conferences_lunchmodel_customers` ADD CONSTRAINT `conferences_lunchmod_lunchmodel_id_e8f6c22f_fk_conferenc` FOREIGN KEY (`lunchmodel_id`) REFERENCES `conferences_lunchmodel` (`event_id`);
ALTER TABLE `conferences_lunchmodel_customers` ADD CONSTRAINT `conferences_lunchmod_conferenceusermodel__c546e1e6_fk_users_con` FOREIGN KEY (`conferenceusermodel_id`) REFERENCES `users_conferenceusermodel` (`id`);

--
-- Create model PurchasesModel
--
CREATE TABLE `ch_purchasesmodel` (
    `id` bigint AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `status` bool NOT NULL,
    `date` date NOT NULL
);
--
-- Add field conference to purchasesmodel
--
ALTER TABLE `ch_purchasesmodel` ADD COLUMN `conference_id` bigint NOT NULL , ADD CONSTRAINT `ch_purchasesmodel_conference_id_7dcaddac_fk_conferenc` FOREIGN KEY (`conference_id`) REFERENCES `conferences_conferencemodel`(`id`);

--
-- Add field researcher to purchasesmodel
--
ALTER TABLE `ch_purchasesmodel` ADD COLUMN `researcher_id` bigint NOT NULL , ADD CONSTRAINT `ch_purchasesmodel_researcher_id_80589512_fk_users_res` FOREIGN KEY (`researcher_id`) REFERENCES `users_researchermodel`(`user_id`);
--
-- Alter unique_together for purchasesmodel (1 constraint(s))
--
ALTER TABLE `ch_purchasesmodel` ADD CONSTRAINT `ch_purchasesmodel_conference_id_researcher_id_1d320f06_uniq` UNIQUE (`conference_id`, `researcher_id`);

