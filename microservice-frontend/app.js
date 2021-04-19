app.js
const Url = "http://18.220.85.60/api/"; //this constant holds the base url for the Microservice API, you will append the API route to this value
 
function fetchProductList() {
 
    jsonObj = [];
    item = {};
    var productList;
    var productListAdd;
 
    !($.trim($('#title').val()) == '') ? item ["title"] = $('#title').val(): '';
    !($.trim($('#operating_system').val()) == '') ? item ["operating_system"] = $('#operating_system').val(): '';
    !($.trim($('#min_price').val()) == '') ? item ["price_from"] = $('#min_price').val(): '';
    !($.trim($('#max_price').val()) == '') ? item ["price_to"] = $('#max_price').val(): '';
 
    jsonObj.push(item);
 
    //jQuery Ajax request
    $.ajax({
        url: Url+'GetProduct', //API url
        type: 'get', //type of request (get)
        dataType: 'json', //dataType, which is json for this lab.
        contentType: 'text/plain', //contentType, which is text/plain since json is sent as plain text.
        data: jsonObj[0], //data to be sent
 
        success: function (data) { //on success calls this functions and passes the API response as the data parameter.
            productList='';
 
            $.each(data['data']['List'], function(i, item) {
 
                //this is HTML code that is reactively added to the page, your TODO solutions do not need this.
                productListAdd = '<div class="col-sm-6 col-md-4 col-lg-3 mt-4" id="product'+item['id']+'">\n' +
                    '            <div class="card card-inverse card-info">\n' +
                    '                <img class="card-img-top" src="'+item['image']+'">\n' +
                    '                <div class="card-block">\n' +
                    '                    <h4><span class="badge badge-danger">'+item['price']+'</span></h4>\n' +
                    '                    <div class="meta card-text">\n' +
                    '                        <a style="color: deepskyblue">Category - Cell Phones</a>\n' +
                    '                    </div>\n' +
                    '                    <div class="card-text">\n' +
                    '                        '+item['title'].substring(0,50)+'... more\n' +
                    '                    </div>\n' +
                    '                </div>\n' +
                    '                <div class="card-footer">\n' +
                    '                    <small>More information ...</small>\n' +
                    '                    <button class="btn btn-info float-right btn-sm" onclick="fetchOneProduct('+item['id']+')">Detail</button>\n' +
                    '                </div>\n' +
                    '                <div class="card-footer">\n' +
                    '                    <button class="btn btn-info float-right btn-sm" onclick="addToCart('+item['id']+')">Add to Cart</button>\n' +
                    '                </div>\n' +
                    '            </div>\n' +
                    '        </div>';
                productList=productList+productListAdd;
 
            });
            $('#items').html(productList);
 
        },
        error: function (data) { //on error, alert the user.
            alert("Error while fetching data.");
        }
 
    });
}
 
function fetchOneProduct($id) {
    var product;
 
    //jQuery Ajax request
    $.ajax({
        url: Url+'GetOneProduct', //API url
        type: 'get',
        dataType: 'json', //dataType, which is json for this lab.
        data: {"product_id":$id}, //the json is defined here using javascript's dictionary syntax.
        contentType: 'text/plain',
        success: function (data) {
            product='';
 
            product = '<div class="card justify-content-center pagination-centered" style="width:900px; height:auto">\n' +
                '            <div class="container-fliud">\n' +
                '                <div class="wrapper row">\n' +
                '                    <div class="preview col-md-6">\n' +
                '                        <div class="preview-pic tab-content">\n' +
                '                            <div class="tab-pane active" id="pic-1"><img src="'+data['data']['List'][0]['image']+'" /></div>\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '                    <div class="details col-md-6">\n' +
                '                        <h3 class="product-title" style="margin-top: 10px">'+data['data']['List'][0]['title'].substring(0,15)+'...'+'</h3>\n' +
                '                        <div class="rating">\n' +
                '                            <button class="btn btn-info" id="comment" onclick="fetchComments('+data['data']['List'][0]['id']+')">'+data['data']['List'][0]['comment_count']+' comments</button>\n' +
                '                        </div>\n' +
                '                        <p class="product-description">'+data['data']['List'][0]['title']+'</p>\n' +
                '                        <h5 class="price">Current Price: <span>'+data['data']['List'][0]['price']+'</span></h5>\n' +
                '                        <h6 class="price">Screen Size: <span>'+data['data']['List'][0]['screen_size']+'</span></h6>\n' +
                '                        <h6 class="price">Weight: <span>'+data['data']['List'][0]['item_weight']+'</span></h6>\n' +
                '                        <h6 class="price">Camera: <span>'+data['data']['List'][0]['camera_description']+'</span></h6>\n' +
                '                        <h6 class="price">Operating System: <span>'+data['data']['List'][0]['operating_system']+'</span></h6>\n' +
                '                        <div class="action">\n' +
                '                            <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#exampleModal" data-whatever="'+data['data']['List'][0]['id']+'" >Submit Comment</button>\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </div>';
            $('#items').html(product);
 
        },
        error: function (data) {
            alert("Error while fetching data.");
        }
 
    });
}
 
