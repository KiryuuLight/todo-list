import global from './constans';
import components from './components';
import domFunctions from './domFunctions';

// Default init

const generateDefault = () => domFunctions.createElement('wrapper');

const generateSidebar = () => {
    const htmlSidebar = components.generateSidebarColumnHTML();
    domFunctions.addElementToParent(global.rootPath, htmlSidebar);
};

const generateMain = () => {
    const htmlMain = components.generateMainColumnHTML();
    domFunctions.addElementToParent(global.rootPath, htmlMain);
};

const defaultInit = () => {
    generateDefault();
    generateSidebar();
    generateMain();
};

// Sidebar related

const generateSidebarItems = (newProjectList) => {
    const htmlSidebarItems = generateItemsHTML(
        newProjectList,
        components.generateSidebarItemHTML
    );
    domFunctions.addElementToParent(global.sidebarItemsPath, htmlSidebarItems);
};

const sidebarProjectItems = (newProjectList) => {
    domFunctions.updateContent(global.sidebarItemsPath);
    generateSidebarItems(newProjectList);
};

const formAddProject = () => {
    const htmlFormAddProject = components.generateAddProjectHTML();
    domFunctions.addElementToParent(global.rootPath, htmlFormAddProject);
};

const formUpdateProject = (projectInstance) => {
    const htmlUpdateProjectForm =
        components.generateEditProjectHTML(projectInstance);
    domFunctions.addElementToParent(global.rootPath, htmlUpdateProjectForm);
};

const formRemoveProject = (projectInstance) => {
    const htmlRemoveProjectForm =
        components.generateRemoveProjectHTML(projectInstance);
    domFunctions.addElementToParent(global.rootPath, htmlRemoveProjectForm);
};

// Main related

const mainProject = (projectInstance) => {
    domFunctions.updateContent(global.mainPath);
    const htmlProject = components.generateProjectItemHTML(projectInstance);
    domFunctions.addElementToParent(global.mainPath, htmlProject);
    listOfTasksCompleted(projectInstance);
    listOfTasks(projectInstance);
};

const listOfTasks = (projectInstance) => {
    const arr = projectInstance.getTaskList();

    const htmlTaskList = generateItemsHTML(
        arr,
        components.generateTaskItemHTML
    );

    domFunctions.addElementToParent(global.taskGroupPath, htmlTaskList);
};

const listOfTasksCompleted = (projectInstance) => {
    const arr = projectInstance.getTaskListCompleted();

    const htmlTaskListCompleted = generateItemsHTML(
        arr,
        components.generateTaskCompletedItemHTML
    );

    domFunctions.addElementToParent(
        global.taskGroupCompletedPath,
        htmlTaskListCompleted
    );
};

// CRUD for Task

const formAddTask = () => {
    const htmlAddTaskForm = components.generateAddTaskHTML();
    domFunctions.addElementToParent(global.rootPath, htmlAddTaskForm);
};

const formUpdateTask = (taskInstance) => {
    const htmlUpdateTaskForm = components.generateEditTaskHTML(taskInstance);
    domFunctions.addElementToParent(global.rootPath, htmlUpdateTaskForm);
};

const formRemoveTask = (taskInstance) => {
    const htmlRemoveTaskForm = components.generateRemoveTaskHTML(taskInstance);
    domFunctions.addElementToParent(global.rootPath, htmlRemoveTaskForm);
};

const projectListSelected = (projectInstance) => {
    const htmlOptionList = components.generateProjectListHTML(projectInstance);
    domFunctions.addElementToParent('listProjects', htmlOptionList);
};

const projectListSelectForm = (newProjectList) => {
    const htmlOptionsList = generateItemsHTML(
        newProjectList,
        components.generateProjectListHTML
    );
    domFunctions.addElementToParent('listProjects', htmlOptionsList);
};

const generateItemsHTML = (array, fn) =>
    array.map((value) => fn(value)).join(' ');

export default {
    defaultInit,
    sidebarProjectItems,
    mainProject,
    projectListSelectForm,
    projectListSelected,
    formAddProject,
    formUpdateProject,
    formRemoveProject,
    formAddTask,
    formUpdateTask,
    formRemoveTask,
};
