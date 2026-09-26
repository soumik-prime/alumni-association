-- =====================================================================
-- Placeholder / seed data for the NU CSE Alumni Association schema
-- =====================================================================
-- SCOPE NOTE:
--   "account", "session" and "verification" (pure auth/session mechanics)
--   are excluded, as requested.
--   The "user" table is *login-identity* infra tightly coupled to those
--   auth tables, but several other tables have NOT NULL foreign keys
--   into it (publications.added_by_id, site_notifications.created_by,
--   user_permissions.*, user_permission_groups.user_id). So a small set
--   of 8 "user" rows is seeded purely as FK anchors, not as a fully
--   fleshed 20+ row table like the rest.
--
-- INSERT ORDER respects FK dependencies:
--   countries -> addresses -> companies -> institutions -> profiles
--   -> "user" -> educations -> work_experiences -> publications
--   -> publication_authors -> permissions -> permission_groups
--   -> permission_group_items -> user_permissions
--   -> user_permission_groups -> site_notifications
--
-- EDGE CASES DELIBERATELY INCLUDED (search "-- EDGE:" throughout):
--   NULLs in every nullable column, boundary-length varchars,
--   apostrophes/quotes in names, unicode text, every enum value used
--   at least once, NULL FKs where allowed, past/future/NULL dates,
--   0/1/many relationships, self-referential grants, expired records.
-- =====================================================================

BEGIN;

-- ---------------------------------------------------------------------
-- countries (21 rows)
-- ---------------------------------------------------------------------
INSERT INTO "countries" ("iso2", "name", "flag", "created_at", "updated_at") VALUES
('BD', 'Bangladesh', '🇧🇩', '2024-01-01 09:00:00', '2024-01-01 09:00:00'),
('US', 'United States', '🇺🇸', '2024-01-01 09:00:00', '2024-01-01 09:00:00'),
('GB', 'United Kingdom', '🇬🇧', '2024-01-01 09:00:00', '2024-01-01 09:00:00'),
('CA', 'Canada', '🇨🇦', '2024-01-01 09:00:00', '2024-01-01 09:00:00'),
('AU', 'Australia', '🇦🇺', '2024-01-01 09:00:00', '2024-01-01 09:00:00'),
('DE', 'Germany', '🇩🇪', '2024-01-01 09:00:00', '2024-01-01 09:00:00'),
('FR', 'France', '🇫🇷', '2024-01-01 09:00:00', '2024-01-01 09:00:00'),
('JP', 'Japan', '🇯🇵', '2024-01-01 09:00:00', '2024-01-01 09:00:00'),
('CN', 'China', '🇨🇳', '2024-01-01 09:00:00', '2024-01-01 09:00:00'),
('IN', 'India', '🇮🇳', '2024-01-01 09:00:00', '2024-01-01 09:00:00'),
('SG', 'Singapore', '🇸🇬', '2024-01-01 09:00:00', '2024-01-01 09:00:00'),
('MY', 'Malaysia', '🇲🇾', '2024-01-01 09:00:00', '2024-01-01 09:00:00'),
('AE', 'United Arab Emirates', '🇦🇪', '2024-01-01 09:00:00', '2024-01-01 09:00:00'),
('SA', 'Saudi Arabia', '🇸🇦', '2024-01-01 09:00:00', '2024-01-01 09:00:00'),
('KR', 'South Korea', '🇰🇷', '2024-01-01 09:00:00', '2024-01-01 09:00:00'),
('SE', 'Sweden', '🇸🇪', '2024-01-01 09:00:00', '2024-01-01 09:00:00'),
('NL', 'Netherlands', '🇳🇱', '2024-01-01 09:00:00', '2024-01-01 09:00:00'),
('IT', 'Italy', '🇮🇹', '2024-01-01 09:00:00', '2024-01-01 09:00:00'),
('CI', 'Côte d''Ivoire', NULL, '2024-01-01 09:00:00', '2024-01-01 09:00:00'), -- EDGE: apostrophe in name + NULL flag
('QA', 'Qatar', '🇶🇦', '2024-01-01 09:00:00', '2024-01-01 09:00:00'),
('BR', 'Brazil', '🇧🇷', '2024-01-01 09:00:00', '2024-01-01 09:00:00');

-- ---------------------------------------------------------------------
-- addresses (25 rows)
-- ---------------------------------------------------------------------
INSERT INTO "addresses" ("id", "city", "iso2", "created_at", "updated_at") VALUES
('addr_001', 'Dhaka', 'BD', '2024-01-02 09:00:00', '2024-01-02 09:00:00'),
('addr_002', 'Netrokona', 'BD', '2024-01-02 09:00:00', '2024-01-02 09:00:00'),
('addr_003', 'Chittagong', 'BD', '2024-01-02 09:00:00', '2024-01-02 09:00:00'),
('addr_004', 'Sylhet', 'BD', '2024-01-02 09:00:00', '2024-01-02 09:00:00'),
('addr_005', 'Rajshahi', 'BD', '2024-01-02 09:00:00', '2024-01-02 09:00:00'),
('addr_006', 'Khulna', 'BD', '2024-01-02 09:00:00', '2024-01-02 09:00:00'),
('addr_007', 'New York', 'US', '2024-01-02 09:00:00', '2024-01-02 09:00:00'),
('addr_008', 'San Francisco', 'US', '2024-01-02 09:00:00', '2024-01-02 09:00:00'),
('addr_009', 'Seattle', 'US', '2024-01-02 09:00:00', '2024-01-02 09:00:00'),
('addr_010', 'London', 'GB', '2024-01-02 09:00:00', '2024-01-02 09:00:00'),
('addr_011', 'Manchester', 'GB', '2024-01-02 09:00:00', '2024-01-02 09:00:00'),
('addr_012', 'Stratford-upon-Avon', 'GB', '2024-01-02 09:00:00', '2024-01-02 09:00:00'), -- EDGE: long hyphenated city name
('addr_013', 'Toronto', 'CA', '2024-01-02 09:00:00', '2024-01-02 09:00:00'),
('addr_014', 'Vancouver', 'CA', '2024-01-02 09:00:00', '2024-01-02 09:00:00'),
('addr_015', 'Sydney', 'AU', '2024-01-02 09:00:00', '2024-01-02 09:00:00'),
('addr_016', 'Melbourne', 'AU', '2024-01-02 09:00:00', '2024-01-02 09:00:00'),
('addr_017', 'Berlin', 'DE', '2024-01-02 09:00:00', '2024-01-02 09:00:00'),
('addr_018', 'Munich', 'DE', '2024-01-02 09:00:00', '2024-01-02 09:00:00'),
('addr_019', 'Paris', 'FR', '2024-01-02 09:00:00', '2024-01-02 09:00:00'),
('addr_020', 'Tokyo', 'JP', '2024-01-02 09:00:00', '2024-01-02 09:00:00'),
('addr_021', 'Osaka', 'JP', '2024-01-02 09:00:00', '2024-01-02 09:00:00'),
('addr_022', 'Shanghai', 'CN', '2024-01-02 09:00:00', '2024-01-02 09:00:00'),
('addr_023', 'Xi''an', 'CN', '2024-01-02 09:00:00', '2024-01-02 09:00:00'), -- EDGE: apostrophe in city name
('addr_024', 'Bengaluru', 'IN', '2024-01-02 09:00:00', '2024-01-02 09:00:00'),
('addr_025', 'São Paulo', 'BR', '2024-01-02 09:00:00', '2024-01-02 09:00:00'); -- EDGE: unicode diacritic

