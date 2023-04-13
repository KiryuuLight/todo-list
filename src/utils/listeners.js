import global from './constans';
import pubsubInstance from './pubsub';
import render from './render';
import eventHandlers from './eventHandlers';
import { clickHandlers } from './clickHandlers';

// TODO , crear estas constantes en el archivo constans.js

const taskOperations = [global.openUpdateTaskForm, global.openRemoveTaskForm];

// Listeners

const loadBlockItemHandlers = () => {
    const blockItems = document.querySelectorAll('.showBlock');

    blockItems.forEach((btnShowBlock) => {
        btnShowBlock.addEventListener('click', (e) => {
            eventHandlers.closeBlock();
            const clickHandler = clickHandlers.get(e.currentTarget.id);
            if (taskOperations.includes(e.currentTarget.id)) {
                const taskId = parseInt(e.currentTarget.dataset.task);
                clickHandler(taskId);
            } else {
                clickHandler();
            }
            pubsubInstance.publish('formOpened');
        });
    });
};

const loadSubmitItemHandlers = () => {
    const form = document.querySelectorAll('.form');
    const btnsLeft = document.querySelectorAll('.btnLeft');
    const btnsRight = document.querySelectorAll('.btnRight');

    btnsLeft.forEach((btnLeft) => {
        btnLeft.addEventListener('click', (e) => {
            const clickHandler = clickHandlers.get(e.currentTarget.id);
            if (clickHandler) {
                clickHandler();
            }
        });
    });

    btnsRight.forEach((btnRight) => {
        btnRight.addEventListener('click', (e) => {
            const clickHandler = clickHandlers.get(e.currentTarget.id);
            if (clickHandler) {
                clickHandler();
            }
        });
    });

    form.forEach((formItem) => {
        formItem.addEventListener('submit', (e) => {
            e.preventDefault();
            const clickHandler = clickHandlers.get(e.currentTarget.id);
            if (clickHandler) {
                clickHandler();
            }
        });
    });
};

const loadProjectBlockItem = (newProjectList) => {
    const projectsBtn = document.querySelectorAll('.project-element');

    const loadProject = (e) => {
        const selectedItem = e.currentTarget;
        pubsubInstance.publish('projectIsSelected', selectedItem);

        const idProject = parseInt(e.currentTarget.dataset.project);
        const element = newProjectList.find(
            (value) => value.getId() === idProject
        );
        render.mainProject(element);

        pubsubInstance.publish('projectRendered', element);
    };

    projectsBtn.forEach((btn) => {
        btn.addEventListener('click', loadProject);
    });
};

export default {
    loadBlockItemHandlers,
    loadSubmitItemHandlers,
    loadProjectBlockItem,
};
