$(document).ready(function () { 
    //when an element gets clicked, call reset_element
    $(".element").on("click",function(){
        var feedback="#"+$(this).attr('id')+"_feedback";
        reset_element(this,feedback);});
    //bind the components with their validate functions
    $("#form").on("submit",function(){return validate_all();});
});

function validate_all(){
    var username_result=validate_username("#username","#username_feedback");
    var email_result=validate_email("#email","#email_feedback");
    var position_result=validate_position("#position","#position_feedback");
    var type_result=validate_type("#type","#type_feedback");
    return username_result && position_result && email_result && type_result;
}

function error_style(element, feedback) {
    $(element).css("border-color","red");
    $(feedback).css("color","red");
    return false;
}

function correct_style(element, feedback) {
    $(element).css("border-color","lightgray");
    $(feedback).css("color","green");
    $(feedback).html("&#10004");//the check mark
    return true;
}

function reset_element(element,feedback) {
    $(element).css("border-color","lightgray");
    $(feedback).css("color","black");
    $(feedback).html("");
}



function validate_username(username,feedback){
    var value=$(username).val().trim();
    if(value==null || value==""){
        $(feedback).text("Username can't be empty");
        return error_style(username,feedback);
    }
    else if (value.length < 6 || value.length>10) {
        $(feedback).text("Username should be >=6 and <=10");
        return error_style(username, feedback);
    }
    else if(/[^a-zA-Z_]+/.test(value)){
        $(feedback).text("Only word letters (a-z, A-Z, _)");
        return error_style(username, feedback);                    
    }
    else
        return correct_style(username, feedback);                
}



function validate_email(email,feedback){
    var value=$(email).val().trim();
    var emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!emailRegex.test(value)) {
        $(feedback).text("Not a valid e-mail address");
        return error_style(email, feedback);                    
    }
    else 
        return correct_style(email, feedback); 
}



function validate_position(position,feedback){
    if($(position).val()=="none"){
        $(feedback).text(" You must select a position");
        return error_style(position,feedback);
    }
    else
        return correct_style(position,feedback);
}



function validate_type(type,feedback){
    var value=$("input[name='type']:checked").val();
    if(!value) {
        $(feedback).text("You must select a type");
        return error_style(type, feedback);                    
    }
    else 
        return correct_style(type, feedback); 
}