mobbl-generator
===================================
The MOBBL Project Generator is a NodeJS command line tool that enables the user to easily setup new iOS and Android projects that are built using [MOBBL](http://www.mobbl.org/).

Installation:

    $ npm install -g mobbl-generator

Usage:

    $ mobbl-generator

Example run:

    $ cd /path/to/folder
    $ mobbl-generator
    prompt: Which platform do you want to generate a project for?
    1. iOS
    2. Android
    3. iOS & Android
    :  (1) 3
    prompt: Project name (* will be substituted with ios or android):  my-new-*-project
    prompt: The display name of the app:  My New App
    prompt: Bundle Identifier / Package name:  my.new.app
    prompt: At what location should the project directories be created? (Current directory is /path/to/folder):  (.) relative/path/to/other/folder
    prompt: Class prefix:  MOB
    
This will create two project folders named `my-new-ios-project` and `my-new-android-project` in the directory `/path/to/folder/relative/path/to/other/folder`. It is also possible to enter an absolute path (in which case the current directory is not used). The directory has to exist.

**NOTE:**  
If you're having trouble inputting text because of a cursor jumping around your terminal: Make your terminal window wider, this will fix the problem. We're working on a better solution in the mean time.