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

firstNameInput.addEventListener(`change`, (e) => {
   if (e.value.length > 1 && regexs[e.id].test(e.value)) {

   }
})

// Displays or removes the validation message as appropriate for each field
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