// Log initialization
console.log('Initializing IDE...');

// Default file contents
const defaultFiles = {
  'index.html': `<!DOCTYPE html>
<html>
  <head>
    <title>My Page</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1>Hello, World!</h1>
    <p id="demo">This is a demo.</p>
    <script src="script.js"></script>
  </body>
</html>`,
  'style.css': `body {
  background-color: #f0f0f0;
  font-family: Arial, sans-serif;
}

h1 {
  color: #333;
}

p {
  color: #666;
}`,
  'script.js': `document.getElementById("demo").innerHTML = "Hello from JavaScript!";
console.log("Script loaded.");`
};

// Initialize CodeMirror editors
const editors = {};
try {
  document.querySelectorAll('.code-editor').forEach((textarea) => {
    console.log(`Initializing editor for ${textarea.id}`);
    const mode = textarea.id.includes('html') ? 'htmlmixed' :
                 textarea.id.includes('css') ? 'css' :
                 textarea.id.includes('js') || textarea.id.includes('jsx') ? 'javascript' :
                 textarea.id.includes('py') ? 'python' : 'text';
    const editor = CodeMirror.fromTextArea(textarea, {
      lineNumbers: true,
      mode: mode,
      theme: 'the-matrix',
      tabSize: 2,
      lineWrapping: true,
      extraKeys: {
        'Ctrl-S': saveToFile,
        'Cmd-S': saveToFile
      }
    });
    editors[textarea.id] = editor;
    editor.on('change', () => {
      console.log(`Editor ${textarea.id} changed, updating preview...`);
      updatePreview();
    });
  });
} catch (error) {
  console.error('Error initializing CodeMirror editors:', error);
}

// Initial preview update
try {
  console.log('Updating initial preview...');
  updatePreview();
} catch (error) {
  console.error('Error in initial preview update:', error);
}

// Tab switching
let activeTab = 'html-index';
function switchTab(tabId) {
  try {
    console.log(`Switching to tab: ${tabId}`);
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.editor-area').forEach(area => area.classList.remove('visible'));

    const tabButton = document.querySelector(`.tab[data-file-id="${tabId}"], .tab[onclick="switchTab('${tabId}')"]`);
    if (tabButton) tabButton.classList.add('active');
    else console.warn(`Tab button for ${tabId} not found`);

    const area = document.getElementById(tabId);
    if (area) area.classList.add('visible');
    else console.warn(`Editor area for ${tabId} not found`);

    activeTab = tabId;

    if (tabId !== 'browser' && editors[`editor-${tabId}`]) {
      editors[`editor-${tabId}`].refresh();
      editors[`editor-${tabId}`].focus();
    }
  } catch (error) {
    console.error(`Error switching tab to ${tabId}:`, error);
  }
}

// Update preview
function updatePreview() {
  try {
    const htmlContent = editors['editor-html-index']?.getValue() || defaultFiles['index.html'];
    const cssContent = `<style>${editors['editor-css-style']?.getValue() || defaultFiles['style.css']}</style>`;
    const jsContent = `<script>${editors['editor-js-script']?.getValue() || defaultFiles['script.js']}</script>`;
    const fullContent = `${htmlContent.replace('</head>', `${cssContent}</head>`).replace('</body>', `${jsContent}</body>`)}`;

    const iframe = document.getElementById('preview');
    if (!iframe) throw new Error('Preview iframe not found');
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(fullContent);
    iframeDoc.close();
    console.log('Preview updated successfully');
  } catch (error) {
    console.error('Error updating preview:', error);
  }
}

// Recreate default file
function recreateDefaultFile(fileName, tabId, mode, content) {
  try {
    if (document.getElementById(tabId)) {
      console.log(`File ${fileName} already exists, skipping recreation`);
      return;
    }
    console.log(`Recreating default file ${fileName}`);
    const tabButton = document.createElement('button');
    tabButton.className = 'tab';
    tabButton.setAttribute('data-file-id', tabId);
    tabButton.setAttribute('onclick', `switchTab('${tabId}')`);
    tabButton.textContent = fileName;
    document.querySelector('.tabs').insertBefore(tabButton, document.querySelector('.tabs .tab:last-child'));

    const editorArea = document.createElement('div');
    editorArea.id = tabId;
    editorArea.className = 'editor-area';
    const textarea = document.createElement('textarea');
    textarea.id = `editor-${tabId}`;
    textarea.className = 'code-editor';
    textarea.value = content;
    editorArea.appendChild(textarea);
    document.querySelector('.container').appendChild(editorArea);

    const editor = CodeMirror.fromTextArea(textarea, {
      lineNumbers: true,
      mode: mode,
      theme: 'the-matrix',
      tabSize: 2,
      lineWrapping: true,
      extraKeys: {
        'Ctrl-S': saveToFile,
        'Cmd-S': saveToFile
      }
    });
    editors[`editor-${tabId}`] = editor;
    editor.on('change', () => {
      console.log(`Editor ${tabId} changed, updating preview...`);
      updatePreview();
    });
    console.log(`Default file ${fileName} recreated`);
  } catch (error) {
    console.error(`Error recreating default file ${fileName}:`, error);
  }
}

