
function updateCardInfo() {
    const cardPreview = document.querySelector("#card-num");
    const cardNumber = document.querySelector("#card-number");
    cardNumber.addEventListener('keyup', (e) => {
        cardPreview.innerText = e.target.value;
    })

    cardNumber.oninput = (e) => {
        e.target.value = patternMatch({
            input: e.target.value,
            template: "xxxx xxxx xxxx xxxx",
        });
    };

    const monthPreview = document.querySelector("#mm-prev");
    document.querySelector("#MM").addEventListener('keyup', (e) => {
        monthPreview.innerText = e.target.value;
    })

    const yearPreview = document.querySelector("#yy-prev");
    document.querySelector("#YY").addEventListener('keyup', (e) => {
        yearPreview.innerText = e.target.value;
    })

    const cvcPreview = document.querySelector("#card-cvc");
    document.querySelector("#CVC").addEventListener('keyup', (e) => {
        cvcPreview.innerText = e.target.value;
    })

    const namePreview = document.querySelector("#card-holder-name");
    document.querySelector("#name").addEventListener('keyup', (e) => {
        namePreview.innerText = e.target.value;
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

const confirmButton = document.querySelector('.card-form').addEventListener('submit', e => {
    e.preventDefault();
    if (inputValidation()) {
        submitForm();
    }
})

const refreshButton = document.querySelector('.ty button').addEventListener('click', refreshPage);

function submitForm() {
    document.querySelector('.ty').style.zIndex = '2';
    document.querySelector('.ty').style.opacity = '100%';
    document.querySelector('.card-form').style.opacity = '0%';
}

function refreshPage() {
    window.location.reload();
}

function inputValidation() {
    let valid = false;
    const inputs = document.querySelectorAll('input');
    inputs.forEach((input) => {
        let blank = false;
        let num = false;
        blank = checkBlank(input, `#${input.id}-error-message`);
        valid += blank;
        if (blank && input.className != 'number') {
            valid += checkName(input, `#${input.id}-error-message`);
        }
        if (blank && input.className == 'number') {
            num = checkDigit(input, `#${input.id}-error-message`);
            valid += num;
        }
        if (num && input.id == 'card-number') {
            valid += checkCardNumLength(input, `#${input.id}-error-message`);
        }
        if (num && input.id == 'MM') {
            valid += checkMonth(input, `#${input.id}-error-message`);
        }
        if (num && input.id == 'YY') {
            valid += checkYear(input, `#${input.id}-error-message`);
        }
        if (num && input.id == 'CVC') {
            valid += checkCVC(input, `#${input.id}-error-message`);
        }
    });
    if (valid === 14) {
        valid = true;
    } else {
        valid = false;
    }
    return valid;
}

function checkBlank(input, placing) {
    let flag = true;
    let para = document.querySelector(placing);
    if (input.value == null || input.value == "" || input.value == " ") {
        para.innerText = 'Can\'t be blank';
        input.style.borderColor = 'hsl(0, 100%, 66%)';
        flag = false;
    } else {
        para.innerText = '';
        input.style.borderColor = 'revert';
    }
    return flag;
}

function checkName(input, placing) {
    let flag = true;
    let para = document.querySelector(placing);
    if (!input.value.match(/^[A-z][A-z]+( [A-z][A-z]+){1,}$/)) {
        para.innerText = 'Name and surname';
        input.style.borderColor = 'hsl(0, 100%, 66%)';
        input.style.color = 'hsl(0, 100%, 66%)';
        flag = false;
    } else {
        para.innerText = '';
        input.style.borderColor = 'revert';
        input.style.color = 'revert';
    }
    return flag;
}

function checkDigit(cardNum, placing) {
    let flag = true;
    let para = document.querySelector(placing);
    if (!cardNum.value.match(/^[0-9 ]{1,}$/)) {
        para.innerText = 'Wrong format, numbers only';
        cardNum.style.borderColor = 'hsl(0, 100%, 66%)';
        cardNum.style.color = 'hsl(0, 100%, 66%)';
        flag = false;
    } else {
        para.innerText = '';
        cardNum.style.borderColor = 'revert';
        cardNum.style.color = 'revert';
    }
    return flag;
}

function checkCVC(cardNum, placing) {
    let flag = true;
    let para = document.querySelector(placing);
    if (!cardNum.value.match(/^[0-9]{3}$/)) {
        para.innerText = 'Three digits required';
        cardNum.style.borderColor = 'hsl(0, 100%, 66%)';
        cardNum.style.color = 'hsl(0, 100%, 66%)';
        flag = false;
    } else {
        para.innerText = '';
        cardNum.style.borderColor = 'revert';
        cardNum.style.color = 'revert';
    }
    return flag;
}

function checkYear(cardNum, placing) {
    let flag = true;
    let para = document.querySelector(placing);
    if (!cardNum.value.match(/^[0-9]{2}$/)) {
        para.innerText = '01 - 99 only';
        cardNum.style.borderColor = 'hsl(0, 100%, 66%)';
        cardNum.style.color = 'hsl(0, 100%, 66%)';
        flag = false;
    } else {
        para.innerText = '';
        cardNum.style.borderColor = 'revert';
        cardNum.style.color = 'revert';
    }
    return flag;
}

function checkMonth(cardNum, placing) {
    let flag = true;
    let para = document.querySelector(placing);
    if (!cardNum.value.match(/^(0[1-9])|(1[0-2])$/)) {
        para.innerText = '01 - 12 only';
        cardNum.style.borderColor = 'hsl(0, 100%, 66%)';
        cardNum.style.color = 'hsl(0, 100%, 66%)';
        flag = false;
    } else {
        para.innerText = '';
        cardNum.style.borderColor = 'revert';
        cardNum.style.color = 'revert';
    }
    return flag;
}

function checkCardNumLength(cardNum, placing) {
    let flag = true;
    let para = document.querySelector(placing);
    if (cardNum.value.length < 19) {
        para.innerText = 'Card number must have 16 digits';
        cardNum.style.borderColor = 'hsl(0, 100%, 66%)';
        cardNum.style.color = 'hsl(0, 100%, 66%)';
        flag = false;
    } else {
        para.innerText = '';
        cardNum.style.borderColor = 'revert';
        cardNum.style.color = 'revert';
    }
    return flag;
}

updateCardInfo();
