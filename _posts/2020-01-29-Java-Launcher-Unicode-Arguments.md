---
title: Passing Unicode Characters to Java (Windows)
layout: post
---

If you are using `jpackage` (or similar, e.g. Launch4j) to create an executable file of your JVM program on Windows, it will have problems parsing Unicode characters that appear in command-line arguments. [Here is more information about this issue](https://stackoverflow.com/questions/36882559/run-java-program-with-chinese-arguments-in-eclipse).

In the case of [An Image Viewer]({% post_url 2019-12-24-An-Image-Viewer %}), I noticed that opening files with Chinese characters in them didn't work. Double-clicking a file passes that filename as a command-line argument to the Java launcher (the `.exe`) which then incorrectly modifies all characters into `?`. Before the call to Java, the filenames are still encoded correctly, but inside the program part (e.g. `fun main(args: Array<String>)` or JavaFX'es `parameters`), the arguments are already converted incorrectly.

I tried three methods to get around this problem:

* * *

(1) Batch file with environment variable
----------------------------------------

Instead of creating an `.exe` file (a "native launcher"), Gradle normally creates a `.bat` file on Windows to launch your program. Inside the Batch file, simply create an environment variable that holds the command-line arguments temporarily, and later access it in your program with `System.getenv`. This way you circumvent the Java launcher's wrongful conversion. Something like this:


```batch
(... Batch file ...)
setlocal
	set CMD_ARGS=%* && [Java launcher]
endlocal
```

From Java/Kotlin, `System.getenv("CMD_ARGS")` would then contain the command-line parameters. Although this can get tricky to parse as well if there is whitespace.

However, another issue with the Batch approach that I didn't like is that running the Batch file would also open a `cmd.exe` window. This is not because the program isn't run with `javaw.exe` but simply because the "main" part of the program is the Batch file which obviously gets executed in a `cmd.exe` window by default.

* * *

(2) Windows' `GetCommandLineW`
------------------------------

There is actually a Windows API call that returns "the command-line string for the current process" called [`GetCommandLineW`](https://docs.microsoft.com/en-us/windows/win32/api/processenv/nf-processenv-getcommandlinew). This Unicode string (pointer) does then still need to be converted to a non-wide version with [`CommandLineToArgvW`](https://docs.microsoft.com/en-us/windows/win32/api/shellapi/nf-shellapi-commandlinetoargvw). The documentation page shows how to do this at the bottom.

However, when testing this on my machine, for some reason a call to this function would still leave out all Chinese characters when called from a basic C/C++ program. It would provide every command-line argument, but simply leave out all Unicode characters (appearing blank). It might be a problem with `chcp`, but in the end I didn't investigate this method anymore.

* * *

(3) Using another Java launcher: Janel
--------------------------------------

I found [Janel](https://sourceforge.net/projects/janel/) thankfully while researching this problem. It replaces the `.exe` with a launcher that will correctly pass over Unicode arguments to your program. In the end I went with this solution, and added a Gradle task to do the replacement after packaging:

{% highlight groovy %}
task copyAssets(type: Copy) {
    copy {
        from "src/An Image Viewer.lap"
        into "build/jpackage/An Image Viewer/"
    }
    delete "build/jpackage/An Image Viewer/An Image Viewer.exe"
    copy {
        from "src/JanelWindows64.exe"
        rename {
            "An Image Viewer.exe"
        }
        into "build/jpackage/An Image Viewer/"
    }
}
{% endhighlight %}

If you use `jpackage` to create a stand-alone version of your program (i.e. with bundled JRE), you may need to also use this [Shadow Jar plugin](https://imperceptiblethoughts.com/shadow/) for your program's JAR file. Otherwise Janel would not find the correct `main` implementation (in the case of Kotlin). The [badass-runtime plugin](https://badass-runtime-plugin.beryx.org/releases/latest/) (which I use for `jpackage`) will automatically use this if available.