-- ---------------------------------------------------------------------
-- companies (22 rows)
-- ---------------------------------------------------------------------
INSERT INTO "companies" ("id", "name", "industry", "website", "created_at", "updated_at") VALUES
('comp_001', 'Google LLC', 'Software & IT Services', 'https://google.com', '2024-01-03 09:00:00', '2024-01-03 09:00:00'),
('comp_002', 'Microsoft Corporation', 'Software & IT Services', 'https://microsoft.com', '2024-01-03 09:00:00', '2024-01-03 09:00:00'),
('comp_003', 'OpenAI', 'Artificial Intelligence', 'https://openai.com', '2024-01-03 09:00:00', '2024-01-03 09:00:00'),
('comp_004', 'Chainlink Labs', 'Blockchain / Web3', NULL, '2024-01-03 09:00:00', '2024-01-03 09:00:00'), -- EDGE: NULL website
('comp_005', 'Kaspersky', 'Cybersecurity', 'https://kaspersky.com', '2024-01-03 09:00:00', '2024-01-03 09:00:00'),
('comp_006', 'Amazon Web Services', 'Cloud Computing', 'https://aws.amazon.com', '2024-01-03 09:00:00', '2024-01-03 09:00:00'),
('comp_007', 'Riot Games', 'Game Development', 'https://riotgames.com', '2024-01-03 09:00:00', '2024-01-03 09:00:00'),
('comp_008', 'Boston Dynamics', 'Robotics & Automation', 'https://bostondynamics.com', '2024-01-03 09:00:00', '2024-01-03 09:00:00'),
('comp_009', 'Bosch', 'Embedded / IoT', 'https://bosch.com', '2024-01-03 09:00:00', '2024-01-03 09:00:00'),
('comp_010', 'Grameenphone', 'Telecom', 'https://grameenphone.com', '2024-01-03 09:00:00', '2024-01-03 09:00:00'),
('comp_011', 'bKash', 'Fintech', 'https://bkash.com', '2024-01-03 09:00:00', '2024-01-03 09:00:00'),
('comp_012', 'Standard Chartered Bank', 'Banking & Finance', 'https://sc.com', '2024-01-03 09:00:00', '2024-01-03 09:00:00'),
('comp_013', 'Daraz', 'E-commerce', 'https://daraz.com.bd', '2024-01-03 09:00:00', '2024-01-03 09:00:00'),
('comp_014', 'BRAC University', 'Education', 'https://bracu.ac.bd', '2024-01-03 09:00:00', '2024-01-03 09:00:00'),
('comp_015', 'icddr,b', 'Research & Academia', 'https://icddrb.org', '2024-01-03 09:00:00', '2024-01-03 09:00:00'), -- EDGE: comma in name
('comp_016', 'ICT Division Bangladesh', 'Government', NULL, '2024-01-03 09:00:00', '2024-01-03 09:00:00'),
('comp_017', 'Square Hospitals', 'Healthcare', 'https://squarehospital.com', '2024-01-03 09:00:00', '2024-01-03 09:00:00'),
('comp_018', 'McKinsey & Company', 'Consulting', 'https://mckinsey.com', '2024-01-03 09:00:00', '2024-01-03 09:00:00'), -- EDGE: ampersand
('comp_019', 'Pathao', 'Startup', 'https://pathao.com', '2024-01-03 09:00:00', '2024-01-03 09:00:00'),
('comp_020', 'Walton Hi-Tech Industries', 'Manufacturing', 'https://waltonbd.com', '2024-01-03 09:00:00', '2024-01-03 09:00:00'),
('comp_021', 'Independent / Freelance', NULL, NULL, '2024-01-03 09:00:00', '2024-01-03 09:00:00'), -- EDGE: NULL industry AND NULL website
('comp_022', 'O''Reilly Media', 'Other', 'https://oreilly.com', '2024-01-03 09:00:00', '2024-01-03 09:00:00'); -- EDGE: apostrophe in name

-- ---------------------------------------------------------------------
-- institutions (23 rows)
-- ---------------------------------------------------------------------
INSERT INTO "institutions" ("id", "name", "website", "created_at", "updated_at") VALUES
('inst_001', 'Netrokona University', 'https://nu.ac.bd', '2024-01-04 09:00:00', '2024-01-04 09:00:00'),
('inst_002', 'University of Dhaka', 'https://du.ac.bd', '2024-01-04 09:00:00', '2024-01-04 09:00:00'),
('inst_003', 'Bangladesh University of Engineering and Technology', 'https://buet.ac.bd', '2024-01-04 09:00:00', '2024-01-04 09:00:00'),
('inst_004', 'North South University', 'https://northsouth.edu', '2024-01-04 09:00:00', '2024-01-04 09:00:00'),
('inst_005', 'Massachusetts Institute of Technology', 'https://mit.edu', '2024-01-04 09:00:00', '2024-01-04 09:00:00'),
('inst_006', 'Stanford University', 'https://stanford.edu', '2024-01-04 09:00:00', '2024-01-04 09:00:00'),
('inst_007', 'University of Oxford', 'https://ox.ac.uk', '2024-01-04 09:00:00', '2024-01-04 09:00:00'),
('inst_008', 'University of Cambridge', 'https://cam.ac.uk', '2024-01-04 09:00:00', '2024-01-04 09:00:00'),
('inst_009', 'National University of Singapore', 'https://nus.edu.sg', '2024-01-04 09:00:00', '2024-01-04 09:00:00'),
('inst_010', 'University of Toronto', 'https://utoronto.ca', '2024-01-04 09:00:00', '2024-01-04 09:00:00'),
('inst_011', 'Technical University of Munich', 'https://tum.de', '2024-01-04 09:00:00', '2024-01-04 09:00:00'),
('inst_012', 'Seoul National University', 'https://snu.ac.kr', '2024-01-04 09:00:00', '2024-01-04 09:00:00'),
('inst_013', 'Tsinghua University', 'https://tsinghua.edu.cn', '2024-01-04 09:00:00', '2024-01-04 09:00:00'),
('inst_014', 'Indian Institute of Technology Bombay', 'https://iitb.ac.in', '2024-01-04 09:00:00', '2024-01-04 09:00:00'),
('inst_015', 'University of Melbourne', 'https://unimelb.edu.au', '2024-01-04 09:00:00', '2024-01-04 09:00:00'),
('inst_016', 'Shahjalal University of Science and Technology', 'https://sust.edu', '2024-01-04 09:00:00', '2024-01-04 09:00:00'),
('inst_017', 'Rajshahi University', NULL, '2024-01-04 09:00:00', '2024-01-04 09:00:00'), -- EDGE: NULL website
('inst_018', 'King Abdullah University of Science and Technology', 'https://kaust.edu.sa', '2024-01-04 09:00:00', '2024-01-04 09:00:00'),
('inst_019', 'Delft University of Technology', 'https://tudelft.nl', '2024-01-04 09:00:00', '2024-01-04 09:00:00'),
('inst_020', 'St. Xavier''s College', NULL, '2024-01-04 09:00:00', '2024-01-04 09:00:00'), -- EDGE: apostrophe in name
('inst_021', 'École Polytechnique', 'https://polytechnique.edu', '2024-01-04 09:00:00', '2024-01-04 09:00:00'), -- EDGE: unicode accent
('inst_022', 'Netrokona Government High School', NULL, '2024-01-04 09:00:00', '2024-01-04 09:00:00'),
('inst_023', 'Netrokona Government College', NULL, '2024-01-04 09:00:00', '2024-01-04 09:00:00');

-- ---------------------------------------------------------------------
-- profiles (22 rows)
-- Note: the "degree" enum has no dedicated "BSc" value, so CSE
-- bachelor's degrees are recorded as 'Other' in educations below.
-- ---------------------------------------------------------------------
INSERT INTO "profiles"
  ("id", "reg_no", "name", "batch", "session", "graduation_year", "photo", "bio", "gender", "blood_group",
   "email", "facebook", "github", "linkedin", "google_scholar", "portfolio",
   "present_address_id", "permanent_address_id", "visible", "created_at", "updated_at") VALUES
('prof_01', 'NU10CS01', 'Abdullah Al Mamun', 2010, '2010-11', 2015,
  'https://cdn.nu-alumni.org/photos/prof_01.jpg', 'Senior Software Engineer specializing in distributed systems.',
  'M', 'A+', 'mamun.cse10@example.com', NULL, 'https://github.com/amamun', 'https://linkedin.com/in/amamun', NULL, NULL,
  'addr_007', 'addr_002', true, '2024-02-01 10:00:00', '2026-08-01 10:00:00'),
('prof_02', 'NU10CS02', 'Farhana Akter', 2010, '2010-11', 2014,
  NULL, NULL, 'F', NULL, -- EDGE: NULL blood_group
  'farhana.akter@example.com', 'https://facebook.com/farhana.akter', NULL, NULL, NULL, NULL,
  NULL, 'addr_003', true, '2024-02-01 10:00:00', '2024-02-01 10:00:00'), -- EDGE: NULL present_address
