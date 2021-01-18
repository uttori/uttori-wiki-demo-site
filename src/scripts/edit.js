/* eslint-disable node/no-unsupported-features/es-syntax, no-alert */
/* global Dropzone */
import slugify from 'slugify';

const parts = window.location.pathname.split('/');
const key = parts[parts.length - 1];

// Update Title / Slug
const updateFormAction = (event) => {
  const slug = slugify(event.target.value, {
    replacement: '-',
    lower: true,
  });
  const form = document.querySelector('.edit form');
  if (form) {
    form.action = `${window.basePath}/${slug}/save/${key}`;
  }
  const input = document.querySelector('input.slug');
  if (input) {
    input.value = slug;
  }
};

const textarea = document.querySelector('textarea.content');
const textareaStretch = () => {
  textarea.style.cssText = 'height: auto;';
  textarea.style.cssText = `height:${textarea.scrollHeight}px`;
};

// Wait for Ready
document.addEventListener('DOMContentLoaded', () => {
  // Grab the edit_key from the URL. It may be garbage, but if key checking is not enabled it does not matter.
  const form = document.querySelector('.edit form');
  if (form && key !== 'edit') {
    form.action = `${form.action}/${key}`;
  }

  // Auto expand the textarea
  textarea.addEventListener('input', textareaStretch);
  textareaStretch();

  // File Uploads
  const dropzone = new Dropzone('.dropzone');
  dropzone.on('success', (file, responseText) => {
    // Read the upload path from the elements data-upload attribute and escape any text sent back from the server.
    const uploadPath = `${window.basePath}/${dropzone.element.getAttribute('data-upload')}${encodeURIComponent(responseText)}`;
    const linkToUploadedFile = file.type.startsWith('image/') ? `![${responseText}](${uploadPath})` : `[${responseText}](${uploadPath})`;
    textarea.value = `${textarea.value}\n${linkToUploadedFile}\n`;
  });

  // Title and Slug Updates
  const title = document.querySelector('.edit input.title');
  title.addEventListener('input', updateFormAction);
  title.addEventListener('propertychange', updateFormAction);
  title.addEventListener('paste', updateFormAction);

  const slug_input = document.querySelector('.edit input.title');
  slug_input.addEventListener('input', updateFormAction);
  slug_input.addEventListener('propertychange', updateFormAction);
  slug_input.addEventListener('paste', updateFormAction);

  // Delete
  const deleteButton = document.querySelector('.edit .delete');
  if (deleteButton) {
    deleteButton.addEventListener('click', (event) => {
      if (!window.confirm('Are you sure you want to delete this document?')) {
        event.preventDefault();
      }
    });
  }
});