// File operations
function showNewFileModal() {
  try {
    console.log('Showing new file modal');
    document.getElementById('newFileModal').style.display = 'flex';
  } catch (error) {
    console.error('Error showing new file modal:', error);
  }
}

function closeNewFileModal() {
  try {
    document.getElementById('newFileModal').style.display = 'none';
    document.getElementById('newFileName').value = '';
    console.log('New file modal closed');
  } catch (error) {
    console.error('Error closing new file modal:', error);
  }
}

function createNewFile() {
  try {
    console.log('Creating new file...');
    let fileName = document.getElementById('newFileName').value.trim();
    const fileType = document.getElementById('fileType').value;

    if (!fileName) {
      alert('Please enter a file name.');
      console.warn('File name empty');
      return;
    }

    // Append the correct extension if not already present
    const extensions = {
      html: '.html',
      css: '.css',
      js: '.js',
      jsx: '.jsx',
      py: '.py'
    };
    const extension = extensions[fileType];
    if (!fileName.toLowerCase().endsWith(extension)) {
      fileName += extension;
    }

    const tabId = `${fileType}-${fileName.replace(/\./g, '-')}`;
    if (document.getElementById(tabId)) {
      alert('File already exists.');
      console.warn(`File ${fileName} already exists`);
      return;
    }

    // Determine CodeMirror mode
    const mode = fileType === 'html' ? 'htmlmixed' :
                 fileType === 'css' ? 'css' :
                 fileType === 'js' || fileType === 'jsx' ? 'javascript' :
                 fileType === 'py' ? 'python' : 'text';

    console.log(`Creating tab for ${fileName} with tabId ${tabId} and mode ${mode}`);
    const tabButton = document.createElement('button');
    tabButton.className = 'tab';
    tabButton.setAttribute('data-file-id', tabId);
    tabButton.setAttribute('onclick', `switchTab('${tabId}')`);
    tabButton.textContent = fileName;
    document.querySelector('.tabs').insertBefore(tabButton, document.querySelector('.tabs .tab:last-child'));

    const editorArea = document.createElement('div');
    editorArea.id = tabId;
    editorArea.className = 'editor-area';
    const textarea = document.createElement('textarea');
    textarea.id = `editor-${tabId}`;
    textarea.className = 'code-editor';
    editorArea.appendChild(textarea);
    document.querySelector('.container').appendChild(editorArea);

    const editor = CodeMirror.fromTextArea(textarea, {
      lineNumbers: true,
      mode: mode,
      theme: 'the-matrix',
      tabSize: 2,
      lineWrapping: true,
      extraKeys: {
        'Ctrl-S': saveToFile,
        'Cmd-S': saveToFile
      }
    });
    editors[`editor-${tabId}`] = editor;
    editor.on('change', () => {
      console.log(`Editor ${tabId} changed, updating preview...`);
      updatePreview();
    });

    closeNewFileModal();
    switchTab(tabId);
    console.log(`New file ${fileName} created with mode ${mode}`);
  } catch (error) {
    console.error('Error creating new file:', error);
    alert('Failed to create new file. Check console for details.');
  }
}

function triggerFileInput() {
  try {
    console.log('Triggering file input');
    document.getElementById('fileInput').click();
  } catch (error) {
    console.error('Error triggering file input:', error);
  }
}