('prof_03', 'NU11CS01', 'Rezaul Karim', 2011, '2011-12', 2016,
  'https://cdn.nu-alumni.org/photos/prof_03.jpg', 'Ph.D. researcher in Machine Learning.',
  'M', 'O-', NULL, NULL, 'https://github.com/rkarim', 'https://linkedin.com/in/rkarim', -- EDGE: NULL email
  'https://scholar.google.com/citations?user=rkarim', 'https://rkarim.dev',
  'addr_020', 'addr_004', true, '2024-02-01 10:00:00', '2026-05-15 10:00:00'),
('prof_04', 'NU11CS02', 'Tania Islam', 2011, '2011-12', 2016,
  NULL, NULL, 'F', 'AB+', 'tania.islam@example.com', NULL, NULL, NULL, NULL, NULL,
  NULL, NULL, false, '2024-02-01 10:00:00', '2024-02-01 10:00:00'), -- EDGE: both addresses NULL, hidden profile
('prof_05', 'NU12CS01', 'Shafiul Alam', 2012, '2012-13', 2017,
  NULL, 'Cloud infrastructure engineer at a fintech startup.', 'M', 'A-',
  'shafiul.alam@example.com', NULL, 'https://github.com/shafiul', 'https://linkedin.com/in/shafiul', NULL, NULL,
  'addr_010', 'addr_005', true, '2024-02-01 10:00:00', '2024-02-01 10:00:00'),
('prof_06', 'NU12CS02', 'Nusrat Jahan', 2012, '2012-13', 2016,
  NULL, NULL, 'F', 'B-', 'nusrat.jahan@example.com', 'https://facebook.com/nusrat.jahan', NULL, NULL, NULL, NULL,
  'addr_013', 'addr_006', true, '2024-02-01 10:00:00', '2024-02-01 10:00:00'),
('prof_07', 'NU13CS01', 'Kamal Hossain', 2013, '2013-14', NULL, -- EDGE: NULL graduation_year despite having an entry
  NULL, NULL, 'M', NULL, NULL, NULL, NULL, NULL, NULL, NULL,
  NULL, 'addr_001', true, '2024-02-01 10:00:00', '2024-02-01 10:00:00'),
('prof_08', 'NU13CS02', 'Sadia Rahman', 2013, '2013-14', 2018,
  NULL, NULL, 'F', 'O+', 'sadia.rahman@example.com', NULL, 'https://github.com/sadiar', 'https://linkedin.com/in/sadiar', NULL,
  'https://sadiar.dev', 'addr_017', 'addr_002', true, '2024-02-01 10:00:00', '2024-02-01 10:00:00'),
('prof_09', 'NU14CS01', 'Mostafa Kamal', 2014, '2014-15', 2019,
  NULL, NULL, 'M', 'AB-', 'mostafa.kamal@example.com', NULL, NULL, NULL, NULL, NULL,
  'addr_022', 'addr_003', true, '2024-02-01 10:00:00', '2024-02-01 10:00:00'),
('prof_10', 'NU14CS02', 'Rowshan Ara', 2014, '2014-15', 2019,
  NULL, NULL, 'F', 'A+', 'rowshan.ara@example.com', NULL, NULL, NULL, NULL, NULL,
  'addr_024', 'addr_004', true, '2024-02-01 10:00:00', '2024-02-01 10:00:00'),
('prof_11', 'NU15CS01', 'Jahid Hasan', 2015, '2015-16', 2020,
  NULL, 'Backend developer, ICPC regionalist.', 'M', 'O+',
  'jahid.hasan@example.com', NULL, NULL, NULL, NULL, NULL,
  'addr_011', 'addr_005', true, '2024-02-01 10:00:00', '2024-02-01 10:00:00'),
('prof_12', 'NU15CS02', 'Tanjina Sultana', 2015, '2015-16', 2020,
  NULL, NULL, 'F', 'B+', 'tanjina.sultana@example.com', NULL, NULL, NULL, NULL, NULL,
  'addr_014', 'addr_006', true, '2024-02-01 10:00:00', '2024-02-01 10:00:00'),
('prof_13', 'NU16CS01', 'Imran Chowdhury', 2016, '2016-17', 2021,
  NULL, NULL, 'M', 'A+', 'imran.chowdhury@example.com', NULL, NULL, NULL, NULL, NULL,
  'addr_015', 'addr_001', true, '2024-02-01 10:00:00', '2024-02-01 10:00:00'),
('prof_14', 'NU16CS02', 'D''Costa Anindo', 2016, '2016-17', 2021, -- EDGE: apostrophe in name
  NULL, NULL, 'M', 'B-', 'anindo.dcosta@example.com', NULL, NULL, NULL, NULL, NULL,
  'addr_016', 'addr_002', true, '2024-02-01 10:00:00', '2024-02-01 10:00:00'),
('prof_15', 'NU17CS01', 'Mehedi Hasan', 2017, '2017-18', 2022,
  NULL, NULL, 'M', 'O-', 'mehedi.hasan@example.com', NULL, NULL, NULL, NULL, NULL,
  'addr_018', 'addr_003', true, '2024-02-01 10:00:00', '2024-02-01 10:00:00'),
('prof_16', 'NU17CS02', 'Afsana Mimi', 2017, '2017-18', 2022,
  NULL, NULL, 'F', 'AB+', 'afsana.mimi@example.com', NULL, NULL, NULL, NULL, NULL,
  'addr_019', 'addr_004', true, '2024-02-01 10:00:00', '2024-02-01 10:00:00'),
('prof_17', 'NU18CS01', 'Rakibul Islam', 2018, '2018-19', 2023,
  NULL, NULL, 'M', 'A-', 'rakibul.islam@example.com', NULL, NULL, NULL, NULL, NULL,
  'addr_025', 'addr_005', true, '2024-02-01 10:00:00', '2024-02-01 10:00:00'),
('prof_18', 'NU18CS02', 'Sumaiya Binte Karim', 2018, '2018-19', 2023,
  NULL, NULL, 'F', 'B+', 'sumaiya.karim@example.com', NULL, NULL, NULL, NULL, NULL,
  'addr_023', 'addr_006', true, '2024-02-01 10:00:00', '2024-02-01 10:00:00'),
('prof_19', 'NU19CS001', 'Tariqul Islam', 2019, '2019-20', NULL, -- EDGE: 9-char reg_no (varchar(9) boundary), currently enrolled
  NULL, NULL, 'M', 'O+', 'tariqul.islam@example.com', NULL, NULL, NULL, NULL, NULL,
  'addr_001', 'addr_001', true, '2024-02-01 10:00:00', '2024-02-01 10:00:00'),
('prof_20', 'NU19CS02', 'Promi Akter', 2019, '2019-20', NULL,
  NULL, NULL, 'F', NULL, NULL, NULL, NULL, NULL, NULL, NULL,
  NULL, NULL, true, '2024-02-01 10:00:00', '2024-02-01 10:00:00'), -- EDGE: current student, almost everything NULL
('prof_21', 'NU20CS01', 'Zubayer Ahmed', 2020, '2020-21', NULL,
  NULL, NULL, 'M', 'AB-', 'zubayer.ahmed@example.com', NULL, NULL, NULL, NULL, NULL,
  'addr_001', 'addr_002', true, '2024-02-01 10:00:00', '2024-02-01 10:00:00'),
('prof_22', 'NU21CS01', 'Antara Chowdhury', 2021, '2021-22', NULL,
  NULL, NULL, 'F', 'A+', 'antara.chowdhury@example.com', NULL, NULL, NULL, NULL, NULL,
  NULL, 'addr_002', false, '2024-02-01 10:00:00', '2024-02-01 10:00:00'); -- EDGE: visible=false, privacy opt-out

