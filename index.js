let people_form = document.getElementsByClassName("people-form")[0];
let people_input = document.getElementById("people-input");
let bill_input = document.getElementById("bill-input");
let people_error = document.getElementsByClassName("people-error")[0];
let card = document.getElementsByClassName("card")[0];
let tips = Array.from(document.querySelectorAll(".tip-buttons input[type=button]"));
let custom_tip = document.getElementById("custom-tip");
let display_elem = document.getElementsByClassName("amount");
let reset_btn = document.getElementById("reset-btn");
let forms = Array.from(document.getElementsByTagName("form"));

var tip_value;
var people;
var bill;


function calculate(bill, tip_value, people){
    return ((bill*tip_value) / 100) / people;
}

function display_amounts(){
    let tip_amount = calculate(bill, tip_value, people);
    let total_amount = (((tip_value*bill)/100) + parseFloat(bill)) / people;
    if(tip_amount && total_amount != ("NaN" || undefined)){
        display_elem[0].innerHTML = `$${tip_amount.toFixed(2)}`
        display_elem[1].innerHTML = `$${total_amount.toFixed(2)}`;
        reset_btn.removeAttribute("disabled");
    }
}

function people_validation(e){
    if(people_input.value < 1){
        e.preventDefault();
        people_error.style.display = "inline-block";
        people_input.style.border = "2px solid red";
        
    }
    else{
        people_error.style.display = "none";
        people_input.style.border = "2px solid hsl(172, 67%, 45%)";
        people = people_input.value;
        display_amounts();
    }
}

function reset_form(){
    people_error.style.display = "none";
    people_input.style.border = "";
    if(people_input.value < 1 || people.value == ""){
        people_input.value = "";
    }
    else{
        people_input.style.border = "2px solid hsl(172, 67%, 45%)"
    }
}


people_form.addEventListener("submit", people_validation);
people_form.addEventListener("input", people_validation);
card.addEventListener("click", reset_form);

//For calculating the tip and total.

tips.forEach(tip => {
    tip.addEventListener("click", function(){
        this.classList.add("active");
        tip_value = this.value.slice(0,-1)
        display_amounts();

        tips.forEach(tip => {
            if(tip != this){
                tip.classList.remove("active");
            }
            
        });

        
    })   
});

custom_tip.addEventListener("input", function(){
    if(custom_tip.value != ""){
        tips.forEach(tip => {
                tip.classList.remove("active");
                custom_tip.style.outline = "2px solid hsl(172, 67%, 45%)";
                tip_value = this.value;
                display_amounts();

        });
    }
    else{
        custom_tip.style.outline = "";
    }

})

bill_input.addEventListener("input", function(){
    if(this.value != ""){
        this.style.outline = "2px solid hsl(172, 67%, 45%)";
        bill = this.value;
        display_amounts();
    }
    else{
        this.style.outline = "";
    }
});

// Reseting the card.
reset_btn.addEventListener("click", function(){
    forms.forEach(form => {
        form.reset();
        bill_input.style.outline = "";
        tips.forEach(tip => {
            tip.classList.remove("active");

        });
        display_elem[0].innerHTML = `$0.00`;
        display_elem[1].innerHTML = `$0.00`;
        reset_btn.setAttribute("disabled", "");
        
    })
})