document.getElementById('fileInput').addEventListener('change', (event) => {
  try {
    const file = event.target.files[0];
    if (!file) {
      console.warn('No file selected');
      return;
    }

    const fileName = file.name;
    const fileType = fileName.split('.').pop().toLowerCase();
    const tabId = `${fileType}-${fileName.replace(/\./g, '-')}`;

    if (document.getElementById(tabId)) {
      alert('File already exists.');
      console.warn(`File ${fileName} already exists`);
      return;
    }

    // Determine CodeMirror mode for imported file
    const mode = fileType === 'html' ? 'htmlmixed' :
                 fileType === 'css' ? 'css' :
                 fileType === 'js' || fileType === 'jsx' ? 'javascript' :
                 fileType === 'py' ? 'python' : 'text';

    console.log(`Importing file ${fileName} with mode ${mode}`);
    const reader = new FileReader();
    reader.onload = (e) => {
      const tabButton = document.createElement('button');
      tabButton.className = 'tab';
      tabButton.setAttribute('data-file-id', tabId);
      tabButton.setAttribute('onclick', `switchTab('${tabId}')`);
      tabButton.textContent = fileName;
      document.querySelector('.tabs').insertBefore(tabButton, document.querySelector('.tabs .tab:last-child'));

      const editorArea = document.createElement('div');
      editorArea.id = tabId;
      editorArea.className = 'editor-area';
      const textarea = document.createElement('textarea');
      textarea.id = `editor-${tabId}`;
      textarea.className = 'code-editor';
      textarea.value = e.target.result;
      editorArea.appendChild(textarea);
      document.querySelector('.container').appendChild(editorArea);

      const editor = CodeMirror.fromTextArea(textarea, {
        lineNumbers: true,
        mode: mode,
        theme: 'the-matrix',
        tabSize: 2,
        lineWrapping: true,
        extraKeys: {
          'Ctrl-S': saveToFile,
          'Cmd-S': saveToFile
        }
      });
      editors[`editor-${tabId}`] = editor;
      editor.on('change', () => {
        console.log(`Editor ${tabId} changed, updating preview...`);
        updatePreview();
      });

      switchTab(tabId);
      console.log(`File ${fileName} imported successfully with mode ${mode}`);
    };
    reader.readAsText(file);
  } catch (error) {
    console.error('Error importing file:', error);
    alert('Failed to import file. Check console for details.');
  }
});

function saveToFile() {
  try {
    if (activeTab === 'browser') {
      alert('Please select a file tab to save.');
      console.warn('Attempted to save browser tab');
      return;
    }

    const editor = editors[`editor-${activeTab}`];
    if (!editor) throw new Error(`Editor for ${activeTab} not found`);
    const content = editor.getValue();
    const tabButton = document.querySelector(`.tab[data-file-id="${activeTab}"]`);
    if (!tabButton) throw new Error(`Tab button for ${activeTab} not found`);
    const fileName = tabButton.textContent;

    console.log(`Opening save modal for ${fileName}`);
    document.getElementById('saveFileName').value = fileName;
    document.getElementById('saveFileModal').style.display = 'flex';
  } catch (error) {
    console.error('Error opening save file modal:', error);
    alert('Failed to initiate save. Check console for details.');
  }
}

function closeSaveFileModal() {
  try {
    document.getElementById('saveFileModal').style.display = 'none';
    document.getElementById('saveFileName').value = '';
    console.log('Save file modal closed');
  } catch (error) {
    console.error('Error closing save file modal:', error);
  }
}

function downloadFile() {
  try {
    const fileName = document.getElementById('saveFileName').value.trim();
    if (!fileName) {
      alert('Please enter a file name.');
      console.warn('Save file name empty');
      return;
    }

    const editor = editors[`editor-${activeTab}`];
    if (!editor) throw new Error(`Editor for ${activeTab} not found`);
    const content = editor.getValue();
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
    closeSaveFileModal();
    console.log(`File ${fileName} downloaded successfully`);
  } catch (error) {
    console.error('Error downloading file:', error);
    alert('Failed to download file. Check console for details.');
  }
}

function showDeleteModal() {
  try {
    if (activeTab === 'browser') {
      alert('Cannot delete the Browser tab.');
      console.warn('Attempted to delete browser tab');
      return;
    }

    const tabButton = document.querySelector(`.tab[data-file-id="${activeTab}"]`);
    if (!tabButton) throw new Error(`Tab button for ${activeTab} not found`);
    document.getElementById('deleteFileMessage').textContent = `Are you sure you want to delete ${tabButton.textContent}?`;
    document.getElementById('deleteFileModal').style.display = 'flex';
    console.log(`Showing delete modal for ${tabButton.textContent}`);
  } catch (error) {
    console.error('Error showing delete modal:', error);
  }
}

