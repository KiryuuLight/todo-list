import './css/styles.css';
import pubsubUtils from './utils/pubsubUtils';
import handleUI from './utils/handleUI';
import storage from './utils/storage';

const initApp = () => {
    setupEventHandlers();
    setupUI();
    storageData();
};

const setupEventHandlers = () => {
    pubsubUtils.findProjectToAdd();
    pubsubUtils.findProjectToRemove();
    pubsubUtils.findProjectToUpdate();
    pubsubUtils.findTaskToAdd();
    pubsubUtils.findTaskToRemove();
    pubsubUtils.findTasktoUpdate();
    pubsubUtils.findTaskCompleted();
    pubsubUtils.setupIdSubscriptions();
    pubsubUtils.setupIdGeneration();
    pubsubUtils.newListCreated();
};

const setupUI = () => {
    handleUI.renderDefault();
    handleUI.renderNewProjects();
    handleUI.renderListOfProjects();
    handleUI.renderProject();
    handleUI.renderUpdateProjectForm();
    handleUI.renderRemoveProjectForm();
    handleUI.renderUpdateTaskForm();
    handleUI.renderRemoveTaskForm();
    handleUI.addViewProjectListeners();
    handleUI.addBlockListeners();
    handleUI.addSubmitListeners();
};

const storageData = () => {
    storage.saveData();
    storage.getData();
};

export default { initApp };
