---
title: Updates to An Image Viewer (version 1.1)
layout: post
---

I made some changes to [An Image Viewer’s](https://github.com/Eroica/AnImageViewer) interface. <!--read-more-->

An Image Viewer's menu bar got replaced with a toolbar. Menu bars in JavaFX are an easy way to set up actions with associated shortcuts, but I always preferred client-side header bars to menu bars. They look cleaner, and present available actions better:

* The current zoom mode is always visible which was the primary reason why I wanted to replace the menu bar.
* Back/forward buttons are disabled whenever you reach the beginning/end of a directory.

An Image Viewer currently only supports those file types that JavaFX' `Image` class supports (BMP, GIF, JPG, PNG), and if you wanted to view an unsupported file type, nothing useful happened. Now an error message is being shown:

