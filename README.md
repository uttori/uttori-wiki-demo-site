# About the Uttori Wiki Demo

This is a hackable demo of the [Uttori Wiki](https://github.com/uttori/uttori-wiki) library and several plugins. The `edit_key` and `delete_key` are both set in the `.env` file. These are required to make, edit or delete documents and should be appended to the URL, for example to edit this page [click here](http://127.0.0.1:8000/wiki/home-page/edit/test). You can also make a [new document](http://127.0.0.1:8000/wiki/new/test) but will need the key in the URL, so the button in the top right should `404`. Try creating new documents with the site section tags `examples`, `reference`, or `tutorial` and watch as the site section counts increase.

## Rendering

This content is written in Markdown and rendered with the [Uttori MarkdownIt Renderer Plugin](https://github.com/uttori/uttori-plugin-renderer-markdown-it) that included some other nice to have features like Table of Contents generation and WikiLinks support like [[cool-example|Cool Example]].

This line says that this was written on the Windows operating system, but the [Replacer Renderer Plugin](https://github.com/uttori/uttori-plugin-renderer-replacer) plugin has replaced `Windowz` with `macOS`. Useful for preventing hateful content from showing up, custom emoji replacement, or other fun uses.

## Storage & Search

The files are stored as JSON file on disk using the [Uttori Storage Provider JSON File Plugin](https://github.com/uttori/uttori-storage-provider-json-file).

Search is powered by the [Uttori Search Provider Lunr Plugin](https://github.com/uttori/uttori-search-provider-lunr), try [searching for](http://127.0.0.1:8000/wiki/search?s=cool) `cool`.

File Uploads are powered by the [Uttori Multer Upload Plugin](https://github.com/uttori/uttori-plugin-upload-multer) and can be tested on the [Edit pages](http://127.0.0.1:8000/wiki/cool-example/edit/test).

## View Model Plugins

There are several optional View Model plugins that are used to add more data to be sent to the front end:

- [Uttori View Model Enrichment Plugin - Popular Documents](https://github.com/uttori/uttori-plugin-vm-popular-documents) - A plugin to expose and add popular documents to a view-model or other object.
- [Uttori View Model Enrichment Plugin - Recent Documents
](https://github.com/uttori/uttori-plugin-vm-recent-documents) - A plugin to expose and add recently edited documents to a view-model or other object.
- [Uttori View Model Enrichment Plugin - Random Documents](https://github.com/uttori/uttori-plugin-vm-random-documents) - A plugin to expose and add randomly selected documents to a view-model or other object.
- [Uttori View Model Enrichment Plugin - Related Documents](https://github.com/uttori/uttori-plugin-vm-related-documents) - A plugin to expose & add related documents with shared tags for a given document to a view-model or other object.

The Popular document depends on a valid Uttori Analytics Provider, and the one being used is the [Uttori Analytics Provider JSON File Plugin](https://github.com/uttori/uttori-plugin-analytics-json-file).

## Meta Plugins

Just for completeness sake in testing features the [Uttori Sitemap Generator Plugin](https://github.com/uttori/uttori-plugin-generator-sitemap) is setup for generating a valid `sitemap.xml` for Google or other interested crawlers.
