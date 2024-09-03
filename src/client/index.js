import { handleSubmit } from './js/formHandler';
import { checkDateRange } from './js/dateRangeValidation';
import { checkDateValidation } from './js/dateValidation';

import './styles/base.scss';
import './styles/header.scss';
import './styles/form.scss';
import './styles/footer.scss';

document.getElementById("submit").addEventListener("click", handleSubmit);

export {
    handleSubmit,
    checkDateRange,
    checkDateValidation
}