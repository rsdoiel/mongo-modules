Mongo Modules
=============

# Overview

Mongo's shell can be very helpful for batch processing data. While it's not fast and not event drive it is terribly convenient (e.g. it comes with Mongo, nothing else needs to be installed). Why not leverage it? What is
missing is a basic module system. Thats where _mongo-modules.js_ comes in.

_mongo-modules.js_ provides a minimal module system for Mongo's shell. You include it in your _.mongorc.js_ file. Here's an example _.mongorc.js_ file:

```JavaScript
	// Set up some useful environment like variables
	USERNAME="johndoe"
	HOME="/home/" + USERNAME
	MONGO_MODULES=[HOME+"/mongo-modules"]
	// Now We're ready to load the modules bootstrap.
	load(MONGO_MODULES[0] + "/mongo-modules.js");
```

If you wanted to load the _path_ module you might do something like-

```JavaScript
	// Path is a simple example module based on NodeJS path's module
	path = require("path");
	// Now you can do things like path.join()
	// joining HOME and myproject should yield a path
	// like /home/johndoe/myproject based on the settings
	// in the .mongorc.js file above.
	console.log(path.join(HOME, "myproject"));
```

# .mongorc.js

The _.mongorc.js_ file is a file looked for by the mongo shell. It goes
you your home directory (e.g. if your username was _johndoe_ you home directory might be _/Users/johndoe_ or _/home/johndoe_ depending on the flavor of Unix
your using).

# Limitations

Mongo modules don't support directories as modules like NodeJS. This is because parsing package.json is problematic from the shell (e.g. node JSON.parse(), no eval).  If you want to use directory based modules then bootstrap the parts by including an index.js file. Hopefully I'll figure out a remedy for this and
use a proper package.json file instead.

# _mongo-modules.js_'s basic services

* console.log(), console.error() - mapped to print()
* require() - load a module

Three demonstration modules come with _mongo-modules.js_ - assert, path and harness. Loading each can be done after installation. E.g. from the mongo shell
do the following commands.

```JavaScript
	assert = require("assert");
	path = require("path");
	harness = require("harness");
```

If you would like to try the test programs then you need to first load
the .mongorc.js file then run the test script. Here's and example-

```shell
	# Load the .mongorc.js file, then load harness_test.js
	mongo ~/.mongorc.js harness_test.js
```

The output should look something like-

```shell
	MongoDB shell version: 2.2.0
	connecting to: test
	loading file: /home/johndoe/.mongorc.js
	loading file: harness_test.js
	Starting [Testing RunIt()] ...
		Starting Testing push ...
	Testing push...
			Testing push OK
	Testing RunIt() Success!
```


# Installation

Modify your _.mongorc.js_ file to define the MONGO_MODULES array. The array
should contain one or more paths to search for modules. It should include
as the first entry the location of where you've _mongo-modules.js_. It also
invoke _mongo-modules.js_ via a load statement.

```JavaScript
	MONGO_MODULES["/home/johndoe/mongo-modules"];
	load(MONGO_MODULES + "/mongo-modules.js");
```

Now the next time you launch the Mongo shell it should load _mongo-modules.js_
and support the _console.log()_ and _console.error()_ commands.