function closeDeleteModal() {
  try {
    document.getElementById('deleteFileModal').style.display = 'none';
    console.log('Delete file modal closed');
  } catch (error) {
    console.error('Error closing delete file modal:', error);
  }
}

function confirmDeleteFile() {
  try {
    const tabButton = document.querySelector(`.tab[data-file-id="${activeTab}"]`);
    if (!tabButton) throw new Error(`Tab button for ${activeTab} not found`);
    const editorArea = document.getElementById(activeTab);
    if (!editorArea) throw new Error(`Editor area for ${activeTab} not found`);
    const fileName = tabButton.textContent;

    // Switch to another tab before deletion to avoid active tab issues
    if (tabButton.classList.contains('active')) {
      const nextTab = document.querySelector('.tab[data-file-id]:not([data-file-id="' + activeTab + '"])')?.getAttribute('data-file-id') || 'browser';
      switchTab(nextTab);
      console.log(`Switched from ${activeTab} to ${nextTab} before deletion`);
    }

    // Force removal of tab and editor
    console.log(`Attempting to remove tab and editor for ${fileName}`);
    const tabParent = tabButton.parentElement;
    const areaParent = editorArea.parentElement;
    if (tabParent && areaParent) {
      tabButton.remove();
      editorArea.remove();
      delete editors[`editor-${activeTab}`];
      console.log(`Successfully removed ${fileName} from DOM and editors`);
    } else {
      throw new Error(`Parent elements for ${fileName} not found`);
    }

    // Delay recreation to ensure removal is complete
    setTimeout(() => {
      let shouldRecreate = false;
      if (fileName === 'index.html') {
        recreateDefaultFile('index.html', 'html-index', 'htmlmixed', defaultFiles['index.html']);
        shouldRecreate = true;
      } else if (fileName === 'style.css') {
        recreateDefaultFile('style.css', 'css-style', 'css', defaultFiles['style.css']);
        shouldRecreate = true;
      } else if (fileName === 'script.js') {
        recreateDefaultFile('script.js', 'js-script', 'javascript', defaultFiles['script.js']);
        shouldRecreate = true;
      }

      if (shouldRecreate) {
        console.log(`Recreation of ${fileName} triggered after delay`);
      } else {
        console.log(`${fileName} deleted permanently`);
      }
      updatePreview();
      console.log(`Deletion and recreation process for ${fileName} completed`);
    }, 100); // 100ms delay to ensure DOM updates

    closeDeleteModal();
  } catch (error) {
    console.error('Error deleting file:', error);
    alert('Failed to delete file. Check console for details.');
  }
}

function selectAllCode() {
  try {
    if (activeTab === 'browser') {
      alert('Please select a file tab to select code.');
      console.warn('Attempted to select code in browser tab');
      return;
    }

    const editor = editors[`editor-${activeTab}`];
    if (!editor) throw new Error(`Editor for ${activeTab} not found`);
    editor.execCommand('selectAll');
    editor.focus();
    console.log(`Selected all code in ${activeTab}`);
  } catch (error) {
    console.error('Error selecting all code:', error);
  }
}

function findAndReplace() {
  try {
    if (activeTab === 'browser') {
      alert('Please select a file tab to perform find and replace.');
      console.warn('Attempted find and replace in browser tab');
      return;
    }

    const findText = document.getElementById('findText').value;
    const replaceText = document.getElementById('replaceText').value;
    if (!findText) {
      alert('Please enter text to find.');
      console.warn('Find text empty');
      return;
    }

    const editor = editors[`editor-${activeTab}`];
    if (!editor) throw new Error(`Editor for ${activeTab} not found`);
    let content = editor.getValue();
    const regex = new RegExp(findText, 'g');
    content = content.replace(regex, replaceText);
    editor.setValue(content);
    updatePreview();
    console.log(`Find and replace completed in ${activeTab}`);
  } catch (error) {
    console.error('Error in find and replace:', error);
    alert('Failed to perform find and replace. Check console for details.');
  }
}

// Project operations
function showNewProjectModal() {
  try {
    console.log('Showing new project modal');
    document.getElementById('newProjectModal').style.display = 'flex';
  } catch (error) {
    console.error('Error showing new project modal:', error);
  }
}

function closeNewProjectModal() {
  try {
    document.getElementById('newProjectModal').style.display = 'none';
    document.getElementById('newProjectName').value = '';
    console.log('New project modal closed');
  } catch (error) {
    console.error('Error closing new project modal:', error);
  }
}

