var debug = true;
console.log("debug:"+debug);

function setId(id) {
    document.getElementById("hdnField").value = id;
}

function cleanupClass() {    
    var x = document.getElementById("submit").getAttribute("class");
    
    document.getElementById("submit").className = '';
    if (x.indexOf('btn btn-primary') !== -1) {
        document.getElementById("submit").removeAttribute("btn-primary");
    }
    document.getElementById("submit").className += ' btn btn-primary ';

    if (x.indexOf('glyphicon') !== -1) {     
        document.getElementById("submit").removeAttribute("glyphicon");
    }

    if (x.indexOf('glyphicon-plus') !== -1) {
        document.getElementById("submit").removeAttribute("glyphicon-plus");        
    }
    
    if (x.indexOf('glyphicon-file') !== -1) {
        document.getElementById("submit").removeAttribute("glyphicon-file");
    }
    
    if (x.indexOf('glyphicon-floppy-disk') !== -1) {
        document.getElementById("submit").removeAttribute("glyphicon-floppy-disk");
    }
}

function resetCustomerValidation_text() {
    document.getElementById("nameHelp").textContent = "";
    document.getElementById("ageHelp").textContent = "";
    document.getElementById("addressHelp").textContent = "";    
}

function resetProductValidation_text() {
    document.getElementById("nameHelp").textContent = "";
    document.getElementById("priceHelp").textContent = "";
}

function resetStoreValidation_text() {
    document.getElementById("nameHelp").textContent = "";
    document.getElementById("addressHelp").textContent = "";
}

$(document).ready(function () {

    //change modal button caption if add customer is clicked.
    $(document).on('click', '#add', function () {
        if (debug) console.log("add button clicked.");
         
        var heading = $(".modal-header > h4").attr("id");
        //need to call correct form.
        if (heading.toLowerCase().trim() == "customer") {
            resetCustomerValidation_text();
            document.customerDetails.reset();            
            $(".modal-header > h4").html("Add Customer");            
        } else if (heading.toLowerCase().trim() == "product") {
            resetProductValidation_text();
            document.productDetails.reset();
            $(".modal-header > h4").html("Add Product");
        } else if (heading.toLowerCase().trim() == "store") {
            resetStoreValidation_text();
            document.storeDetails.reset();
            $(".modal-header > h4").html("Add Store");
        }
        document.getElementById("submit").innerHTML = "Create";
        cleanupClass();
        document.getElementById("submit").className += " glyphicon glyphicon-plus";
        if (debug) console.log("button class:" + document.getElementById("submit").className);
    });

    //change modal button caption if details customer is clicked.
    $(document).on('click', '#detail', function () {
        if (debug) console.log("details button clicked.");
        var heading = $(".modal-header > h4").attr("id");
        //need to call correct form.
        if (heading.toLowerCase().trim() == "customer") {
            resetCustomerValidation_text();
            document.customerDetails.reset();
            $(".modal-header > h4").html("Customer Details");
        } else if (heading.toLowerCase().trim() == "product") {
            resetProductValidation_text();
            document.productDetails.reset();
            $(".modal-header > h4").html("Product Details");
        } else if (heading.toLowerCase().trim() == "store") {
            resetStoreValidation_text();
            document.storeDetails.reset();
            $(".modal-header > h4").html("Store Details");
        }
        document.getElementById("submit").innerHTML = "OK";
        cleanupClass();
        document.getElementById("submit").className += " glyphicon glyphicon-file";
        if (debug) console.log("button class:" + document.getElementById("submit").className);
        callMefor("Details");
        
        //need to call correct form.
        if (heading.toLowerCase().trim() == "customer") {
            $("#newCustomer").modal("toggle");
        } else if (heading.toLowerCase().trim() == "product") {
            $("#newProduct").modal("toggle");
        } else if (heading.toLowerCase().trim() == "store") {
            $("#newStore").modal("toggle");
        }
    });

    //change modal button caption if edit customer is clicked.
    $(document).on('click', '#edit', function () {
        if (debug) console.log("edit button clicked.");
        
        document.getElementById("submit").innerHTML = "Save";
        cleanupClass();
        document.getElementById("submit").className += " glyphicon glyphicon-floppy-disk";
        if (debug) console.log("button class:" + document.getElementById("submit").className);
        var heading = $(".modal-header > h4").attr("id");
        //need to call correct form.
        if (heading.toLowerCase().trim() == "customer") {
            resetCustomerValidation_text();
            document.customerDetails.reset();            
            $(".modal-header > h4").html("Edit Customer");
        } else if (heading.toLowerCase().trim() == "product") {
            resetProductValidation_text();
            document.productDetails.reset();
            $(".modal-header > h4").html("Edit Product");
        } else if (heading.toLowerCase().trim() == "store") {
            resetStoreValidation_text();
            document.storeDetails.reset();
            $(".modal-header > h4").html("Edit Store");
        }
        callMefor("Edit");
        //need to call correct form.
        if (heading.toLowerCase().trim() == "customer") {
            $("#newCustomer").modal("toggle");
        } else if (heading.toLowerCase().trim() == "product") {
            $("#newProduct").modal("toggle");
        } else if (heading.toLowerCase().trim() == "store") {
            $("#newStore").modal("toggle");
        }
    });
    //change modal button caption if delete customer is clicked.
    $(document).on('click', '#delete', function () {        
        if (debug) console.log("delete button clicked.");
        var heading = $(".modal-header > h4").attr("id");
        //need to call correct form.
        if (heading.toLowerCase().trim() == "customer") {   
            resetCustomerValidation_text();
            $(".modal-header > h4").html("Delete Customer");
        } else if (heading.toLowerCase().trim() == "product") { 
            resetProductValidation_text();
            $(".modal-header > h4").html("Delete Product");
        } else if (heading.toLowerCase().trim() == "store") {
            resetStoreValidation_text();
            $(".modal-header > h4").html("Delete Store");
        }
        document.getElementById("submit").innerHTML = "Delete";
        cleanupClass();
        document.getElementById("submit").className += " glyphicon glyphicon-remove";
        if (debug) console.log("button class:" + document.getElementById("submit").className);
        callMefor("Delete");
        //need to call correct form.
        if (heading.toLowerCase().trim() == "customer") {
            $("#newCustomer").modal("toggle");
        } else if (heading.toLowerCase().trim() == "product") {
            $("#newProduct").modal("toggle");
        } else if (heading.toLowerCase().trim() == "store") {
            $("#newStore").modal("toggle");
        }  
    });  
});