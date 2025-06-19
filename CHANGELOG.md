# Changelog

## [1.3.0](https://github.com/nestorzamili/sisp/compare/v1.2.5...v1.3.0) (2025-06-19)


### Features

* add BackButton component and integrate it into NotFound page ([7fd2ca0](https://github.com/nestorzamili/sisp/commit/7fd2ca0391ee2b93be097e59792cba1ae834dc54))


### Bug Fixes

* **auth:** update rate limit model name to 'RateLimit' ([c580fa6](https://github.com/nestorzamili/sisp/commit/c580fa6022b027280cb2a83da90448acc83b826c))
* **deps:** update better-auth to version 1.2.9 and kysely to version 0.28.2 ([a65d52b](https://github.com/nestorzamili/sisp/commit/a65d52bf37b427027d4e25f95d58d860202d7cf6))
* update environment variables and database schema ([26fb6b3](https://github.com/nestorzamili/sisp/commit/26fb6b312affcf45fa55f4eb99ba0ffa0ba97d5c))

## [1.2.5](https://github.com/nestorzamili/sisp/compare/v1.2.4...v1.2.5) (2025-06-18)


### Bug Fixes

* **auth:** update rate limit model name and increase max requests ([0f81c6b](https://github.com/nestorzamili/sisp/commit/0f81c6bec9646bf9827312ef38e478ad7a05dcae))
* **middleware:** refine matcher to exclude additional image file types ([0f81c6b](https://github.com/nestorzamili/sisp/commit/0f81c6bec9646bf9827312ef38e478ad7a05dcae))

## [1.2.4](https://github.com/nestorzamili/sisp/compare/v1.2.3...v1.2.4) (2025-06-18)


### Chores

* update middleware matcher to exclude image file types ([7558db6](https://github.com/nestorzamili/sisp/commit/7558db684ce1f6513345806727ef6cb6190b074f))

## [1.2.3](https://github.com/nestorzamili/sisp/compare/v1.2.2...v1.2.3) (2025-06-18)


### Chores

* update middleware baseURL handling and matcher regex ([ff6d056](https://github.com/nestorzamili/sisp/commit/ff6d0569a1b9f936a0a20fc8759e1ce4fdb44490))

## [1.2.2](https://github.com/nestorzamili/sisp/compare/v1.2.1...v1.2.2) (2025-06-18)


### Chores

* ensure output is set to standalone in next.config.ts ([e25f829](https://github.com/nestorzamili/sisp/commit/e25f8299c00fb95e8d3e815c1d0d8dda10dc7abd))

## [1.2.1](https://github.com/nestorzamili/sisp/compare/v1.2.0...v1.2.1) (2025-06-18)


### Chores

* fix indentation in docker-build.yml workflow ([36dedaa](https://github.com/nestorzamili/sisp/commit/36dedaab5005e2a6f0fea11249f03d61a4d36a6c))

## [1.2.0](https://github.com/nestorzamili/sisp/compare/v1.1.0...v1.2.0) (2025-06-18)


### Features

* add checkbox component and integrate into authentication forms ([b0075e9](https://github.com/nestorzamili/sisp/commit/b0075e9b6330afaef5365605e0561c44090a43a5))
* add dashboard components and services ([93e5b0c](https://github.com/nestorzamili/sisp/commit/93e5b0cb79cc182e5354029f97ecb434851ee3ab))
* add issue and pull request templates for better contribution guidelines ([7bff719](https://github.com/nestorzamili/sisp/commit/7bff7194f055202e6ffdb871d13fdc45b7c0c627))
* add metadata ([3268d8e](https://github.com/nestorzamili/sisp/commit/3268d8eb0f6b9d657419a4c478102ad1c3be9384))
* add PDF generation and download functionality for Sekolah data ([fc27757](https://github.com/nestorzamili/sisp/commit/fc277572892c77f9b4156b4b67e5c481dc1c6d40))
* add review detail page with tabs for school data, teachers, facilities, and attachments ([e49c275](https://github.com/nestorzamili/sisp/commit/e49c2754cabe903ef7fc88b48d3a7b59ccbcd60b))
* add Skeleton component for loading placeholders ([7c99c4b](https://github.com/nestorzamili/sisp/commit/7c99c4b486da09e5ae8318da1d993bdabf135683))
* add TeamSwitcher component for team management in layout ([7c99c4b](https://github.com/nestorzamili/sisp/commit/7c99c4b486da09e5ae8318da1d993bdabf135683))
* add total lampiran statistics to QuickStats component and update data fetching logic ([c5fa3d4](https://github.com/nestorzamili/sisp/commit/c5fa3d4f8a9d6fb25b07a6f67530f72b2f2074d5))
* Add WhatsApp notifications for school registration and email verification ([a38a2a8](https://github.com/nestorzamili/sisp/commit/a38a2a8c39410733a0fad55aa94f611d84c83f88))
* **auth:** implement password reset functionality and email template ([ee40ca5](https://github.com/nestorzamili/sisp/commit/ee40ca5ddb806b8d8b6879e3c7e8858cb52e52c5))
* build Sidebar component with context for state management ([7c99c4b](https://github.com/nestorzamili/sisp/commit/7c99c4b486da09e5ae8318da1d993bdabf135683))
* create Collapsible UI component for expandable sections ([7c99c4b](https://github.com/nestorzamili/sisp/commit/7c99c4b486da09e5ae8318da1d993bdabf135683))
* create useIsMobile hook for responsive design handling ([7c99c4b](https://github.com/nestorzamili/sisp/commit/7c99c4b486da09e5ae8318da1d993bdabf135683))
* define types for SidebarData and NavItem structures ([7c99c4b](https://github.com/nestorzamili/sisp/commit/7c99c4b486da09e5ae8318da1d993bdabf135683))
* develop Command component for command palette functionality ([7c99c4b](https://github.com/nestorzamili/sisp/commit/7c99c4b486da09e5ae8318da1d993bdabf135683))
* Enable conditional WhatsApp notifications for school creation ([1c590cc](https://github.com/nestorzamili/sisp/commit/1c590cc46f6adaaf10496182f5cb786eb00f13fa))
* enhance attachments form with data loading and confirmation dialogs ([1171b23](https://github.com/nestorzamili/sisp/commit/1171b23a0ec388f43ebab1da2a7d3610cd43e0e1))
* enhance form components with disabled state management and school status handling ([e24248f](https://github.com/nestorzamili/sisp/commit/e24248f0fa27d38f117f5eb639d828b47cdee53e))
* enhance guru and rombel tabs with total counts and add PDF download functionality ([53182df](https://github.com/nestorzamili/sisp/commit/53182df6f756236e7ce5cb5450734b449038e699))
* Enhance landing page with animations and improved layout ([19f7a74](https://github.com/nestorzamili/sisp/commit/19f7a74e12bdb10a170e07cee9324076c6330969))
* Enhance user authentication and registration process ([38e6456](https://github.com/nestorzamili/sisp/commit/38e6456c698e238efd1f8ed1b070209237b8dc55))
* enhance welcome card with school status handling and update status card props ([40fb344](https://github.com/nestorzamili/sisp/commit/40fb344e8f2c4fcc1bf641a19b0f41bb07e2e559))
* **env:** add example environment configuration file ([23b32cb](https://github.com/nestorzamili/sisp/commit/23b32cb97ec46c441183fa09330dddc3ebb89d0f))
* establish SearchContext for managing search state and keyboard shortcuts ([7c99c4b](https://github.com/nestorzamili/sisp/commit/7c99c4b486da09e5ae8318da1d993bdabf135683))
* **facilities:** add new facility items and update total count ([3ec5eae](https://github.com/nestorzamili/sisp/commit/3ec5eaec3ff0b230458ea4ffb9b9889b272624f1))
* **form:** add hideCompletionStatus prop to multiple forms for conditional rendering ([fe358b4](https://github.com/nestorzamili/sisp/commit/fe358b4ff5c1fff70fd88cceec5db901e2aef6a9))
* **forms:** enhance infrastructure data form with optional description fields ([187f038](https://github.com/nestorzamili/sisp/commit/187f038e299dc578f62646c41b5b7c6c8a0ce9ae))
* **hero-section:** optimize hero section layout and animations for better performance ([8796f9f](https://github.com/nestorzamili/sisp/commit/8796f9f821f28f185e1430b8a376ad5554979abb))
* Implement facility and infrastructure data management ([b227ccf](https://github.com/nestorzamili/sisp/commit/b227ccff05a0fd80127b0cfa99b8ecbd235b50a2))
* implement file upload and management for attachments ([a192303](https://github.com/nestorzamili/sisp/commit/a192303d47bfd824c4cf51e36030e59c692e4171))
* Implement multi-step form for user data submission ([0f00dcc](https://github.com/nestorzamili/sisp/commit/0f00dcc7f0a08d22d1c69493eac030bb4c1413c6))
* implement review management system with approval and revision requests ([4f9c790](https://github.com/nestorzamili/sisp/commit/4f9c7904fb3b116ca1b8c18fa459eebb1076a333))
* Implement school, student, and teacher data management actions ([b911d86](https://github.com/nestorzamili/sisp/commit/b911d865908ea9ebde83ca853ce413010746fce5))
* implement Search component with keyboard shortcut functionality ([7c99c4b](https://github.com/nestorzamili/sisp/commit/7c99c4b486da09e5ae8318da1d993bdabf135683))
* Implement sekolah management features with table and pagination ([74b7113](https://github.com/nestorzamili/sisp/commit/74b711345b9a7ea4e077714d9a870f8fcb050ce7))
* implement Tooltip component for contextual hints ([7c99c4b](https://github.com/nestorzamili/sisp/commit/7c99c4b486da09e5ae8318da1d993bdabf135683))
* init auth pages ([294230f](https://github.com/nestorzamili/sisp/commit/294230f507dca9861085295061a14b8ea0840b72))
* init project and setup landing page ([4ec115b](https://github.com/nestorzamili/sisp/commit/4ec115bbcff7926be3b33867c06e5f65e62512a2))
* integrate better-auth for user authentication and registration ([baa92d6](https://github.com/nestorzamili/sisp/commit/baa92d646b3c51ee5a39b80a8ddddbd805632a07))
* introduce Sheet component for modal-like overlays ([7c99c4b](https://github.com/nestorzamili/sisp/commit/7c99c4b486da09e5ae8318da1d993bdabf135683))
* **lampiran-tab:** enhance file preview functionality with dialog and image support ([e18a8d6](https://github.com/nestorzamili/sisp/commit/e18a8d62267b35705eab7ca2cad37c2d18f6a367))
* **priority-needs:** implement priority needs data management ([ca2532f](https://github.com/nestorzamili/sisp/commit/ca2532f6166a653c540e74611dc25462dfc4d821))
* refactor school and teacher data forms for improved structure and completion status ([5d8979a](https://github.com/nestorzamili/sisp/commit/5d8979a5b5076234673cd37044e7893c498d72a5))
* **review:** enhance review detail card with rejection notes display ([7e377bc](https://github.com/nestorzamili/sisp/commit/7e377bca9e425cf150dc4e2b3acaf74824fbbb00))
* **review:** update review status handling and improve UI components ([ec6285a](https://github.com/nestorzamili/sisp/commit/ec6285ae905a1509584f034460f4c067deb5412e))
* **sidebar:** add 'Permintaan Review' navigation item ([5d7c1b9](https://github.com/nestorzamili/sisp/commit/5d7c1b9b0fb3f5f5b040c893c6e9bb543fb8579c))
* update lampiran data saving logic and school status management ([17dd483](https://github.com/nestorzamili/sisp/commit/17dd483fb8b0613716a310dbe8241d1b5bf35156))


### Bug Fixes

* **footer:** update footer text for accuracy ([8796f9f](https://github.com/nestorzamili/sisp/commit/8796f9f821f28f185e1430b8a376ad5554979abb))
* **header:** remove framer-motion for mobile menu and improve performance ([8796f9f](https://github.com/nestorzamili/sisp/commit/8796f9f821f28f185e1430b8a376ad5554979abb))
* **layout:** update layout styles for improved responsiveness ([6ecbe09](https://github.com/nestorzamili/sisp/commit/6ecbe0956c6bf89aad3155ad5cb5733c57741637))
* mapping admin and user route, and middleware ([b26d5b9](https://github.com/nestorzamili/sisp/commit/b26d5b9e8b28cf5123b0b6abaaefe17e23f5295d))
* revise routing ([b11d69a](https://github.com/nestorzamili/sisp/commit/b11d69afe89504d14b2bae38d016fda4776b677c))
* **sidebar:** update icon for Sekolah navigation item ([87051c0](https://github.com/nestorzamili/sisp/commit/87051c039b3b493853270f06f2be408b369ab6c4))
* **stats-cards:** correct spelling and update descriptions for clarity ([450562c](https://github.com/nestorzamili/sisp/commit/450562c244e88fb87076b2f98006513d2daedf98))
* update logo file extension from .svg to .png in footer, header, app-header, and sidebar data ([5446163](https://github.com/nestorzamili/sisp/commit/5446163ea31ace267d708cc05ac758a911dc6d25))


### Chores

* **globals.css:** add performance optimized animations for hero section ([8796f9f](https://github.com/nestorzamili/sisp/commit/8796f9f821f28f185e1430b8a376ad5554979abb))
* **layout:** preload critical images and add DNS prefetch for external resources ([8796f9f](https://github.com/nestorzamili/sisp/commit/8796f9f821f28f185e1430b8a376ad5554979abb))
* **main:** release 1.0.0 ([9ea4e50](https://github.com/nestorzamili/sisp/commit/9ea4e50d645acf8117fa27d3c9f6b76cf646824e))
* **main:** release 1.1.0 ([65741f6](https://github.com/nestorzamili/sisp/commit/65741f6b6698c7bce9c9bfe57976972e9d12dab7))
* remove AppHeader documentation file ([6e1a664](https://github.com/nestorzamili/sisp/commit/6e1a664fa436a6f032b004acdb360d2cb957f50e))
* remove push trigger from Docker build workflow ([c88559e](https://github.com/nestorzamili/sisp/commit/c88559ef1984ea1853c96262394c8c35ce7ebf48))
* update release-please workflow to include issue permissions ([3bf4336](https://github.com/nestorzamili/sisp/commit/3bf4336b6d3d37bbe558058813b7e09331ccb4c0))


### Code Refactoring

* **auth:** wrap authentication forms in Suspense for improved loading handling ([33d79ac](https://github.com/nestorzamili/sisp/commit/33d79aca6e5d7d82d179a105837a06bee2874c46))
* enhance UI components and improve animations across landing page ([30b93b1](https://github.com/nestorzamili/sisp/commit/30b93b1bb8fa69531f164973e583e329d034ef64))
* **forms:** update input fields to improve read-only and disabled states ([6330a42](https://github.com/nestorzamili/sisp/commit/6330a423f5f7de9aa97bb081be40e0c5c05e27e9))
* **home:** enhance loading and error states with updated styles ([49f6cae](https://github.com/nestorzamili/sisp/commit/49f6cae69fde4bbdbe0a3b15c0469a7ec7f9376a))
* **home:** update background styles for loading, error, and empty states ([befffe7](https://github.com/nestorzamili/sisp/commit/befffe7f55828005b21a49513fc0cfd0fa255058))
* **home:** update loading animation and welcome section styling for improved UI consistency ([06bb3e3](https://github.com/nestorzamili/sisp/commit/06bb3e38a5e4465d141ffa3d1a4738b69e9841bb))
* improve error handling in user authentication process ([6fdb751](https://github.com/nestorzamili/sisp/commit/6fdb751b95b3becd06a551858c67e21fc0bb41e4))
* **layout:** update background color and main width for improved layout consistency ([49f6cae](https://github.com/nestorzamili/sisp/commit/49f6cae69fde4bbdbe0a3b15c0469a7ec7f9376a))
* **priority-needs:** replace getCurrentYear with getCurrentAcademicYear for consistency ([0db2550](https://github.com/nestorzamili/sisp/commit/0db25504a877fda1744d8a2465234f913de6e64f))
* remove rombelKelas fields from student data actions and forms ([b906774](https://github.com/nestorzamili/sisp/commit/b90677424d51d9dd87597f21f56f138f1d18fb95))
* remove unused checkNpsnExistsAction function ([1d0078c](https://github.com/nestorzamili/sisp/commit/1d0078c4fb2bccb2962dd9cbf7505deecc4781ba))
* **school-info-form:** fix formatting for select component ([49f6cae](https://github.com/nestorzamili/sisp/commit/49f6cae69fde4bbdbe0a3b15c0469a7ec7f9376a))
* **sekolah:** disable sorting for certain columns in sekolah table ([85334d1](https://github.com/nestorzamili/sisp/commit/85334d1bdddc026ce8f8ab9503bfb8bc0b91da1e))
* **sekolah:** standardize status values to uppercase and update related filters ([dc7a800](https://github.com/nestorzamili/sisp/commit/dc7a80081221ccd5cca1d29c349e510da93ed89d))
* **step-indicator:** adjust spacing and styles for better visual alignment ([49f6cae](https://github.com/nestorzamili/sisp/commit/49f6cae69fde4bbdbe0a3b15c0469a7ec7f9376a))
* streamline loading states and alerts in authentication forms ([6e9184d](https://github.com/nestorzamili/sisp/commit/6e9184db634b99300f2af7cd43b893cb0ef51f33))

## [1.1.0](https://github.com/nestorzamili/sisp/compare/v1.0.0...v1.1.0) (2025-06-18)


### Features

* add checkbox component and integrate into authentication forms ([b0075e9](https://github.com/nestorzamili/sisp/commit/b0075e9b6330afaef5365605e0561c44090a43a5))
* add dashboard components and services ([93e5b0c](https://github.com/nestorzamili/sisp/commit/93e5b0cb79cc182e5354029f97ecb434851ee3ab))
* add issue and pull request templates for better contribution guidelines ([7bff719](https://github.com/nestorzamili/sisp/commit/7bff7194f055202e6ffdb871d13fdc45b7c0c627))
* add metadata ([3268d8e](https://github.com/nestorzamili/sisp/commit/3268d8eb0f6b9d657419a4c478102ad1c3be9384))
* add PDF generation and download functionality for Sekolah data ([fc27757](https://github.com/nestorzamili/sisp/commit/fc277572892c77f9b4156b4b67e5c481dc1c6d40))
* add review detail page with tabs for school data, teachers, facilities, and attachments ([e49c275](https://github.com/nestorzamili/sisp/commit/e49c2754cabe903ef7fc88b48d3a7b59ccbcd60b))
* add Skeleton component for loading placeholders ([7c99c4b](https://github.com/nestorzamili/sisp/commit/7c99c4b486da09e5ae8318da1d993bdabf135683))
* add TeamSwitcher component for team management in layout ([7c99c4b](https://github.com/nestorzamili/sisp/commit/7c99c4b486da09e5ae8318da1d993bdabf135683))
* add total lampiran statistics to QuickStats component and update data fetching logic ([c5fa3d4](https://github.com/nestorzamili/sisp/commit/c5fa3d4f8a9d6fb25b07a6f67530f72b2f2074d5))
* Add WhatsApp notifications for school registration and email verification ([a38a2a8](https://github.com/nestorzamili/sisp/commit/a38a2a8c39410733a0fad55aa94f611d84c83f88))
* **auth:** implement password reset functionality and email template ([ee40ca5](https://github.com/nestorzamili/sisp/commit/ee40ca5ddb806b8d8b6879e3c7e8858cb52e52c5))
* build Sidebar component with context for state management ([7c99c4b](https://github.com/nestorzamili/sisp/commit/7c99c4b486da09e5ae8318da1d993bdabf135683))
* create Collapsible UI component for expandable sections ([7c99c4b](https://github.com/nestorzamili/sisp/commit/7c99c4b486da09e5ae8318da1d993bdabf135683))
* create useIsMobile hook for responsive design handling ([7c99c4b](https://github.com/nestorzamili/sisp/commit/7c99c4b486da09e5ae8318da1d993bdabf135683))
* define types for SidebarData and NavItem structures ([7c99c4b](https://github.com/nestorzamili/sisp/commit/7c99c4b486da09e5ae8318da1d993bdabf135683))
* develop Command component for command palette functionality ([7c99c4b](https://github.com/nestorzamili/sisp/commit/7c99c4b486da09e5ae8318da1d993bdabf135683))
* Enable conditional WhatsApp notifications for school creation ([1c590cc](https://github.com/nestorzamili/sisp/commit/1c590cc46f6adaaf10496182f5cb786eb00f13fa))
* enhance attachments form with data loading and confirmation dialogs ([1171b23](https://github.com/nestorzamili/sisp/commit/1171b23a0ec388f43ebab1da2a7d3610cd43e0e1))
* enhance form components with disabled state management and school status handling ([e24248f](https://github.com/nestorzamili/sisp/commit/e24248f0fa27d38f117f5eb639d828b47cdee53e))
* enhance guru and rombel tabs with total counts and add PDF download functionality ([53182df](https://github.com/nestorzamili/sisp/commit/53182df6f756236e7ce5cb5450734b449038e699))
* Enhance landing page with animations and improved layout ([19f7a74](https://github.com/nestorzamili/sisp/commit/19f7a74e12bdb10a170e07cee9324076c6330969))
* Enhance user authentication and registration process ([38e6456](https://github.com/nestorzamili/sisp/commit/38e6456c698e238efd1f8ed1b070209237b8dc55))
* enhance welcome card with school status handling and update status card props ([40fb344](https://github.com/nestorzamili/sisp/commit/40fb344e8f2c4fcc1bf641a19b0f41bb07e2e559))
* **env:** add example environment configuration file ([23b32cb](https://github.com/nestorzamili/sisp/commit/23b32cb97ec46c441183fa09330dddc3ebb89d0f))
* establish SearchContext for managing search state and keyboard shortcuts ([7c99c4b](https://github.com/nestorzamili/sisp/commit/7c99c4b486da09e5ae8318da1d993bdabf135683))
* **facilities:** add new facility items and update total count ([3ec5eae](https://github.com/nestorzamili/sisp/commit/3ec5eaec3ff0b230458ea4ffb9b9889b272624f1))
* **form:** add hideCompletionStatus prop to multiple forms for conditional rendering ([fe358b4](https://github.com/nestorzamili/sisp/commit/fe358b4ff5c1fff70fd88cceec5db901e2aef6a9))
* **forms:** enhance infrastructure data form with optional description fields ([187f038](https://github.com/nestorzamili/sisp/commit/187f038e299dc578f62646c41b5b7c6c8a0ce9ae))
* **hero-section:** optimize hero section layout and animations for better performance ([8796f9f](https://github.com/nestorzamili/sisp/commit/8796f9f821f28f185e1430b8a376ad5554979abb))
* Implement facility and infrastructure data management ([b227ccf](https://github.com/nestorzamili/sisp/commit/b227ccff05a0fd80127b0cfa99b8ecbd235b50a2))
* implement file upload and management for attachments ([a192303](https://github.com/nestorzamili/sisp/commit/a192303d47bfd824c4cf51e36030e59c692e4171))
* Implement multi-step form for user data submission ([0f00dcc](https://github.com/nestorzamili/sisp/commit/0f00dcc7f0a08d22d1c69493eac030bb4c1413c6))
* implement review management system with approval and revision requests ([4f9c790](https://github.com/nestorzamili/sisp/commit/4f9c7904fb3b116ca1b8c18fa459eebb1076a333))
* Implement school, student, and teacher data management actions ([b911d86](https://github.com/nestorzamili/sisp/commit/b911d865908ea9ebde83ca853ce413010746fce5))
* implement Search component with keyboard shortcut functionality ([7c99c4b](https://github.com/nestorzamili/sisp/commit/7c99c4b486da09e5ae8318da1d993bdabf135683))
* Implement sekolah management features with table and pagination ([74b7113](https://github.com/nestorzamili/sisp/commit/74b711345b9a7ea4e077714d9a870f8fcb050ce7))
* implement Tooltip component for contextual hints ([7c99c4b](https://github.com/nestorzamili/sisp/commit/7c99c4b486da09e5ae8318da1d993bdabf135683))
* init auth pages ([294230f](https://github.com/nestorzamili/sisp/commit/294230f507dca9861085295061a14b8ea0840b72))
* init project and setup landing page ([4ec115b](https://github.com/nestorzamili/sisp/commit/4ec115bbcff7926be3b33867c06e5f65e62512a2))
* integrate better-auth for user authentication and registration ([baa92d6](https://github.com/nestorzamili/sisp/commit/baa92d646b3c51ee5a39b80a8ddddbd805632a07))
* introduce Sheet component for modal-like overlays ([7c99c4b](https://github.com/nestorzamili/sisp/commit/7c99c4b486da09e5ae8318da1d993bdabf135683))
* **lampiran-tab:** enhance file preview functionality with dialog and image support ([e18a8d6](https://github.com/nestorzamili/sisp/commit/e18a8d62267b35705eab7ca2cad37c2d18f6a367))
* **priority-needs:** implement priority needs data management ([ca2532f](https://github.com/nestorzamili/sisp/commit/ca2532f6166a653c540e74611dc25462dfc4d821))
* refactor school and teacher data forms for improved structure and completion status ([5d8979a](https://github.com/nestorzamili/sisp/commit/5d8979a5b5076234673cd37044e7893c498d72a5))
* **review:** enhance review detail card with rejection notes display ([7e377bc](https://github.com/nestorzamili/sisp/commit/7e377bca9e425cf150dc4e2b3acaf74824fbbb00))
* **review:** update review status handling and improve UI components ([ec6285a](https://github.com/nestorzamili/sisp/commit/ec6285ae905a1509584f034460f4c067deb5412e))
* **sidebar:** add 'Permintaan Review' navigation item ([5d7c1b9](https://github.com/nestorzamili/sisp/commit/5d7c1b9b0fb3f5f5b040c893c6e9bb543fb8579c))
* update lampiran data saving logic and school status management ([17dd483](https://github.com/nestorzamili/sisp/commit/17dd483fb8b0613716a310dbe8241d1b5bf35156))


### Bug Fixes

* **footer:** update footer text for accuracy ([8796f9f](https://github.com/nestorzamili/sisp/commit/8796f9f821f28f185e1430b8a376ad5554979abb))
* **header:** remove framer-motion for mobile menu and improve performance ([8796f9f](https://github.com/nestorzamili/sisp/commit/8796f9f821f28f185e1430b8a376ad5554979abb))
* **layout:** update layout styles for improved responsiveness ([6ecbe09](https://github.com/nestorzamili/sisp/commit/6ecbe0956c6bf89aad3155ad5cb5733c57741637))
* mapping admin and user route, and middleware ([b26d5b9](https://github.com/nestorzamili/sisp/commit/b26d5b9e8b28cf5123b0b6abaaefe17e23f5295d))
* revise routing ([b11d69a](https://github.com/nestorzamili/sisp/commit/b11d69afe89504d14b2bae38d016fda4776b677c))
* **sidebar:** update icon for Sekolah navigation item ([87051c0](https://github.com/nestorzamili/sisp/commit/87051c039b3b493853270f06f2be408b369ab6c4))
* **stats-cards:** correct spelling and update descriptions for clarity ([450562c](https://github.com/nestorzamili/sisp/commit/450562c244e88fb87076b2f98006513d2daedf98))
* update logo file extension from .svg to .png in footer, header, app-header, and sidebar data ([5446163](https://github.com/nestorzamili/sisp/commit/5446163ea31ace267d708cc05ac758a911dc6d25))


### Chores

* **globals.css:** add performance optimized animations for hero section ([8796f9f](https://github.com/nestorzamili/sisp/commit/8796f9f821f28f185e1430b8a376ad5554979abb))
* **layout:** preload critical images and add DNS prefetch for external resources ([8796f9f](https://github.com/nestorzamili/sisp/commit/8796f9f821f28f185e1430b8a376ad5554979abb))
* **main:** release 1.0.0 ([9ea4e50](https://github.com/nestorzamili/sisp/commit/9ea4e50d645acf8117fa27d3c9f6b76cf646824e))
* remove AppHeader documentation file ([6e1a664](https://github.com/nestorzamili/sisp/commit/6e1a664fa436a6f032b004acdb360d2cb957f50e))
* remove push trigger from Docker build workflow ([c88559e](https://github.com/nestorzamili/sisp/commit/c88559ef1984ea1853c96262394c8c35ce7ebf48))


### Code Refactoring

* **auth:** wrap authentication forms in Suspense for improved loading handling ([33d79ac](https://github.com/nestorzamili/sisp/commit/33d79aca6e5d7d82d179a105837a06bee2874c46))
* enhance UI components and improve animations across landing page ([30b93b1](https://github.com/nestorzamili/sisp/commit/30b93b1bb8fa69531f164973e583e329d034ef64))
* **forms:** update input fields to improve read-only and disabled states ([6330a42](https://github.com/nestorzamili/sisp/commit/6330a423f5f7de9aa97bb081be40e0c5c05e27e9))
* **home:** enhance loading and error states with updated styles ([49f6cae](https://github.com/nestorzamili/sisp/commit/49f6cae69fde4bbdbe0a3b15c0469a7ec7f9376a))
* **home:** update background styles for loading, error, and empty states ([befffe7](https://github.com/nestorzamili/sisp/commit/befffe7f55828005b21a49513fc0cfd0fa255058))
* **home:** update loading animation and welcome section styling for improved UI consistency ([06bb3e3](https://github.com/nestorzamili/sisp/commit/06bb3e38a5e4465d141ffa3d1a4738b69e9841bb))
* improve error handling in user authentication process ([6fdb751](https://github.com/nestorzamili/sisp/commit/6fdb751b95b3becd06a551858c67e21fc0bb41e4))
* **layout:** update background color and main width for improved layout consistency ([49f6cae](https://github.com/nestorzamili/sisp/commit/49f6cae69fde4bbdbe0a3b15c0469a7ec7f9376a))
* **priority-needs:** replace getCurrentYear with getCurrentAcademicYear for consistency ([0db2550](https://github.com/nestorzamili/sisp/commit/0db25504a877fda1744d8a2465234f913de6e64f))
* remove rombelKelas fields from student data actions and forms ([b906774](https://github.com/nestorzamili/sisp/commit/b90677424d51d9dd87597f21f56f138f1d18fb95))
* remove unused checkNpsnExistsAction function ([1d0078c](https://github.com/nestorzamili/sisp/commit/1d0078c4fb2bccb2962dd9cbf7505deecc4781ba))
* **school-info-form:** fix formatting for select component ([49f6cae](https://github.com/nestorzamili/sisp/commit/49f6cae69fde4bbdbe0a3b15c0469a7ec7f9376a))
* **sekolah:** disable sorting for certain columns in sekolah table ([85334d1](https://github.com/nestorzamili/sisp/commit/85334d1bdddc026ce8f8ab9503bfb8bc0b91da1e))
* **sekolah:** standardize status values to uppercase and update related filters ([dc7a800](https://github.com/nestorzamili/sisp/commit/dc7a80081221ccd5cca1d29c349e510da93ed89d))
* **step-indicator:** adjust spacing and styles for better visual alignment ([49f6cae](https://github.com/nestorzamili/sisp/commit/49f6cae69fde4bbdbe0a3b15c0469a7ec7f9376a))
* streamline loading states and alerts in authentication forms ([6e9184d](https://github.com/nestorzamili/sisp/commit/6e9184db634b99300f2af7cd43b893cb0ef51f33))

## 1.0.0 (2025-06-18)


### Features

* add checkbox component and integrate into authentication forms ([b0075e9](https://github.com/nestorzamili/sisp/commit/b0075e9b6330afaef5365605e0561c44090a43a5))
* add dashboard components and services ([93e5b0c](https://github.com/nestorzamili/sisp/commit/93e5b0cb79cc182e5354029f97ecb434851ee3ab))
* add issue and pull request templates for better contribution guidelines ([7bff719](https://github.com/nestorzamili/sisp/commit/7bff7194f055202e6ffdb871d13fdc45b7c0c627))
* add metadata ([3268d8e](https://github.com/nestorzamili/sisp/commit/3268d8eb0f6b9d657419a4c478102ad1c3be9384))
* add PDF generation and download functionality for Sekolah data ([fc27757](https://github.com/nestorzamili/sisp/commit/fc277572892c77f9b4156b4b67e5c481dc1c6d40))
* add review detail page with tabs for school data, teachers, facilities, and attachments ([e49c275](https://github.com/nestorzamili/sisp/commit/e49c2754cabe903ef7fc88b48d3a7b59ccbcd60b))
* add Skeleton component for loading placeholders ([7c99c4b](https://github.com/nestorzamili/sisp/commit/7c99c4b486da09e5ae8318da1d993bdabf135683))
* add TeamSwitcher component for team management in layout ([7c99c4b](https://github.com/nestorzamili/sisp/commit/7c99c4b486da09e5ae8318da1d993bdabf135683))
* add total lampiran statistics to QuickStats component and update data fetching logic ([c5fa3d4](https://github.com/nestorzamili/sisp/commit/c5fa3d4f8a9d6fb25b07a6f67530f72b2f2074d5))
* Add WhatsApp notifications for school registration and email verification ([a38a2a8](https://github.com/nestorzamili/sisp/commit/a38a2a8c39410733a0fad55aa94f611d84c83f88))
* **auth:** implement password reset functionality and email template ([ee40ca5](https://github.com/nestorzamili/sisp/commit/ee40ca5ddb806b8d8b6879e3c7e8858cb52e52c5))
* build Sidebar component with context for state management ([7c99c4b](https://github.com/nestorzamili/sisp/commit/7c99c4b486da09e5ae8318da1d993bdabf135683))
* create Collapsible UI component for expandable sections ([7c99c4b](https://github.com/nestorzamili/sisp/commit/7c99c4b486da09e5ae8318da1d993bdabf135683))
* create useIsMobile hook for responsive design handling ([7c99c4b](https://github.com/nestorzamili/sisp/commit/7c99c4b486da09e5ae8318da1d993bdabf135683))
* define types for SidebarData and NavItem structures ([7c99c4b](https://github.com/nestorzamili/sisp/commit/7c99c4b486da09e5ae8318da1d993bdabf135683))
* develop Command component for command palette functionality ([7c99c4b](https://github.com/nestorzamili/sisp/commit/7c99c4b486da09e5ae8318da1d993bdabf135683))
* Enable conditional WhatsApp notifications for school creation ([1c590cc](https://github.com/nestorzamili/sisp/commit/1c590cc46f6adaaf10496182f5cb786eb00f13fa))
* enhance attachments form with data loading and confirmation dialogs ([1171b23](https://github.com/nestorzamili/sisp/commit/1171b23a0ec388f43ebab1da2a7d3610cd43e0e1))
* enhance form components with disabled state management and school status handling ([e24248f](https://github.com/nestorzamili/sisp/commit/e24248f0fa27d38f117f5eb639d828b47cdee53e))
* enhance guru and rombel tabs with total counts and add PDF download functionality ([53182df](https://github.com/nestorzamili/sisp/commit/53182df6f756236e7ce5cb5450734b449038e699))
* Enhance landing page with animations and improved layout ([19f7a74](https://github.com/nestorzamili/sisp/commit/19f7a74e12bdb10a170e07cee9324076c6330969))
* Enhance user authentication and registration process ([38e6456](https://github.com/nestorzamili/sisp/commit/38e6456c698e238efd1f8ed1b070209237b8dc55))
* enhance welcome card with school status handling and update status card props ([40fb344](https://github.com/nestorzamili/sisp/commit/40fb344e8f2c4fcc1bf641a19b0f41bb07e2e559))
* **env:** add example environment configuration file ([23b32cb](https://github.com/nestorzamili/sisp/commit/23b32cb97ec46c441183fa09330dddc3ebb89d0f))
* establish SearchContext for managing search state and keyboard shortcuts ([7c99c4b](https://github.com/nestorzamili/sisp/commit/7c99c4b486da09e5ae8318da1d993bdabf135683))
* **facilities:** add new facility items and update total count ([3ec5eae](https://github.com/nestorzamili/sisp/commit/3ec5eaec3ff0b230458ea4ffb9b9889b272624f1))
* **form:** add hideCompletionStatus prop to multiple forms for conditional rendering ([fe358b4](https://github.com/nestorzamili/sisp/commit/fe358b4ff5c1fff70fd88cceec5db901e2aef6a9))
* **forms:** enhance infrastructure data form with optional description fields ([187f038](https://github.com/nestorzamili/sisp/commit/187f038e299dc578f62646c41b5b7c6c8a0ce9ae))
* **hero-section:** optimize hero section layout and animations for better performance ([8796f9f](https://github.com/nestorzamili/sisp/commit/8796f9f821f28f185e1430b8a376ad5554979abb))
* Implement facility and infrastructure data management ([b227ccf](https://github.com/nestorzamili/sisp/commit/b227ccff05a0fd80127b0cfa99b8ecbd235b50a2))
* implement file upload and management for attachments ([a192303](https://github.com/nestorzamili/sisp/commit/a192303d47bfd824c4cf51e36030e59c692e4171))
* Implement multi-step form for user data submission ([0f00dcc](https://github.com/nestorzamili/sisp/commit/0f00dcc7f0a08d22d1c69493eac030bb4c1413c6))
* implement review management system with approval and revision requests ([4f9c790](https://github.com/nestorzamili/sisp/commit/4f9c7904fb3b116ca1b8c18fa459eebb1076a333))
* Implement school, student, and teacher data management actions ([b911d86](https://github.com/nestorzamili/sisp/commit/b911d865908ea9ebde83ca853ce413010746fce5))
* implement Search component with keyboard shortcut functionality ([7c99c4b](https://github.com/nestorzamili/sisp/commit/7c99c4b486da09e5ae8318da1d993bdabf135683))
* Implement sekolah management features with table and pagination ([74b7113](https://github.com/nestorzamili/sisp/commit/74b711345b9a7ea4e077714d9a870f8fcb050ce7))
* implement Tooltip component for contextual hints ([7c99c4b](https://github.com/nestorzamili/sisp/commit/7c99c4b486da09e5ae8318da1d993bdabf135683))
* init auth pages ([294230f](https://github.com/nestorzamili/sisp/commit/294230f507dca9861085295061a14b8ea0840b72))
* init project and setup landing page ([4ec115b](https://github.com/nestorzamili/sisp/commit/4ec115bbcff7926be3b33867c06e5f65e62512a2))
* integrate better-auth for user authentication and registration ([baa92d6](https://github.com/nestorzamili/sisp/commit/baa92d646b3c51ee5a39b80a8ddddbd805632a07))
* introduce Sheet component for modal-like overlays ([7c99c4b](https://github.com/nestorzamili/sisp/commit/7c99c4b486da09e5ae8318da1d993bdabf135683))
* **lampiran-tab:** enhance file preview functionality with dialog and image support ([e18a8d6](https://github.com/nestorzamili/sisp/commit/e18a8d62267b35705eab7ca2cad37c2d18f6a367))
* **priority-needs:** implement priority needs data management ([ca2532f](https://github.com/nestorzamili/sisp/commit/ca2532f6166a653c540e74611dc25462dfc4d821))
* refactor school and teacher data forms for improved structure and completion status ([5d8979a](https://github.com/nestorzamili/sisp/commit/5d8979a5b5076234673cd37044e7893c498d72a5))
* **review:** enhance review detail card with rejection notes display ([7e377bc](https://github.com/nestorzamili/sisp/commit/7e377bca9e425cf150dc4e2b3acaf74824fbbb00))
* **review:** update review status handling and improve UI components ([ec6285a](https://github.com/nestorzamili/sisp/commit/ec6285ae905a1509584f034460f4c067deb5412e))
* **sidebar:** add 'Permintaan Review' navigation item ([5d7c1b9](https://github.com/nestorzamili/sisp/commit/5d7c1b9b0fb3f5f5b040c893c6e9bb543fb8579c))
* update lampiran data saving logic and school status management ([17dd483](https://github.com/nestorzamili/sisp/commit/17dd483fb8b0613716a310dbe8241d1b5bf35156))


### Bug Fixes

* **footer:** update footer text for accuracy ([8796f9f](https://github.com/nestorzamili/sisp/commit/8796f9f821f28f185e1430b8a376ad5554979abb))
* **header:** remove framer-motion for mobile menu and improve performance ([8796f9f](https://github.com/nestorzamili/sisp/commit/8796f9f821f28f185e1430b8a376ad5554979abb))
* **layout:** update layout styles for improved responsiveness ([6ecbe09](https://github.com/nestorzamili/sisp/commit/6ecbe0956c6bf89aad3155ad5cb5733c57741637))
* mapping admin and user route, and middleware ([b26d5b9](https://github.com/nestorzamili/sisp/commit/b26d5b9e8b28cf5123b0b6abaaefe17e23f5295d))
* revise routing ([b11d69a](https://github.com/nestorzamili/sisp/commit/b11d69afe89504d14b2bae38d016fda4776b677c))
* **sidebar:** update icon for Sekolah navigation item ([87051c0](https://github.com/nestorzamili/sisp/commit/87051c039b3b493853270f06f2be408b369ab6c4))
* **stats-cards:** correct spelling and update descriptions for clarity ([450562c](https://github.com/nestorzamili/sisp/commit/450562c244e88fb87076b2f98006513d2daedf98))
* update logo file extension from .svg to .png in footer, header, app-header, and sidebar data ([5446163](https://github.com/nestorzamili/sisp/commit/5446163ea31ace267d708cc05ac758a911dc6d25))


### Chores

* **globals.css:** add performance optimized animations for hero section ([8796f9f](https://github.com/nestorzamili/sisp/commit/8796f9f821f28f185e1430b8a376ad5554979abb))
* **layout:** preload critical images and add DNS prefetch for external resources ([8796f9f](https://github.com/nestorzamili/sisp/commit/8796f9f821f28f185e1430b8a376ad5554979abb))
* remove AppHeader documentation file ([6e1a664](https://github.com/nestorzamili/sisp/commit/6e1a664fa436a6f032b004acdb360d2cb957f50e))
* remove push trigger from Docker build workflow ([c88559e](https://github.com/nestorzamili/sisp/commit/c88559ef1984ea1853c96262394c8c35ce7ebf48))


### Code Refactoring

* **auth:** wrap authentication forms in Suspense for improved loading handling ([33d79ac](https://github.com/nestorzamili/sisp/commit/33d79aca6e5d7d82d179a105837a06bee2874c46))
* enhance UI components and improve animations across landing page ([30b93b1](https://github.com/nestorzamili/sisp/commit/30b93b1bb8fa69531f164973e583e329d034ef64))
* **forms:** update input fields to improve read-only and disabled states ([6330a42](https://github.com/nestorzamili/sisp/commit/6330a423f5f7de9aa97bb081be40e0c5c05e27e9))
* **home:** enhance loading and error states with updated styles ([49f6cae](https://github.com/nestorzamili/sisp/commit/49f6cae69fde4bbdbe0a3b15c0469a7ec7f9376a))
* **home:** update background styles for loading, error, and empty states ([befffe7](https://github.com/nestorzamili/sisp/commit/befffe7f55828005b21a49513fc0cfd0fa255058))
* **home:** update loading animation and welcome section styling for improved UI consistency ([06bb3e3](https://github.com/nestorzamili/sisp/commit/06bb3e38a5e4465d141ffa3d1a4738b69e9841bb))
* improve error handling in user authentication process ([6fdb751](https://github.com/nestorzamili/sisp/commit/6fdb751b95b3becd06a551858c67e21fc0bb41e4))
* **layout:** update background color and main width for improved layout consistency ([49f6cae](https://github.com/nestorzamili/sisp/commit/49f6cae69fde4bbdbe0a3b15c0469a7ec7f9376a))
* **priority-needs:** replace getCurrentYear with getCurrentAcademicYear for consistency ([0db2550](https://github.com/nestorzamili/sisp/commit/0db25504a877fda1744d8a2465234f913de6e64f))
* remove rombelKelas fields from student data actions and forms ([b906774](https://github.com/nestorzamili/sisp/commit/b90677424d51d9dd87597f21f56f138f1d18fb95))
* remove unused checkNpsnExistsAction function ([1d0078c](https://github.com/nestorzamili/sisp/commit/1d0078c4fb2bccb2962dd9cbf7505deecc4781ba))
* **school-info-form:** fix formatting for select component ([49f6cae](https://github.com/nestorzamili/sisp/commit/49f6cae69fde4bbdbe0a3b15c0469a7ec7f9376a))
* **sekolah:** disable sorting for certain columns in sekolah table ([85334d1](https://github.com/nestorzamili/sisp/commit/85334d1bdddc026ce8f8ab9503bfb8bc0b91da1e))
* **sekolah:** standardize status values to uppercase and update related filters ([dc7a800](https://github.com/nestorzamili/sisp/commit/dc7a80081221ccd5cca1d29c349e510da93ed89d))
* **step-indicator:** adjust spacing and styles for better visual alignment ([49f6cae](https://github.com/nestorzamili/sisp/commit/49f6cae69fde4bbdbe0a3b15c0469a7ec7f9376a))
* streamline loading states and alerts in authentication forms ([6e9184d](https://github.com/nestorzamili/sisp/commit/6e9184db634b99300f2af7cd43b893cb0ef51f33))