function createNewProject() {
  try {
    const projectName = document.getElementById('newProjectName').value.trim();
    if (!projectName) {
      alert('Please enter a project name.');
      console.warn('Project name empty');
      return;
    }

    const projectList = document.getElementById('projectList');
    if (Array.from(projectList.options).some(option => option.value === projectName)) {
      alert('Project already exists.');
      console.warn(`Project ${projectName} already exists`);
      return;
    }

    const option = document.createElement('option');
    option.value = projectName;
    option.textContent = projectName;
    projectList.appendChild(option);
    projectList.value = projectName;
    document.getElementById('projectName').value = projectName;

    document.getElementById('saveProjectBtn').disabled = false;
    document.getElementById('openProjectBtn').disabled = false;
    document.getElementById('deleteProjectBtn').disabled = false;
    document.getElementById('exportProjectBtn').disabled = false;

    closeNewProjectModal();
    console.log(`New project ${projectName} created`);
  } catch (error) {
    console.error('Error creating new project:', error);
    alert('Failed to create new project. Check console for details.');
  }
}

function saveProject() {
  try {
    const projectName = document.getElementById('projectName').value.trim();
    if (!projectName) {
      alert('Please enter a project name.');
      console.warn('Project name empty for save');
      return;
    }

    const files = {};
    Object.keys(editors).forEach(editorId => {
      const tabId = editorId.replace('editor-', '');
      const tabButton = document.querySelector(`.tab[data-file-id="${tabId}"]`);
      if (tabButton) {
        files[tabButton.textContent] = editors[editorId].getValue();
      }
    });

    const projectData = { files };
    localStorage.setItem(`project-${projectName}`, JSON.stringify(projectData));
    alert('Project saved successfully.');
    console.log(`Project ${projectName} saved`);
  } catch (error) {
    console.error('Error saving project:', error);
    alert('Failed to save project. Check console for details.');
  }
}

function openProject() {
  try {
    const projectName = document.getElementById('projectList').value;
    if (!projectName) {
      alert('Please select a project to open.');
      console.warn('No project selected for open');
      return;
    }

    const projectData = JSON.parse(localStorage.getItem(`project-${projectName}`));
    if (!projectData) {
      alert('Project not found.');
      console.warn(`Project ${projectName} not found in localStorage`);
      return;
    }

    console.log(`Opening project ${projectName}`);
    document.querySelectorAll('.tab[data-file-id]').forEach(tab => {
      const tabId = tab.getAttribute('data-file-id');
      tab.remove();
      document.getElementById(tabId).remove();
      delete editors[`editor-${tabId}`];
    });

    // Recreate default files
    recreateDefaultFile('index.html', 'html-index', 'htmlmixed', defaultFiles['index.html']);
    recreateDefaultFile('style.css', 'css-style', 'css', defaultFiles['style.css']);
    recreateDefaultFile('script.js', 'js-script', 'javascript', defaultFiles['script.js']);

    Object.entries(projectData.files).forEach(([fileName, content]) => {
      const fileType = fileName.split('.').pop().toLowerCase();
      const tabId = `${fileType}-${fileName.replace(/\./g, '-')}`;
      const mode = fileType === 'html' ? 'htmlmixed' :
                   fileType === 'css' ? 'css' :
                   fileType === 'js' || fileType === 'jsx' ? 'javascript' :
                   fileType === 'py' ? 'python' : 'text';

      if (['html-index', 'css-style', 'js-script'].includes(tabId)) {
        editors[`editor-${tabId}`].setValue(content);
      } else {
        console.log(`Loading project file ${fileName}`);
        const tabButton = document.createElement('button');
        tabButton.className = 'tab';
        tabButton.setAttribute('data-file-id', tabId);
        tabButton.setAttribute('onclick', `switchTab('${tabId}')`);
        tabButton.textContent = fileName;
        document.querySelector('.tabs').insertBefore(tabButton, document.querySelector('.tabs .tab:last-child'));

        const editorArea = document.createElement('div');
        editorArea.id = tabId;
        editorArea.className = 'editor-area';
        const textarea = document.createElement('textarea');
        textarea.id = `editor-${tabId}`;
        textarea.className = 'code-editor';
        textarea.value = content;
        editorArea.appendChild(textarea);
        document.querySelector('.container').appendChild(editorArea);

        const editor = CodeMirror.fromTextArea(textarea, {
          lineNumbers: true,
          mode: mode,
          theme: 'the-matrix',
          tabSize: 2,
          lineWrapping: true,
          extraKeys: {
            'Ctrl-S': saveToFile,
            'Cmd-S': saveToFile
          }
        });
        editors[`editor-${tabId}`] = editor;
        editor.on('change', () => {
          console.log(`Editor ${tabId} changed, updating preview...`);
          updatePreview();
        });
      }
    });

    document.getElementById('projectName').value = projectName;
    switchTab('html-index');
    updatePreview();
    console.log(`Project ${projectName} opened successfully`);
  } catch (error) {
    console.error('Error opening project:', error);
    alert('Failed to open project. Check console for details.');
  }
}

