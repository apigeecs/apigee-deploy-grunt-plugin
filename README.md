[![Build Status](https://travis-ci.org/apigeecs/apigee-deploy-grunt-plugin.svg?branch=master)](https://travis-ci.org/apigeecs/apigee-deploy-grunt-plugin)

![apigee-deploy-grunt-plugin](https://www.dropbox.com/s/5tgy3fpyud5skhv/Apigee%20Deploy%20Grunt%20Plugin%20logo2.png?dl=1 "apigee-deploy-grunt-plugin-logo")

![apigee-deploy-grunt-terminal](https://www.dropbox.com/s/mkev4l0kmy3bvfw/apigee-deploy-grunt-plugin.gif?dl=1 "apigee-deploy-grunt-plugin-terminal")

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](http://doctoc.herokuapp.com/)*

- [Why do we need a tool to manage the API Development Lifecycle for Apigee?](#why-do-we-need-a-tool-to-manage-the-api-development-lifecycle-for-apigee)
- [Getting Started](#getting-started)
- [Steps to get started (deprecated)](#steps-to-get-started-deprecated)
- [Supported tasks](#supported-tasks)
    - [Most Important Tasks](#most-important-tasks)
        - [Default task : DEPLOY_IMPORT_BUMP_SEAMLESS_REVISION](#default-task--deploy_import_bump_seamless_revision)
        - [IMPORT_DEPLOY_BUMP_REVISION Task](#import_deploy_bump_revision-task)
        - [UPDATE_CURRENT_REVISION Task](#update_current_revision-task)
    - [Test what you just deployed](#test-what-you-just-deployed)
        - [Use apigee gateway and with Yahoo Weather standard Target](#use-apigee-gateway-and-with-yahoo-weather-standard-target)
        - [Use apigee gateway calling Yahoo Weather through Apigee Node.js as Target](#use-apigee-gateway-calling-yahoo-weather-through-apigee-nodejs-as-target)
        - [Use apigee gateway retrieving static content through Node.js as Target](#use-apigee-gateway-retrieving-static-content-through-nodejs-as-target)
        - [Use apigee gateway retrieving static content through Node.js as Target (nested folder)](#use-apigee-gateway-retrieving-static-content-through-nodejs-as-target-nested-folder)
        - [Use apigee gateway leveraging a JavaCallout policy](#use-apigee-gateway-leveraging-a-javacallout-policy)
    - [Complementary Tasks](#complementary-tasks)
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
  - [ESLint](#eslint)
- [Reusability of code with Maven Plugins and shell scripts/command line tools](#reusability-of-code-with-maven-plugins-and-shell-scriptscommand-line-tools)
- [Contributing](#contributing)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Why do we need a tool to manage the API Development Lifecycle for Apigee?

[![Join the chat at https://gitter.im/apigeecs/apigee-deploy-grunt-plugin](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/apigeecs/apigee-deploy-grunt-plugin?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

* Pluggable environment (thousands of npm and grunt modules and plugins)
* Grunt is perfect for applying continuous improvement by easily adding custom tasks. See [Tasks directory](https://github.com/apigeecs/apigee-deploy-grunt-plugin/tree/master/grunt/tasks)
* It's pure JavaScript running on Node.js. Enough said, right :-)
* Deploys Node.js API Proxies (node_modules, resources, and public directories) see [Gruntfile.js compress task](https://github.com/apigeecs/apigee-deploy-grunt-plugin/blob/master/Gruntfile.js). Also support of [Apigee NPM API](http://apigee.com/docs/management/apis/post/organizations/%7Borg_name%7D/apis/%7Bapi_name%7D/revisions/%7Brevision_num%7D/npm)
* Supports JavaCallout Policies. Compiles, package and include Java library dependencies.
* It's ready for TDD with Mocha.js and Chai. See [tests directory](https://github.com/apigeecs/apigee-deploy-grunt-plugin/tree/master/tests).
* Does static code analysis with [JSHint](http://www.jshint.com/) and [ESLint](http://eslint.org/). So, out-of-the-box, you get the ability to add custom rules that promote coding best practices in JavaScript. See [ESLint custom rules](https://gist.github.com/jareware/7179093)
* Reviews JavaScript file complexity by leveraging [Grunt-Complexity](https://github.com/vigetlabs/grunt-complexity#grunt-complexity)
* Suppports Apigee KVM migration see Gruntfile.js for configuration task or please visit [grunt-apigee-kvm](https://github.com/grunt-apigee/grunt-apigee-kvm)
* It's easier to troubleshoot. cURL command support. Just pass ```--curl=true```
* Searches and replace files content with RegEx, string patterns, or XPath. See string-replace and xmlpoke tasks in Gruntfile.js
* Includes files dynamically from common git submodule to promote DRY (Don't Repeat Yourself) principle (check search-and-replace.js entries)
* It's compatible with most CI tools Jenkins, Bamboo, Go, and Travis
* Sends automatic desktop notifications with [Grunt Notify](https://github.com/dylang/grunt-notify#screenshots)
* It's compatible with IDEs. See [Chrome Grunt Dev Tools](https://chrome.google.com/webstore/detail/grunt-devtools/fbiodiodggnlakggeeckkjccjhhjndnb?hl=en) and [Grunt Task Runner for Web Storm](http://www.jetbrains.com/webstorm/webhelp/using-grunt-task-runner.html)
* It's Compatible with Maven. So you can still run JMeter tests or single Maven tasks, if Mocha doesn't suit you needs, see **shell:run_jmeter_tests** target. [tools examples](https://github.com/apigeecs/apigee-deploy-grunt-plugin/tree/master/tools/forecastweather-jmeter-example).

# Getting Started
The easiest way to use this plugin is by leveraging Yeoman. Follow Getting Started from [Apigee API Proxy Generator](https://github.com/dzuluaga/generator-apigee-deploy-grunt-api#getting-started).

# Steps to get started (deprecated)
Getting started with Yeoman is much easier than following steps above. You no longer need to folow these steps unless you want learn how to use Git Submodules.

**Prerequisites: Node.js and NPM**

**Optional tools: Git. You can still use this plugin without Git, however manual steps will be required to initialize common folder.**

* **Step 1:** Clone this repo with Git. ```git clone https://github.com/apigeecs/apigee-deploy-grunt-plugin.git```
If you don't have Git is installed, download this repo as a zip file and expand it somewhere in the filesytem.
* **Step 2:** ```cd apigee-deploy-grunt-plugin```
* **Step 3:** open apigee-deploy-grunt-plugin folder and execute the two commands:
```
git submodule init
git submodule update

```
**These two commands initialize Git Submodules by downloading source to Common folder from common branch. Installation without Git requires to download common branch as a zip file and expand its content into common folder (common/apiproxy)**

* **Step 4:**  setup Apigee Edge credentials as system environment variables ae_username and ae_password or just pass credentials as arguments
* **Step 5:** install [grunt cli](http://gruntjs.com/getting-started#installing-the-cli) ```sudo npm install grunt-cli -g```
* **Step 6:** execute ```npm install``` to install all grunt dependencies
* **Step 7:** Edit and add environment to grunt/apigee-config.js file. Each environment will be referenced below as a flag e.g. --env={test, prod}
* **Step 8:** Edit and add environments to grunt/search-and-replace-files.js for string replacements.
* **Step 9:** run ```grunt --env=test --username={apigee_edge_email_address} --password={apigee_edge_password} --debug```

# Supported tasks

### Most Important Tasks

##### Default task : DEPLOY_IMPORT_BUMP_SEAMLESS_REVISION
One of the cool features of Apigee is seamless deployment or zero downtime. By default Grunt deploys in that mode. The following command will deploy api bundles with that mode:
```bash
$ grunt --env=test --username={apigee_edge_email_address} --password={apigee_edge_password} --debug --curl=true
```
**Note: Pass --debug flag to display Management API responses.**

##### IMPORT_DEPLOY_BUMP_REVISION Task
The following command will undeploy is similar to the default task, however it undeploys the bundle, so there's some downtime. import, and deploy the api bundle:
```bash
$ grunt IMPORT_DEPLOY_BUMP_REVISION --env=test --username={apigee_edge_email_address} --password={apigee_edge_password} --debug --curl=true
```

##### UPDATE_CURRENT_REVISION Task
The following command will update current revision. Please be aware that it undeploys the current revision, so task is more suitable for development to avoid creating new revisions:
```bash
$ grunt UPDATE_CURRENT_REVISION --env=test --username={apigee_edge_email_address} --password={apigee_edge_password} --debug --curl=true
```

### Test what you just deployed
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
**Disabled by default. Read section below for enabling directions.**
```
https://{org-env}.apigee.net/{api-basepath}/javacallout
```

Example ```curl https://testmyapi-test.apigee.net/weathergrunt/javacallout```

### Complementary Tasks

#### get all deployed api revisions
```grunt getDeployedApiRevisions --env=test --debug```

#### undeploy api revision
```grunt undeployApiRevision:{revision_id} --env=test --debug```

#### undeploy api revision
```grunt deployApiRevision:{revision_id} --env=test --debug```

#### get all api revisions
```grunt getAllApiRevisions --env=test --debug```

#### import API build bundle without deploying it
```grunt importApiBundle --env=test --debug --debug```

#### delete a revision
```grunt deleteApiRevision:{revision_id} --env=test --debug```

#### update a revision with build bundle
```
$ grunt updateApiRevision:{revision_id} --env=test
```
#### configuration management
See grunt/apigee-config.js file.

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

Upload node.js modules (by default the plugin will try to install npm in Apigee Edge)
```
--upload-modules
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
Ability to search and replace strings from text files that match any pattern in Regex or string. See grunt/search-and-replace-files.js to setup per environment. This task leverages [grunt-string-replace module](https://www.npmjs.org/package/grunt-string-replace). See grunt/search-and-replace-files.js for an example.

####Include files from common Git submodule
Ability to search and include content from files is also provided by string-replace task. See examples under grunt/search-and-replace-files.js that include fragments from common folder for fragments (multiple steps), policies, and JavaScript files. Note common folder leverages [Git Submodule](http://git-scm.com/book/en/Git-Tools-Submodules), which resides in a separate branch under the same repository. This allows reusing code across multiple APIs without adding more complexity.

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

ESLint
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
 
