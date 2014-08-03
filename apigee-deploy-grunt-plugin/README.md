## Directions to setup Grunt for an Apigee API Bundle:

- [ ] execute ```npm install``` to install all grunt dependencies
- [ ] add environments to Gruntfile.js under apigee_profiles config
- [ ] setup profiles element in apigee-config.js for each environment. Each environment will be referenced below as a flag e.g. --env={test, prod} 
- [ ] setup config element in apigee-config.js for string replacements for each file

## execute end-to-end lifecycle and overwrite revision (keep the same revision id)
```grunt -env=test --debug```

**Note: debug switch to includes API responses.**

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