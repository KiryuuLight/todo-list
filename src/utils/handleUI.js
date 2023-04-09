import pubsubInstance from './pubsub';
import render from './render';
import listeners from './listeners';
import event from './eventHandlers';

const renderDefault = () => {
    render.defaultInit();
    listeners.loadBlockItemHandlers();
};

// LISTENERS

const addViewProjectListeners = () => {
    pubsubInstance.subscribe('listUpdated', listeners.loadProjectBlockItem);
};

const addBlockListeners = () => {
    pubsubInstance.subscribe('listUpdated', listeners.loadBlockItemHandlers);
    pubsubInstance.subscribe(
        'projectRendered',
        listeners.loadBlockItemHandlers
    );
};

const addSubmitListeners = () => {
    pubsubInstance.subscribe('formOpened', listeners.loadSubmitItemHandlers);
};

// Render new projects and save the selection

const renderNewProjects = () => {
    let selectedItem;

    pubsubInstance.subscribe('listUpdated', (newProjectList) => {
        selectedItem = event.updateNewProjects(newProjectList, selectedItem);
    });
    pubsubInstance.subscribe('projectIsSelected', (newSelectedItem) => {
        selectedItem = event.updateProjectSelection(
            selectedItem,
            newSelectedItem
        );
    });
};

const renderListOfProjects = () => {
    let projectList;
    pubsubInstance.subscribe('listUpdated', (newProjectList) => {
        projectList = newProjectList;
    });

    pubsubInstance.subscribe('taskAddFormRendered', () => {
        render.projectListSelectForm(projectList);
    });
};

const renderProject = () => {
    let selectedItem;

    pubsubInstance.subscribe('listUpdated', () => {
        if (selectedItem) {
            render.mainProject(selectedItem);
        }
    });
    pubsubInstance.subscribe('projectRendered', (project) => {
        selectedItem = project;
    });
};
const renderUpdateProjectForm = () => {
    let project;

    pubsubInstance.subscribe('projectRendered', (newProject) => {
        project = newProject;
    });
    pubsubInstance.subscribe('updateProject', () => {
        if (project) {
            render.formUpdateProject(project);
        }
    });
};

const renderRemoveProjectForm = () => {
    let project;

    pubsubInstance.subscribe('projectRendered', (newProject) => {
        project = newProject;
    });
    pubsubInstance.subscribe('removeProject', () => {
        if (project) {
            render.formRemoveProject(project);
        }
    });
};

const renderUpdateTaskForm = () => {
    let project;

    pubsubInstance.subscribe('projectRendered', (newProject) => {
        project = newProject;
    });

    pubsubInstance.subscribe('updateTask', (idTask) => {
        if (project) {
            const task = project
                .getTaskList()
                .find((value) => value.getId() === idTask);
            render.formUpdateTask(task);
            render.projectListSelected(project);
        }
    });
};

const renderRemoveTaskForm = () => {
    let project;

    pubsubInstance.subscribe('projectRendered', (newProject) => {
        project = newProject;
    });

    pubsubInstance.subscribe('removeTask', (idTask) => {
        if (project) {
            console.log(project);
            const task = project
                .getTaskList()
                .find((value) => value.getId() === idTask);
            console.log(task);
            render.formRemoveTask(task);
            render.projectListSelected(project);
        }
    });
};

export default {
    renderDefault,
    renderNewProjects,
    renderProject,
    renderUpdateProjectForm,
    renderRemoveProjectForm,
    renderListOfProjects,
    renderUpdateTaskForm,
    renderRemoveTaskForm,
    addBlockListeners,
    addViewProjectListeners,
    addSubmitListeners,
};
