window.onerror = function(message, source, lineno, colno, error) {
  console.error(`Global error: ${message} at ${source}:${lineno}:${colno}`);
  alert(`A script error occurred: ${message}. Check the console for details.`);
  return true;
};

let files = {
  'html-index': { type: 'html', content: document.getElementById('editor-html-index').value },
  'css-style': { type: 'css', content: document.getElementById('editor-css-style').value },
  'js-script': { type: 'js', content: document.getElementById('editor-js-script').value }
};

let currentTab = 'html-index';
let lastHtmlTab = 'html-index';
let currentProject = null;

function stripLineNumbers(content) {
  return content.replace(/^\d+\s+/gm, '');
}

function updateLineNumbers(textarea) {
  const fileId = textarea.id.replace('editor-', '');
  let content = textarea.value;
  // Remove existing line numbers
  content = stripLineNumbers(content);
  // Split into lines and add new line numbers
  const lines = content.split('\n');
  const numberedContent = lines.map((line, index) => `${index + 1}  ${line}`).join('\n');
  // Update textarea only if content has changed to avoid infinite loops
  if (textarea.value !== numberedContent) {
    textarea.value = numberedContent;
    files[fileId].content = numberedContent;
  }
}

function updateButtonStates() {
  const selectAllBtn = document.getElementById('selectAllBtn');
  const saveBtn = document.getElementById('saveBtn');
  const deleteBtn = document.getElementById('deleteBtn');
  const findReplaceBtn = document.getElementById('findReplaceBtn');
  const openProjectBtn = document.getElementById('openProjectBtn');

  const isBrowserTab = currentTab === 'browser';
  selectAllBtn.disabled = isBrowserTab;
  saveBtn.disabled = isBrowserTab;
  deleteBtn.disabled = isBrowserTab || Object.keys(files).length <= 1;
  findReplaceBtn.disabled = isBrowserTab || !document.getElementById('findText').value;
  openProjectBtn.disabled = !document.getElementById('projectList').value;
}

function loadInitialFiles() {
  for (let fileId in files) {
    if (!document.getElementById(fileId)) {
      const file = files[fileId];
      const tab = document.createElement('button');
      tab.className = 'tab';
      tab.textContent = `${fileId.replace(/^[^-]+-/, '')}.${file.type}`;
      tab.setAttribute('data-file-id', fileId);
      tab.onclick = () => switchTab(fileId);
      document.querySelector('.tabs').insertBefore(tab, document.querySelector('.tab[onclick="switchTab(\'browser\')"]'));

      const editorArea = document.createElement('div');
      editorArea.id = fileId;
      editorArea.className = 'editor-area';
      const textarea = document.createElement('textarea');
      textarea.id = `editor-${fileId}`;
      textarea.className = 'code-editor';
      textarea.spellcheck = false;
      textarea.value = file.content;
      editorArea.appendChild(textarea);
      document.querySelector('.container').appendChild(editorArea);

      textarea.addEventListener('input', () => {
        updateLineNumbers(textarea);
      });
      textarea.addEventListener('paste', (e) => {
        setTimeout(() => updateLineNumbers(textarea), 0);
      });
    } else {
      const textarea = document.getElementById(`editor-${fileId}`);
      if (textarea) textarea.value = files[fileId].content;
    }
  }
  if (!files[lastHtmlTab] || files[lastHtmlTab].type !== 'html') {
    const htmlFiles = Object.keys(files).filter(id => files[id].type === 'html');
    lastHtmlTab = htmlFiles.length > 0 ? htmlFiles[0] : null;
  }
  updateButtonStates();
  loadProjects();
}

function switchTab(tab) {
  console.log(`Switching to tab: ${tab}`);
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  const tabButton = document.querySelector(`.tab[data-file-id="${tab}"], .tab[onclick="switchTab('${tab}')"]`);
  if (tabButton) tabButton.classList.add('active');
  else console.warn(`Tab button for ${tab} not found`);

  document.querySelectorAll('.editor-area').forEach(e => e.classList.remove('visible'));
  const editorArea = document.getElementById(tab);
  if (editorArea) editorArea.className = 'editor-area visible';
  else console.warn(`Editor area for ${tab} not found`);

  currentTab = tab;
  if (files[tab]?.type === 'html') lastHtmlTab = tab;

  updateButtonStates();
  updateFindReplaceButton();

  if (tab === 'browser') {
    runCode();
  } else {
    const textarea = editorArea?.querySelector('.code-editor');
    if (textarea) {
      setTimeout(() => {
        textarea.focus();
        updateLineNumbers(textarea);
      }, 50);
    }
  }
}

