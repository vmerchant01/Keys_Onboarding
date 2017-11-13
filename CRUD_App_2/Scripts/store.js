console.log("Store debug:" + debug);
//Modal get data function.
function callMefor(operation) {
    var name = "";
    var address = "";
    var ID = document.getElementById('hdnField').value;
    var hitUrl = "";
    if (operation != "") {
        var dataToPost = {
            id: ID
        }
    }
    if (operation.toLowerCase().trim() == "edit") {

        hitUrl = "/Stores/Edit";
    }
    if (operation.toLowerCase().trim() == "delete") {

        hitUrl = "/Stores/Delete";
    }
    if (operation.toLowerCase().trim() == "details") {

        hitUrl = "/Stores/Details";
    }
    if (debug) console.log("Get Data-> Id:" + ID + " HitUrl:" + hitUrl);
    $.ajax({
        type: "GET",
        data: "id=" + ID,
        url: hitUrl,
        contentType: 'application/json; charset=utf-8',
        success: function (json) {
            if (debug) console.log(json);
            ModalUpdate(json["Id"], json["Name"], json["Address"]);
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
function ModalUpdate(id, name, address) {
    if (debug) console.log("Prefill ModalUpdate-> Id:" + id + " name:" + name + " address:" + address);
    $("#hdnField").val(id);
    $("#storeInputName").val(name);
    $("#storeInputAddress").val(address);
}
//Modal submit data function.
$("form").on("submit", function (event) {
    event.preventDefault();
    if (formValidation()) {
        var name = $("[name='name']").val();        
        var address = $("[name='address']").val();
        var id = "0";
        var hitUrl = "";

        if (document.getElementById("submit").innerHTML.toLowerCase().trim() == "create") {
            id = "0";
            hitUrl = "/Stores/Create";
        } else if (document.getElementById("submit").innerHTML.toLowerCase().trim() == "save") {
            id = document.getElementById('hdnField').value;
            hitUrl = "/Stores/Edit";
        } else if (document.getElementById("submit").innerHTML.toLowerCase().trim() == "delete") {
            id = document.getElementById('hdnField').value;
            hitUrl = "/Stores/Delete";
        } else if (document.getElementById("submit").innerHTML.toLowerCase().trim() == "ok") {
            $('#newStore').modal('hide');
            return;
        }
        if (debug) console.log("Sending POST data-> Id:" + id + " Name:" + name + " Address:" + address + " hitUrl:" + hitUrl);
        var dataToPost = {
            id: id,
            name: name,            
            address: address
        }

        $.ajax({
            type: "POST",
            data: JSON.stringify(dataToPost),
            url: hitUrl,
            contentType: 'application/json; charset=utf-8',
            success: function () {
                $('#newStore').modal('hide');
                location.reload();
                document.storeDetails.reset();
            },
            failure: function (response) {
                document.storeDetails.reset();
            },
            error: function (xhr, textStatus, error) {
                if (debug) console.log(xhr.statusText);
                if (debug) console.log(textStatus);
                if (debug) console.log(error);
                document.storeDetails.reset();
            }
        });
    }
});

function formValidation() {
    var storeName = $("#storeInputName").val();
    var storeAddress = $("#storeInputAddress").val();

    document.getElementById("addressHelp").textContent = "";
    document.getElementById("nameHelp").textContent = "";

    if (storeName_validation(storeName)) {
        if (storeAddress_validation(storeAddress)) {
            if (debug) console.log("validation success.");
            return true;
        } else {
            document.getElementById("addressHelp").textContent = "Store Address is required.";
        }
    } else {
        document.getElementById("nameHelp").textContent = "Store Name is required.";
    }
    if (debug) console.log("validation failed.");
    return false;
}


function storeName_validation(name) {
    var len = name.length;
    if (len >= 3 && len <= 100) {
        return true;
    }
    return false;
}

function storeAddress_validation(address) {
    var len = address.length;
    if (len > 3 && len <= 300) {
        return true;
    }
    return false;
}