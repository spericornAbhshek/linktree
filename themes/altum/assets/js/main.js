/* Submit disable after 1 click */
$('[type=submit][name=submit]').on('click', (event) => {
    $(event.currentTarget).addClass('disabled');

    let text = $(event.currentTarget).text();
    let loader = '<div class="spinner-grow spinner-grow-sm"><span class="sr-only">Loading...</span></div>';
    $(event.currentTarget).html(loader);

    setTimeout(() => {
        $(event.currentTarget).removeClass('disabled');
        $(event.currentTarget).text(text);
    }, 3000);

});

/* Confirm delete handler */
$('body').on('click', '[data-confirm]', (event) => {
    let message = $(event.currentTarget).attr('data-confirm');

    if (!confirm(message)) return false;
});

/* Custom links */
$('[data-href]').on('click', event => {
    let url = $(event.currentTarget).data('href');

    fade_out_redirect({ url, full: true });
});

/* Enable tooltips everywhere */
$('[data-toggle="tooltip"]').tooltip();

/* Some global variables */
window.altum = {};
let global_token = document.querySelector('input[name="global_token"]').value;
let url = document.querySelector('input[name="url"]').value;
let decimal_point = document.querySelector('[name="number_decimal_point"]').value;
let thousands_separator = document.querySelector('[name="number_thousands_separator"]').value;


var max_fields = 1000; //maximum input boxes allowed
var wrapper = $(".input_fields_wrap"); //Fields wrapper
var add_button = $(".add_field_button"); //Add button ID
var exp_wrapper = $(".exp_input_fields_wrap"); //Fields wrapper
var exp_add_button = $(".exp_add_field_button"); //Add button ID

var i = 200; //initlal text box count
$(add_button).click(function(e) { //on add input button click
    e.preventDefault();
    if (i < max_fields) { //max input box allowed
        i++; //text box increment
        $(wrapper).append("<div class='edu_tbl" + i + "'><div class='form-group'> <label><i class='fas fa-book-reader'></i> Course</label> <input id='education_course" + i + "' onclick='autofillEdu(this)' onchange='myFunction(this)' required type='text' class='form-control edu_courses' name='education_course[]' value='' /> <small class='text-muted'>Course</small> </div> <div class='form-group'> <label><i class='fas fa-user-graduate'></i> University</label> <input id='education_univ" + i + "' onkeyup='addUniv(" + i + ")' required type='text' class='form-control' name='education_univ[]' value='' /> <small class='text-muted'>University</small> </div> <div class='form-group'> <label><i class='far fa-calendar'></i>Year</label> <input id='education_year" + i + "' required type='text' class='form-control dateRangepicker'  name='education_year[]' value='' /> <small class='text-muted'>Year</small> </div><span onclick='removeEdu(" + i + ")'  class='remove_field label label-danger red' style=' margin-left:10px; cursor: pointer; color:red;'>Remove</span></div>"); //add input box
        $('#biolink_preview_iframe').contents().find('#edu_table').append("<tr style='text-align: left;' class='edu_tbl" + i + "'> <td><span class='text-uppercase education_course" + i + "'></span><br><small class='text-capitalize university_text" + i + "'></small></td> <td style='text-align: end; padding: 0 0 24px 0; '><small class='eduYear" + i + "'></small></td> </tr>");
        $('#biolink_preview_iframe').contents().find(".education_div").show();
        $('.dateRangepicker').daterangepicker({
            "showDropdowns": true,
            "minYear": 2000,
            "maxYear": 2020,
            "autoApply": true,
            locale: {
                format: 'YYYY'
            }
        }, function(start, end, label) {
            console.log('New date range selected: ' + start.format('YYYY') + ' to ' + end.format('YYYY') + ' (predefined range: ' + label + ')');
            var yearValue = start.format('YYYY') + '-' + end.format('YYYY');
            var yearClass = ".eduYear" + i;
            // alert(yearValue);
            // alert(yearClass);

            $('#biolink_preview_iframe').contents().find(yearClass).text(yearValue);
        });
    }
});

