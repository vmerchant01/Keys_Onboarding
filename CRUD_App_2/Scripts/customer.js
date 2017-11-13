console.log("Customer debug:" + debug);
//Modal get data function.
function callMefor(operation) {
    var name = "";
    var age = "";
    var address = "";
    var ID = document.getElementById('hdnField').value;
    var hitUrl = "";
    if (operation != "") {
        var dataToPost = {
            id: ID
        }
    }
    if (operation.toLowerCase().trim() == "edit") {

        hitUrl = "/Customers/Edit";
    }
    if (operation.toLowerCase().trim() == "delete") {

        hitUrl = "/Customers/Delete";
    }
    if (operation.toLowerCase().trim() == "details") {

        hitUrl = "/Customers/Details";
    }
    if (debug) console.log("Get Data-> Id:" + ID + " HitUrl:" + hitUrl);
    $.ajax({
        type: "GET",
        data: "id=" + ID,
        url: hitUrl,
        contentType: 'application/json; charset=utf-8',
        success: function (json) {
            if (debug) console.log(json);
            ModalUpdate(json["Id"], json["Name"], json["Age"], json["Address"]);
        },
        failure: function (response) {
            //document.customerDetails.reset();
            if (debug) console.log(response.textContent());
        },
        error: function (xhr, textStatus, error) {
            if (debug) console.log(xhr.statusText);
            if (debug) console.log(textStatus);
            if (debug) console.log(error);
            //document.customerDetails.reset();
        }
    });
}
//Prefill modal with data from database when user click edit or delete
function ModalUpdate(id, name, age, address) {
    if (debug) console.log("Prefill ModalUpdate-> Id:" + id + " name:" + name + " age:" + age + " address:" + address);
    $("#hdnField").val(id);
    $("#customerInputName").val(name);
    $("#customerInputAge").val(age);
    $("#customerInputAddress").val(address);
}
//Modal submit data function.
$("form").on("submit", function (event) {
    event.preventDefault();
    if (formValidation()) {
        var name = $("[name='name']").val();
        var age = $("[name='age']").val();
        var address = $("[name='address']").val();
        var id = "0";
        var hitUrl = "";

        if (document.getElementById("submit").innerHTML.toLowerCase().trim() == "create") {
            id = "0";
            hitUrl = "/Customers/Create";
        } else if (document.getElementById("submit").innerHTML.toLowerCase().trim() == "save") {
            id = document.getElementById('hdnField').value;
            hitUrl = "/Customers/Edit";
        } else if (document.getElementById("submit").innerHTML.toLowerCase().trim() == "delete") {
            id = document.getElementById('hdnField').value;
            hitUrl = "/Customers/Delete";
        } else if (document.getElementById("submit").innerHTML.toLowerCase().trim() == "ok") {
            $('#newCustomer').modal('hide');
            return;
        }
        if (debug) console.log("Sending POST data-> Id:" + id + " Name:" + name + " Age:" + age + " Address:" + address + " hitUrl:" + hitUrl);
        var dataToPost = {
            id: id,
            name: name,
            age: age,
            address: address
        }

        $.ajax({
            type: "POST",
            data: JSON.stringify(dataToPost),
            url: hitUrl,
            contentType: 'application/json; charset=utf-8',
            success: function () {
                $('#newCustomer').modal('hide');
                location.reload();
                document.customerDetails.reset();
            },
            failure: function (response) {
                document.customerDetails.reset();
            },
            error: function (xhr, textStatus, error) {
                if (debug) console.log(xhr.statusText);
                if (debug) console.log(textStatus);
                if (debug) console.log(error);
                document.customerDetails.reset();
            }
        });
    }
});



function formValidation() {
    var customerName = $("#customerInputName").val();
    var customerAge = $("#customerInputAge").val();
    var customerAddress = $("#customerInputAddress").val();

    if (customerName_validation(customerName)) {
        if (customerAge_validation(customerAge)) {
            if (customerAddress_validation(customerAddress)) {
                if (debug) console.log("validation success.");
                return true;
            } else {
                document.getElementById("addressHelp").textContent = "Customer Address is required.";
            }
        } else {
            document.getElementById("ageHelp").textContent = "Customer Age is required.";
        }
    } else {
        document.getElementById("nameHelp").textContent = "Customer Name is required.";
    }
    if (debug) console.log("validation failed.");
    return false;
}

function customerName_validation(name) {
    var len = name.length;
    if (len >= 3 && len <= 100) {
        return true;
    }
    return false;
}

function customerAge_validation(age) {
    //This check is optional
    if ((!age) || 0 == age.length) {
        return true;
    }
    if (Number.isInteger(Number(age))) {
        if (age > 0 && age <= 120) {
            return true;
        }
    }
    return false;
}

function customerAddress_validation(address) {
    var len = address.length;
    if (len > 3 && len <= 300) {
        return true;
    }
    return false;
}