const form = document.querySelector(`form`);
const firstNameInput = document.querySelector(`#first-name`);
const lastNameInput = document.querySelector(`#last-name`);
const emailInput = document.querySelector(`#email`);
const submit = document.querySelector(`input[type="submit"]`);

const regexs = {
    name: /^[a-zA-Z'-]+$/u, // This should ensure that a name only contains english alphabet characters, hyphens and apostrophes
    email: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i, // This should ensure that an email address is in a valid format with a single @ symbol either side of set of characters that allow text in the format of allowed email addresses (i.e.letters and numbers, potentially with a dot in the middle) on the left and a pattern that represents valid domain names on the right.
};

const formValidity = {
    name: {
        lengthOfName: false,
        characters: false,
    },
    email: {
        format: false,
    }
};

const errors = {
    name: {
        lengthError: `Name should be at least 2 characters`,
        charactersError: `Name should only contain A-z or - or '`,
    },
    email: `The email address supplied is not in a valid format`,
};

nameInput.addEventListener(`change`, (e) => {
    checkNameLength(e.target);
    checkNameRegEx(e.target);
    setSubmitDisabled();
});

const checkNameRegEx = (element) => {
    formValidity[element.id].characters = checkRegExValue(
        element.id,
        element.value
    );
    setValidationTip(
        element.id,
        errors[element.id].charactersError,
        `characters`
    );
};

const checkNameLength = (element) => {
    formValidity[element.id].lengthOfName = element.value.length > 1;
    setValidationTip(element.id, errors.name.lengthError, `lengthOfName`);
};

const setSubmitDisabled = () => {
    submit.disabled = !checkValidity(formValidity);
};

const checkValidity = (validityObject) => {
    let validity = true;
    for (let field in validityObject) {
        if (!validityObject.hasOwnProperty(field)) continue;
        const useValueOrDigForBoolean =
            typeof validityObject[field] === `boolean`
                ? validityObject[field]
                : checkValidity(validityObject[field]);
        validity = validity && useValueOrDigForBoolean;
    }
    return validity;
};

const checkRegExValue = (id, value) => {
    return regexs[id].test(value);
};

const setValidationTip = (elementId, message, type) => {
    const invalidFieldParent = document.querySelector(
        `#${elementId}`
    ).parentElement;
    const validationMessage = invalidFieldParent.querySelector(`p#${type}`);
    !formValidity[elementId][type] &&
        !validationMessage &&
        invalidFieldParent.appendChild(createValidationMessage(message, type));
    formValidity[elementId][type] &&
        validationMessage &&
        invalidFieldParent.removeChild(validationMessage);
};

// Creates the validation element to be displayed dependent on the field needing it to display
const createValidationMessage = (message, type) => {
    const errorP = document.createElement(`p`);
    errorP.appendChild(document.createTextNode(message));
    errorP.id = type;
    errorP.classList.add(`error`);
    return errorP;
};