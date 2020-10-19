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

    if(!confirm(message)) return false;
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

var i = 1; //initlal text box count
$(add_button).click(function(e) { //on add input button click
    e.preventDefault();
    if (i < max_fields) { //max input box allowed
        i++; //text box increment
        $(wrapper).append("<div><div class='form-group'> <label><i class='fab fa-fw fa-google fa-sm mr-1'></i> Course</label> <input id='education_course"+i+"' onclick='autofillEdu(this)' type='text' class='form-control' name='education_course[]' value='' /> <small class='text-muted'>Course</small> </div> <div class='form-group'> <label><i class='fab fa-fw fa-google fa-sm mr-1'></i> University</label> <input id='education_univ' type='text' class='form-control' name='education_univ[]' value='' /> <small class='text-muted'>University</small> </div> <div class='form-group'> <label><i class='fab fa-fw fa-google fa-sm mr-1'></i> Year</label> <input id='education_year' type='date' class='form-control' name='education_year[]' value='' /> <small class='text-muted'>Year</small> </div><span class='remove_field label label-danger red' style=' margin-left:10px; cursor: pointer; color:red;'>x</span></div>"); //add input box
    }
});

$(wrapper).on("click", ".remove_field", function(e) { //user click on remove text

    e.preventDefault();
    $(this).parent().remove();
    i--;
});

var x = 1; //initlal text box count
$(exp_add_button).click(function(e) { //on add input button click
    e.preventDefault();
    if (x < max_fields) { //max input box allowed 
        x++; //text box increment
       
        $(exp_wrapper).append("<div><div class='form-group autocomplete'> <label><i class='fab fa-fw fa-google fa-sm mr-1'></i> Company</label> <input id='myInput"+x+"' onclick='autofill(this)' type='text' class='form-control' name='experience_company[]' value='' /> <small class='text-muted'>Company</small> </div> <div class='form-group'> <label><i class='fab fa-fw fa-google fa-sm mr-1'></i> Position</label> <input id='experience_position' type='text' class='form-control' name='experience_position[]' value='' /> <small class='text-muted'>Position</small> </div> <div class='form-group'> <label><i class='fab fa-fw fa-google fa-sm mr-1'></i> Start Date</label> <input id='experience_start' type='date' class='form-control' name='experience_start_date[]' value='' /> <small class='text-muted'>Start Date</small> </div> <div class='form-group'> <label><i class='fab fa-fw fa-google fa-sm mr-1'></i> End Date</label> <input id='experience_end' type='date' class='form-control' name='experience_end_date[]' value='' /> <small class='text-muted'>End Date</small> </div><span class='exp_remove_field label label-danger red' style=' margin-left:10px; cursor: pointer; color:red;'>close</span></div>"); //add input box
    }
});

$(exp_wrapper).on("click", ".exp_remove_field", function(e) { //user click on remove text

    e.preventDefault();
    $(this).parent().remove();
    x--;
});

function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
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
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
  }
  
  /*An array containing all the country names in the world:*/
 
  function autofill(elem) {
    $.getJSON("app/includes/experience_company.json", function (data) {

      var arrItems = [];      // THE ARRAY TO STORE JSON ITEMS.
      $.each(data, function (index, value) {
          arrItems.push(value);       // PUSH THE VALUES INSIDE THE ARRAY.
      });

      var col = [];
      for (var i = 0; i < arrItems.length; i++) {

          col.push(arrItems[i]['Name']);
      }
    var id = $(elem).attr("id");
    autocomplete(document.getElementById(id), col);
  }); 
  }
  function autofillEdu(elem) {
    $.getJSON("app/includes/education_course.json", function (data) {

      var arrItems = [];      // THE ARRAY TO STORE JSON ITEMS.
      $.each(data, function (index, value) {
          arrItems.push(value);       // PUSH THE VALUES INSIDE THE ARRAY.
      });

      var col = [];
      for (var i = 0; i < arrItems.length; i++) {

          col.push(arrItems[i]['Name']);
      }
    var id = $(elem).attr("id");
    autocomplete(document.getElementById(id), col);
  }); 
    
  }
  $(document).ready(function(){
    $(".bootstrap-tagsinput").addClass("form-control");
    $(".bootstrap-tagsinput").css("height", "auto");
    $(".badge-info").css("margin", "2px");
    $(".badge-info").css("padding", "5px");
   });