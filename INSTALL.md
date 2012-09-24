Installing Mongo Modules
========================

Using git clone the repository to where you want to load it. For this
example I'm assuming your username is _johndoe_ and your home directory
is _/home/johndoe_ and you're going to install _mongo-modules_ directory
in your home directory.

```shell
	cd $HOME
	git clone https://github.com/rsdoiel/mongo-modules.git
```

Now you need to modify your _.mongorc.js_ in your home directory. The _.mongorc.js_ is a JavaScript initialization file loaded by the mongo shell.  You can use it to define global variables or run Mongo commands.  In this case we're going to define the _MONGO_MODULES_ array and _load_ the _mongo-modules.js_ file. I've assumed that your _.mongorc.js_ file is empty or you're
appending these lines to it.


```JavaScript
	// Define you're home directory
	HOME="/home/johndoe";
	// Define the array MONGO_MODULES
	MONGO_MODULES = [HOME+"/mongo-modules"];
	// Now load mongo-modules.js
	load(MONGO_MODULES[0] + "/mongo-modules.js");
```

Now the next time you launch the mongo shell you should be able to use
mongo-modules.