-- ---------------------------------------------------------------------
-- "user" (8 rows) -- FK anchors only; see SCOPE NOTE above
-- ---------------------------------------------------------------------
INSERT INTO "user" ("id", "profile_id", "name", "email", "emailVerified", "image", "createdAt", "updatedAt") VALUES
('user_01', 'prof_01', 'Abdullah Al Mamun', 'operator01@nu-alumni.org', true, NULL, '2024-01-05 08:00:00', '2024-01-05 08:00:00'),
('user_02', 'prof_05', 'Shafiul Alam', 'operator02@nu-alumni.org', true, 'https://cdn.nu-alumni.org/avatars/user_02.jpg', '2024-01-05 08:00:00', '2024-01-05 08:00:00'),
('user_03', 'prof_03', 'Rezaul Karim', 'operator03@nu-alumni.org', true, NULL, '2024-01-05 08:00:00', '2025-03-10 11:00:00'),
('user_04', 'prof_08', 'Sadia Rahman', 'operator04@nu-alumni.org', false, NULL, '2024-01-05 08:00:00', '2024-01-05 08:00:00'), -- EDGE: unverified email
('user_05', 'prof_11', 'Jahid Hasan', 'operator05@nu-alumni.org', true, NULL, '2024-01-05 08:00:00', '2024-01-05 08:00:00'),
('user_06', 'prof_13', 'Imran Chowdhury', 'operator06@nu-alumni.org', true, NULL, '2024-01-05 08:00:00', '2024-01-05 08:00:00'),
('user_07', 'prof_15', 'Mehedi Hasan', 'operator07@nu-alumni.org', true, NULL, '2024-01-05 08:00:00', '2024-01-05 08:00:00'),
('user_08', 'prof_17', 'Rakibul Islam', 'operator08@nu-alumni.org', true, NULL, '2024-01-05 08:00:00', '2024-01-05 08:00:00');

-- ---------------------------------------------------------------------
-- educations (27 rows) -- every "degree" enum value used at least once
-- ---------------------------------------------------------------------
INSERT INTO "educations" ("id", "student_id", "institution_id", "degree", "field", "graduation_year", "created_at", "updated_at") VALUES
('edu_01', 'prof_01', 'inst_001', 'Other', 'BSc in Computer Science and Engineering', 2015, '2024-03-01 09:00:00', '2024-03-01 09:00:00'),
('edu_02', 'prof_01', 'inst_005', 'MSc', 'Computer Science', 2017, '2024-03-01 09:00:00', '2024-03-01 09:00:00'),
('edu_03', 'prof_02', 'inst_001', 'Other', 'BSc in CSE', 2014, '2024-03-01 09:00:00', '2024-03-01 09:00:00'),
('edu_04', 'prof_03', 'inst_001', 'Other', 'BSc in CSE', 2016, '2024-03-01 09:00:00', '2024-03-01 09:00:00'),
('edu_05', 'prof_03', 'inst_006', 'PhD', 'Machine Learning', 2021, '2024-03-01 09:00:00', '2024-03-01 09:00:00'),
('edu_06', 'prof_04', 'inst_001', 'Other', NULL, 2016, '2024-03-01 09:00:00', '2024-03-01 09:00:00'), -- EDGE: NULL field
('edu_07', 'prof_05', 'inst_001', 'Other', 'BSc in CSE', 2017, '2024-03-01 09:00:00', '2024-03-01 09:00:00'),
('edu_08', 'prof_06', 'inst_001', 'Other', 'BSc in CSE', 2016, '2024-03-01 09:00:00', '2024-03-01 09:00:00'),
('edu_09', 'prof_07', 'inst_001', 'Other', 'BSc in CSE', NULL, '2024-03-01 09:00:00', '2024-03-01 09:00:00'), -- EDGE: NULL graduation_year
('edu_10', 'prof_08', 'inst_001', 'Other', 'BSc in CSE', 2018, '2024-03-01 09:00:00', '2024-03-01 09:00:00'),
('edu_11', 'prof_08', 'inst_009', 'MBA', 'Technology Management', 2021, '2024-03-01 09:00:00', '2024-03-01 09:00:00'),
('edu_12', 'prof_09', 'inst_001', 'Other', 'BSc in CSE', 2019, '2024-03-01 09:00:00', '2024-03-01 09:00:00'),
('edu_13', 'prof_10', 'inst_001', 'Other', 'BSc in CSE', 2019, '2024-03-01 09:00:00', '2024-03-01 09:00:00'),
('edu_14', 'prof_11', 'inst_001', 'Other', 'BSc in CSE', 2020, '2024-03-01 09:00:00', '2024-03-01 09:00:00'),
('edu_15', 'prof_12', 'inst_001', 'Other', 'BSc in CSE', 2020, '2024-03-01 09:00:00', '2024-03-01 09:00:00'),
('edu_16', 'prof_13', 'inst_001', 'Other', 'BSc in CSE', 2021, '2024-03-01 09:00:00', '2024-03-01 09:00:00'),
('edu_17', 'prof_14', 'inst_001', 'Other', 'BSc in CSE', 2021, '2024-03-01 09:00:00', '2024-03-01 09:00:00'),
('edu_18', 'prof_15', 'inst_001', 'Other', 'BSc in CSE', 2022, '2024-03-01 09:00:00', '2024-03-01 09:00:00'),
('edu_19', 'prof_16', 'inst_001', 'Other', 'BSc in CSE', 2022, '2024-03-01 09:00:00', '2024-03-01 09:00:00'),
('edu_20', 'prof_17', 'inst_001', 'Other', 'BSc in CSE', 2023, '2024-03-01 09:00:00', '2024-03-01 09:00:00'),
('edu_21', 'prof_18', 'inst_001', 'Other', 'BSc in CSE', 2023, '2024-03-01 09:00:00', '2024-03-01 09:00:00'),
('edu_22', 'prof_19', 'inst_001', 'Other', 'BSc in CSE', NULL, '2024-03-01 09:00:00', '2024-03-01 09:00:00'), -- EDGE: still enrolled
('edu_23', 'prof_20', 'inst_001', 'Other', 'BSc in CSE', NULL, '2024-03-01 09:00:00', '2024-03-01 09:00:00'), -- EDGE: still enrolled
('edu_24', 'prof_01', 'inst_022', 'SSC', 'Science', 2007, '2024-03-01 09:00:00', '2024-03-01 09:00:00'), -- EDGE: 3rd education row, same student
('edu_25', 'prof_01', 'inst_023', 'HSC', 'Science', 2009, '2024-03-01 09:00:00', '2024-03-01 09:00:00'),
('edu_26', 'prof_11', 'inst_010', 'MPhil', 'Software Engineering', 2023, '2024-03-01 09:00:00', '2024-03-01 09:00:00'),
('edu_27', 'prof_03', 'inst_006', 'Postdoc', 'Machine Learning', NULL, '2024-03-01 09:00:00', '2024-03-01 09:00:00'); -- EDGE: ongoing postdoc, NULL graduation_year

