### Directions to setup Grunt for an Apigee API Bundle:

- [ ] Execute ```npm install```
- [ ] Replace apiproxy, org, env on Gruntfile.js
- [ ] Run ```grunt``` to run default task (this task executes: clean, mkdir, copy, compress, retrieveLastApiRevisionDeployed, and importApiBundle)
- [ ] Other tasks available for execution ```grunt importApiBundle```, ```grunt retrieveLastApiRevisionDeployed```, ```grunt clean```, ```grunt compress```
