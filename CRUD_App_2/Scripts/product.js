console.log("Product debug:" + debug);
//Modal get data function.
function callMefor(operation) {
    var name = "";
    var price = "";
    var ID = document.getElementById('hdnField').value;
    var hitUrl = "";
    if (operation != "") {
        var dataToPost = {
            id: ID
        }
    }
    if (operation.toLowerCase().trim() == "edit") {

        hitUrl = "/Products/Edit";
    }
    if (operation.toLowerCase().trim() == "delete") {

        hitUrl = "/Products/Delete";
    }
    if (operation.toLowerCase().trim() == "details") {

        hitUrl = "/Products/Details";
    }
    if (debug) console.log("Get Data-> Id:" + ID + " HitUrl:" + hitUrl);
    $.ajax({
        type: "GET",
        data: "id=" + ID,
        url: hitUrl,
        contentType: 'application/json; charset=utf-8',
        success: function (json) {
            if (debug) console.log(json);
            ModalUpdate(json["Id"], json["Name"], json["Price"]);
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
function ModalUpdate(id, name, price) {
    if (debug) console.log("Prefill ModalUpdate-> Id:" + id + " name:" + name + " price:" + price);
    $("#hdnField").val(id);
    $("#productInputName").val(name);
    $("#productInputPrice").val(price);    
}
//Modal submit data function.
$("form").on("submit", function (event) {
    event.preventDefault();
    if (formValidation()) {
        var name = $("[name='name']").val();
        var price = $("[name='price']").val();        
        var id = "0";
        var hitUrl = "";

        if (document.getElementById("submit").innerHTML.toLowerCase().trim() == "create") {
            id = "0";
            hitUrl = "/Products/Create";
        } else if (document.getElementById("submit").innerHTML.toLowerCase().trim() == "save") {
            id = document.getElementById('hdnField').value;
            hitUrl = "/Products/Edit";
        } else if (document.getElementById("submit").innerHTML.toLowerCase().trim() == "delete") {
            id = document.getElementById('hdnField').value;
            hitUrl = "/Products/Delete";
        } else if (document.getElementById("submit").innerHTML.toLowerCase().trim() == "ok") {
            $('#newProduct').modal('hide');
            return;
        }
        if (debug) console.log("Sending POST data-> Id:" + id + " Name:" + name + " Price:" + price + " hitUrl:" + hitUrl);
        var dataToPost = {
            id: id,
            name: name,
            price: price
        }

        $.ajax({
            type: "POST",
            data: JSON.stringify(dataToPost),
            url: hitUrl,
            contentType: 'application/json; charset=utf-8',
            success: function () {
                $('#newProduct').modal('hide');
                location.reload();
                document.productDetails.reset();
            },
            failure: function (response) {
                document.productDetails.reset();
            },
            error: function (xhr, textStatus, error) {
                if (debug) console.log(xhr.statusText);
                if (debug) console.log(textStatus);
                if (debug) console.log(error);
                document.productDetails.reset();
            }
        });
    }
});

function formValidation() {
    var productName = $("#productInputName").val();
    var productPrice = $("#productInputPrice").val();

    document.getElementById("priceHelp").textContent = "";
    document.getElementById("nameHelp").textContent = "";

    if (productPrice == "") {
        productPrice = 0;
    }

    if (productName_validation(productName)) {
        if (productPrice_validation(productPrice)) {
            if (debug) console.log("validation success.");
            return true;
        } else {
            document.getElementById("priceHelp").textContent = "Price range error.";
        }
    } else {
        document.getElementById("nameHelp").textContent = "Product Name is required.";
    }
    if (debug) console.log("validation failed.");
    return false;
    
}
function productName_validation(name) {
    var len = name.length;
    if (len >= 3 && len <= 100) {
        return true;
    }
    return false;
}

function productPrice_validation(price) {
    //if (Number.is(Number(price))) {
        if (price >= 1.0 && price <= 10000000.0) {
            return true;
        }
    //}
    return false;
}