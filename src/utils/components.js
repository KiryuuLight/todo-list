import image from './loadImages';
import global from './constans';

const generateSidebarColumnHTML = () => {
    const html = `
    <div class="sidebar complementary-column">
        <p class="column-title">Menu</p>
        <div class="list br-gray">
          <p class="list-title">Lists</p>
          <div class="projects" id="${global.sidebarItemsPath}">
          </div>
          <div class="group-items showBlock" id="openAddProjectForm">
              <img class="icon" src="${image.plusSvg}" alt="" srcset="">
              <p>Add New Project</p>
          </div>
        </div>
    </div>`;
    return html;
};

const generateSidebarItemHTML = (projectInstance) => {
    const html = `
    <div class="project-element adjust-element" data-project="${projectInstance.getId()}">
      <div class="group-items">
        <img class="icon" src="${image.squareSvg}" alt="" srcset="">
        <p>${projectInstance.getTitle()}</p>
      </div>
      <div class="number-tasks">
        <p class="number-task">${projectInstance.getTaskList().length}</p>
      </div>
    </div>`;
    return html;
};

const generateMainColumnHTML = () => {
    const html = `
    <div id="${global.mainPath}">
    </div>`;
    return html;
};

// Project Item Related

const generateProjectItemHTML = (projectInstance) => {
    const html = `
    <div id="project">
      <div class="header group-items">
        <p>${projectInstance.getTitle()}</p>
        <div class="group-items pad-item showBlock" id="openUpdateProjectForm">
          <img class="icon" src="${image.editSvg}" alt="" srcset="">
        </div>
        <div class="group-items pad-item showBlock" id="openRemoveProjectForm">
          <img class="icon" src="${image.removeSvg}" alt="" srcset="">
        </div>
      </div>
      <div class="br-all group-items pad-item showBlock" id="openAddTaskForm">
        <img class="icon" src="${image.plusSvg}" alt="" srcset="">
        <p>Add New Task</p>
      </div>
      <div id="${global.taskGroupPath}">
      </div>
    </div>`;
    return html;
};

const generateAddProjectHTML = () => {
    const html = `
  <div class="complementary-column relative" id="block">
      <p class="column-title">Project:</p>
      <div class="information">
        <input id="title" class="input" type="text" placeholder="Some cool title" required>
        <textarea id="description" class="input" cols="30" rows="10" required placeholder="Some cool description"></textarea>
      </div
      <div class="btn-group">
        <button class="btn br-all btnLeft" id="${global.closeBlock}">Close</button>
        <button class="btn br-all btnRight" type="submit" id="addProjectBtn">Add Project</button>
      </div>
  </div>`;
    return html;
};

const generateEditProjectHTML = (projectInstance) => {
    const html = `
    <div class="complementary-column relative" id="block">
      <p class="column-title" id="idProject" data-project="${projectInstance.getId()}">Project:</p>
      <div class="information">
        <input class="input" type="text" id="title" value="${projectInstance.getTitle()}">
        <textarea class="input" name="" id="description" cols="30" rows="10" value="">${projectInstance.getDescription()}</textarea>
        <div class="input-group adjust-element group-items">
          <p>Tasks</p>
          <p>${projectInstance.getTaskList().length}</p>
        </div>
      </div>
      <div class="btn-group">
          <button class="btn br-all btnLeft" id="${
              global.closeBlock
          }">Close</button>
          <button class="btn br-all btnRight" type="submit" id="updateProjectBtn">Update Project</button>
      </div>
    </div>`;
    return html;
};

const generateRemoveProjectHTML = (projectInstance) => {
    const html = `
    <div class="complementary-column relative" id="block">
    <p class="column-title" id="idProject" data-project="${projectInstance.getId()}">Project:</p>
    <div class="information">
      <input class="input" type="text" id="title" value="${projectInstance.getTitle()}"disabled>
      <textarea class="input" name="" id="description" cols="30" rows="10" value="" disabled>${projectInstance.getDescription()}</textarea>
      <div class="input-group adjust-element group-items">
        <p>Tasks</p>
        <p>${projectInstance.getTaskList().length}</p>
      </div>
    </div>
    <div class="btn-group">
        <button class="btn br-all btnLeft" id="${
            global.closeBlock
        }">Close</button>
        <button class="btn br-all btnRight" type="submit" id="removeProjectBtn">Remove Project</button>
    </div>
    </div>`;
    return html;
};

const generateProjectListHTML = (projectInstance) => {
    const html = `
    <option value="${projectInstance.getId()}">${projectInstance.getTitle()}</option>`;
    return html;
};

// Task Item Related

