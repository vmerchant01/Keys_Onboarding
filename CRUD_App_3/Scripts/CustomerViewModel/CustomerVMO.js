var urlPath = window.location.pathname;
$(function () {
    ko.applyBindings(CustVMO);
});

var CustVMO = {
    Id: ko.observable(),
    Name: ko.observable(),
    Age: ko.observable(),
    Address: ko.observable(),    
    SaveCustomer: function () {
        $.ajax({
            type: "POST",
            data: ko.toJSON(this),
            //dataType: 'text json',
            url: "/Customers/Create",
            contentType: 'application/json',
            success: function (result) {
                if (debug) console.log(result);
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
};

//Model
function Customers(data) {
    this.Id = ko.observable(data.Id);
    this.Name = ko.observable(data.Name);
    this.Age = ko.observable(data.Age);
    this.Address = ko.observable(data.Address);
}
