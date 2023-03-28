const ProjectList = (() => {
    const newProjectList = [];

    const getProjectList = () => newProjectList;

    const toString = () =>
        newProjectList.map(
            (value) =>
                `Id : ${value.getId()} , Title : ${value.getTitle()} , Description : ${value.getDescription()}`
        );

    return {
        getProjectList,
        toString,
    };
})();

const addProjectToList = (projectList, projectInstance) => {
    projectList.push(projectInstance);
};

const removeProjectFromList = (projectList, idProject) => {
    const index = projectList.findIndex((value) => value.getId() === idProject);
    if (index !== -1) {
        projectList.splice(index, 1);
    }

    return 'Removed';
};

const updateProjectInList = (
    projectList,
    idProject,
    newTitle,
    newDescription
) => {
    const project = projectList.find((value) => value.getId() === idProject);
    if (project) {
        project.setTitle(newTitle);
        project.setDescription(newDescription);
        return 'Updated';
    }
    return 'Project not found';
};

export default {
    ProjectList,
    addProjectToList,
    removeProjectFromList,
    updateProjectInList,
};