function runCode() {
  console.log('Running code for browser preview');
  if (currentTab !== 'browser') {
    const editor = document.getElementById(`editor-${currentTab}`);
    if (editor) files[currentTab].content = editor.value;
  }

  let htmlContent = lastHtmlTab && files[lastHtmlTab]?.type === 'html' ? stripLineNumbers(files[lastHtmlTab].content) : '<html><body><h1>No HTML file available</h1></body></html>';
  let cssContent = '';
  let jsContent = '';

  for (let id in files) {
    if (files[id].type === 'css') cssContent += stripLineNumbers(files[id].content) + '\n';
    else if (files[id].type === 'js') jsContent += stripLineNumbers(files[id].content) + '\n';
  }

  const fullCode = `
    <html>
      <head><style>${cssContent}</style></head>
      <body>${htmlContent}<script>${jsContent}<\/script></body>
    </html>
  `;

  const previewIframe = document.getElementById('preview');
  const oldSrc = previewIframe.src;
  try {
    const blob = new Blob([fullCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    previewIframe.src = url;
    if (oldSrc.startsWith('blob:')) {
      setTimeout(() => URL.revokeObjectURL(oldSrc), 100);
    }
  } catch (error) {
    console.error('Error generating preview:', error);
    previewIframe.src = 'about:blank';
    previewIframe.contentDocument.body.innerHTML = '<h1>Error rendering preview</h1>';
  }
}

function selectAllCode() {
  console.log('Select All button clicked');
  if (currentTab !== 'browser') {
    const textarea = document.querySelector(`#${currentTab} .code-editor`);
    if (textarea) textarea.select();
  }
}

function showDeleteModal() {
  console.log('Delete button clicked');
  if (currentTab === 'browser' || Object.keys(files).length <= 1) {
    console.log('Delete blocked: On browser tab or only one file remains');
    return;
  }

  const fileName = `${currentTab.replace(/^[^-]+-/, '')}.${files[currentTab].type}`;
  console.log(`Showing delete modal for file: ${fileName}`);
  const deleteMessage = document.getElementById('deleteFileMessage');
  deleteMessage.textContent = `Are you sure you want to delete ${fileName}?`;
  document.getElementById('deleteFileModal').style.display = 'flex';
}

function closeDeleteModal() {
  console.log('Delete modal closed');
  document.getElementById('deleteFileModal').style.display = 'none';
}

function confirmDelete() {
  console.log(`Confirming deletion of file: ${currentTab}`);
  if (currentTab === 'browser' || !files[currentTab]) {
    console.warn('Delete aborted: Invalid tab or file not found');
    closeDeleteModal();
    return;
  }

  try {
    const tabButton = document.querySelector(`.tab[data-file-id="${currentTab}"]`);
    if (tabButton) {
      console.log(`Removing tab button for ${currentTab}`);
      tabButton.remove();
    } else {
      console.warn(`Tab button for ${currentTab} not found`);
    }

    const editorArea = document.getElementById(currentTab);
    if (editorArea) {
      console.log(`Removing editor area for ${currentTab}`);
      editorArea.remove();
    } else {
      console.warn(`Editor area for ${currentTab} not found`);
    }

    delete files[currentTab];
    console.log(`File ${currentTab} deleted from files object`);

    if (currentTab === lastHtmlTab) {
      const htmlFiles = Object.keys(files).filter(id => files[id].type === 'html');
      lastHtmlTab = htmlFiles.length > 0 ? htmlFiles[0] : null;
      console.log(`Updated lastHtmlTab to: ${lastHtmlTab || 'none'}`);
    }

    const remainingTabs = Object.keys(files).filter(id => id !== 'browser');
    const nextTab = remainingTabs.length > 0 ? remainingTabs[0] : 'browser';
    console.log(`Switching to next tab: ${nextTab}`);
    switchTab(nextTab);

    closeDeleteModal();
  } catch (error) {
    console.error('Error during file deletion:', error.message);
    alert(`Failed to delete file: ${error.message}. Check the console for details.`);
    closeDeleteModal();
  }
}

function showNewFileModal() {
  console.log('New File button clicked');
  document.getElementById('newFileModal').style.display = 'flex';
  document.getElementById('newFileName').focus();
}

function closeNewFileModal() {
  console.log('New File modal closed');
  document.getElementById('newFileModal').style.display = 'none';
  document.getElementById('newFileName').value = '';
}

function createNewFile() {
  console.log('Create button clicked');
  const name = document.getElementById('newFileName').value.trim();
  const type = document.getElementById('fileType').value;
  if (!name) return alert('Enter a file name.');

  const fileId = `${type}-${name.replace(/\.[^/.]+$/, '')}`;
  if (files[fileId]) return alert('File already exists.');

  const tab = document.createElement('button');
  tab.className = 'tab';
  tab.textContent = `${name}.${type}`;
  tab.setAttribute('data-file-id', fileId);
  tab.onclick = () => switchTab(fileId);
  document.querySelector('.tabs').insertBefore(tab, document.querySelector('.tab[onclick="switchTab(\'browser\')"]'));

  const editorArea = document.createElement('div');
  editorArea.id = fileId;
  editorArea.className = 'editor-area';
  const textarea = document.createElement('textarea');
  textarea.id = `editor-${fileId}`;
  textarea.className = 'code-editor';
  textarea.spellcheck = false;
  const baseContent = type === 'html' ? '<!DOCTYPE html>\n<html>\n  <head>\n    <title>New Page</title>\n  </head>\n  <body>\n  </body>\n</html>' :
                      type === 'css' ? '/* New CSS File */\n' :
                      type === 'js' ? '/* New JS File */\n' :
                      type === 'jsx' ? 'import React from "react";\n\nfunction Component() {\n  return (\n    <div>\n      <h1>Hello, React!</h1>\n    </div>\n  );\n}\n\nexport default Component;\n' :
                      type === 'py' ? '# New Python File\n\nprint("Hello, Python!")\n' : '';
  const lines = baseContent.split('\n');
  textarea.value = lines.map((line, index) => `${index + 1}  ${line}`).join('\n');
  editorArea.appendChild(textarea);
  document.querySelector('.container').appendChild(editorArea);

  files[fileId] = { type, content: textarea.value };

  textarea.addEventListener('input', () => {
    updateLineNumbers(textarea);
  });
  textarea.addEventListener('paste', (e) => {
    setTimeout(() => updateLineNumbers(textarea), 0);
  });

  closeNewFileModal();
  setTimeout(() => {
    switchTab(fileId);
    textarea.focus();
  }, 100);
}

function saveToFile() {
  console.log('Save button clicked');
  if (currentTab === 'browser') return;
  const fileName = `${currentTab.replace(/^[^-]+-/, '')}.${files[currentTab].type}`;
  document.getElementById('saveFileName').value = fileName;
  document.getElementById('saveFileModal').style.display = 'flex';
  document.getElementById('saveFileName').focus();
}

function closeSaveFileModal() {
  console.log('Save modal closed');
  document.getElementById('saveFileModal').style.display = 'none';
  document.getElementById('saveFileName').value = '';
}

function downloadFile() {
  console.log('Download button clicked');
  const fileName = document.getElementById('saveFileName').value.trim();
  if (!fileName) return alert('Enter a file name.');

  const editor = document.getElementById(`editor-${currentTab}`);
  if (editor) files[currentTab].content = editor.value;

  const content = stripLineNumbers(files[currentTab].content);
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  closeSaveFileModal();
}

function findAndReplace() {
  console.log('Find and Replace button clicked');
  if (currentTab === 'browser') {
    console.log('Find and Replace blocked: On browser tab');
    return;
  }

  const findText = document.getElementById('findText').value;
  const replaceText = document.getElementById('replaceText').value;

  if (!findText) {
    alert('Please enter text to find.');
    return;
  }

  const editor = document.getElementById(`editor-${currentTab}`);
  if (!editor) {
    console.error(`Editor for ${currentTab} not found`);
    return;
  }

  const content = stripLineNumbers(editor.value);
  const regex = new RegExp(findText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
  const newContent = content.replace(regex, replaceText);
  const lines = newContent.split('\n');
  editor.value = lines.map((line, index) => `${index + 1}  ${line}`).join('\n');
  files[currentTab].content = editor.value;
  console.log(`Replaced "${findText}" with "${replaceText}" in ${currentTab}`);
}

function updateFindReplaceButton() {
  const findText = document.getElementById('findText').value;
  const findReplaceBtn = document.getElementById('findReplaceBtn');
  findReplaceBtn.disabled = currentTab === 'browser' || !findText;
}

function showNewProjectModal() {
  console.log('Add Project button clicked');
  document.getElementById('newProjectModal').style.display = 'flex';
  document.getElementById('newProjectName').focus();
}

function closeNewProjectModal() {
  console.log('New Project modal closed');
  document.getElementById('newProjectModal').style.display = 'none';
  document.getElementById('newProjectName').value = '';
}

function createNewProject() {
  console.log('Create Project button clicked');
  const name = document.getElementById('newProjectName').value.trim();
  if (!name) return alert('Enter a project name.');

  const projects = JSON.parse(localStorage.getItem('ideProjects') || '{}');
  if (projects[name]) return alert('Project already exists.');

  const projectId = `project-${Date.now()}`;
  projects[name] = { id: projectId, files: {}, currentTab: 'browser' };
  localStorage.setItem('ideProjects', JSON.stringify(projects));

  const projectList = document.getElementById('projectList');
  const option = document.createElement('option');
  option.value = name;
  option.textContent = name;
  projectList.appendChild(option);
  projectList.value = name;

  currentProject = name;
  document.getElementById('projectName').value = name;

  // Clear current files and tabs
  document.querySelectorAll('.tab:not([onclick="switchTab(\'browser\')"])').forEach(tab => tab.remove());
  document.querySelectorAll('.editor-area:not(#browser)').forEach(area => area.remove());
  files = {};
  currentTab = 'browser';
  lastHtmlTab = null;
  switchTab('browser');

  closeNewProjectModal();
  updateButtonStates();
}

function saveProject() {
  console.log('Save Project button clicked');
  const name = document.getElementById('projectName').value.trim();
  if (!name) return alert('Enter a project name.');

  // Update current file contents
  if (currentTab !== 'browser') {
    const editor = document.getElementById(`editor-${currentTab}`);
    if (editor) files[currentTab].content = editor.value;
  }

  const projects = JSON.parse(localStorage.getItem('ideProjects') || '{}');
  const projectId = `project-${Date.now()}`;
  projects[name] = { id: projectId, files: { ...files }, currentTab };
  localStorage.setItem('ideProjects', JSON.stringify(projects));

  // Update dropdown if new project
  if (!Object.keys(projects).includes(name)) {
    const projectList = document.getElementById('projectList');
    const option = document.createElement('option');
    option.value = name;
    option.textContent = name;
    projectList.appendChild(option);
  }

  document.getElementById('projectList').value = name;
  currentProject = name;
  alert('Project saved successfully.');
  updateButtonStates();
}

function openProject() {
  console.log('Open Project button clicked');
  const name = document.getElementById('projectList').value;
  if (!name) return;

  const projects = JSON.parse(localStorage.getItem('ideProjects') || '{}');
  const project = projects[name];
  if (!project) return alert('Project not found.');

  // Clear current files and tabs
  document.querySelectorAll('.tab:not([onclick="switchTab(\'browser\')"])').forEach(tab => tab.remove());
  document.querySelectorAll('.editor-area:not(#browser)').forEach(area => area.remove());
  files = {};

  // Load project files
  for (let fileId in project.files) {
    files[fileId] = project.files[fileId];
  }

  // Recreate tabs and editor areas
  for (let fileId in files) {
    const file = files[fileId];
    const tab = document.createElement('button');
    tab.className = 'tab';
    tab.textContent = `${fileId.replace(/^[^-]+-/, '')}.${file.type}`;
    tab.setAttribute('data-file-id', fileId);
    tab.onclick = () => switchTab(fileId);
    document.querySelector('.tabs').insertBefore(tab, document.querySelector('.tab[onclick="switchTab(\'browser\')"]'));

    const editorArea = document.createElement('div');
    editorArea.id = fileId;
    editorArea.className = 'editor-area';
    const textarea = document.createElement('textarea');
    textarea.id = `editor-${fileId}`;
    textarea.className = 'code-editor';
    textarea.spellcheck = false;
    textarea.value = file.content;
    editorArea.appendChild(textarea);
    document.querySelector('.container').appendChild(editorArea);

    textarea.addEventListener('input', () => {
      updateLineNumbers(textarea);
    });
    textarea.addEventListener('paste', (e) => {
      setTimeout(() => updateLineNumbers(textarea), 0);
    });
  }

  currentProject = name;
  document.getElementById('projectName').value = name;
  currentTab = project.currentTab || 'browser';
  lastHtmlTab = Object.keys(files).find(id => files[id].type === 'html') || null;
  switchTab(currentTab);
}

function loadProjects() {
  const projects = JSON.parse(localStorage.getItem('ideProjects') || '{}');
  const projectList = document.getElementById('projectList');
  projectList.innerHTML = '<option value="">Select a project</option>';
  for (let name in projects) {
    const option = document.createElement('option');
    option.value = name;
    option.textContent = name;
    projectList.appendChild(option);
  }
  updateButtonStates();
}

document.getElementById('findText').addEventListener('input', updateFindReplaceButton);
document.getElementById('replaceText').addEventListener('input', updateFindReplaceButton);

document.querySelectorAll('.code-editor').forEach(editor => {
  editor.addEventListener('input', () => {
    updateLineNumbers(editor);
  });
  editor.addEventListener('paste', (e) => {
    setTimeout(() => updateLineNumbers(editor), 0);
  });
});

document.querySelectorAll('.top-bar button').forEach(button => {
  button.addEventListener('click', () => {
    console.log(`Button clicked: ${button.id}`);
  });
});

document.querySelectorAll('.project-bar button').forEach(button => {
  button.addEventListener('click', () => {
    console.log(`Project button clicked: ${button.id}`);
  });
});

document.querySelectorAll('.modal-content button').forEach(button => {
  button.addEventListener('click', () => {
    console.log(`Modal button clicked: ${button.textContent}`);
  });
});

loadInitialFiles();
window.onload = () => {
  console.log('Window loaded');
  if (currentTab === 'browser') runCode();
};
