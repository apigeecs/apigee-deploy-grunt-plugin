README.md
====

Switching to JMeter framework to run tests is as easy as following these steps:

#### **Step 1:**
Copy pom.xml file to root folder (where Gruntfile.js file resides)
#### **Step 2:** 
Copy tests jmx and data files to tests root folder
#### **Step 3:** 
Enable shell task to run run_jmeter_tests in Gruntfile.js

That's it! You can now run JMeter tests from Grunt through Maven. ```grunt shell:run_jmeter_tests```.