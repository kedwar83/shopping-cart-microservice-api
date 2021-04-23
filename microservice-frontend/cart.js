let list;
let listAdd;
let itemCount;
let totalPrice;
var itemHolder = [];


let email = sessionStorage.getItem('email'); //gets the users email from sessionStorage
 
getCart(email);
 
function getCart($email) {
    $.ajax({
        url: Url + 'GetCart',
        type: 'get',
        dataType: 'json',
        data: {"email":$email},
        contentType: 'text/plain',
        success: function (data) {
 
            list = '';
            listAdd = '';
            itemCount = 0;
            totalPrice = 0;
 
            $.each(data['data']['List'], function (i, item) {
                listAdd = '<div class="row main align-items-center">\n' +
                    '                        <div class="col-2"><img class="img-fluid" src="' +
                    <form id="form" onsubmit="return false;">
                    <input style="position:absolute; top:80%; left:5%; width:40%;" type="text" id="userInput" />
                    <input style="position:absolute; top:50%; left:5%; width:40%;" type="submit" onclick="changeQuantityOfPurchase();" />
                </form>
                   item['image'] + '"></div>\n' +
                    '                        <div class="col">\n' +
                    '                            <div class="row text-muted">' + item['operating_system'] + '</div>\n' +
                    '                            <div class="row">' + item['title'] + '</div>\n' +
                    '                        </div>\n' +
                    '                        <div class="col"> <a class="border">1</a></div>\n' +

                    '                        <div class="col">&dollar; ' + item['money_price'] + ' <a onclick="deleteItem(' + item['id'] + ')" type="button">&#10005;</a></div>\n' +
                    '                    </div>';
                list = list + listAdd;
                itemCount++;

                itemHolder.push(item['id']);
                totalPrice += parseInt(item['money_price']);
            });
 
            


            $('#cart-list').html(list);
            $('#item-count').html(itemCount + ' items');
            $('#item-total').html(itemCount + ' items');
            $('#item-price').html('&dollar; ' + totalPrice);
       
        },
        error: function (data) {
            alert("Error while fetching data.");
        }
    });
}
 
function deleteItem($id) {
     $.ajax({
        url: "http://18.220.85.60/api/+'Cart/{$id}'",
        type: 'delete',
        dataType: 'json',
        data: {}, //the json is defined here using javascript's dictionary syntax.
        contentType: 'text/plain',
        success: function (data) { //on success
            //reactive HTML that depends on the contents od the returned data
            comment='';
        }
    });
}


function changeQuantityOfPurchase() {

    var desiredQuantity = document.getElementById("userInput").value; 
    if (desiredQuantity > sameItemId)
    {
        for (let currentQuantity = 0; currentQuantity > desiredQuantity; currentQuantity++)
        {
            id = itemHolder.pop();
            addToCart($id); 

        }
    }
    else 
    {
        for (; i < desiredQuantity; currentQuantity--)
        {
            id = itemHolder.pop();
            deleteItem($id); 
        }
    }
}

function clearCart() {
    //this function removes all items from the cart
    for (let i = 0; i > itemCount; i++)
    {
        id = itemHolder.pop();
        deleteItem(id); 
    }
    totalPrice = 0;
} 


function checkOut() {
    let email = $('#email').val();
    $.ajax({
        url: "http://18.220.85.60/api/+'Cart'",
        type: 'put',
        dataType: 'json',
        data: {"email":email}, //the json is defined here using javascript's dictionary syntax.
        contentType: 'text/plain',
        success: function (data) { //on success
            //reactive HTML that depends on the contents od the returned data
            comment='';
        }
    });
}