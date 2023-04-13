const createProject = (title, description) => {
    let id = 0;

    let taskList = [];

    let taskListCompleted = [];

    const getId = () => id;

    const setId = (newId) => (id = newId);

    const getTitle = () => title;

    const setTitle = (newTitle) => (title = newTitle);

    const getDescription = () => description;

    const setDescription = (newDescription) => (description = newDescription);

    const getTaskList = () => taskList;

    const setTaskList = (newList) => (taskList = newList);

    const getTaskListCompleted = () => taskListCompleted;

    const setTaskListCompleted = (newList) => (taskListCompleted = newList);

    return {
        getId,
        setId,
        getTitle,
        setTitle,
        getDescription,
        setDescription,
        getTaskList,
        setTaskList,
        getTaskListCompleted,
        setTaskListCompleted,
    };
};

// Methods to perform modifications of the object

const findProjectById = (array, id) =>
    array.find((project) => project.getId() === id);

const addTaskToProject = (project, instance) => {
    project.getTaskList().push(instance);
};

const removeTaskFromProject = (project, idTask) => {
    const projectTaskList = project
        .getTaskList()
        .filter((value) => value.getId() !== idTask);
    project.setTaskList(projectTaskList);
    if (projectTaskList !== undefined)
        return `Task with id : ${idTask} was removed from the Task List`;
    return 'Id not found';
};

const updateTaskFromProject = (project, data) => {
    const projectListTask = project.getTaskList().map((value) => {
        if (value.getId() === data.idTask) {
            value.setTitle(data.title);
            value.setDescription(data.description);
            value.setDueDate(data.dueDate);
            value.setPriority(data.priority);
        }
        return value;
    });
    project.setTaskList(projectListTask);
    if (projectListTask !== undefined)
        return `Task with id : ${data.idTask} was updated`;
    return 'Id not found';
};

const taskCompleted = (project, idTask) => {
    const projectTaskItem = project
        .getTaskList()
        .find((value) => value.getId() === idTask);
    project.getTaskListCompleted().push(projectTaskItem);
    projectTaskItem.setInCheckList(true);
    removeTaskFromProject(project, idTask);
};

export default {
    createProject,
    findProjectById,
    addTaskToProject,
    removeTaskFromProject,
    updateTaskFromProject,
    taskCompleted,
};
