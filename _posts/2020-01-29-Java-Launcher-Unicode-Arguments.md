---
title: Passing Unicode Characters to Java (Windows)
layout: post
---

You should use [Janel](https://sourceforge.net/projects/janel/) if your Java program compiles to an `.exe` and requires command-line parameters. <!--read-more-->

This is because on Windows, you cannot pass Unicode characters to the native launcher created by `jpackage` or similar ([more information about this issue here](https://stackoverflow.com/questions/36882559/run-java-program-with-chinese-arguments-in-eclipse)). For example:

{% highlight kotlin %}
fun main(args: Array<String>) {
    args.forEach(::println)
}
{% endhighlight %}

If I run this from the Windows terminal:

{% highlight powershell %}
PS C:\> echo.exe Hello 你好
Hello
??
{% endhighlight %}

This also affects programs that run by double-clicking a file, e.g. [An Image Viewer]({% post_url 2019-12-24-An-Image-Viewer %}).

Janel works by replacing the native launcher with one that correctly passes over Unicode arguments. I added a Gradle task to do the replacement after packaging:

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