// $(wrapper).on("click", ".remove_field", function(e) { //user click on remove text
//     var edu_tbl = ".edu_tbl" + i;
//     alert(edu_tbl);
//     $('#biolink_preview_iframe').contents().find(edu_tbl).remove();
//     e.preventDefault();
//     $(this).parent().remove();
//     i--;
// });

var x = 200; //initlal text box count
$(exp_add_button).click(function(e) { //on add input button click
    e.preventDefault();
    if (x < max_fields) { //max input box allowed 
        x++; //text box increment

        $(exp_wrapper).append("<div class='exp_tbl" + x + "'><div class='form-group autocomplete'> <label><i class='fas fa-industry'></i> Company</label> <input id='experience_company" + x + "' onclick='autofill(this)' onchange='myFunction(this)'  required type='text' class='form-control experience_companys' name='experience_company[]' value='' /> <small class='text-muted'>Company</small> </div> <div class='form-group'> <label><i class='fas fa-project-diagram'></i> Position</label> <input id='experience_position" + x + "' onkeyup='addExp(" + x + ")' required type='text' class='form-control' name='experience_position[]' value='' /> <small class='text-muted'>Position</small> </div> <div class='form-group'> <label><i class='far fa-calendar'></i> Year</label> <input id='experience_start" + x + "' required type='text' class='form-control dateRangepicker' name='experience_start_date[]' value='' /> <small class='text-muted'>Year</small> </div><span onclick='removeExp(" + x + ")' class='exp_remove_field label label-danger red' style=' margin-left:10px; cursor: pointer; color:red;'>Remove</span></div>"); //add input box
        $('#biolink_preview_iframe').contents().find('#exp_table').append("<tr style='text-align: left;' class='exp_tbl" + x + "'> <td><span class='text-uppercase experience_company" + x + "'></span><br><small class='text-capitalize exp_position" + x + "'></small></td> <td style='text-align: end; padding: 0 0 24px 0; '><small class='expYear" + x + "'></small></td> </tr>");
        $('#biolink_preview_iframe').contents().find(".experience_div").show();
        $('.dateRangepicker').daterangepicker({
            "showDropdowns": true,
            "minYear": 2000,
            "maxYear": 2020,
            "autoApply": true,
            locale: {
                format: 'YYYY'
            }
        }, function(start, end, label) {
            console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
            var yearValue = start.format('YYYY') + '-' + end.format('YYYY');
            var yearClass = ".expYear" + x;
            // alert(yearValue);
            // alert(yearClass);

            $('#biolink_preview_iframe').contents().find(yearClass).text(yearValue);
        });

    }

});

function removeExp(x) {
    var exp_tbl = ".exp_tbl" + x;
    // alert(exp_tbl);
    $('#biolink_preview_iframe').contents().find(exp_tbl).remove();
    $(exp_tbl).remove();
}

function removeEdu(x) {
    var edu_tbl = ".edu_tbl" + x;
    // alert(edu_tbl);
    $('#biolink_preview_iframe').contents().find(edu_tbl).remove();
    $(edu_tbl).remove();
}


function autocomplete(inp, arr, id) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    myFunction(id);
                    // if(id == "experience_company"){
                    //     var text = "." + id;
                    //     $('#biolink_preview_iframe').contents().find(text).text(inp.value);
                    // }else{

                    // }

                    // var inputs = $(".edu_courses");
                    // for (var i = 0; i < inputs.length; i++) {
                    //     // var a = "." + $(inputs[i]).attr('id');
                    //     var a = "." + $(inputs[inputs.length - 1]).attr('id');
                    //     alert(a)
                    //     $('#biolink_preview_iframe').contents().find(a).text(inp.value);
                    // }
                    // var expinputs = $(".experience_companys");
                    // for (var i = 0; i < expinputs.length; i++) {
                    //     // var a = "." + $(inputs[i]).attr('id');
                    //     var a = "." + $(expinputs[expinputs.length - 1]).attr('id');
                    //     alert(a)
                    //     $('#biolink_preview_iframe').contents().find(a).text(inp.value);
                    // }
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });

    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }

    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function(e) {
        closeAllLists(e.target);

    });
}