const generateTaskItemHTML = (taskInstance) => {
    const html = `
    <div class="task pad-item br-gray adjust-element">
      <div class="group-items">
        <input class="showBlock" type="checkbox" name="" id="openRemoveTaskForm" data-task="${taskInstance.getId()}">
        <p>${taskInstance.getTitle()}</p>
      </div>
      <div class="icon showBlock" id="openUpdateTaskForm" data-task="${taskInstance.getId()}">
        <img src="${image.arrowSvg}" alt="">
      </div>
    </div>`;
    return html;
};

const generateAddTaskHTML = () => {
    const html = `
    <div class="complementary-column relative" id="block">
      <p class="column-title">Task:</p>
      <div class="information">
        <input class="input" type="text" id="title" placeholder="Some cool task">
        <textarea class="input" name="" id="description" cols="30" rows="10" placeholder="Some cool description"></textarea>
        <div class="input-group adjust-element group-items">
          <p>List</p>
          <select class="select" name="select" id="listProjects">
          </select>
        </div>
        <div class="input-group adjust-element group-items">
          <p>Due date</p>
          <input class="date" type="date" name="" id="dueDate">
        </div>
        <div class="input-group adjust-element group-items">
          <p>Priority</p>
          <select class="select" name="select" id="priority">
            <option value="Urgent">Urgent</option>
            <option value="Important">Important</option>
          </select>
        </div>
      </div>
      <div class="btn-group">
          <button class="btn br-all btnLeft" id="${global.closeBlock}">Close</button>
          <button class="btn br-all btnRight" type="submit" id="addTaskBtn">Add Task</button>
      </div>
    </div>`;
    return html;
};

const generateEditTaskHTML = (taskInstance) => {
    const html = `
    <div class="complementary-column relative" id="block">
      <p class="column-title" id="idTask" data-task="${taskInstance.getId()}">Task:</p>
      <div class="information">
        <input class="input" type="text" id="title" value="${taskInstance.getTitle()}">
        <textarea class="input" name="" id="description" cols="30" rows="10" value="">${taskInstance.getDescription()}</textarea>
        <div class="input-group adjust-element group-items">
            <p>List</p>
            <select class="select" name="select" id="listProjects" disabled>
            </select>
        </div>
        <div class="input-group adjust-element group-items">
          <p>Due date</p>
          <input class="date" type="date" name="" id="dueDate" value="${taskInstance.getDueDate()}">
        </div>
        <div class="input-group adjust-element group-items">
          <p>Priority</p>
          <select class="select" name="select" id="priority">
            <option value="Urgent">Urgent</option>
            <option value="Important" >Important</option>
          </select>
        </div>
      </div>
      <div class="btn-group">
          <button class="btn br-all btnLeft" id="${
              global.closeBlock
          }">Close</button>
          <button class="btn br-all btnRight" type="submit" id="updateTaskBtn">Update Task</button>
      </div>
    </div>`;
    return html;
};

const generateRemoveTaskHTML = (taskInstance) => {
    const html = `
    <div class="complementary-column relative" id="block">
      <p class="column-title" id="idTask" data-task="${taskInstance.getId()}">Task:</p>
      <div class="information">
        <input class="input" type="text" id="title" value="${taskInstance.getTitle()}" disabled>
        <textarea class="input" name="" id="description" cols="30" rows="10" value="" disabled>${taskInstance.getDescription()}</textarea>
        <div class="input-group adjust-element group-items">
            <p>List</p>
            <select class="select" name="select" id="listProjects" disabled>
            </select>
        </div>
        <div class="input-group adjust-element group-items">
          <p>Due date</p>
          <input class="date" type="date" name="" id="dueDate" value="${taskInstance.getDueDate()}" disabled>
        </div>
        <div class="input-group adjust-element group-items">
          <p>Priority</p>
          <select class="select" name="select" id="priority" disabled>
            <option value="Urgent">Urgent</option>
            <option value="Important" >Important</option>
          </select>
        </div>
      </div>
      <div class="btn-group">
          <button class="btn br-all btnLeft" id="removeTaskBtn">Remove Task</button>
          <button class="btn br-all btnRight" type="submit" id="">Task Completed</button>
      </div>
    </div>`;
    return html;
};

export default {
    generateSidebarColumnHTML,
    generateSidebarItemHTML,
    generateMainColumnHTML,
    generateProjectItemHTML,
    generateAddProjectHTML,
    generateEditProjectHTML,
    generateRemoveProjectHTML,
    generateProjectListHTML,
    generateTaskItemHTML,
    generateAddTaskHTML,
    generateEditTaskHTML,
    generateRemoveTaskHTML,
};
