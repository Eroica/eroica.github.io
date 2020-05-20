---
title: Paletti 2.0 Release
layout: post
excerpt_separator: <!--more-->
---

Paletti's Vala/GTK version now has all features that I originally had planned for it. This version is now tagged as `v2.0`, and an AppImage is available from the [Releases](https://github.com/Eroica/Paletti/releases). The AppImage is built on Ubuntu 16.04 so it should run on anything that is as old or newer than that.

A quick roundabout what Paletti 2.0 has added or improved upon:

* Paletti creates a color palette of an image that you drop into it (alternatively, click on the drop area, or hit <kbd>Ctrl</kbd>`+`<kbd>O</kbd>). The image is previewed using the reduced set of colors.
* Scroll over Paletti or move the slider in the header bar to adjust the number of colors (currently restricted to 3 to 32).
* Hit <kbd>x</kbd> or use the toggle to make the image black/white (this might reduce the quantified colors a little bit, e.g. from 24 colors to 22 shades of gray).
* Click on a color in the color palette to copy its Hex code into the clipboard.
* Export the posterized version of the image with <kbd>Ctrl</kbd>`+`<kbd>S</kbd>.
* Copy the image into the clipboard with <kbd>Ctrl</kbd>`+`<kbd>C</kbd>.
* Export a PNG screenshot of the color palette with <kbd>Ctrl</kbd>`+`<kbd>E</kbd>.

![Screenshot of Paletti 2.0]({{ "/images/Paletti-2.0.png" | relative_url }})

The latest 2.0 commits worked on:

<span class="tag">Added</span> Display a color's Hex code in its tooltip.

<span class="tag">Added</span> Export the color palette to a PNG file.

<span class="tag">Added</span> Support for older GLib/GTK versions to run on distributions as old as Ubuntu 16.04.

<span class="tag">Update</span> Reduce the number of unnecessary posterizations (e.g. if the slider is still being moved).

<span class="tag">Update</span> Run posterization on a background thread (the UI stays unblocked when processing large images).

<span class="tag">Update</span> Small UI improvements, e.g. hover effects.

<span class="tag">Update</span> Improvements to error handling.

A note on Paletti's UI: Building on Ubuntu 16.04 also meant that the supplied GTK3 version is older than what I have. This is mostly visible in the theme that is being used. Since more recent GTK3 versions updated the look and improved support for CSS attributes, the 16.04 AppImage looks a little bit rough around the edges. For this reason, there is another AppImage built on newer dependencies. The filename refers to the minimum required version of GLib (or is omitted in the case of "as old as Ubuntu 16.04").

<!--more-->
