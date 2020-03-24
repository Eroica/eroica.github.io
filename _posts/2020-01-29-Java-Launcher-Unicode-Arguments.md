---
title: Passing Unicode Characters to Java (Windows)
layout: post
excerpt_separator: <!--more-->
---

Here’s a JVM program that just prints its command-line arguments:

{% highlight kotlin %}
fun main(args: Array<String>) {
    args.forEach(::println)
}
{% endhighlight %}

And if I compile this to an `.exe` with `jpackage`<sup id="fn1-a"><a href="#fn1">1</a></sup> and run it from the Windows terminal:

{% highlight powershell %}
PS C:\> echo.exe Hello 你好
Hello
??
{% endhighlight %}

It does not work (on Windows). The reason is that the command-line arguments are encoded incorrectly as soon as they are passed from the “native launcher” to your program. [More information about this issue here.](https://stackoverflow.com/questions/36882559/run-java-program-with-chinese-arguments-in-eclipse)

This is unfortunate for programs which are called when double-clicking on a file, e.g. [An Image Viewer]({% post_url 2019-12-24-An-Image-Viewer %}). Those won’t work if the filename has Chinese characters in it.

I tried three methods to get around this problem:<!--read-more-->
<!--more-->
* * *

(1) Batch file with environment variable
----------------------------------------

On Windows, Gradle normally creates a `.bat` file to launch your program instead of an `.exe` (a "native launcher"). Inside the Batch file, simply create an environment variable that holds the command-line arguments temporarily, and later access it in your program with `System.getenv`. This way you circumvent the Java launcher's wrongful conversion. Something like this:


{% highlight batch %}
(... Batch file ...)
setlocal
	set CMD_ARGS=%* && [Java launcher]
endlocal
{% endhighlight %}

From Java/Kotlin, `System.getenv("CMD_ARGS")` would then contain the command-line parameters. Although this can get tricky to parse as well if there is whitespace.

However, another issue with the Batch approach that I didn't like is: Running the Batch file would also open a `cmd.exe` window. This is not because the program isn't run with `javaw.exe` but simply because the "main" part of the program is the Batch file which—that's how they function—gets executed in a `cmd.exe` window by default.

* * *

(2) Windows' `GetCommandLineW`
------------------------------

There is actually a Windows API call that returns "the command-line string for the current process" called [`GetCommandLineW`](https://docs.microsoft.com/en-us/windows/win32/api/processenv/nf-processenv-getcommandlinew). This Unicode string (pointer) does then still need to be converted to a non-wide version with [`CommandLineToArgvW`](https://docs.microsoft.com/en-us/windows/win32/api/shellapi/nf-shellapi-commandlinetoargvw). The documentation page shows how to do this at the bottom.

However, when testing this on my machine, for some reason a call to this function would still leave out all Chinese characters when called from a basic C/C++ program. It would provide every command-line argument, but simply leave out all Unicode characters (appearing blank). It might be a problem with `chcp`, but in the end I didn't investigate this method anymore.

* * *

(3) Using another Java launcher: Janel
--------------------------------------

[Janel](https://sourceforge.net/projects/janel/) replaces the native launcher with one that correctly passes over Unicode arguments to your program. In the end I went with this solution, and added a Gradle task to do the replacement after packaging:

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

You may also need to use this [Shadow Jar plugin](https://imperceptiblethoughts.com/shadow/) if you use `jpackage` along with Janel. In the case of Kotlin, Janel wouldn't find the correct `main` implementation otherwise. The [badass-runtime plugin](https://badass-runtime-plugin.beryx.org/releases/latest/) (which I use for `jpackage`) will automatically use the Shadow Jar plugin if available.

<hr>

<p id="fn1" class="footnote text--small icon-span"><sup>1</sup>Or something similar, e.g. Launch4j. <a href="#fn1-a">{% include feather/chevron-up.svg %}</a></p>