-- ---------------------------------------------------------------------
-- work_experiences (28 rows) -- every "employment_type" enum value used
-- ---------------------------------------------------------------------
INSERT INTO "work_experiences" ("id", "student_id", "company_id", "career_field", "title", "employment_type", "start_date", "end_date", "created_at", "updated_at") VALUES
('we_01', 'prof_01', 'comp_001', 'Backend Engineering', 'Software Engineer II', 'Full-time', '2015-08-01', '2018-12-31', '2024-04-01 09:00:00', '2024-04-01 09:00:00'),
('we_02', 'prof_01', 'comp_006', 'Cloud Infrastructure', 'Senior Software Engineer', 'Full-time', '2019-01-15', NULL, '2024-04-01 09:00:00', '2024-04-01 09:00:00'), -- EDGE: NULL end_date, current job
('we_03', 'prof_02', 'comp_014', 'Academia', 'Lecturer', 'Full-time', '2014-09-01', '2020-06-30', '2024-04-01 09:00:00', '2024-04-01 09:00:00'),
('we_04', 'prof_03', 'comp_003', 'ML Research', 'Research Scientist', 'Full-time', '2021-09-01', NULL, '2024-04-01 09:00:00', '2024-04-01 09:00:00'),
('we_05', 'prof_04', 'comp_019', NULL, 'Product Intern', 'Internship', '2016-05-01', '2016-08-31', '2024-04-01 09:00:00', '2024-04-01 09:00:00'), -- EDGE: NULL career_field
('we_06', 'prof_05', 'comp_006', 'DevOps', 'Cloud Engineer', 'Full-time', '2017-07-01', '2020-03-31', '2024-04-01 09:00:00', '2024-04-01 09:00:00'),
('we_07', 'prof_05', 'comp_012', 'Fintech Infra', 'Senior Cloud Engineer', 'Full-time', '2020-04-01', NULL, '2024-04-01 09:00:00', '2024-04-01 09:00:00'),
('we_08', 'prof_06', 'comp_010', 'Telecom Ops', 'Network Engineer', 'Full-time', '2016-07-01', NULL, '2024-04-01 09:00:00', '2024-04-01 09:00:00'),
('we_09', 'prof_07', 'comp_021', NULL, 'Freelance Web Developer', 'Freelance', '2018-01-01', NULL, '2024-04-01 09:00:00', '2024-04-01 09:00:00'),
('we_10', 'prof_08', 'comp_009', 'Embedded Systems', 'Firmware Engineer', 'Full-time', '2018-09-01', '2021-05-31', '2024-04-01 09:00:00', '2024-04-01 09:00:00'),
('we_11', 'prof_08', 'comp_004', 'Blockchain', 'Protocol Engineer', 'Contract', '2021-06-01', NULL, '2024-04-01 09:00:00', '2024-04-01 09:00:00'),
('we_12', 'prof_09', 'comp_013', 'E-commerce Platform', 'Software Engineer', 'Full-time', '2019-08-01', NULL, '2024-04-01 09:00:00', '2024-04-01 09:00:00'),
('we_13', 'prof_10', 'comp_014', 'Academia', 'Teaching Assistant', 'Teaching Assistantship', '2019-09-01', '2020-01-31', '2024-04-01 09:00:00', '2024-04-01 09:00:00'),
('we_14', 'prof_10', 'comp_017', 'HealthTech', 'Software Developer', 'Full-time', '2020-02-01', NULL, '2024-04-01 09:00:00', '2024-04-01 09:00:00'),
('we_15', 'prof_11', 'comp_011', 'Fintech Backend', 'Backend Developer', 'Full-time', '2020-07-01', NULL, '2024-04-01 09:00:00', '2024-04-01 09:00:00'),
('we_16', 'prof_12', 'comp_007', 'Game Backend', 'Software Engineer', 'Full-time', '2020-09-01', NULL, '2024-04-01 09:00:00', '2024-04-01 09:00:00'),
('we_17', 'prof_13', 'comp_008', 'Robotics Software', 'Robotics Engineer', 'Full-time', '2021-07-01', NULL, '2024-04-01 09:00:00', '2024-04-01 09:00:00'),
('we_18', 'prof_14', 'comp_005', 'Security Research', 'Security Analyst', 'Full-time', '2021-08-01', NULL, '2024-04-01 09:00:00', '2024-04-01 09:00:00'),
('we_19', 'prof_15', 'comp_002', 'Cloud Services', 'Software Engineer', 'Full-time', '2022-08-01', NULL, '2024-04-01 09:00:00', '2024-04-01 09:00:00'),
('we_20', 'prof_16', 'comp_018', 'Tech Consulting', 'Business Analyst', 'Full-time', '2022-09-01', NULL, '2024-04-01 09:00:00', '2024-04-01 09:00:00'),
('we_21', 'prof_17', 'comp_020', 'IoT Manufacturing', 'Embedded Software Engineer', 'Full-time', '2023-07-01', NULL, '2024-04-01 09:00:00', '2024-04-01 09:00:00'),
('we_22', 'prof_18', 'comp_022', 'Technical Publishing', 'Content Engineer', 'Part-time', '2023-09-01', NULL, '2024-04-01 09:00:00', '2024-04-01 09:00:00'),
('we_23', 'prof_09', 'comp_015', 'Research Software', 'Research Assistant', 'Research Assistantship', '2019-01-01', '2019-07-31', '2024-04-01 09:00:00', '2024-04-01 09:00:00'), -- EDGE: 2nd job for prof_09, predates we_12
('we_24', 'prof_04', 'comp_001', NULL, 'Volunteer Mentor', 'Volunteer', '2022-01-01', '2022-12-31', '2024-04-01 09:00:00', '2024-04-01 09:00:00'),
('we_25', 'prof_06', 'comp_016', 'Public Sector IT', 'IT Consultant', 'Self-employed', '2021-01-01', NULL, '2024-04-01 09:00:00', '2024-04-01 09:00:00'),
('we_26', 'prof_02', 'comp_021', NULL, 'Curriculum Developer', 'Temporary', '2015-01-01', '2015-06-30', '2024-04-01 09:00:00', '2024-04-01 09:00:00'),
('we_27', 'prof_07', 'comp_009', NULL, 'Trainee Engineer', 'Apprenticeship', '2017-06-01', '2017-12-31', '2024-04-01 09:00:00', '2024-04-01 09:00:00'),
('we_28', 'prof_03', 'comp_017', NULL, 'Independent Advisor', 'Other', '2022-01-01', NULL, '2024-04-01 09:00:00', '2024-04-01 09:00:00');

