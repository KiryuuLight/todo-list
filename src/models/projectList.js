import pubsubInstance from '../utils/pubsub.js';

export const projectList = () => {
    const newProjectList = [];

    const addProjectToList = (instance) => {
        console.log(instance);

        newProjectList.push(instance);

        pubsubInstance.publish('projectAddedToList', newProjectList);
    };

    const removeProjectFromList = (id) => {
        const index = newProjectList.findIndex((value) => value.getId() === id);
        if (index !== -1) {
            newProjectList.splice(index, 1);
        }

        return 'Removed';
    };

    pubsubInstance.subscribe('newProjectCreated', addProjectToList);
    pubsubInstance.subscribe('projectDeleteRequest', removeProjectFromList);

    const getProjectList = () => [
        ...newProjectList.map(
            (value) =>
                `${value.getId()} ${value.getTitle()} ${value.getDescription()}`
        ),
    ];

    return {
        getProjectList,
    };
};
