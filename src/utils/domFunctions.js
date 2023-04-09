const createElement = (name) => {
    const element = document.createElement('div');
    element.id = name;
    document.body.appendChild(element);
    return element;
};

const addElementToParent = (parent, htmlElement) => {
    const target = document.getElementById(parent);
    target.insertAdjacentHTML('beforeend', htmlElement);
};

const updateContent = (element) => {
    const elementExist = document.getElementById(element);
    if (elementExist) elementExist.innerHTML = '';
};

export default {
    createElement,
    addElementToParent,
    updateContent,
};
