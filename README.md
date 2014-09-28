<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](http://doctoc.herokuapp.com/)*

- [Why do we need another tool to manage the API Development Lifecycle for Apigee?](#why-do-we-need-another-tool-to-manage-the-api-development-lifecycle-for-apigee)
- [Steps to get started](#steps-to-get-started)
- [Supported tasks](#supported-tasks)
      - [execute end-to-end lifecycle and overwrite revision (keep the same revision id)](#execute-end-to-end-lifecycle-and-overwrite-revision-keep-the-same-revision-id)
      - [get all deployed api revisions](#get-all-deployed-api-revisions)
      - [undeploy api revision](#undeploy-api-revision)
      - [import API bundle without deploying it](#import-api-bundle-without-deploying-it)
      - [configuration management](#configuration-management)
      - [builds zip bundle under target directory](#builds-zip-bundle-under-target-directory)
      - [check all tasks available](#check-all-tasks-available)
- [Node.js Deployment](#nodejs-deployment)
- [JavaCallout Policy Support](#javacallout-policy-support)
- [Search and Replace Functionality](#search-and-replace-functionality)
- [Continuous Integration with Jenkins](#continuous-integration-with-jenkins)
- [API Static Code Analysis](#api-static-code-analysis)
  - [JSHint](#jshint)
  - [ESHint](#eshint)
- [Reusability of code with Maven Plugins and shell scripts/command line tools](#reusability-of-code-with-maven-plugins-and-shell-scriptscommand-line-tools)
- [Contributing](#contributing)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


# Why do we need another tool to manage the API Development Lifecycle for Apigee?

* Shell scripts are good for small tasks, but they can become too complex to maintain and reuse as your API tasks grows. And Java, writing Maven plugins is no fun.
* Pluggable environment (thousands of npm and grunt modules and plugins)
* Grunt is perfect for adding those custom tasks in a heartbeat. See [Tasks directory](https://github.com/apigeecs/apigee-deploy-grunt-plugin/tree/master/tasks)
* Pure JavaScript and Node.js. Enough said right :-)
* Compresses Node.js (node_modules, resources, and public directories)
* Support of JavaCallout Policies. Compiles, package and include Java library dependencies.
* Compatible with all CI tools Jenkins, Bamboo, Go, Travis
* Ready for TDD with Mocha.js and Chai. See [tests directory](https://github.com/apigeecs/apigee-deploy-grunt-plugin/tree/master/tests).
* Includes static code analysis with [JSHint](http://www.jshint.com/) and [ESLint](http://eslint.org/)
* Easier to troubleshoot. cURL command support. Just pass ```--curl=true```
* Search and replace files content with RegEx, string patterns, or XPath. See string-replace and xmlpoke tasks in Gruntfile.js
* Include files dynamically from common git submodule to promote DRY (Don't Repeat Yourself) principle (check search-and-replace.js entries)
* Compatible with IDEs. See [Chrome Grunt Dev Tools](https://chrome.google.com/webstore/detail/grunt-devtools/fbiodiodggnlakggeeckkjccjhhjndnb?hl=en) and [Grunt Task Runner for Web Storm](http://www.jetbrains.com/webstorm/webhelp/using-grunt-task-runner.html)
* It's Compatible with Maven. See tools to enable Proxy Dependency Maven Plugin. See pom.xml under [Tools directory](https://github.com/apigeecs/apigee-deploy-grunt-plugin/tree/master/tests)

# Steps to get started

* **Step 1:**  setup Apigee Edge credentials as system environment variables ae_username and ae_password or just pass credentials as arguments
* **Step 2:** install [grunt cli](http://gruntjs.com/getting-started#installing-the-cli) ```sudo npm install grunt-cli -g```
* **Step 3:** execute ```npm install``` to install all grunt dependencies
* **Step 4:** setup profiles element in apigee-config.js for each environment. Each environment will be referenced below as a flag e.g. --env={test, prod}
* **Step 5:** setup config element in apigee-config.js for string replacements for each file

# Supported tasks

#### execute end-to-end lifecycle and overwrite revision (keep the same revision id)
```grunt --env=test --username=$ae_username --password=$ae_password --debug --curl=true```

**Note: debug flag to includes API responses.**

#### Test what you just deployed
Once previous is executed, you should be able to try the following calls:

##### Use apigee gateway and with Yahoo Weather standard Target
```
https://{org-env}.apigee.net/{api-basepath}/apigee/forecastrss?w=2502265
```

Example ```https://testmyapi-test.apigee.net/weathergrunt/apigee/forecastrss?w=2502265```

##### Use apigee gateway calling Yahoo Weather through Apigee Node.js as Target
```
https://{org-env}.apigee.net/{api-basepath}/forecastweather_node/2502265
```

Example ```https://testmyapi-test.apigee.net/weathergrunt/forecastweather_node/2502265```

##### Use apigee gateway retrieving static content through Node.js as Target
```
https://{org-env}.apigee.net/{api-basepath}/images/tree.jpg
```

Example ```https://testmyapi-test.apigee.net/weathergrunt/images/tree.jpg```

##### Use apigee gateway retrieving static content through Node.js as Target (nested folder)
```
https://{org-env}.apigee.net/{api-basepath}/tree.jpg
```

Example ```https://testmyapi-test.apigee.net/weathergrunt/tree.jpg```

##### Use apigee gateway leveraging a JavaCallout policy
**Disable by default. Read section below for enabling directions.**
```
https://{org-env}.apigee.net/{api-basepath}/javacallout
```

Example ```curl https://testmyapi-test.apigee.net/weathergrunt/javacallout```

#### execute end-to-end lifecycle and keep last revision (increases revision id)
```grunt --env=test --username=$ae_username --password=$ae_password --debug --keep-last-revision=true```

#### get all deployed api revisions
```grunt getDeployedApiRevisions --env=test --debug```

#### undeploy api revision
```grunt undeployApiRevision:{revision_id} --env=test --debug```

#### undeploy api revision
```grunt deployApiRevision:{revision_id} --env=test --debug```

#### get all api revisions
```grunt getAllApiRevisions --env=test --debug```

#### import API bundle without deploying it
```grunt importApiBundle --env=test --debug --debug```

#### delete a revision
```grunt deleteApiRevision:{revision_id} --env=test --debug```

#### configuration management
See apigee-config.js file.

#### builds zip bundle under target directory
```grunt compress --env=test```

#### clean Target directory
```grunt clean --env=test```

#### check all tasks available
```grunt --help``` or ```grunt availabletasks --env=test``` will display a nicer colored output.

#### supported arguments and flags
```
--username={apigee_edge_username}
```

```
--password={apigee_edge_password}
```

```
--keep-last-revision
```

```
--skip-tests=true
```

```
--curl generate curl commands to be executed from command line
```

```
--override
```

```
--delay={seconds}
```

Node.js Deployment
====
In order to compress node.js modules, it's required node directory to exist in the root folder. By default node_modules, public, and resources are generated as part of the build. Compress configuration in Gruntfile.js can be modified to include any other configuration.

JavaCallout Policy Support
====
This task comes disabled by default to prevent issues from OS environments (MacOS and Windows). To enable, remove comments from shell task in Gruntfile and customize as directions below.

JavaCallouts are currently supported by leveraging [grunt-shell npm package](https://www.npmjs.org/package/grunt-shell). Therefore, compilation and packaging steps are dependent on your local installation of javac and jar tools. Source code directories must be located under java/src directory and any jar dependencies under java/lib directory. See Gruntfile.js shell task for more details.

Note: Since javac requires to know where .java files are located, it is required to include java callout separated by spaces in shell javaCompile target.

For instance:
```
javac -sourcepath ./java/src/**/*.java -d ./target/java/bin -cp java/lib/expressions-1.0.0.jar:java/lib/message-flow-1.0.0.jar:jar:java/lib/message-flow-1.0.1.jar **java/src/com/example/SimpleJavaCallout.java**
```

Search and Replace Functionality
======

####String
Ability to search and replace strings from text files that match any pattern in Regex or string. See conf/search-and-replace-files.js to setup per environment. This task leverages [grunt-string-replace module](https://www.npmjs.org/package/grunt-string-replace). See conf/search-and-replace-files.js for an example.

####Include files from common Git submodule
Ability to search and include content from files is also provided by string-replace task. See examples under conf/search-and-replace-files.js that include fragments from common folder for fragments (multiple steps), policies, and JavaScript files. Note common folder leverages [Git Submodule](http://git-scm.com/book/en/Git-Tools-Submodules), which resides in a separate branch under the same repository. This allows reusing code across multiple APIs without adding more complexity.

Continuous Integration with Jenkins
======
[This repo provides a guide for setting up an instance of Jenkins with Grunt](https://github.com/dzuluagaapigee/apigee-ci-jenkins-git-maven-jmeter) to deploy and configure an API bundle.

API Static Code Analysis
========
This plugin is enabled to provide feedback about coding best practices for JavaScript.

JSHint
--------
JSHInt provides a large set of configurable (options)[http://www.jshint.com/docs/options/] that can be enabled out-of-the-box.
See jshint task in Gruntfile.js

ESHint
--------
ESLint provides an pluggable framework to enable static code analysis. In contrast to JSHint, ESLint can be extended to write custom API specific rules. See conf/rules/if-curly-formatting.js rule and conf/eslint.json to manage alerts.
See ESLint Gruntfile.js section

Reusability of code with Maven Plugins and shell scripts/command line tools
=====
Grunt plugin can be extended to support plugins, shell script or any other command line tools. For instance Proxy Dependency Maven Plugin includes an example of a [pom.xml](https://github.com/apigeecs/apigee-deploy-grunt-plugin/tree/master/tools/proxy-dependency-maven-plugin).

Contributing
=====
If you would like to contribute, simply fork the repository, push your changes to a branch and send a pull request:
1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

Typo fixes, improvements to grammar or readability, it's all welcome.

## License

Copyright (c) 2014 Diego Zuluaga (twitter: @dzuluaga)
Licensed under the MIT license.