-- ---------------------------------------------------------------------
-- publications (22 rows) -- every publication_type & publication_status used
-- ---------------------------------------------------------------------
INSERT INTO "publications" ("id", "title", "abstract", "type", "venue", "doi", "external_url", "published_year", "status", "added_by_id", "created_at", "updated_at") VALUES
('pub_01', 'Efficient Graph Algorithms for Sparse Networks', 'We propose a family of algorithms optimized for sparse graph structures.', 'JOURNAL', 'IEEE Transactions on Networks', '10.1109/TNET.2021.001', 'https://doi.org/10.1109/TNET.2021.001', 2021, 'PUBLISHED', 'user_01', '2024-05-01 09:00:00', '2024-05-01 09:00:00'),
('pub_02', 'A Survey of Transformer Architectures', NULL, 'CONFERENCE', 'NeurIPS Workshop', NULL, 'https://arxiv.org/abs/2101.00001', 2021, 'PUBLISHED', 'user_02', '2024-05-01 09:00:00', '2024-05-01 09:00:00'),
('pub_03', 'Optimizing TSP Heuristics for Regional Road Networks', 'This paper explores heuristic approximations for regional tour planning.', 'CONFERENCE', 'ICCIT 2023', '10.1109/ICCIT.2023.045', NULL, 2023, 'PUBLISHED', 'user_03', '2024-05-01 09:00:00', '2024-05-01 09:00:00'),
('pub_04', 'Federated Learning under Non-IID Data: A Case Study', NULL, 'JOURNAL', NULL, NULL, NULL, NULL, 'UNDER_REVIEW', 'user_03', '2024-05-01 09:00:00', '2024-05-01 09:00:00'), -- EDGE: venue/doi/url/year all NULL
('pub_05', 'Blockchain-based Academic Credential Verification', 'We design a system for tamper-proof credential issuance.', 'BOOK_CHAPTER', 'Springer Blockchain Applications', '10.1007/978-3-030-00000-1_5', NULL, 2022, 'PUBLISHED', 'user_04', '2024-05-01 09:00:00', '2024-05-01 09:00:00'),
('pub_06', 'A Lightweight IoT Protocol for Embedded Sensor Networks', NULL, 'THESIS', 'Netrokona University', NULL, NULL, 2018, 'PUBLISHED', 'user_04', '2024-05-01 09:00:00', '2024-05-01 09:00:00'),
('pub_07', 'Draft: Explainable AI in Healthcare Diagnostics', NULL, 'JOURNAL', NULL, NULL, NULL, NULL, 'DRAFT', 'user_05', '2024-05-01 09:00:00', '2024-05-01 09:00:00'), -- EDGE: minimal draft record
('pub_08', 'Improving ICPC Training Pipelines: A Bangladeshi Perspective', 'We share our experience building a national training pipeline.', 'CONFERENCE', 'BdPC 2020', NULL, 'https://bdpc.example.org/2020/papers/12', 2020, 'PUBLISHED', 'user_01', '2024-05-01 09:00:00', '2024-05-01 09:00:00'),
('pub_09', 'Security Analysis of Mobile Financial Services in South Asia', NULL, 'JOURNAL', 'Journal of Cybersecurity Practice', '10.1000/jcp.2022.0099', NULL, 2022, 'PUBLISHED', 'user_06', '2024-05-01 09:00:00', '2024-05-01 09:00:00'),
('pub_10', 'Quantum-Resistant Signatures for IoT', NULL, 'CONFERENCE', 'CryptoCon 2023', NULL, NULL, 2023, 'REJECTED', 'user_06', '2024-05-01 09:00:00', '2024-05-01 09:00:00'),
('pub_11', 'A Comparative Study of Approximation Algorithms for the Traveling Salesman Problem', 'Extended version of our ICCIT paper with additional benchmarks.', 'JOURNAL', 'Journal of Combinatorial Optimization', '10.1007/s10878-024-00012-3', NULL, 2024, 'SUBMITTED', 'user_03', '2024-05-01 09:00:00', '2024-05-01 09:00:00'),
('pub_12', 'Robotics-Assisted Warehouse Automation: A Field Study', NULL, 'CONFERENCE', 'ICRA 2022', '10.1109/ICRA.2022.0456', NULL, 2022, 'PUBLISHED', 'user_07', '2024-05-01 09:00:00', '2024-05-01 09:00:00'),
('pub_13', 'Cloud Cost Optimization Strategies for Fintech Startups', NULL, 'OTHER', 'Company Whitepaper', NULL, NULL, 2021, 'PUBLISHED', 'user_02', '2024-05-01 09:00:00', '2024-05-01 09:00:00'),
('pub_14', 'Machine Learning Approaches to Crop Yield Prediction in Bangladesh', 'We evaluate several ML models against historical yield data.', 'JOURNAL', 'Agricultural Informatics Review', '10.1016/j.air.2020.100112', NULL, 2020, 'PUBLISHED', 'user_08', '2024-05-01 09:00:00', '2024-05-01 09:00:00'),
('pub_15', 'Scalable Consensus for Permissioned Blockchains', NULL, 'JOURNAL', NULL, NULL, NULL, NULL, 'UNDER_REVIEW', 'user_04', '2024-05-01 09:00:00', '2024-05-01 09:00:00'),
('pub_16', 'Undergraduate Thesis: A Cost-Optimized Tour Planner over Bangladesh District Graphs', 'A TSP-inspired planner over a weighted graph of 64 districts.', 'THESIS', 'Netrokona University', NULL, NULL, 2024, 'SUBMITTED', 'user_05', '2024-05-01 09:00:00', '2024-05-01 09:00:00'),
('pub_17', 'Natural Language Processing for Bangla Sentiment Analysis', NULL, 'CONFERENCE', 'ICCIT 2021', '10.1109/ICCIT.2021.078', NULL, 2021, 'PUBLISHED', 'user_01', '2024-05-01 09:00:00', '2024-05-01 09:00:00'),
('pub_18', 'Draft: A Restaurant Management System with Real-Time Order Tracking', NULL, 'OTHER', NULL, NULL, NULL, NULL, 'DRAFT', 'user_05', '2024-05-01 09:00:00', '2024-05-01 09:00:00'),
('pub_19', 'Energy-Efficient Routing Protocols for Wireless Sensor Networks', NULL, 'JOURNAL', 'Elsevier Ad Hoc Networks', '10.1016/j.adhoc.2019.02.003', NULL, 2019, 'PUBLISHED', 'user_04', '2024-05-01 09:00:00', '2024-05-01 09:00:00'),
('pub_20', 'Book Chapter: Fintech Adoption Patterns in South Asia', NULL, 'BOOK_CHAPTER', 'Routledge Fintech Series', NULL, NULL, 2023, 'PUBLISHED', 'user_06', '2024-05-01 09:00:00', '2024-05-01 09:00:00'),
('pub_21', 'Extremely Long Title Edge Case: An Exhaustive Empirical Investigation into the Comparative Performance Characteristics of Modern Approximation Heuristics Applied to Large-Scale Combinatorial Optimization Problems in Resource-Constrained Environments', NULL, 'OTHER', NULL, NULL, NULL, NULL, 'DRAFT', 'user_03', '2024-05-01 09:00:00', '2024-05-01 09:00:00'), -- EDGE: very long "text" title, stress-tests unbounded column
('pub_22', 'Reprinted Conference Paper with External DOI Reference', NULL, 'CONFERENCE', 'Local Symposium', '10.9999/local.2020.001', 'https://zenodo.org/record/1234567', 2020, 'PUBLISHED', 'user_07', '2024-05-01 09:00:00', '2024-05-01 09:00:00');

-- ---------------------------------------------------------------------
-- publication_authors (34 rows) -- PK is (publication_id, author_order);
-- either student_id or external_name is set per co-author row.
-- ---------------------------------------------------------------------
INSERT INTO "publication_authors" ("publication_id", "student_id", "author_order", "external_name", "created_at", "updated_at") VALUES
('pub_01', 'prof_01', 1, NULL, '2024-05-02 09:00:00', '2024-05-02 09:00:00'),
('pub_01', NULL, 2, 'Dr. Jane Smith', '2024-05-02 09:00:00', '2024-05-02 09:00:00'), -- EDGE: NULL student_id, external co-author
('pub_02', 'prof_05', 1, NULL, '2024-05-02 09:00:00', '2024-05-02 09:00:00'),
('pub_02', NULL, 2, 'Prof. John Doe', '2024-05-02 09:00:00', '2024-05-02 09:00:00'),
('pub_03', 'prof_19', 1, NULL, '2024-05-02 09:00:00', '2024-05-02 09:00:00'),
('pub_03', 'prof_20', 2, NULL, '2024-05-02 09:00:00', '2024-05-02 09:00:00'),
('pub_03', 'prof_03', 3, NULL, '2024-05-02 09:00:00', '2024-05-02 09:00:00'), -- EDGE: 3-author paper
('pub_04', 'prof_03', 1, NULL, '2024-05-02 09:00:00', '2024-05-02 09:00:00'),
('pub_04', NULL, 2, 'Dr. Wei Zhang', '2024-05-02 09:00:00', '2024-05-02 09:00:00'),
('pub_05', 'prof_08', 1, NULL, '2024-05-02 09:00:00', '2024-05-02 09:00:00'),
('pub_06', 'prof_08', 1, NULL, '2024-05-02 09:00:00', '2024-05-02 09:00:00'), -- sole-author thesis
('pub_07', NULL, 1, 'Anonymous Contributor', '2024-05-02 09:00:00', '2024-05-02 09:00:00'), -- EDGE: fully external, no platform student author
('pub_08', 'prof_01', 1, NULL, '2024-05-02 09:00:00', '2024-05-02 09:00:00'),
('pub_08', 'prof_11', 2, NULL, '2024-05-02 09:00:00', '2024-05-02 09:00:00'),
('pub_09', 'prof_10', 1, NULL, '2024-05-02 09:00:00', '2024-05-02 09:00:00'),
('pub_09', NULL, 2, 'Dr. Aisha Rahman', '2024-05-02 09:00:00', '2024-05-02 09:00:00'),
('pub_10', 'prof_10', 1, NULL, '2024-05-02 09:00:00', '2024-05-02 09:00:00'),
('pub_11', 'prof_03', 1, NULL, '2024-05-02 09:00:00', '2024-05-02 09:00:00'),
('pub_11', 'prof_19', 2, NULL, '2024-05-02 09:00:00', '2024-05-02 09:00:00'),
('pub_11', 'prof_20', 3, NULL, '2024-05-02 09:00:00', '2024-05-02 09:00:00'),
('pub_12', 'prof_13', 1, NULL, '2024-05-02 09:00:00', '2024-05-02 09:00:00'),
('pub_13', 'prof_05', 1, NULL, '2024-05-02 09:00:00', '2024-05-02 09:00:00'),
('pub_14', 'prof_17', 1, NULL, '2024-05-02 09:00:00', '2024-05-02 09:00:00'),
('pub_14', NULL, 2, 'Md. Iqbal Hossain', '2024-05-02 09:00:00', '2024-05-02 09:00:00'),
('pub_15', 'prof_08', 1, NULL, '2024-05-02 09:00:00', '2024-05-02 09:00:00'),
('pub_16', 'prof_21', 1, NULL, '2024-05-02 09:00:00', '2024-05-02 09:00:00'),
('pub_16', 'prof_22', 2, NULL, '2024-05-02 09:00:00', '2024-05-02 09:00:00'),
('pub_17', 'prof_02', 1, NULL, '2024-05-02 09:00:00', '2024-05-02 09:00:00'),
('pub_18', 'prof_21', 1, NULL, '2024-05-02 09:00:00', '2024-05-02 09:00:00'),
('pub_19', 'prof_08', 1, NULL, '2024-05-02 09:00:00', '2024-05-02 09:00:00'),
('pub_20', 'prof_12', 1, NULL, '2024-05-02 09:00:00', '2024-05-02 09:00:00'),
('pub_21', 'prof_03', 1, NULL, '2024-05-02 09:00:00', '2024-05-02 09:00:00'),
('pub_22', 'prof_09', 1, NULL, '2024-05-02 09:00:00', '2024-05-02 09:00:00'),
('pub_22', NULL, 2, 'International Symposium Committee', '2024-05-02 09:00:00', '2024-05-02 09:00:00');

