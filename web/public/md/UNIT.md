# UNIT (Intern Java Developer)

This blog will summarize my work experience and will be updated weekly. I
started working as an Intern Java Developer at Unit Technology Corporation.

---

## Week 1 (14/2/2023 - 17/2/2023)

Setting up the environment to work with Java version 1.8:

- JDK
- Maven
- Eclipse (Most employees use but I use VSCode instead, it works quite well with
  all the required extensions installed like Language Support for Java, and
  Spring Boot Dashboard)

Create a Spring project about a book management system with the following
features:

- Show books (Title, author, published year)
- Add book (from user input or API of popular libraries like Gutendex,
  OpenLibrary)
- Edit book
- Delete book
- Search book

Use [Lombok](https://projectlombok.org/) to auto-generate Getter, Setter, and
Constructor with all or no arguments.

Create a local [PostgreSQL](https://www.postgresql.org/) database to store book
information.

Later change to
[SQLServer](https://www.microsoft.com/en-us/sql-server/sql-server-2022) because
the company sometimes uses the Microsoft SQL server.

Use [MirageSQL](https://github.com/mirage-sql/mirage) which integrates well with
Spring framework to query data with
[2WaySQl](https://github.com/mirage-sql/mirage/wiki/2WaySQL#whats-2waysql)

## Week 2 (20/2/2023 - 24/2/2023)

Create web pages to show a list of all books. Use
[Thymeleaf](https://www.thymeleaf.org) to get data from the controller and show
it on the screen.

Create a [Pagination](https://www.baeldung.com/spring-thymeleaf-pagination) to
only show 10 book titles at a time.

Add feature export to Excel file (XLSX) with the correct format of the current
screen. This feature uses
[Apache POI](https://poi.apache.org/) to work with Excel files.

Add the import Excel feature by reading a multipart file from the user, checking
if the file is in Excel format, and going through each row to add data. If there
are errors, then change the color of the error cell.

Validate user input from two sides, the front end and the server. Validate with
regular expression e.g. Username only has alphanumeric value, no special
character.

Use a logger to log info and error.

## Week 3 (27/2/2023 - 3/3/2023)

Export to file Word (Docx) and PDF. Using
[xdocreport](https://github.com/opensagres/xdocreport) to export. To export,
create a template file in docx. There are two ways to create a template
Freemaker and Velocity. I choose the Velocity style to make templates.

Create Rest API server (have to disable cors to log in through API because there
is a hidden field \_csrf add to the login input form, or you can manually copy
and paste the hidden field every time you log in).

Use SQL Server instead of PostgreSQL and try function and store procedures.
Create more tables to work with foreign keys and constraints.

## Week 4 (6/3/2023 - 10/3/2023)

Get book information from Gutendex (no published year) and Crossref through
their API service.

Have the self-project checked by my direct manager, get feedback, comments, and
guide for improvements such as a better page system (show Page x of y with a
button to show all pages), add confirm box when deleting an item, only deleting
logical (add a column like isDeleted and set value type bit, only show to user
exist book)

Improve the overall look by adding \* to required fields, adding color, and
showing a message if changes are applied successfully or unsuccessfully.

## Week 5 (13/3/2023 - 17/3/2023)

Start joining the dev team. First read the guideline to understand the team
workflow (Redmine, Gitlab, Microsoft Teams), coding convention, format rules,
etc.

The workflow to fix a bug is as followed:

1. First, a tester will find a bug with the program and create a redmine
   description, and assign the bug to the tech lead.
2. Then the tech lead will allocate the bug to a dev member
3. The dev team will see the issue and first update the Redmine status from
   `New` to `In progress`
4. After fixing the bug, create a commit and make a merge request to the dev
   branch with the title `[TamTH] Bug #83096 [Report email][Export] Wrong 
display order`. The title is the same as the Redmine title.
5. Then update the Redmine issue as follow:
   - Change the assignee from me to the tester
   - Add comments and images/videos of the program working as intended
   - Change the progress percent to max 90% or depending on the issue
   - Change status from `In progress` to `Resolved`

Fix the first bug assigned. Data shown on the screen and export are different.
Fix by adding one more condition to the SQL file that performs the query.
(Because the original sorting condition have the same value for some row so the
database sort differently when showing on screen and exporting)

Help the tester find bugs with the UI. Start from the login page, checking if
there are any errors (grammar, alignment, ...).

Working with Postman to mimic API calls to the server to debug problems. Create
a folder hierarchy to represent the different web pages.

## Week 6 (20/3/2023 - 24/3/2023)

Fix export with missing data. Edit the SQL file that gets the export information
by adding CONCAT.

Then learn how the logging system works [SLF4J](https://www.slf4j.org/).
It uses the application properties to set the Log level for the root and each
package if needed. There are five levels of log:

**_Trace -> Debug -> Info -> Warn -> Error_**

The log level is set to only log from the current level up. E.g. Setting the log
level to info will log Info, Warn, and Error. Set the log level to Debug will
log Debug, Info, Warn, and Error.

The config for the log is defined by an XML file (or application.properties). Things
to customize can be log pattern, log folder, and the rule to archive log.

## Week 7 (27/3/2023 - 31/3/2023)

Reading the source code to understand more about how the system work. Report to
the Tech lead.

Flow:

- First start the local API server and local front end (the front end is
  optional but very convenient when connecting to the API server without
  calling through Postman)
- Then going through each page to see what API path is called
- See which database is used and which table(s) are accessed when loading a page

## Week 8 (3/4/2023 - 7/4/2023)

Add a search condition by adding one more request param to the existing API

Join new projects to add some basic features

- Showing the result of formula cells when exporting to Excel
- Change some color of the website
- Change the export Excel template color

And fixing bugs found by testers and by myself

- Grammar error on the website
- A wrong number of pages show

## Week 9 (10/4/2023 - 14/4/2023)

Working with a new project, fixing bugs related to languages (Vietnamese and
English translation), and hiding or changing some data according to request.
Bulk change data in the database.

Going through a project to check all actions (save, edit, delete) to see if
the user has permission to access the view and permission to perform or not.

Start working on a new project, and fix PENTEST (penetration testing) problems
with other teammates.

- Cross-Origin Resource Sharing problems
- Sensitive information (username, code) showed on URL with GET method

I mainly fix the sensitive information shown. First I start the website and go
through all pages one by one to look for the place where the sensitive
information appeared on the API call. Then I will note all link that needs to be
fixed to a Google Sheet for my team to track. After that, I started looking in
the code and change the GET method to POST. For API that requires params on the
path, I change it to RequestBody.

## Week 10 (17/4/2023 - 21/4/2023)

Start working with [e-Form by OZ](https://edu.ozeform.io/). E-Form is an online
form that can be used to reduce the work of both the Back-end and Front-end. By
creating an eForm with the OZ design app, the form can be filled online and all
data is consistent and mapped correctly. Some advantages of eForm compared to
paper:

- Save the cost of printing, reduce waste
- Can be filled faster, and easier, from anywhere with the Internet
- More accurate because of automation, input validation
- Improve efficiency and performance (create a form once and reuse it, data is
  collected automatically)

Learn how to work with the OZ designer app. Create a form with changing data
based on the param passed in.

## Week 11 (24/4/2023 - 28/4/2023)

Writing new API for OZ Form, to see a list of forms, get form detail, save form
input, and export form to PDF.

Colab with the front-end team to make a demo
page to interact with the forms.

## Week 12 (4/5/2023 - 5/5/2023)

Finishing week 11 work and testing all new features. Fix some language problems in
the front end (support both Vietnamese and English)

## Week 13 (8/5/2023 - 12/5/2023)

Research about [Business Process Model Notation (BPMN)](https://www.bpmn.org/).
This helps the business and technical team (business analysts, technical
developers, and business managers) work together easier to create a product that
is suitable for both sides. BPMN has a process-oriented approach, which shows
the user how many steps are needed, and how much time is allowed for each step.
BPMN uses a Flow Chart to represent how a system will work with some level of
detail.

BPMN has four main elements:

- Flow objects:
  - Event: represent with a circle to denote something that happens.
  - Activity: represent with a rounded-corner rectangle and describe a work that
    can be done. Activity can be atomic (a single kind of work) or compound
    (Sub-Processes)
  - Gateway: represent with a diamond shape to indicate the forking and merging
    of paths, depending on the conditions.
- Connecting objects:
  - Sequence Flow: a solid line with an arrow, to show the order of activities
  - Message Flow: dashed line with an open arrow, to show messages flow across
    organizational boundaries (between pools)
  - Association: it is used to associate an Artifact or text to a Flow Object
- Swin lanes:
  - Pool: to separate different organizations, and have many lanes.
  - Lane: to organize and categorize activities within a pool according to function or role.
- Artifacts:
  - Data objects: which data is involved in the process.
  - Group: represented with a rounded-corner rectangle and dashed lines. Group different activities but the flow remains unchanged.
  - Annotation: give a clear and understandable impression.

Learn about [Camunda 7](https://docs.camunda.org/manual/7.19/). It is a
lightweight, open-source platform for Business Process Management (BPM).
Camunda provides an application called Camunda Modeler to create BPMN, and a
runtime script to create a server to start a process, give input to forms, and
complete tasks. I have tried creating some simple processes and adding gateways to change the task route depending on the input.

## Week 14 (15/5/2023 - 19/5/2023)

Keep learning about Camunda, focus on the API documents, how to start a process,
change the step, and provide information for forms.

The flow for one process/task is like this:

1. Start the process, call the API /engine-rest/process/{key}/start
2. Start the task
3. Provide input for the task, and have someone as a maker or checker.
4. Act on the task (Approve, Reject, Assign, Submit, Complete)
5. Change step

Attend a meeting to understand more about the system design. The main idea of
the meeting is:

- Authentication, authorization
- Basic auth, Token, Session
- Function permission, data permission
- Process permission
- Audit trail, audit logs

## Week 15 (22/5/2023 - 26/5/2023)

Work with a team member to help clone and merge an old source to a new project.
Modify the e-Form to check the user role.
If the user has the role to input data into the form then enable all the fields, and allow the user signing.
If the user only has the role to check and validate the form then the user can only see the form and sign in their part.

Create new e-Forms that mimic the given Microsoft Word files (doc file). I have to create an Excel that list of all parameters that each form used. These parameters will be stored as a Java object and help transfer, store, and display information.

## Week 16 (29/5/2023 - 31/5/2023) - Last week of Intern

This is the last week of my internship, I spent my time finishing up the tasks I had in the previous week.
I complete all the e-Forms that were assigned to me in the previous week and received five new Doc files to transform to e-Form.
I have noted all parameters used in the forms.
Because I have limited time so I can only create an e-Form for only one file because the file is long (about 13 pages).
The remaining files are assigned to another member of the division.
