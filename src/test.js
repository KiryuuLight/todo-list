import pubsubUtils from './utils/pubsubUtils';

export const testFunctionality = () => {
    pubsubUtils.findProjectToAdd();

    pubsubUtils.findProjectToRemove();

    pubsubUtils.findProjectToUpdate();

    const list = pubsubUtils.newListCreated();

    pubsubUtils.setupIdSubscriptions();

    pubsubUtils.setupIdGeneration();

    pubsubUtils.findTaskToAdd();

    pubsubUtils.findTaskToRemove();

    pubsubUtils.findTasktoUpdate();

    const project1 = pubsubUtils.newProjectCreated(
        'Home Renovation',
        'Planning and renovation of living room and kitchen'
    );

    const task1 = pubsubUtils.newTaskCreated(
        1,
        'Buy milk',
        'Go to the supermarket and buy skimmed milk',
        '2023-03-22',
        'Important'
    );

    const task2 = pubsubUtils.newTaskCreated(
        1,
        'Call the doctor',
        'Call to schedule an appointment with the family doctor',
        '2023-03-25',
        'Normal'
    );
    const task3 = pubsubUtils.newTaskCreated(
        1,
        'Exercise',
        'Go to the gym and do a training session',
        '2023-03-27',
        'Normal'
    );
    const task4 = pubsubUtils.newTaskCreated(
        1,
        'Send email',
        'Reply to client email',
        '2023-03-28',
        'Normal'
    );

    console.log(list.newProjectList);

    console.log(project1.newProject.getTaskList());

    pubsubUtils.removeTask(1, 3);

    console.log(project1.newProject.getTaskList());

    pubsubUtils.updateProject(
        1,
        'Play Chaos Head',
        'Complete Chaos Head before starting university'
    );

    console.log(task2.newTask.toString());

    pubsubUtils.updateTask(
        1,
        2,
        'Jane Doe',
        "I don't know",
        '06/24/2009',
        'Important'
    );

    console.log(task2.newTask.toString());

    const project2 = pubsubUtils.newProjectCreated(
        'Test project2',
        'Planning and renovation of living room and kitchen'
    );

    console.log(list.newProjectListInstance.toString());

    pubsubUtils.updateProject(2, 'My personal project', 'Just that uwu');

    console.log(list.newProjectListInstance.toString());
};
