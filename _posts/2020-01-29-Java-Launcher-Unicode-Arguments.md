---
title: Passing Unicode Characters to Java (Windows)
layout: post
link: https://stackoverflow.com/questions/36882559/run-java-program-with-chinese-arguments-in-eclipse
---

If you are using `jpackage` (or similar, e.g. Launch4j) to create an executable file of your JVM program on Windows, it will have problems parsing Unicode characters that appear in command-line arguments. The link gives some closer insights into the issue.

In the case of [An Image Viewer]({% post_url 2019-12-24-An-Image-Viewer %}), I noticed that opening files with Chinese characters in them didn't work. Double-clicking a file would pass that filename as an command-line argument to the Java launcher (the `.exe`) which would incorrectly modify all characters into `?`. Note that before the call to Java, the filenames are still encoded correctly, but inside the program part (e.g. `fun main(args: Array<String>)` or JavaFX'es `parameters`), the arguments are already modified incorrectly.

I tried three methods to get around this problem:

* * *

(1) Batch file with environment variable
----------------------------------------

Instead of creating an `.exe` file (a "native launcher"), you could rely on Gradle's basic packaging task which will create a `.bat` file on Windows to launch your program. Inside the Batch file, simply create an environment variable that holds the command-line arguments temporarily, and later access it in your program with `System.getenv`. This way you circumvent the Java launcher's wrongful conversion. Something like this:


```batch
(... Batch file ...)
setlocal
	set CMD_ARGS=%* && [Java launcher]
endlocal
```

From Java/Kotlin, `System.getenv("CMD_ARGS")` would then contain the command-line parameters. Note though that this can actually get tricky to parse as well if there is whitespace or similar.

Another issue with the Batch approach that I didn't like is that running the Batch file would also open a `cmd.exe` window. This is not because the program isn't run with `javaw.exe` but simply because the "main" part of the program is the Batch file which obviously gets executed in a `cmd.exe` window by default.

* * *

(2) Windows' `GetCommandLineW`
------------------------------

There is actually a Windows API call that returns "the command-line string for the current process" called [`GetCommandLineW`](https://docs.microsoft.com/en-us/windows/win32/api/processenv/nf-processenv-getcommandlinew). This Unicode string (pointer) does then still need to be converted to a non-wide version with [`CommandLineToArgvW`](https://docs.microsoft.com/en-us/windows/win32/api/shellapi/nf-shellapi-commandlinetoargvw). The documentation page lists an example on how to do this at the bottom.

However, in basic tests on my machine, for some reason a call to this function would still leave out all Chinese characters when called from a basic C/C++ program. It would provide every command-line argument, but simply leave out all Unicode characters (appearing blank). It might be a problem with `chcp`, but in the end I didn't investigate this method anymore.

* * *

(3) Using another Java launcher: Janel
--------------------------------------

I found [Janel](https://sourceforge.net/projects/janel/) thankfully while researching this problem. It replaces the `.exe` created e.g. by `jpackage` with a launcher that will correctly pass over Unicode arguments to your program.

If you use `jpackage` to create a stand-alone version of your program (i.e. with bundled JRE so that nothing needs to be installed additionally), note that you may need to also use this [Shadow Jar plugin](https://imperceptiblethoughts.com/shadow/) for your program's JAR file. The [badass-runtime plugin](https://badass-runtime-plugin.beryx.org/releases/latest/) (which I use for `jpackage`) will automatically use this if available. Otherwise Janel would not find the correct `main` implementation (in the case of Kotlin).
