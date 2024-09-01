let list;
let listAdd;
let itemCount;
let totalPrice;
var itemHolder = [];

let email = sessionStorage.getItem('email'); // Retrieve the user's email from sessionStorage

// Initialize the cart display
getCart(email);

function getCart(email) {
    $.ajax({
        url: Url + 'GetCart',
        type: 'get',
        dataType: 'json',
        data: { "email": email },
        contentType: 'text/plain',
        success: function (data) {
            list = '';
            listAdd = '';
            itemCount = 0;
            totalPrice = 0;

            // Generate HTML for each cart item
            $.each(data['data']['List'], function (i, item) {
                listAdd = `
                    <div class="row main align-items-center">
                        <div class="col-2"><img class="img-fluid" src="${item['image']}"></div>
                        <div class="col">
                            <div class="row text-muted">${item['operating_system']}</div>
                            <div class="row">${item['title']}</div>
                        </div>
                        <div class="col"><a class="border">1</a></div>
                        <div class="col">&dollar; ${item['money_price']} <a onclick="deleteItem(${item['id']})" type="button">&#10005;</a></div>
                    </div>`;
                list += listAdd;
                itemCount++;
                itemHolder.push(item['id']);
                totalPrice += parseInt(item['money_price']);
            });

            // Update the cart display
            $('#cart-list').html(list);
            $('#item-count').html(`${itemCount} items`);
            $('#item-total').html(`${itemCount} items`);
            $('#item-price').html(`&dollar; ${totalPrice}`);
        },
        error: function () {
            alert("Error while fetching data.");
        }
    });
}

function deleteItem(id) {
    $.ajax({
        url: Url + 'Cart/' + id,
        type: 'delete',
        dataType: 'json',
        contentType: 'text/plain',
        success: function () {
            getCart(email); // Refresh cart after deletion
        },
        error: function () {
            alert("Error while deleting item.");
        }
    });
}

function emptyCart() {
    // Remove all items from the cart
    while (itemHolder.length > 0) {
        let id = itemHolder.pop();
        deleteItem(id);
    }
}

function duplicateItmes() {
    // Add another of each item to the cart
    itemHolder.forEach(id => addToCart(id));
    getCart(email); // Refresh cart after adding items
}

function checkOut() {
    let email = $('#email').val();
    $.ajax({
        url: Url + 'Cart',
        type: 'put',
        dataType: 'json',
        data: { "email": email },
        contentType: 'text/plain',
        success: function () {
            // Clear the cart after successful checkout
            itemHolder = [];
            $('#cart-list').html('');
            $('#item-count').html('0 items');
            $('#item-total').html('0 items');
            $('#item-price').html('&dollar; 0');

            // Optionally, redirect to a confirmation page
            // window.location.href = 'confirmation.html';

            // Or show a success message
            alert('Checkout successful! Thank you for your purchase.');
        },
        error: function () {
            alert("Error during checkout.");
        }
    });
}

