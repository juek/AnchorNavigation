# Anchor Navigation plugin for Typesetter CMS #

## About ##

A section type that automatically generates Bootstrap3/4-compatible navs from all anchors (&lt;a id="foo"&gt;, &lt;a name="bar"&gt;) on the current page.

* After installation 'AnchorNav' sections are available for adding to page content or layout areas.
* Section editor options for nav size and horizontal alignment.
* Navs are generated and updated using JavaScript.
* Nav items will be named after anchor elements&rsquo; text or&ndash;if an anchor&rsquo;s text node is empty&ndash;the id/name attribute. 
* Defaults to 0.6s smooth scrolling to the target position - defaults may currently only be changed via config block in AnchorNav.js line 13-17.

See also [Typesetter Home](http://www.typesettercms.com), [Typesetter on GitHub](https://github.com/Typesetter/Typesetter)

## Internationalization
English only as of ver. 1.0-b1

## Current Version
1.0-b1

## Change Log
* 1.0-b1 - Inital version

## Requirements
* Typesetter CMS 5.0+
* Typesetter CMS 5.1.1-b1+ recommended
* Bootstrap 4 theme required for the horizontal alignment option

## Manual Installation
1. Download the [master ZIP archive](https://github.com/juek/AnchorNavigation/archive/master.zip)
2. Upload the extracted folder 'AnchorNavigation-master' to your server into the /addons directory
3. Install using Typesetter's Admin Toolbox &rarr; Plugins &rarr; Manage &rarr; Available &rarr; AnchorNavigation

## License
GPL 2 (same as Typesetter CMS).
