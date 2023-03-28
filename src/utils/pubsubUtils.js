import { idGenerator } from './sequenceGenerator';

import projectListObj from '../models/projectList';

import projectObj from '../models/project';

import taskObj from '../models/task';

import pubsubInstance from './pubsub';

const listenForListCreation = (callback) => {
    pubsubInstance.subscribe('newListCreated', callback);
};

const listenForProjectAdditions = (callback) => {
    pubsubInstance.subscribe('projectAddedToList', callback);
};

// Pubsub methods : ProjectList Class

const newListCreated = () => {
    const newProjectListInstance = projectListObj.ProjectList;

    const newProjectList = newProjectListInstance.getProjectList();

    console.log(newProjectList);

    pubsubInstance.publish('newListCreated', newProjectList);

    return {
        newProjectListInstance,
    };
};

const findProjectToAdd = () => {
    const handleProjectAdd = (projectListInstance) => {
        pubsubInstance.subscribe('newProjectCreated', (projectInstance) => {
            projectListObj.addProjectToList(
                projectListInstance,
                projectInstance
            );
            pubsubInstance.publish('projectAddedToList', projectListInstance);
        });
    };
    listenForListCreation(handleProjectAdd);
};

const findProjectToRemove = () => {
    const handleProjectRemove = (projectListInstance) => {
        pubsubInstance.subscribe(
            'projectDeleteRequest',
            (idProjectInstance) => {
                projectListObj.removeProjectFromList(
                    projectListInstance,
                    idProjectInstance
                );
            }
        );
    };
    listenForListCreation(handleProjectRemove);
};

const findProjectToUpdate = () => {
    const handleProjectUpdate = (projectListInstance) => {
        pubsubInstance.subscribe(
            'projectUpdateRequest',
            (idProjectInstance, title, description) => {
                projectListObj.updateProjectInList(
                    projectListInstance,
                    idProjectInstance,
                    title,
                    description
                );
            }
        );
    };

    listenForListCreation(handleProjectUpdate);
};

// Pubsub methods : Project Class

const newProjectCreated = (title, description) => {
    const newProject = projectObj.createProject(title, description);

    pubsubInstance.publish('newProjectCreated', newProject);

    return {
        newProject,
    };
};

const updateProject = (idProject, title, description) => {
    pubsubInstance.publish(
        'projectUpdateRequest',
        idProject,
        title,
        description
    );
};

const removeProject = (idProject) => {
    pubsubInstance.publish('projectDeleteRequest', idProject);
};

// Pubsub methods : Handle id generation

const setupIdGeneration = () => {
    const generateProjectNumber = idGenerator();
    pubsubInstance.publish('idProjectStart', generateProjectNumber);

    const generateTaskNumber = idGenerator();
    pubsubInstance.publish('idTaskStart', generateTaskNumber);
};

const setupIdSubscriptions = () => {
    let idProject;
    let idTask;

    pubsubInstance.subscribe('idProjectStart', (generateNumber) => {
        pubsubInstance.subscribe('newProjectCreated', (newProject) => {
            idProject = generateNumber();
            newProject.setId(idProject);
        });
    });

    pubsubInstance.subscribe('idTaskStart', (generateNumber) => {
        pubsubInstance.subscribe('newTaskCreated', (_, newTask) => {
            idTask = generateNumber();
            newTask.setId(idTask);
        });
    });
};

// Pubsub Methods : Task Class

const newTaskCreated = (idProject, title, description, dueDate, priority) => {
    const newTask = taskObj.createTask(title, description, dueDate, priority);

    pubsubInstance.publish('newTaskCreated', idProject, newTask);

    return {
        newTask,
    };
};

const removeTask = (idProject, idTask) => {
    pubsubInstance.publish('taskDeleteRequest', idProject, idTask);
};

const updateTask = (
    idProject,
    idTask,
    title,
    description,
    dueDate,
    priority
) => {
    pubsubInstance.publish('taskUpdateRequest', {
        idProject,
        idTask,
        title,
        description,
        dueDate,
        priority,
    });
};

const findTaskToAdd = () => {
    const handleNewTaskCreated = (projectArray) => {
        pubsubInstance.subscribe(
            'newTaskCreated',
            (idProject, taskInstance) => {
                const project = projectObj.findProjectById(
                    projectArray,
                    idProject
                );
                if (project)
                    return projectObj.addTaskToProject(project, taskInstance);
            }
        );
    };

    listenForProjectAdditions(handleNewTaskCreated);
};

const findTaskToRemove = () => {
    const handleTaskRemove = (projectArray) => {
        pubsubInstance.subscribe('taskDeleteRequest', (idProject, idTask) => {
            const project = projectObj.findProjectById(projectArray, idProject);
            projectObj.removeTaskFromProject(project, idTask);
        });
    };
    listenForProjectAdditions(handleTaskRemove);
};

const findTasktoUpdate = () => {
    const handleTaskUpdate = (projectArray) => {
        pubsubInstance.subscribe('taskUpdateRequest', (data) => {
            const project = projectObj.findProjectById(
                projectArray,
                data.idProject
            );
            projectObj.updateTaskFromProject(project, data);
        });
    };

    listenForProjectAdditions(handleTaskUpdate);
};

export default {
    setupIdGeneration,
    setupIdSubscriptions,
    newListCreated,
    findProjectToAdd,
    findProjectToRemove,
    findProjectToUpdate,
    newTaskCreated,
    findTaskToAdd,
    findTaskToRemove,
    findTasktoUpdate,
    newProjectCreated,
    updateProject,
    removeProject,
    updateTask,
    removeTask,
};
