const from = new Date(document.getElementById("date_from").innerHTML);
const to = new Date(document.getElementById("date_to").innerHTML);
to.setDate(to.getDate() + 1)
const date_time = document.forms["event_form"]["date_time"];
date_time.addEventListener('focusout', validateForm);

function validateForm() {

    let event_date = new Date(date_time.value);
    if (isNaN(event_date)){
            form_field_error(date_time, "Date is not valid");
            return false;
        }
    else{
        if (event_date >= to || event_date < from){
            form_field_error(date_time, `Date must be in conference range (from ${from.toISOString().split('T')[0]} to ${to.toISOString().split('T')[0] })`);
            return false;
        }
        else{
            form_field_ok(date_time);
            return true;
        }
    }
}