function showDeleteProjectModal() {
  try {
    const projectName = document.getElementById('projectList').value;
    if (!projectName) {
      alert('Please select a project to delete.');
      console.warn('No project selected for delete');
      return;
    }

    document.getElementById('deleteProjectMessage').textContent = `Are you sure you want to delete the project "${projectName}"?`;
    document.getElementById('deleteProjectModal').style.display = 'flex';
    console.log(`Showing delete project modal for ${projectName}`);
  } catch (error) {
    console.error('Error showing delete project modal:', error);
  }
}

function closeDeleteProjectModal() {
  try {
    document.getElementById('deleteProjectModal').style.display = 'none';
    console.log('Delete project modal closed');
  } catch (error) {
    console.error('Error closing delete project modal:', error);
  }
}

function confirmDeleteProject() {
  try {
    const projectName = document.getElementById('projectList').value;
    localStorage.removeItem(`project-${projectName}`);
    const projectList = document.getElementById('projectList');
    projectList.remove(projectList.selectedIndex);
    projectList.value = '';
    document.getElementById('projectName').value = '';

    document.getElementById('saveProjectBtn').disabled = true;
    document.getElementById('openProjectBtn').disabled = true;
    document.getElementById('deleteProjectBtn').disabled = true;
    document.getElementById('exportProjectBtn').disabled = true;

    document.querySelectorAll('.tab[data-file-id]').forEach(tab => {
      const tabId = tab.getAttribute('data-file-id');
      tab.remove();
      document.getElementById(tabId).remove();
      delete editors[`editor-${tabId}`];
    });

    recreateDefaultFile('index.html', 'html-index', 'htmlmixed', defaultFiles['index.html']);
    recreateDefaultFile('style.css', 'css-style', 'css', defaultFiles['style.css']);
    recreateDefaultFile('script.js', 'js-script', 'javascript', defaultFiles['script.js']);

    switchTab('html-index');
    updatePreview();
    closeDeleteProjectModal();
    console.log(`Project ${projectName} deleted successfully`);
  } catch (error) {
    console.error('Error deleting project:', error);
    alert('Failed to delete project. Check console for details.');
  }
}

function exportProject() {
  try {
    const projectName = document.getElementById('projectList').value;
    if (!projectName) {
      alert('Please select a project to export.');
      console.warn('No project selected for export');
      return;
    }

    const projectData = JSON.parse(localStorage.getItem(`project-${projectName}`));
    if (!projectData) {
      alert('Project not found.');
      console.warn(`Project ${projectName} not found for export`);
      return;
    }

    console.log(`Exporting project ${projectName}`);
    const zip = new JSZip();
    Object.entries(projectData.files).forEach(([fileName, content]) => {
      zip.file(fileName, content);
    });

    zip.generateAsync({ type: 'blob' }).then((content) => {
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${projectName}.zip`;
      a.click();
      URL.revokeObjectURL(url);
      console.log(`Project ${projectName} exported successfully`);
    });
  } catch (error) {
    console.error('Error exporting project:', error);
    alert('Failed to export project. Check console for details.');
  }
}

// Load existing projects
document.addEventListener('DOMContentLoaded', () => {
  try {
    console.log('Loading existing projects...');
    const projectList = document.getElementById('projectList');
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('project-')) {
        const projectName = key.replace('project-', '');
        const option = document.createElement('option');
        option.value = projectName;
        option.textContent = projectName;
        projectList.appendChild(option);
        console.log(`Found project: ${projectName}`);
      }
    });

    document.getElementById('saveProjectBtn').disabled = true;
    document.getElementById('openProjectBtn').disabled = true;
    document.getElementById('deleteProjectBtn').disabled = true;
    document.getElementById('exportProjectBtn').disabled = true;
    console.log('IDE initialization complete');
  } catch (error) {
    console.error('Error loading existing projects:', error);
    alert('Failed to initialize IDE. Check console for details.');
  }
});
