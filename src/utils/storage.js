import pubsubInstance from './pubsub';
import pubsubUtils from './pubsubUtils';

const localStr = localStorage;

const saveData = () => {
    pubsubInstance.subscribe('listUpdated', (newProjectList) => {
        const iterateTask = (array) => {
            const task = array.map((taskList) => {
                const test = {
                    id: taskList.getId(),
                    title: taskList.getTitle(),
                    description: taskList.getDescription(),
                    dueDate: taskList.getDueDate(),
                    priority: taskList.getPriority(),
                    inCheckList: taskList.getInCheckList(),
                };
                return test;
            });
            return task;
        };

        const result = newProjectList.map((project) => {
            const projectObj = {
                id: project.getId(),
                title: project.getTitle(),
                description: project.getDescription(),
                taskList: iterateTask(project.getTaskList()),
                taskListCompleted: iterateTask(project.getTaskListCompleted()),
            };
            return projectObj;
        });

        localStr.setItem('list', JSON.stringify(result));
    });
};

const getData = () => {
    const storedList = JSON.parse(localStr.getItem('list'));
    if (storedList) {
        storedList.forEach((project) => {
            pubsubUtils.newProjectCreated(project.title, project.description);

            const taskSorted = [project.taskList, project.taskListCompleted]
                .flat()
                .sort((a, b) => a.id - b.id);

            taskSorted.forEach((task) => {
                pubsubUtils.newTaskCreated(
                    project.id,
                    task.title,
                    task.description,
                    task.dueDate,
                    task.priority
                );
                if (task.inCheckList)
                    pubsubUtils.completeTask(project.id, task.id);
            });
        });
    }
};

export default {
    getData,
    saveData,
};
