/* eslint-disable node/no-unsupported-features/es-syntax */
import hljs from 'highlight.js/lib/core';
import armasm from 'highlight.js/lib/languages/armasm';
import cpp from 'highlight.js/lib/languages/c-like';
import javascript from 'highlight.js/lib/languages/javascript';
import ruby from 'highlight.js/lib/languages/ruby';

hljs.registerLanguage('armasm', armasm);
hljs.registerLanguage('cpp', cpp);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('ruby', ruby);

document.addEventListener('DOMContentLoaded', () => {
  hljs.initHighlightingOnLoad();
});