/*An array containing all the country names in the world:*/

function autofill(elem) {
    $.getJSON("app/includes/experience_company.json", function(data) {

        var arrItems = []; // THE ARRAY TO STORE JSON ITEMS.
        $.each(data, function(index, value) {
            arrItems.push(value); // PUSH THE VALUES INSIDE THE ARRAY.
        });

        var col = [];
        for (var i = 0; i < arrItems.length; i++) {

            col.push(arrItems[i]['Name']);
        }
        var id = $(elem).attr("id");
        autocomplete(document.getElementById(id), col, id);
    });
}

function autofillEdu(elem) {
    $.getJSON("app/includes/education_course.json", function(data) {

        var arrItems = []; // THE ARRAY TO STORE JSON ITEMS.
        $.each(data, function(index, value) {
            arrItems.push(value); // PUSH THE VALUES INSIDE THE ARRAY.
        });

        var col = [];
        for (var i = 0; i < arrItems.length; i++) {

            col.push(arrItems[i]['Name']);
        }
        var id = $(elem).attr("id");
        autocomplete(document.getElementById(id), col, id);
    });

}

function addUniv(elem) {
    var id = "#education_univ" + elem;
    var text = ".university_text" + elem;

    $('#biolink_preview_iframe').contents().find(text).text($(id).val());

}

function addExp(elem) {
    var id = "#experience_position" + elem;
    var text = ".exp_position" + elem;


    $('#biolink_preview_iframe').contents().find(text).text($(id).val());

}


$(document).ready(function() {
    $(".bootstrap-tagsinput").addClass("form-control");
    $(".bootstrap-tagsinput").css("height", "auto");
    $(".badge-info").css("margin", "2px");
    $(".badge-info").css("padding", "5px");




});
$('.dateRangepicker').daterangepicker({
    "showDropdowns": true,
    "minYear": 2000,
    "maxYear": 2020,
    "autoApply": true,
    locale: {
        format: 'YYYY'
    }
}, function(start, end, label) {
    var x = $(this)[0].element.data('uid');
    console.log($(this)[0].element.data('id_name'));
    console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
    if ($(this)[0].element.data('id_name') == "education_year") {
        var yearValue = start.format('YYYY') + '-' + end.format('YYYY');
        var yearClass = ".eduYear" + x;
        // alert(yearValue);
        // alert(yearClass);
        $('#biolink_preview_iframe').contents().find(yearClass).text(yearValue);
    } else {
        var yearValue = start.format('YYYY') + '-' + end.format('YYYY');
        var yearClass = ".expYear" + x;
        // alert(yearValue);
        // alert(yearClass);
        $('#biolink_preview_iframe').contents().find(yearClass).text(yearValue);
    }


    $('#biolink_preview_iframe').contents().find(yearClass).text(yearValue);
});

$('#settings_description').on('change paste keyup', event => {

    $('#biolink_preview_iframe').contents().find('#description').text('');
    $('#biolink_preview_iframe').contents().find('#description').append($(event.currentTarget).val());
});

// $('#settings_description').on('change paste keyup', event => {
//     $('#biolink_preview_iframe').contents().find('#description').text('');
//     $('#biolink_preview_iframe').contents().find('#description').append($(event.currentTarget).val());
// });

function enableTxt(elem) {

}
// $('body').on('change', '#experience_company2', function() {
//     alert($(this).val());
// });
function myFunction(elem) {

    if (typeof elem == "object") {
        var elem = $(elem).attr("id");

    } else {
        var elem = elem;

    }

    var value = $("#" + elem).val();
    var text = "." + elem;
    $('#biolink_preview_iframe').contents().find(text).text(value);
    // alert($("#" + elem).val());
}