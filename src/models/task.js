const createTask = (title, description, dueDate, priority) => {
    let id = 0;

    let inCheckList = false;

    const getId = () => id;

    const setId = (newId) => (id = newId);

    const getTitle = () => title;

    const setTitle = (newTitle) => (title = newTitle);

    const getDescription = () => description;

    const setDescription = (newDescription) => (description = newDescription);

    const getDueDate = () => dueDate;

    const setDueDate = (newDueDate) => (dueDate = newDueDate);

    const getPriority = () => priority;

    const setPriority = (newPriority) => (priority = newPriority);

    const setInCheckList = (newStatus) => (inCheckList = newStatus);

    const getInCheckList = () => inCheckList;

    const toString = () => `ID : ${getId()} 
        Title : ${getTitle()} 
        Description : ${getDescription()} 
        Duedate : ${getDueDate()}
        Priority : ${getPriority()}
        In checklist? : ${getInCheckList()}
        `;

    return {
        getId,
        setId,
        getTitle,
        setTitle,
        getDescription,
        setDescription,
        getDueDate,
        setDueDate,
        getPriority,
        setPriority,
        setInCheckList,
        getInCheckList,
        toString,
    };
};

const printTaskList = (arr) => {
    const mapTasks = arr.map((value) => value.toString());
    return mapTasks;
};

const filterCheckList = (arr) => {
    const filterList = arr.filter((value) => value.getInCheckList() === true);
    return filterList;
};

const printCheckList = (arr) => {
    const filteredList = filterCheckList(arr);
    return printTaskList(filteredList);
};

export default {
    createTask,
};