-- ---------------------------------------------------------------------
-- permissions (22 rows) -- every permission_category value used
-- ---------------------------------------------------------------------
INSERT INTO "permissions" ("id", "key", "description", "category") VALUES
('perm_01', 'system.settings.manage', 'Manage global system settings', 'System'),
('perm_02', 'system.audit_log.view', 'View system audit logs', 'System'),
('perm_03', 'users.create', 'Create new user accounts', 'User Management'),
('perm_04', 'users.delete', 'Delete user accounts', 'User Management'),
('perm_05', 'users.role.assign', 'Assign roles to users', 'User Management'),
('perm_06', 'profile.edit.own', 'Edit own alumni profile', 'Profile'),
('perm_07', 'profile.edit.any', 'Edit any alumni profile', 'Profile'),
('perm_08', 'profile.visibility.toggle', NULL, 'Profile'), -- EDGE: NULL description
('perm_09', 'profile.verify', 'Verify a submitted alumni profile', 'Profile'),
('perm_10', 'notifications.create', 'Create site notifications', 'Notifications'),
('perm_11', 'notifications.delete', 'Delete site notifications', 'Notifications'),
('perm_12', 'notifications.publish', 'Publish scheduled notifications', 'Notifications'),
('perm_13', 'publications.create', 'Add a new publication record', 'Publications'),
('perm_14', 'publications.edit', 'Edit an existing publication record', 'Publications'),
('perm_15', 'publications.review', 'Review submitted publications', 'Publications'),
('perm_16', 'publications.delete', 'Delete a publication record', 'Publications'),
('perm_17', 'export.data', 'Export alumni directory data', 'Other'),
('perm_18', 'reports.generate', 'Generate statistical reports', 'Other'),
('perm_19', 'system.backup.trigger', 'Trigger a manual database backup', 'System'),
('perm_20', 'users.impersonate', 'Impersonate another user account for support', 'User Management'),
('perm_21', 'profile.education.manage', 'Manage education records on any profile', 'Profile'),
('perm_22', 'profile.work_experience.manage', 'Manage work experience records on any profile', 'Profile');

-- ---------------------------------------------------------------------
-- permission_groups (20 rows)
-- ---------------------------------------------------------------------
INSERT INTO "permission_groups" ("id", "name", "description") VALUES
('pg_01', 'Super Admin', 'Full unrestricted access to every part of the platform'),
('pg_02', 'Administrator', 'Manage users, content and site-wide settings'),
('pg_03', 'Moderator', 'Review and moderate submitted alumni content'),
('pg_04', 'Content Editor', 'Create and edit publications and notifications'),
('pg_05', 'Publication Reviewer', 'Review and approve publication submissions'),
('pg_06', 'Alumni Verified', 'Verified alumni with full profile access'),
('pg_07', 'Alumni Unverified', 'Newly registered alumni pending verification'),
('pg_08', 'Current Student', 'Currently enrolled student with limited access'),
('pg_09', 'Club Executive - NEUPC', 'Programming club executive committee member'),
('pg_10', 'Club Executive - NEUCC', 'Computer club executive committee member'),
('pg_11', 'Read Only Viewer', 'View-only access with no edit permissions'),
('pg_12', 'Support Staff', 'Handles user support requests and impersonation'),
('pg_13', 'Data Analyst', 'Access to reports and data export tools'),
('pg_14', 'Notification Manager', 'Manages site-wide notifications and announcements'),
('pg_15', 'Profile Curator', 'Curates and verifies alumni profile submissions'),
('pg_16', 'Backup Operator', 'Handles scheduled and manual database backups'),
('pg_17', 'Guest', 'Unauthenticated or minimal-access guest role'),
('pg_18', 'Department Faculty', 'CSE department faculty member account'),
('pg_19', 'External Collaborator', 'External partner with restricted, scoped access'),
('pg_20', 'Legacy Migration Bot', 'System service account used for historical data imports');

-- ---------------------------------------------------------------------
-- permission_group_items (31 rows) -- composite PK (group_id, permission_id)
-- ---------------------------------------------------------------------
INSERT INTO "permission_group_items" ("group_id", "permission_id") VALUES
('pg_01', 'perm_01'), ('pg_01', 'perm_02'), ('pg_01', 'perm_03'), ('pg_01', 'perm_04'), ('pg_01', 'perm_05'), ('pg_01', 'perm_19'),
('pg_02', 'perm_03'), ('pg_02', 'perm_06'), ('pg_02', 'perm_07'), ('pg_02', 'perm_10'), ('pg_02', 'perm_13'), ('pg_02', 'perm_17'),
('pg_03', 'perm_07'), ('pg_03', 'perm_09'), ('pg_03', 'perm_15'),
('pg_04', 'perm_13'), ('pg_04', 'perm_14'), ('pg_04', 'perm_10'),
('pg_05', 'perm_15'), ('pg_05', 'perm_16'),
('pg_06', 'perm_06'),
('pg_14', 'perm_10'), ('pg_14', 'perm_11'), ('pg_14', 'perm_12'),
('pg_12', 'perm_20'),
('pg_13', 'perm_17'), ('pg_13', 'perm_18'),
('pg_16', 'perm_19'),
('pg_15', 'perm_09'), ('pg_15', 'perm_21'), ('pg_15', 'perm_22');

-- ---------------------------------------------------------------------
-- user_permissions (24 rows)
-- ---------------------------------------------------------------------
INSERT INTO "user_permissions" ("id", "user_id", "permission_id", "granted_by_id", "granted_at", "expire_at") VALUES
('up_01', 'user_01', 'perm_01', NULL, '2023-01-01 00:00:00', NULL), -- EDGE: NULL granted_by (bootstrap grant)
('up_02', 'user_01', 'perm_19', 'user_01', '2023-01-01 00:00:00', NULL), -- EDGE: self-granted
('up_03', 'user_02', 'perm_13', 'user_01', '2024-01-06 10:00:00', NULL),
('up_04', 'user_02', 'perm_14', 'user_01', '2024-01-06 10:00:00', NULL),
('up_05', 'user_03', 'perm_15', 'user_01', '2024-01-06 10:00:00', '2025-12-31 23:59:59'), -- EDGE: future expiry
('up_06', 'user_03', 'perm_09', 'user_02', '2024-01-06 10:00:00', NULL),
('up_07', 'user_04', 'perm_16', 'user_01', '2024-01-06 10:00:00', NULL),
('up_08', 'user_04', 'perm_13', 'user_01', '2024-01-06 10:00:00', NULL),
('up_09', 'user_05', 'perm_10', 'user_02', '2024-01-06 10:00:00', NULL),
('up_10', 'user_05', 'perm_11', 'user_02', '2024-01-06 10:00:00', '2024-06-30 23:59:59'), -- EDGE: already-expired grant
('up_11', 'user_06', 'perm_17', 'user_01', '2024-01-06 10:00:00', NULL),
('up_12', 'user_06', 'perm_18', 'user_01', '2024-01-06 10:00:00', NULL),
('up_13', 'user_07', 'perm_20', NULL, '2024-01-06 10:00:00', NULL),
('up_14', 'user_08', 'perm_06', 'user_02', '2024-01-06 10:00:00', NULL),
('up_15', 'user_08', 'perm_21', 'user_02', '2024-01-06 10:00:00', NULL),
('up_16', 'user_01', 'perm_02', NULL, '2023-01-01 00:00:00', NULL),
('up_17', 'user_02', 'perm_05', 'user_01', '2024-01-06 10:00:00', NULL),
('up_18', 'user_03', 'perm_22', 'user_02', '2024-01-06 10:00:00', NULL),
('up_19', 'user_04', 'perm_07', 'user_01', '2024-01-06 10:00:00', NULL),
('up_20', 'user_05', 'perm_12', 'user_02', '2024-01-06 10:00:00', NULL),
('up_21', 'user_06', 'perm_04', 'user_01', '2024-01-06 10:00:00', '2025-01-01 00:00:00'),
('up_22', 'user_07', 'perm_03', 'user_01', '2024-01-06 10:00:00', NULL),
('up_23', 'user_08', 'perm_08', NULL, '2024-01-06 10:00:00', NULL),
('up_24', 'user_01', 'perm_09', 'user_01', '2023-01-01 00:00:00', NULL);

