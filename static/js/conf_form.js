const from = document.forms["conf_form"]["date_from"];
const to = document.forms["conf_form"]["date_to"];
from.setCustomValidity("Invalid field.");
to.setCustomValidity("Invalid field.");

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
                    from.setCustomValidity("");
                    to.setCustomValidity("");
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
                el.setCustomValidity("");
                return date;
            }

        }

        function form_field_error(el, msg){
            if (! el.classList.contains("is-invalid")){
                // make outline red
                el.classList.add("is-invalid");
                // add error message
                const para = document.createElement("p");
                para.classList.add("invalid-feedback");
                const st = document.createElement("strong");
                const node = document.createTextNode(msg);
                st.appendChild(node);
                para.appendChild(st);
                el.parentNode.appendChild(para);
            }

        }

        function form_field_ok(el){
            if (el.classList.contains("is-invalid")){
                el.classList.remove("is-invalid");
                let p = document.getElementsByClassName("invalid-feedback").item(0);
                el.parentNode.removeChild(p);
            }

        }