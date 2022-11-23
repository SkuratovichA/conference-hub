import form_field_error from "form_fields.js"
import form_field_ok from "form_fields.js"

const from = document.forms["conf_form"]["date_from"];
const to = document.forms["conf_form"]["date_to"];
from.setCustomValidity("");
to.setCustomValidity("");
from.addEventListener('blur', validateForm);
to.addEventListener('blur', validateForm);


function validateForm() {
    let date_from = get_date(from);
    let date_to = get_date(to);
    if (date_from && date_to){
        if ( date_from > date_to){
            form_field_error(from, "Conference should start before it ends");
            form_field_error(to, "Conference should end after it starts");
            return false;
        }
        else{
            form_field_ok(from);
            form_field_ok(to);
            return true;
        }
    }
    return false;
}

function get_date(el){
    if (! el.value)
        return false;
    let date = new Date(el.value);
    if (isNaN(date)){
            form_field_error(el, "Date is not valid");
            return false;
        }
    else {
        if (date < Date.now()){
            form_field_error(el, "Can't create conference in the past");
            return false;
        }
        form_field_ok(el);
        return date;
    }

}