-- ---------------------------------------------------------------------
-- user_permission_groups (23 rows) -- composite PK (user_id, group_id)
-- ---------------------------------------------------------------------
INSERT INTO "user_permission_groups" ("user_id", "group_id", "granted_at") VALUES
('user_01', 'pg_01', '2023-01-01 00:00:00'),
('user_01', 'pg_02', '2023-01-01 00:00:00'),
('user_01', 'pg_17', '2023-01-01 00:00:00'),
('user_02', 'pg_02', '2024-01-06 10:00:00'),
('user_02', 'pg_04', '2024-01-06 10:00:00'),
('user_02', 'pg_18', '2024-01-06 10:00:00'),
('user_03', 'pg_05', '2024-01-06 10:00:00'),
('user_03', 'pg_15', '2024-01-06 10:00:00'),
('user_03', 'pg_03', '2024-01-06 10:00:00'),
('user_04', 'pg_04', '2024-01-06 10:00:00'),
('user_04', 'pg_09', '2024-01-06 10:00:00'),
('user_04', 'pg_06', '2024-01-06 10:00:00'),
('user_05', 'pg_14', '2024-01-06 10:00:00'),
('user_05', 'pg_10', '2024-01-06 10:00:00'),
('user_05', 'pg_06', '2024-01-06 10:00:00'),
('user_06', 'pg_13', '2024-01-06 10:00:00'),
('user_06', 'pg_11', '2024-01-06 10:00:00'),
('user_06', 'pg_19', '2024-01-06 10:00:00'),
('user_07', 'pg_12', '2024-01-06 10:00:00'),
('user_07', 'pg_17', '2024-01-06 10:00:00'),
('user_08', 'pg_06', '2024-01-06 10:00:00'),
('user_08', 'pg_10', '2024-01-06 10:00:00'),
('user_08', 'pg_08', '2024-01-06 10:00:00');

-- ---------------------------------------------------------------------
-- site_notifications (22 rows) -- every notification_type value used
-- ---------------------------------------------------------------------
INSERT INTO "site_notifications" ("id", "type", "message", "active", "starts_at", "expires_at", "created_by", "created_at", "updated_at") VALUES
('sn_01', 'Announcement', 'Welcome to the redesigned NU CSE Alumni Association portal!', true, '2026-09-01 00:00:00', NULL, 'user_01', '2026-08-25 09:00:00', '2026-08-25 09:00:00'),
('sn_02', 'Info', 'Alumni directory now supports filtering by graduation batch and country.', true, NULL, NULL, 'user_01', '2026-08-25 09:00:00', '2026-08-25 09:00:00'), -- EDGE: both dates NULL
('sn_03', 'Warning', 'Scheduled maintenance may cause brief login interruptions this weekend.', true, '2026-09-27 22:00:00', '2026-09-28 06:00:00', 'user_02', '2026-09-20 09:00:00', '2026-09-20 09:00:00'),
('sn_04', 'Maintenance', 'Database migration in progress; some profile edits may be temporarily disabled.', false, '2026-08-15 01:00:00', '2026-08-15 05:00:00', 'user_02', '2026-08-14 09:00:00', '2026-08-15 06:00:00'), -- EDGE: inactive + already elapsed window
('sn_05', 'Event', 'Annual NEU CSE Alumni Reunion scheduled for December 2026 in Dhaka.', true, NULL, '2026-12-31 23:59:59', 'user_01', '2026-09-01 09:00:00', '2026-09-01 09:00:00'),
('sn_06', 'Notice', 'Profiles marked as hidden will not appear in the public directory search.', true, NULL, NULL, 'user_05', '2026-08-01 09:00:00', '2026-08-01 09:00:00'),
('sn_07', 'Development', 'New publication tracking module is currently in beta testing.', true, '2026-09-10 00:00:00', NULL, 'user_04', '2026-09-09 09:00:00', '2026-09-09 09:00:00'),
('sn_08', 'Testing', 'This is a placeholder test notification used during staging QA.', false, NULL, NULL, 'user_04', '2026-07-01 09:00:00', '2026-07-01 09:00:00'),
('sn_09', 'Info', 'Boundary test: this notification message is deliberately long to check rendering near the maximum length allowed for this field.', true, NULL, NULL, 'user_01', '2026-06-01 09:00:00', '2026-06-01 09:00:00'), -- EDGE: message near the 160-char varchar limit
('sn_10', 'Announcement', 'Registration for the ICPC Dhaka Regional preparation bootcamp is now open to all eligible students.', true, '2026-10-01 00:00:00', '2026-10-15 23:59:59', 'user_03', '2026-09-15 09:00:00', '2026-09-15 09:00:00'),
('sn_11', 'Info', 'The alumni statistics dashboard now includes industry and country breakdowns.', true, NULL, NULL, 'user_01', '2026-08-10 09:00:00', '2026-08-10 09:00:00'),
('sn_12', 'Warning', 'Please verify your email address to retain access to your alumni account after October 2026.', true, '2026-09-01 00:00:00', '2026-10-31 23:59:59', 'user_02', '2026-08-28 09:00:00', '2026-08-28 09:00:00'),
('sn_13', 'Notice', 'NEUPC executive committee elections will be held next month; nominations are open.', true, NULL, NULL, 'user_04', '2026-09-05 09:00:00', '2026-09-05 09:00:00'),
('sn_14', 'Event', 'Guest lecture on distributed systems by an NU CSE alumnus this Friday.', true, '2026-10-02 14:00:00', '2026-10-02 17:00:00', 'user_05', '2026-09-25 09:00:00', '2026-09-25 09:00:00'),
('sn_15', 'Development', 'Dark mode support is planned for a future release of the portal.', false, NULL, NULL, 'user_04', '2026-05-01 09:00:00', '2026-05-01 09:00:00'),
('sn_16', 'Maintenance', 'Emergency maintenance window scheduled due to a hosting provider outage.', true, '2026-09-26 20:00:00', '2026-09-26 23:00:00', 'user_02', '2026-09-26 10:00:00', '2026-09-26 10:00:00'),
('sn_17', 'Info', 'Contact the alumni office if your profile information needs correction.', true, NULL, NULL, 'user_01', '2026-04-01 09:00:00', '2026-04-01 09:00:00'),
('sn_18', 'Announcement', 'Congratulations to our alumni for their publications featured this quarter!', true, NULL, NULL, 'user_06', '2026-09-18 09:00:00', '2026-09-18 09:00:00'),
('sn_19', 'Notice', 'This notification has no scheduled start or expiry and remains active indefinitely.', true, NULL, NULL, 'user_01', '2026-03-01 09:00:00', '2026-03-01 09:00:00'),
('sn_20', 'Testing', 'Internal QA notice: ignore this message, used for automated end-to-end tests.', true, NULL, NULL, 'user_04', '2026-09-24 09:00:00', '2026-09-24 09:00:00'),
('sn_21', 'Warning', 'An expired notice retained for historical and audit purposes.', false, '2025-01-01 00:00:00', '2025-01-31 23:59:59', 'user_02', '2024-12-20 09:00:00', '2025-02-01 09:00:00'), -- EDGE: fully expired historical record
('sn_22', 'Event', 'Winter break: alumni office response times may be slower than usual.', true, '2026-12-20 00:00:00', '2027-01-02 23:59:59', 'user_05', '2026-09-20 09:00:00', '2026-09-20 09:00:00');

COMMIT;

-- =====================================================================
-- Row counts (sanity check): countries 21, addresses 25, companies 22,
-- institutions 23, profiles 22, "user" 8 (FK anchors only), educations 27,
-- work_experiences 28, publications 22, publication_authors 34,
-- permissions 22, permission_groups 20, permission_group_items 31,
-- user_permissions 24, user_permission_groups 23, site_notifications 22.
-- =====================================================================
