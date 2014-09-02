<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](http://doctoc.herokuapp.com/)*

- [Why do we need another tool to manage the API Development Lifecycle?](#why-do-we-need-another-tool-to-manage-the-api-development-lifecycle)
- [Directions to setup Grunt for an Apigee API Bundle](#directions-to-setup-grunt-for-an-apigee-api-bundle)
- [Supported tasks](#supported-tasks)
      - [execute end-to-end lifecycle and overwrite revision (keep the same revision id)](#execute-end-to-end-lifecycle-and-overwrite-revision-keep-the-same-revision-id)
      - [get all deployed api revisions](#get-all-deployed-api-revisions)
      - [undeploy api revision](#undeploy-api-revision)
      - [import API bundle without deploying it](#import-api-bundle-without-deploying-it)
      - [configuration management](#configuration-management)
      - [builds zip bundle under target directory](#builds-zip-bundle-under-target-directory)
      - [check all tasks available](#check-all-tasks-available)
- [Continuous Integration with Jenkins](#continuous-integration-with-jenkins)
- [API Static Code Analysis](#api-static-code-analysis)
  - [JSHint](#jshint)
  - [ESHint](#eshint)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


# Why do we need another tool to manage the API Development Lifecycle?

* Shell scripts are good for small tasks, but they can become too complex to maintain and reuse as your API tasks grows. And Java, writing Maven plugins is no fun.
* Pluggable environment (thousands of npm and grunt modules and plugins)
* Grunt is perfect for adding those custom tasks in a heartbeat
* Pure JavaScript and Node.js. Enough said right :-)
* Compatible with all CI tools Jenkins, Bamboo, Go, Travis
* Ready for TDD with Mocha.js and Chai. See test directory.
* Static code analysis with (JSHint)[http://www.jshint.com/] and (ESLint)[http://eslint.org/]
* Easier to troubleshoot. cURL command support. using ```--curl```
* It's Compatible with Maven. See tools to enable Proxy Dependency Maven Plugin

# Directions to setup Grunt for an Apigee API Bundle

- [ ] setup Apigee Edge credentials as environment variables ae_username and ae_password.
- [ ] install [grunt cli](http://gruntjs.com/getting-started#installing-the-cli) ```sudo npm install grunt-cli -g```
- [ ] execute ```npm install``` to install all grunt dependencies
- [ ] add environments to Gruntfile.js under apigee_profiles config
- [ ] setup profiles element in apigee-config.js for each environment. Each environment will be referenced below as a flag e.g. --env={test, prod}
- [ ] setup config element in apigee-config.js for string replacements for each file

# Supported tasks

#### execute end-to-end lifecycle and overwrite revision (keep the same revision id)
```grunt --env=test --username=$ae_username --password=$ae_password --debug --curl=true```

**Note: debug flag to includes API responses.**

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
```grunt --help```

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

Continuous Integration with Jenkins
======
[This repo provides a guide for setting up an instance of Jenkins with Grunt](https://github.com/dzuluagaapigee/apigee-ci-jenkins-git-maven-jmeter) to deploy and configure an API bundle.

API Static Code Analysis
========
This plugin is enabled to provide feedback about coding best practices. 

JSHint
--------
JSHInt provides a large set of configurable (options)[http://www.jshint.com/docs/options/] that can be enabled out-of-the-box.
See jshint task in Gruntfile.js

ESHint
--------
ESLint provides an pluggable framework to enable static code analysis. In contrast to JSHint, ESLint can be extended to write custom API specific rules. See conf/rules/if-curly-formatting.js rule.  
See ESLint Gruntfile.js section

#Contributing
If you would like to contribute, simply fork the repository, push your changes to a branch and send a pull request.

Typo fixes, improvements to grammar or readability, it's all welcome.
