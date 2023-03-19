/* Project factory */

export const createProject = (title, description) => {
  const todos = [];

  const getTitle = () => title;

  const getDescription = () => description;

  const getTodos = () => todos;

  return {
    getTitle,
    getDescription,
    getTodos,
  };
};

export const addTodoToProject = (project, todoObj) => {
  project.getTodos().push(todoObj);
  return console.log('Todo Added to the Project');
};

/* Todo factory */

export const createTodo = (title, description, dueDate, priority) => {
  const getTitle = () => title;

  const getDescription = () => description;

  const getDueDate = () => dueDate;

  const getPriority = () => priority;

  return {
    getTitle,
    getDescription,
    getDueDate,
    getPriority,
  };
};
