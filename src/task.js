/* Task factory */

export const createTask = (title, description, dueDate, priority) => {
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
        TITLE : ${getTitle()} 
        DESCRIPTION : ${getDescription()} 
        DUEDATE : ${getDueDate()}
        PRIORITY : ${getPriority()}
        INCHECKLIST : ${getInCheckList()}
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

export const printTaskList = (arr) => {
    const mapTasks = arr.map((value) => value.toString());
    return mapTasks;
};

export const checkList = (arr) => {
    const filterList = arr.filter((value) => value.getInCheckList === true);
    return filterList;
};

// export const printCheckList = (arr) => {
//     const mapTasks = arr.map(
//         (value) =>
//             `ID : ${value.getId()} TITLE : ${value.getTitle()}
//              DESCRIPTION : ${value.getDescription()} DUEDATE : ${value.getDueDate()}
//              PRIORITY : ${value.getPriority()}`
//     );
//     return mapTasks;
// };
