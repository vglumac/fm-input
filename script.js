function updateCardInfo() {
    const myForm = document.forms[0];

    myForm.elements['card-number'].oninput = (e) => {
        e.target.value = patternMatch({
            input: e.target.value,
            template: "xxxx xxxx xxxx xxxx",
        });
    };

    myForm.elements['name'].addEventListener('keyup', (e) => {
        document.querySelector(".card--card-holder-name").innerText = e.target.value;
    })

    myForm.elements['card-number'].addEventListener('keyup', (e) => {
        document.querySelector(".card--num").innerText = e.target.value;
    })

    myForm.elements['MM'].addEventListener('keyup', (e) => {
        document.querySelector(".card--mm").innerText = e.target.value;
    })

    myForm.elements['YY'].addEventListener('keyup', (e) => {
        document.querySelector(".card--yy").innerText = e.target.value;
    })

    myForm.elements['CVC'].addEventListener('keyup', (e) => {
        document.querySelector(".card--cvc").innerText = e.target.value;
    })
}

function patternMatch({ input, template }) {
    try {
        let j = 0;
        let countj = 0;
        while (j < template.length) {
            if (countj > input.length - 1) {
                template = template.substring(0, j);
                break;
            }
            if (template[j] == input[j]) {
                j++;
                countj++;
                continue;
            }
            if (template[j] == "x") {
                template = template.substring(0, j) + input[countj] + template.substring(j + 1);
                countj++;
            }
            j++;
        }
        return template;
    } catch {
        return "";
    }
}

const confirmButton = document.forms[0].addEventListener('submit', e => {
    e.preventDefault();
    if (inputValidation()) {
        submitForm();
    }
})

const refreshButton = document.querySelector('.ty__button').addEventListener('click', refreshPage);

function submitForm() {
    document.querySelector('.form').classList.add('hidden');
    document.querySelector('.ty').classList.remove('hidden');
}

function refreshPage() {
    window.location.reload();
}

function inputValidation() {
    let flag = false;
    let myForm = document.forms[0];
    for (let i = 0; i < myForm.elements.length; i++) {
        if (myForm.elements[i].tagName === 'BUTTON') {
            continue;
        }
        let formItem = myForm.elements[i];

        const conditions = {
            input: {
                message: 'Can\'t be blank',
                condition: formItem.value == null || formItem.value == "" || formItem.value == " "
            },
            name: {
                message: 'Name and surname required',
                condition: !formItem.value.match(/^[A-z][A-z]+( [A-z][A-z]+){1,}$/),
            },
            number: {
                message: 'Wrong format, numbers only',
                condition: !formItem.value.match(/^[0-9 ]{1,}$/)
            },
            cardNumber: {
                message: 'Card number must have 16 digits',
                condition: formItem.value.length < 19
            },
            month: {
                message: '01 - 12 only',
                condition: !formItem.value.match(/^(0[1-9])|(1[0-2])$/)
            },
            year: {
                message: '01 - 99 only',
                condition: !formItem.value.match(/^[0-9]{2}$/)
            },
            cvc: {
                message: 'Three digits required',
                condition: !formItem.value.match(/^[0-9]{3}$/)
            }
        }

        for (let j = 0; j < Object.keys(conditions).length; j++) {

            if (formItem.dataset[Object.keys(conditions)[j]] === '') {
                flag += checkInputValue(formItem, conditions[Object.keys(conditions)[j]].condition, conditions[Object.keys(conditions)[j]].message);
            }
        }
    }
    
    if (flag > 0) {
        return false
    }
    return true;
}

function checkInputValue(input, condition, text) {
    let message = input.parentNode.querySelector('.form__error-message');
    if (message && condition == true) {
        return true;
    } 
    if (condition == true) {
        insertErrorMessage(input, text);
        return true
    }
    removeErrorMessages(input);
    return false;
}

function insertErrorMessage(input, text) {
    let message = input.parentNode.querySelector('.form__error-message');
    if (message) {
        removeErrorMessages(message, input);
    }
    let newMessage = document.createElement('p');
    newMessage.innerText = text;
    newMessage.classList.add('form__error-message');
    input.classList.add('form__input--error');
    input.parentNode.appendChild(newMessage);
}

function removeErrorMessages(input) {
    let messages = input.parentNode.querySelectorAll('.form__error-message');
    messages.forEach(message => message.parentNode.removeChild(message));
    input.classList.remove('form__input--error');
}

updateCardInfo();
