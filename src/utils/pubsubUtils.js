import { idGenerator } from './sequenceGenerator';

import projectListObj from '../models/projectList';

import projectObj from '../models/project';

import taskObj from '../models/task';

import pubsubInstance from './pubsub';

const listenForListCreation = (callback) => {
    pubsubInstance.subscribe('newListCreated', callback);
};

// Pubsub methods : ProjectList Class

const newListCreated = () => {
    const newProjectListInstance = projectListObj.ProjectList;

    const newProjectList = newProjectListInstance.getProjectList();

    pubsubInstance.publish('newListCreated', newProjectList);

    return {
        newProjectListInstance,
    };
};

const findProjectToAdd = () => {
    const handleProjectAdd = (newProjectList) => {
        pubsubInstance.subscribe('newProjectCreated', (projectInstance) => {
            projectListObj.addProjectToList(newProjectList, projectInstance);
            pubsubInstance.publish('projectAddedToList', newProjectList);
            pubsubInstance.publish('listUpdated', newProjectList);
        });
    };
    listenForListCreation(handleProjectAdd);
};

const findProjectToRemove = () => {
    const handleProjectRemove = (newProjectList) => {
        pubsubInstance.subscribe(
            'projectDeleteRequest',
            (idProjectInstance) => {
                projectListObj.removeProjectFromList(
                    newProjectList,
                    idProjectInstance
                );
                pubsubInstance.publish('listUpdated', newProjectList);
            }
        );
    };
    listenForListCreation(handleProjectRemove);
};

const findProjectToUpdate = () => {
    const handleProjectUpdate = (newProjectList) => {
        pubsubInstance.subscribe(
            'projectUpdateRequest',
            (idProjectInstance, title, description) => {
                projectListObj.updateProjectInList(
                    newProjectList,
                    idProjectInstance,
                    title,
                    description
                );
                pubsubInstance.publish('listUpdated', newProjectList);
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
    const data = {
        idProject,
        idTask,
        title,
        description,
        dueDate,
        priority,
    };
    pubsubInstance.publish('taskUpdateRequest', data);
};

const completeTask = (idProject, idTask) => {
    pubsubInstance.publish('taskCompleteRequest', idProject, idTask);
};

const findTaskToAdd = () => {
    const handleNewTaskCreated = (newProjectList) => {
        pubsubInstance.subscribe(
            'newTaskCreated',
            (idProject, taskInstance) => {
                const project = projectObj.findProjectById(
                    newProjectList,
                    idProject
                );
                if (project) {
                    projectObj.addTaskToProject(project, taskInstance);
                    pubsubInstance.publish('listUpdated', newProjectList);
                    pubsubInstance.publish('taskAddedToProject', project);
                }
            }
        );
    };

    listenForListCreation(handleNewTaskCreated);
};

const findTaskToRemove = () => {
    const handleTaskRemove = (newProjectList) => {
        pubsubInstance.subscribe('taskDeleteRequest', (idProject, idTask) => {
            const project = projectObj.findProjectById(
                newProjectList,
                idProject
            );
            projectObj.removeTaskFromProject(project, idTask);
            pubsubInstance.publish('taskRemovedFromProject', project);
            pubsubInstance.publish('listUpdated', newProjectList);
        });
    };
    listenForListCreation(handleTaskRemove);
};

const findTasktoUpdate = () => {
    const handleTaskUpdate = (newProjectList) => {
        pubsubInstance.subscribe('taskUpdateRequest', (data) => {
            const project = projectObj.findProjectById(
                newProjectList,
                data.idProject
            );

            projectObj.updateTaskFromProject(project, data);
            pubsubInstance.publish('taskUpdatedFromProject', project);
            pubsubInstance.publish('listUpdated', newProjectList);
        });
    };

    listenForListCreation(handleTaskUpdate);
};

const findTaskCompleted = () => {
    const handleTaskCompleted = (newProjectList) => {
        pubsubInstance.subscribe(
            'taskCompleteRequest',
            (idProject, taskInstance) => {
                const project = projectObj.findProjectById(
                    newProjectList,
                    idProject
                );
                if (project) {
                    projectObj.taskCompleted(project, taskInstance);
                    pubsubInstance.publish('listUpdated', newProjectList);
                }
            }
        );
    };

    listenForListCreation(handleTaskCompleted);
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
    findTaskCompleted,
    newProjectCreated,
    updateProject,
    removeProject,
    updateTask,
    removeTask,
    completeTask,
};
