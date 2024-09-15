import { handleSubmit } from './js/formHandler';
import { checkDateRange } from './js/dateRangeValidation';

import './styles/base.scss';
import './styles/header.scss';
import './styles/form.scss';

document.getElementById("submit").addEventListener("click", handleSubmit);

const dateInput = document.getElementById('date');
dateInput.addEventListener('click', (event) => {
    event.stopPropagation();

    dateInput.showPicker();
});

export {
    handleSubmit,
    checkDateRange,
}