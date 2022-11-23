function form_field_ok(el){
    el.setCustomValidity("");
    if (el.classList.contains("is-invalid")){
        el.classList.remove("is-invalid");
        let p = document.getElementsByClassName("invalid-feedback").item(0);
        el.parentNode.removeChild(p);
    }

}

function form_field_error(el, msg){
    el.setCustomValidity("Invalid field.");
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