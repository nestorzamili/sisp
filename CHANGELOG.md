# Changelog

## [1.5.0](https://github.com/nestorzamili/sisp/compare/v1.4.1...v1.5.0) (2025-06-27)


### Features

* add broadcast notification system with history and stats components ([7e5593d](https://github.com/nestorzamili/sisp/commit/7e5593d962e28e8137eec56417082b1abb4c29df))
* Add school report and summary report templates with detailed data processing ([bd36208](https://github.com/nestorzamili/sisp/commit/bd3620868e8d6a9f0b3d4a3e24dc772afd1d0ac8))
* **logger:** add pino for logging ([988a657](https://github.com/nestorzamili/sisp/commit/988a657cbeb9d3ce9395b49d7d979c391a124c32))


### Bug Fixes

* **auth:** enhance logger configuration for better debugging ([acb0460](https://github.com/nestorzamili/sisp/commit/acb0460da573aa52d07d6ab1077fb2fe29bd17de))
* **auth:** implement new authentication layout and middleware logic ([cb1da85](https://github.com/nestorzamili/sisp/commit/cb1da853105459906fd9653e98c9a8f9c986e131))
* **landing:** remove route /landing ([0c7f02f](https://github.com/nestorzamili/sisp/commit/0c7f02fb8de15442dc0286751a827b48e98e4f69))
* **report:** improve error handling for empty sekolah data in report generation ([c5f88a2](https://github.com/nestorzamili/sisp/commit/c5f88a2610f52956a5e6fd0fb7d8fc82e9e9c3d2))
* **robots:** add '/cdn-cgi/' to disallowed paths for all user agents ([676421e](https://github.com/nestorzamili/sisp/commit/676421e55f37df21c3efc3ebb1977e31db4a19b9))
* **summary-report:** adjust font size for table header cells to improve readability ([54df8ae](https://github.com/nestorzamili/sisp/commit/54df8ae81f85b03e5f586be9a704efd661d6156f))
* **summary-report:** adjust pdfLogo dimensions and position for better layout ([b2e7469](https://github.com/nestorzamili/sisp/commit/b2e746998385f8e288b4d30f32cf2dd5a42aff26))
* **template:** update email verification template text for clarity ([fb7f984](https://github.com/nestorzamili/sisp/commit/fb7f9843d0e835219190a75feb302230d6268906))


### Code Refactoring

* **auth:** streamline authentication layout and session handling ([7b2f008](https://github.com/nestorzamili/sisp/commit/7b2f0089741e7f22366e9756767b0b8da9ee71c2))
* **broadcast:** remove unused useEffect and update submission error message logic ([86424c7](https://github.com/nestorzamili/sisp/commit/86424c752680d6d946a77e142600892a7d02f973))
* **formulir:** enhance initial data functions for form steps ([dcbaf3a](https://github.com/nestorzamili/sisp/commit/dcbaf3acaf21aa360dda4e8170cc8bc654e96b51))
* **formulir:** implement data transformation functions for form submissions ([8a2c550](https://github.com/nestorzamili/sisp/commit/8a2c550603608f2a2197af96c44a9d8758dcd821))
* **formulir:** Implement formulir actions and service for school data management ([bf10eb2](https://github.com/nestorzamili/sisp/commit/bf10eb201ec9281460a85542e7cf532aebd40127))
* **formulir:** improve loading state UI for form submissions ([5aeb16b](https://github.com/nestorzamili/sisp/commit/5aeb16bbb082402fb712e1f5c49c42be10d9c130))
* **notification:** optimize broadcast notification handling and statistics ([833df56](https://github.com/nestorzamili/sisp/commit/833df56fd6ab50cd4a0be2b64d22a3cc49b65b61))
* **notifications:** clean up whitespace in notification dropdown component ([b20c95d](https://github.com/nestorzamili/sisp/commit/b20c95d278b10561442bc4de93c81f8678eb0385))
* **notifications:** enhance notification fetching and state management ([ca6d6f3](https://github.com/nestorzamili/sisp/commit/ca6d6f3fda6574f781c527ded5a372eb75c31196))
* **notifications:** remove unused markAsRead prop and related logic ([85ea377](https://github.com/nestorzamili/sisp/commit/85ea3773133f59e33978da1a5d21b1a54b4e3ea6))
* remove unused methods and consolidate review data handling ([f9a1dd3](https://github.com/nestorzamili/sisp/commit/f9a1dd34a42b8c12d91c4c3e2e535995b1732ac9))
* **school-report:** remove unused convertToRoman function and simplify chunkArray implementation ([43765b7](https://github.com/nestorzamili/sisp/commit/43765b7fa76669f6dcc5d1670e9147d781683d4a))
* **sekolah:** remove unused sekolah statistics and guru types ([0774845](https://github.com/nestorzamili/sisp/commit/07748452d68e26a751084700fe4e52fdf698deb6))
* **summary-report:** streamline styles and modularize table components for improved readability ([9c90518](https://github.com/nestorzamili/sisp/commit/9c90518206998fc7cae4b2034ff33471c690ffc6))
* update button text and improve styling in multiple components ([949988e](https://github.com/nestorzamili/sisp/commit/949988e9462656f703584a5e2e9e170ee45cd77f))

## [1.4.1](https://github.com/nestorzamili/sisp/compare/v1.4.0...v1.4.1) (2025-06-21)


### Bug Fixes

* **auth:** correct email recipient in change email verification process ([aa4109a](https://github.com/nestorzamili/sisp/commit/aa4109aa7d7592c908b304642d69c658daad3ec1))
* **auth:** correct parameters order in change email verification template ([3c2d2fc](https://github.com/nestorzamili/sisp/commit/3c2d2fc54dcb035e5e240133a179530111309b0c))
* **auth:** enhance logger configuration and update rate limit custom rules ([d3c1f91](https://github.com/nestorzamili/sisp/commit/d3c1f91ed7cd896d74806222a473fa30e681d400))
* **auth:** implement change email verification process and rate limiting model ([c634b74](https://github.com/nestorzamili/sisp/commit/c634b74eb4779819931570b2d7ddf3b0ca164a05))
* **auth:** swap ipAddress header positions for better tracking ([78e08ce](https://github.com/nestorzamili/sisp/commit/78e08ce3fb724e17c8774006328d23fd6bfb3da4))
* **auth:** update authentication middleware and session handling ([d072c11](https://github.com/nestorzamili/sisp/commit/d072c11b95026da8f47ec6fb1115d31e7ebd1a3c))
* **command-menu:** update theme labels to local language ([8dc4d1a](https://github.com/nestorzamili/sisp/commit/8dc4d1a639acc38ddf80034112de96c21b9fd78d))
* **email:** add Change Email Verification template ([8b5f85d](https://github.com/nestorzamili/sisp/commit/8b5f85d3d53765cce9963566379eb96ac8a1a266))
* **middleware:** improve session handling and route redirection logic ([f44855e](https://github.com/nestorzamili/sisp/commit/f44855e482f4bf080b4cbca0ce4ac037b12033b8))
* **not-found:** enhance 404 error page design and content ([380bd28](https://github.com/nestorzamili/sisp/commit/380bd288c23a9fd31456e53d0f9f66794704e727))

## [1.4.0](https://github.com/nestorzamili/sisp/compare/v1.3.0...v1.4.0) (2025-06-20)


### Features

* implement user profile management with form validation and image upload ([72baec3](https://github.com/nestorzamili/sisp/commit/72baec3f24830edd4524f9dd2b06a43b201a3160))


### Chores

* comment out rate limit configuration in auth module ([18b3103](https://github.com/nestorzamili/sisp/commit/18b31038d65e2b7f3f74d0bca9eedd137f9eb98f))
* disable push trigger in release workflow and remove release manifest ([0ddc651](https://github.com/nestorzamili/sisp/commit/0ddc651b73655f4881f3b98c1310acb1bb88b173))


### Code Refactoring

* **data-completion:** streamline data completion checks and add lampiran validation ([3654bc4](https://github.com/nestorzamili/sisp/commit/3654bc428dd5ec3568510fd1feb6e75bc6c7fb05))
* enhance accessibility and semantics in landing components ([01095be](https://github.com/nestorzamili/sisp/commit/01095be7aefe5199d23bc2f5d733183ea663e920))
* **header:** improve mobile menu styles and spacing ([fee7661](https://github.com/nestorzamili/sisp/commit/fee7661f9ccf3968b3b79bef92bdb9ac75f78e49))
* **middleware:** enhance route handling for robots.txt and sitemap.xml ([d158576](https://github.com/nestorzamili/sisp/commit/d1585762e09f0c00a4155ddd012717ff05f410f4))
* **next.config:** enhance configuration settings for image handling and performance ([8a3c480](https://github.com/nestorzamili/sisp/commit/8a3c480f50e346e7d7f08083c948fe91373150f8))
* **prasarana-tab:** replace table implementation with DataTable for improved data handling ([c1255bf](https://github.com/nestorzamili/sisp/commit/c1255bffdfcf410547b5286c5971a55123a0ae1e))
* **sarana-tab:** replace table implementation with DataTable for enhanced data management ([c1255bf](https://github.com/nestorzamili/sisp/commit/c1255bffdfcf410547b5286c5971a55123a0ae1e))
* update Coming Soon component text and add Help Center page ([156d5be](https://github.com/nestorzamili/sisp/commit/156d5beaf1e25d03b7974ab9d6139b9dad581297))
* update database schema and error handling components ([dfa8810](https://github.com/nestorzamili/sisp/commit/dfa88101bdc445366762d814832c07ca170541fc))
* update labels and improve table structure in recent sekolah and approval components ([1ecc950](https://github.com/nestorzamili/sisp/commit/1ecc9505535963ae22b24cbc67c40c2512df7f25))
* update README for clarity and consistency ([b3b528d](https://github.com/nestorzamili/sisp/commit/b3b528d4318a58a7ac24179d8f5640628377e147))

## [1.3.0](https://github.com/nestorzamili/sisp/compare/v1.2.5...v1.3.0) (2025-06-19)


### Features

* add BackButton component and integrate it into NotFound page ([7fd2ca0](https://github.com/nestorzamili/sisp/commit/7fd2ca0391ee2b93be097e59792cba1ae834dc54))
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

* **auth:** update rate limit model name and increase max requests ([0f81c6b](https://github.com/nestorzamili/sisp/commit/0f81c6bec9646bf9827312ef38e478ad7a05dcae))
* **auth:** update rate limit model name to 'RateLimit' ([c580fa6](https://github.com/nestorzamili/sisp/commit/c580fa6022b027280cb2a83da90448acc83b826c))
* **deps:** update better-auth to version 1.2.9 and kysely to version 0.28.2 ([a65d52b](https://github.com/nestorzamili/sisp/commit/a65d52bf37b427027d4e25f95d58d860202d7cf6))
* **footer:** update footer text for accuracy ([8796f9f](https://github.com/nestorzamili/sisp/commit/8796f9f821f28f185e1430b8a376ad5554979abb))
* **header:** remove framer-motion for mobile menu and improve performance ([8796f9f](https://github.com/nestorzamili/sisp/commit/8796f9f821f28f185e1430b8a376ad5554979abb))
* **layout:** update layout styles for improved responsiveness ([6ecbe09](https://github.com/nestorzamili/sisp/commit/6ecbe0956c6bf89aad3155ad5cb5733c57741637))
* mapping admin and user route, and middleware ([b26d5b9](https://github.com/nestorzamili/sisp/commit/b26d5b9e8b28cf5123b0b6abaaefe17e23f5295d))
* **middleware:** refine matcher to exclude additional image file types ([0f81c6b](https://github.com/nestorzamili/sisp/commit/0f81c6bec9646bf9827312ef38e478ad7a05dcae))
* revise routing ([b11d69a](https://github.com/nestorzamili/sisp/commit/b11d69afe89504d14b2bae38d016fda4776b677c))
* **sidebar:** update icon for Sekolah navigation item ([87051c0](https://github.com/nestorzamili/sisp/commit/87051c039b3b493853270f06f2be408b369ab6c4))
* **stats-cards:** correct spelling and update descriptions for clarity ([450562c](https://github.com/nestorzamili/sisp/commit/450562c244e88fb87076b2f98006513d2daedf98))
* update bootstrap-sha in release configuration ([195ad6c](https://github.com/nestorzamili/sisp/commit/195ad6cda8545afccc12086f643850e153b98045))
* update environment variables and database schema ([26fb6b3](https://github.com/nestorzamili/sisp/commit/26fb6b312affcf45fa55f4eb99ba0ffa0ba97d5c))
* update logo file extension from .svg to .png in footer, header, app-header, and sidebar data ([5446163](https://github.com/nestorzamili/sisp/commit/5446163ea31ace267d708cc05ac758a911dc6d25))


### Chores

* ensure output is set to standalone in next.config.ts ([e25f829](https://github.com/nestorzamili/sisp/commit/e25f8299c00fb95e8d3e815c1d0d8dda10dc7abd))
* fix indentation in docker-build.yml workflow ([36dedaa](https://github.com/nestorzamili/sisp/commit/36dedaab5005e2a6f0fea11249f03d61a4d36a6c))
* **globals.css:** add performance optimized animations for hero section ([8796f9f](https://github.com/nestorzamili/sisp/commit/8796f9f821f28f185e1430b8a376ad5554979abb))
* **layout:** preload critical images and add DNS prefetch for external resources ([8796f9f](https://github.com/nestorzamili/sisp/commit/8796f9f821f28f185e1430b8a376ad5554979abb))
* **main:** release 1.0.0 ([9ea4e50](https://github.com/nestorzamili/sisp/commit/9ea4e50d645acf8117fa27d3c9f6b76cf646824e))
* **main:** release 1.1.0 ([65741f6](https://github.com/nestorzamili/sisp/commit/65741f6b6698c7bce9c9bfe57976972e9d12dab7))
* **main:** release 1.2.0 ([0d063e1](https://github.com/nestorzamili/sisp/commit/0d063e10d2a2a0621c80038c56f6d3a0b7698063))
* **main:** release 1.2.1 ([679f7ff](https://github.com/nestorzamili/sisp/commit/679f7ff8d0b21da0fd80d780703243e8a5208039))
* **main:** release 1.2.2 ([299e196](https://github.com/nestorzamili/sisp/commit/299e196fd4ea44fa6b29b737ba9ef67b03f40284))
* **main:** release 1.2.3 ([39b1640](https://github.com/nestorzamili/sisp/commit/39b164095dd1b653b5d9e6463dece3428e71fc29))
* **main:** release 1.2.4 ([fe475e4](https://github.com/nestorzamili/sisp/commit/fe475e470e8a7bd5bd67bf2df18902d88ae0e891))
* **main:** release 1.2.5 ([0d74d75](https://github.com/nestorzamili/sisp/commit/0d74d75bb48a6b8b01be2cf5996a08eb31571484))
* remove AppHeader documentation file ([6e1a664](https://github.com/nestorzamili/sisp/commit/6e1a664fa436a6f032b004acdb360d2cb957f50e))
* remove push trigger from Docker build workflow ([c88559e](https://github.com/nestorzamili/sisp/commit/c88559ef1984ea1853c96262394c8c35ce7ebf48))
* reset versioning to 0.0.0 ([824808e](https://github.com/nestorzamili/sisp/commit/824808e1d75dbbf1729bf0051716b73fe05e66ad))
* update middleware baseURL handling and matcher regex ([ff6d056](https://github.com/nestorzamili/sisp/commit/ff6d0569a1b9f936a0a20fc8759e1ce4fdb44490))
* update middleware matcher to exclude image file types ([7558db6](https://github.com/nestorzamili/sisp/commit/7558db684ce1f6513345806727ef6cb6190b074f))
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
