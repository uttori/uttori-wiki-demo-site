/* eslint-disable unicorn/prevent-abbreviations */
const path = require('path');

// Providers
const { Plugin: StorageProvider } = require('@uttori/storage-provider-json-file');
const { Plugin: SearchProvider } = require('@uttori/search-provider-lunr');

// Plugins
const MarkdownItRenderer = require('@uttori/plugin-renderer-markdown-it');
const ReplacerRenderer = require('@uttori/plugin-renderer-replacer');
const MulterUpload = require('@uttori/plugin-upload-multer');
const AnalyticsPlugin = require('@uttori/plugin-analytics-json-file');
const { SitemapGenerator } = require('@uttori/plugin-generator-sitemap');
const { ViewModelPopularDocuments } = require('@uttori/plugin-vm-popular-documents');
const { ViewModelRecentDocuments } = require('@uttori/plugin-vm-recent-documents');
const { ViewModelRandomDocuments } = require('@uttori/plugin-vm-random-documents');
const { ViewModelRelatedDocuments } = require('@uttori/plugin-vm-related-documents');

// Middleware Setup
const ejs = require('ejs');
const layouts = require('express-ejs-layouts');

require('dotenv').config();

const config = {
  site_title: 'Uttori Wiki Demo',
  site_header: 'Uttori Wiki Demo',
  site_footer: 'Uttori Wiki Demo | ✨',
  site_sections: [
    {
      title: 'Section One',
      description: 'An example section.',
      tag: 'examples',
    },
    {
      title: 'Section Two',
      description: 'A section with something already in it.',
      tag: 'reference',
    },
    {
      title: 'Section Three',
      description: 'A third example section.',
      tag: 'tutorial',
    },
  ],
  home_page: 'home-page',
  ignore_slugs: ['home-page'],
  excerpt_length: 400,
  site_url: 'http://127.0.0.1:8000/wiki',
  theme_dir: path.join(__dirname, 'theme'),
  public_dir: path.join(__dirname, 'theme', 'public'),
  use_delete_key: true,
  delete_key: process.env.DELETE_KEY || '',
  use_edit_key: true,
  edit_key: process.env.EDIT_KEY || '',
  public_history: true,
  allowedDocumentKeys: [],
  use_meta_data: true,
  site_description: 'An example Wiki using the Uttori Wiki library.',
  site_locale: 'en_US',
  site_twitter_site: '@twitter',
  site_twitter_creator: '@twitter',

  // Plugins
  plugins: [
    StorageProvider,
    SearchProvider,
    MarkdownItRenderer,
    ReplacerRenderer,
    MulterUpload,
    SitemapGenerator,
    AnalyticsPlugin,
    ViewModelPopularDocuments,
    ViewModelRecentDocuments,
    ViewModelRandomDocuments,
    ViewModelRelatedDocuments,
  ],

  // Use the JSON to Disk Storage Provider
  [StorageProvider.configKey]: {
    // Path in which to store content (markdown files, etc.)
    content_directory: `${__dirname}/content`,

    // Path in which to store content history (markdown files, etc.)
    history_directory: `${__dirname}/content/history`,

    // File Extension
    extension: 'json',

    // JSON stringify parameter for formatting output
    spaces_document: 2,
    spaces_history: 2,
  },

  // Use the Lunr Search Provider
  [SearchProvider.configKey]: {
    // Optional Lunr locale
    lunr_locales: [],

    // Do not show these documents in search results.
    ignore_slugs: ['home-page'],
  },

  // Plugin: Markdown rendering with MarkdownIt
  [MarkdownItRenderer.configKey]: {
    events: {
      renderContent: ['render-content'],
      renderCollection: ['render-search-results'],
      validateConfig: ['validate-config'],
    },

    // Uttori Specific Configuration
    uttori: {
      // Prefix for relative URLs, useful when the Express app is not at root.
      baseUrl: '/wiki',

      // Safe List, if a domain is not in this list, it is set to 'external nofollow noreferrer'.
      allowedExternalDomains: [
        'github.com',
      ],

      // Open external domains in a new window.
      openNewWindow: true,

      // Table of Contents
      toc: {
        // The opening DOM tag for the TOC container.
        openingTag: '<nav class="table-of-contents">',

        // The closing DOM tag for the TOC container.
        closingTag: '</nav>',

        // Slugify options for convering content to anchor links.
        slugify: {
          lower: true,
        },
      },
    },
  },

  // Plugin: Replace text
  [ReplacerRenderer.configKey]: {
    events: {
      renderContent: ['render-content'],
      renderCollection: ['render-search-results'],
      validateConfig: ['validate-config'],
    },

    // Rules for text replace
    rules: [
      {
        test: /Windows/gm,
        output: 'macOS',
      },
    ],
  },

  // Plugin: Multer Upload
  [MulterUpload.configKey]: {
    events: {
      bindRoutes: ['bind-routes'],
      validateConfig: ['validate-config'],
    },

    // Directory files will be uploaded to
    directory: `${__dirname}/uploads`,

    // URL to POST files to
    route: '/upload',

    // URL to GET uploads from
    publicRoute: '/uploads',
  },

  // Plugin: Sitemap Generator
  [SitemapGenerator.configKey]: {
    events: {
      callback: ['document-save', 'document-delete'],
      validateConfig: ['validate-config'],
    },

    // Sitemap URL (ie httsp://domain.tld/wiki)
    base_url: 'http://127.0.0.1:8000/wiki',

    // Location where the XML sitemap will be written to.
    directory: path.join(__dirname, 'theme', 'public'),

    urls: [
      {
        url: '/',
        lastmod: new Date().toISOString(),
        priority: '1.00',
      },
      {
        url: '/tags',
        lastmod: new Date().toISOString(),
        priority: '0.90',
      },
      {
        url: '/new',
        lastmod: new Date().toISOString(),
        priority: '0.70',
      },
    ],
  },

  // Plugin: Analytics with JSON Files
  [AnalyticsPlugin.configKey]: {
    events: {
      getPopularDocuments: ['popular-documents'],
      updateDocument: ['document-save', 'document-delete'],
      validateConfig: ['validate-config'],
    },

    // Directory files will be uploaded to.
    directory: `${__dirname}/data`,

    // Name of the JSON file.
    name: 'visits',

    // File extension to use for the JSON file.
    extension: 'json',
  },

  // Plugin: View Model Popular Documents
  [ViewModelPopularDocuments.configKey]: {
    events: {
      callback: [
        'view-model-home',
        'view-model-tag-index',
        'view-model-tag',
        'view-model-detail',
      ],
    },
    key: 'popularDocuments',
    limit: 5,
    ignore_slugs: ['home-page'],
  },

  // Plugin: View Model Recent Documents
  [ViewModelRecentDocuments.configKey]: {
    events: {
      callback: [
        'view-model-home',
        'view-model-tag-index',
        'view-model-tag',
        'view-model-detail',
      ],
    },
    key: 'recentDocuments',
    limit: 5,
    ignore_slugs: ['home-page'],
  },

  // Plugin: View Model Random Documents
  [ViewModelRandomDocuments.configKey]: {
    events: {
      callback: [
        'view-model-home',
        'view-model-tag-index',
        'view-model-tag',
        // 'view-model-detail',
      ],
    },
    key: 'randomDocuments',
    limit: 5,
    ignore_slugs: ['home-page'],
  },

  // Plugin: View Model Related Documents
  [ViewModelRelatedDocuments.configKey]: {
    events: {
      callback: [
        // 'view-model-home',
        // 'view-model-tag-index',
        // 'view-model-tag',
        'view-model-detail',
      ],
    },
    key: 'relatedDocuments',
    limit: 5,
    ignore_slugs: ['home-page'],
  },

  // Middleware Configuration in the form of ['function', 'param1', 'param2', ...]
  middleware: [
    ['disable', 'x-powered-by'],
    ['enable', 'view cache'],
    ['set', 'views', path.join(__dirname, 'theme', 'templates')],

    // EJS Specific Setup
    ['use', layouts],
    ['set', 'layout extractScripts', true],
    ['set', 'layout extractStyles', true],
    // If you use the `.ejs` extension use the below:
    // ['set', 'view engine', 'ejs'],
    // I prefer using `.html` templates:
    ['set', 'view engine', 'html'],
    ['engine', 'html', ejs.renderFile],
  ],

  // Custom Config Options
  // Google Analytics UA ID
  google_analytics_id: process.env.GOOGLE_ANALYTICS_ID || '',
};

module.exports = config;
