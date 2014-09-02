## Support for Maven Plugins
Grunt Plugin can be enabled to support Maven Plugins. For instance Proxy Dependency Plugin can be incorporated by following these steps:

#### Step 1: Include pom.xml under Gruntfile.js file
#### Step 2: Include CommonProxy folder where fragments are extracted from
#### Step 3: Incorporate shell task into Gruntfile.js. This task execute a shell task that calls a Maven target. Then after that all other tasks will continue to be executed by Grunt
See example included
```
	    shell: {                                // Task
	        callMaven: {                      // Target
	            command: 'mvn install -Ptest -Dusername=$ae_username -Dpassword=$ae_password'
	        }
	    }
```
#### Step 4: Execute this shell task after copy target. Note that this task will replace target folder.

```
grunt.registerTask('buildApiBundle', 'Build zip without importing it to Edge', ['jshint', 'eslint', 'clean', 'mkdir','copy', 'shell:callMaven','xmlpoke','compress']);

```

#### Step 5: This plugin requires that apiproxy folder is under another folder to work properly. So, for instance, proxySrcDir will point to apiproxyroot, then apiproxy will exist be under it. 
```
<proxySrcDir>./apiproxyroot</proxySrcDir>
```
