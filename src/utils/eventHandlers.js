import render from './render';
import pubsubInstance from './pubsub';
import pubsubUtils from './pubsubUtils';

// Functions for Project

const updateNewProjects = (newProjectList, selectedItem) => {
    render.sidebarProjectItems(newProjectList);

    if (selectedItem) {
        const updatedSelectedItem = document.querySelector(
            `[data-project="${selectedItem.dataset.project}"]`
        );

        if (updatedSelectedItem) {
            selectedItem = updatedSelectedItem;
            loadItemSelection(selectedItem);
            return selectedItem;
        }
    }
};

const updateProjectSelection = (selectedItem, newSelectedItem) => {
    if (selectedItem) selectedItem.classList.remove('selected');

    selectedItem = newSelectedItem;
    loadItemSelection(selectedItem);
    return selectedItem;
};

const loadItemSelection = (selectedItem) => {
    selectedItem.classList.add('selected');
};

// Functions for FORM

const closeBlock = () => {
    const blockElement = document.getElementById('block');
    if (blockElement) blockElement.remove();
};

const openAddProjectForm = () => {
    render.formAddProject();
};

const openUpdateProjectForm = () => {
    pubsubInstance.publish('updateProject');
};

const openRemoveProjectForm = () => {
    pubsubInstance.publish('removeProject');
};

const openAddTaskForm = () => {
    render.formAddTask();
    pubsubInstance.publish('taskAddFormRendered');
};

const openRemoveTaskForm = (idTask) => {
    pubsubInstance.publish('removeTask', idTask);
};

const openUpdateTaskForm = (idTask) => {
    pubsubInstance.publish('updateTask', idTask);
};

const getProjectData = (updateRemove) => {
    const dataObj = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
    };

    if (updateRemove) {
        const idProject = parseInt(
            document.getElementById('idProject').dataset.project
        );
        dataObj.idProject = idProject;
    }

    return dataObj;
};

const addProject = () => {
    const data = getProjectData();
    pubsubUtils.newProjectCreated(data.title, data.description);
    closeBlock();
};

const updateProject = () => {
    const data = getProjectData('update');
    pubsubUtils.updateProject(data.idProject, data.title, data.description);
    closeBlock();
};

const removeProject = () => {
    const data = getProjectData('remove');
    pubsubUtils.removeProject(data.idProject);
    closeBlock();
};

const getTaskData = (updateRemove) => {
    const dataObj = {
        idProject: parseInt(document.getElementById('listProjects').value),
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        dueDate: document.getElementById('dueDate').value,
        priority: document.getElementById('priority').value,
    };

    if (updateRemove) {
        const idTask = parseInt(document.getElementById('idTask').dataset.task);
        dataObj.idTask = idTask;
    }

    return dataObj;
};

const addTask = () => {
    const data = getTaskData();
    pubsubUtils.newTaskCreated(
        data.idProject,
        data.title,
        data.description,
        data.dueDate,
        data.priority
    );
    closeBlock();
};
const removeTask = () => {
    const data = getTaskData('remove');
    pubsubUtils.removeTask(data.idProject, data.idTask);
    closeBlock();
};

const updateTask = () => {
    const data = getTaskData('update');
    pubsubUtils.updateTask(
        data.idProject,
        data.idTask,
        data.title,
        data.description,
        data.dueDate,
        data.priority
    );
    closeBlock();
};

const completedTask = () => {
    const data = getTaskData('completed');
    pubsubUtils.completeTask(data.idProject, data.idTask);
    closeBlock();
};

export default {
    updateNewProjects,
    updateProjectSelection,
    openAddProjectForm,
    openUpdateProjectForm,
    openRemoveProjectForm,
    openAddTaskForm,
    openRemoveTaskForm,
    openUpdateTaskForm,
    addProject,
    updateProject,
    removeProject,
    addTask,
    removeTask,
    updateTask,
    completedTask,
    closeBlock,
};
