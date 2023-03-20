import {
    createProject,
    addTask,
    removeTask,
    generateIdCount,
    assignTaskId,
} from './project';

import {
    createTask,
    filterCheckList,
    printTaskList,
    printCheckList,
} from './task.js';

export const testFunctionality = () => {
    const newProject = createProject('Viaje a Perú', 'lorem ipsum dolor');

    const newIdCount = generateIdCount();

    // Instances of task Objects

    const task1 = createTask(
        'Comprar leche',
        'Ir al supermercado y comprar leche desnatada',
        '2023-03-22',
        'alta'
    );
    const task2 = createTask(
        'Llamar al médico',
        'Llamar para pedir cita con el médico de familia',
        '2023-03-25',
        'media'
    );
    const task3 = createTask(
        'Hacer ejercicio',
        'Ir al gimnasio y hacer una sesión de entrenamiento',
        '2023-03-27',
        'baja'
    );
    const task4 = createTask(
        'Enviar correo electrónico',
        'Responder al correo electrónico del cliente',
        '2023-03-28',
        'alta'
    );
    const task5 = createTask(
        'Lavar la ropa',
        'Lavar la ropa blanca y la ropa oscura por separado',
        '2023-03-29',
        'baja'
    );
    const task6 = createTask(
        'Preparar cena',
        'Cocinar la cena para la familia',
        '2023-03-30',
        'media'
    );

    addTask(newProject, task1);
    addTask(newProject, task2);
    addTask(newProject, task3);
    addTask(newProject, task4);
    addTask(newProject, task5);
    addTask(newProject, task6);

    assignTaskId(newIdCount(), task1);
    assignTaskId(newIdCount(), task2);
    assignTaskId(newIdCount(), task3);
    assignTaskId(newIdCount(), task4);
    assignTaskId(newIdCount(), task5);
    assignTaskId(newIdCount(), task6);

    console.log(printTaskList(newProject.getTaskList()));

    task2.setInCheckList(true);
    task4.setInCheckList(true);
    task6.setInCheckList(true);

    console.log(printTaskList(newProject.getTaskList()));

    console.log(printCheckList(newProject.getTaskList()));
};
