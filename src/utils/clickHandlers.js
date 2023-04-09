import evt from './eventHandlers';

// Click Handler

const clickHandlers = new Map();

clickHandlers.set('closeBlock', evt.closeBlock);

clickHandlers.set('openAddProjectForm', evt.openAddProjectForm);
clickHandlers.set('openUpdateProjectForm', evt.openUpdateProjectForm);
clickHandlers.set('openRemoveProjectForm', evt.openRemoveProjectForm);

clickHandlers.set('openAddTaskForm', evt.openAddTaskForm);
clickHandlers.set('openUpdateTaskForm', evt.openUpdateTaskForm);
clickHandlers.set('openRemoveTaskForm', evt.openRemoveTaskForm);

clickHandlers.set('addProjectBtn', evt.addProject);
clickHandlers.set('updateProjectBtn', evt.updateProject);
clickHandlers.set('removeProjectBtn', evt.removeProject);

clickHandlers.set('addTaskBtn', evt.addTask);
clickHandlers.set('updateTaskBtn', evt.updateTask);
clickHandlers.set('removeTaskBtn', evt.removeTask);

export { clickHandlers };
