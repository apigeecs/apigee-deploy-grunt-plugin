**Table of Contents**

- [Why do we need another tool to manage API Lifecycle?]
- [Directions to setup Grunt for an Apigee API Bundle](#directions-to-setup-grunt-for-an-apigee-api-bundle)
- [Supported tasks](#supported-tasks)
  - [execute end-to-end lifecycle and overwrite revision (keep the same revision id)](#execute-end-to-end-lifecycle-and-overwrite-revision-keep-the-same-revision-id)
  - [get all deployed api revisions](#get-all-deployed-api-revisions)
  - [undeploy api revision](#undeploy-api-revision)
  - [import API bundle without deploying it](#import-api-bundle-without-deploying-it)
  - [configuration management](#configuration-management)
  - [builds zip bundle under target directory](#builds-zip-bundle-under-target-directory)
  - [check all tasks available](#check-all-tasks-available)
  - [supported arguments and flags](#supported-arguments-and-flags)
- [Contributing](#Contributing)

# Why do we need another tool to manage the API Development Lifecycle?

* Shell scripts are good for small tasks, but they can become too complex to maintain as your API tasks grows. And Java, writing Maven plugins is no fun.
* Pluggable environment (thousands of npm and grunt modules and plugins)
* Grunt is perfect for adding those custom tasks in a heartbeat
* It's pure JavaScript and Node. Enough said right :-)
* Compatible with all CI tools Jenkins Travis

# Directions to setup Grunt for an Apigee API Bundle

- [ ] setup Apigee Edge credentials as environment variables ae_username and ae_password.
- [ ] install [grunt cli](http://gruntjs.com/getting-started#installing-the-cli)
- [ ] execute ```npm install``` to install all grunt dependencies
- [ ] add environments to Gruntfile.js under apigee_profiles config
- [ ] setup profiles element in apigee-config.js for each environment. Each environment will be referenced below as a flag e.g. --env={test, prod}
- [ ] setup config element in apigee-config.js for string replacements for each file

# Supported tasks
## execute end-to-end lifecycle and overwrite revision (keep the same revision id)
```grunt -env=test --debug```

**Note: debug flag to includes API responses.**

## execute end-to-end lifecycle and keep last revision (increases revision id)
```grunt -env=test --debug --keep-last-revision```

## get all deployed api revisions
```grunt getDeployedApiRevisions --env=test --debug```

## undeploy api revision
```grunt undeployApiRevision:{revision_id} --env=test```


## undeploy api revision
```grunt deployApiRevision:{revision_id} --env=test```

## get all api revisions
```grunt getAllApiRevisions --env=test --debug```

## import API bundle without deploying it
```grunt importApiRevision --env=test --debug```

## delete a revision
```grunt deleteApiRevision:{revision_id} --env=test --debug```

## configuration management

This step

See apigee-config.js file.

## builds zip bundle under target directory
```grunt compress --env=test```

## clean Target directory
```grunt clean --env=test```

## check all tasks available
```grunt --help```

## supported arguments and flags 
--username={apigee_edge_username}

--password={apigee_edge_password}

--override

--delay={seconds}

#Contributing
If you would like to contribute, simply fork the repository, push your changes to a branch and send a pull request.

Typo fixes, improvements to grammar or readability, it's all welcome.