function fetchComments($id) {
    var comment;
    var commentAdd;
 
    $.ajax({
        url: Url+'GetProductComment',
        type: 'get',
        dataType: 'json',
        data: {"product_id":$id}, //the json is defined here using javascript's dictionary syntax.
        contentType: 'text/plain',
 
        success: function (data) { //on success
            //reactive HTML that depends on the contents od the returned data
            comment='';
            comment='<div class="panel panel-default" style="width:800px">\n' +
                '            <div class="panel-heading">\n' +
                '                <span class="glyphicon glyphicon-comment"></span>\n' +
                '                <h3 class="panel-title">\n' +
                '                    Comments</h3>\n' +
                '            </div>\n' +
                '            <div class="panel-body">\n' +
                '                <ul class="list-group">\n';
            $.each(data['data']['List'], function(i, item) {
                commentAdd ='                    <li class="list-group-item">\n' +
                    '                        <div class="row">\n' +
                    '                            <div class="col-xs-2 col-md-2">\n' +
                    '                                <img src="img/comment.png" class="img-circle img-responsive" alt="" /></div>\n' +
                    '                            <div class="col-xs-10 col-md-10">\n' +
                    '                                <div><p>'+item['comment']+'</p></div>\n' +
                    '                                <br/>\n' +
                    '                                <div><h5 style="color: red"> Score: '+item['score']+'</h5></div>\n' +
                    ' <div class="progress">\n' +
                    '  <div class="progress-bar" role="progressbar" aria-valuenow="'+item['score']+'"\n' +
                    '  aria-valuemin="0" aria-valuemax="5" style="width:'+(item['score']/5)*100+'%">\n' +
                    '  </div>\n' +
                    '</div>\n' +
                    '                            </br>\n' +
                    '                        </div>\n' +
                    '                    </li>';
                comment=comment+commentAdd;
            });
            comment=comment+'</ul></div></div>'
            $('#comment-list').html(comment);
 
        },
        error: function (data) { //on error, throw an alert
            alert("Error while fetching data.");
        }
    });
}
 
function setComment($id) {
 
    //TODO complete implementation using the product id

    let comment = $('message-text').val();
    let score = $('#score').val();

    $.ajax({
            url: Url+'SetComment',
            type: 'post',
            dataType: 'json',
            data: {"product_id":$id, "comment":comment, "score":score}, //the json is defined here using javascript's dictionary syntax.
            contentType: 'text/plain',
            success: function (data) { //on success
                //reactive HTML that depends on the contents od the returned data
                comment='';
            }
        });
 

         
 
 
    //HINT
    //Take note of how the Ajax call in app.js/fetchComments() posts a GET request to corresponding API endpoint.
    //Look at the Microservice API Documentation and find out the appripriate type of request for this action.
 
    }
 
function addToCart($id) {
 
    //TODO complete implementation using the product id

    let email = $('#email').val();

    $.ajax({
        url: Url+'AddToCart',
        type: 'post',
        dataType: 'json',
        data: {"product_id":$id, "email":$email}, //the json is defined here using javascript's dictionary syntax.
        contentType: 'text/plain',
        success: function (data) { //on success
            //reactive HTML that depends on the contents od the returned data
            comment='';
        }
    });
 
 
}


/*
function changeQuantityPurchase($id) {
 
    //TODO complete implementation using the product id


    
    let desiredQuantity; 

    for (let i = 0; i > desiredQuantity; i++)
    {
        addToCart(id); 
    }

   
 
 
}
*/

 
function toShoppingCart(){
    let email =$.trim($('#email').val()); //gets the user's email
 
    //email validation
 
    if( email !='' ) {
        sessionStorage.setItem('email', email); //setItem 'email' in sessionStorage to be the user's email. You can access sessionStorage by sessionStorage.getItem().
        window.location.href = './cart.html'; //redirect to the shopping cart page
    } else {
        alert("Please enter your email at top of page."); //alert user since email is empty
    }
}
 
$('#exampleModal').on('show.bs.modal', function (event) {
    $('#ajaxForm').trigger("reset");
    var button = $(event.relatedTarget);
    var recipient = button.data('whatever');
    var modal = $(this);
    modal.find('#btnSave').off().click(function () {
        setComment(recipient);
    });
});