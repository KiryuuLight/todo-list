import { numberGenerator } from './dinamicNumber';

/* Project factory */

export const createProject = (title, description) => {
    let taskList = [];

    const getTitle = () => title;

    const setTitle = (newTitle) => (title = newTitle);

    const getDescription = () => description;

    const setDescription = (newDescription) => (description = newDescription);

    const getTaskList = () => taskList;

    const setTaskList = (newList) => (taskList = newList);

    return {
        getTitle,
        setTitle,
        getDescription,
        setDescription,
        getTaskList,
        setTaskList,
    };
};

export const addTask = (project, task) => {
    project.getTaskList().push(task);
    return console.log('Task Added to the Project');
};

export const removeTask = (project, id) => {
    const arr = project.getTaskList().filter((value) => value.getId() !== id);
    project.setTaskList(arr);
    if (arr !== undefined)
        return `Task with id : ${id} was removed from the Task List`;
    return 'Id not found';
};

export const generateIdCount = () => {
    const generateNumber = numberGenerator();
    return generateNumber;
};

export const assignTaskId = (idCount, task) => {
    task.setId(idCount);
};
