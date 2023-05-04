//Product 
function getAllProduct() {
    apiUrl = "http://localhost:8888/products/view"
    fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(datas => {
            var listUser = document.querySelector('#list_product');
            var content = datas.map(function(user) {
                return `<tr>
                <td>${user.productId}</td>
                <td>${user.productName}</td>
                <td><img src="${user.image}" alt="" width="100px;"></td>
                <td>${user.quantity}</td>
                <td>${user.numberSell}</td>
                <td style="width: 30px;">${user.manufacturer}</td>
                <td>${user.color}</td>
                <td><span class="badge bg-success">${user.size}</span></td>
                <td>${user.price}</td>
                <td>${user.category.categoryName}</td>
                <td>${user.description}</td>
                <td><button class="btn btn-primary btn-sm trash" type="button" title="Xóa" onclick="popupDeleteProduct(${user.productId})"><i class="fas fa-trash-alt"></i></button>
                    <button class="btn btn-primary btn-sm edit hide" type="button" title="Sửa" id="accept_delete" data-toggle="modal" data-target="#deleteModal"><i class="fas fa-trash-alt"></i></button>
                    <button class="btn btn-primary btn-sm edit" type="button" title="Sửa" onclick="getProductById(${user.productId})"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-primary btn-sm edit hide" type="button" title="Sửa" id="show-emp" data-toggle="modal" data-target="#ModalUP"><i class="fas fa-edit"></i></button>
                </td></tr>`;
            });
            listUser.innerHTML = content.join('');
        })
        .catch(error => console.error(error));
}

function popupDeleteProduct(id) {
    document.querySelector('#accept_to_delete').innerHTML = `
    <button class="btn btn-save" type="button" onclick="deleteProductById(${id})" style="margin-left: 150px;">Đồng ý</button>
    <a class="btn btn-cancel" data-dismiss="modal" href="#" style="margin-left: 30px;">Hủy bỏ</a>`
    document.querySelector('#accept_delete').click();

}

function deleteProductById(id) {
    fetch('http://localhost:8888/products/remove/' + id, {
            method: 'DELETE'
        })
        .then(function(response) {
            if (response.ok) {
                alert("Product deleted successfully!");
                location.reload();
            } else {
                throw new Error('Response not OK');
            }
        })
        .catch(function(error) {
            alert("Error: " + error.message);
        });
}

function getProductById(id) {
    apiUrl = "http://localhost:8888/products/viewProduct/" + id;
    fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            var listUser = document.querySelector('#update_product');
            var content = `<div class="form-group col-md-6">
            <label class="control-label"> Mã sản phẩm </label>
            <input class="form-control" name="productId" type="text" disabled value="${data.productId}">
        </div>
        <div class="form-group col-md-6">
            <label class="control-label"> Tên sản phẩm</label>
            <input class="form-control" name="productName" type="text" required value="${data.productName}">
        </div>
        <div class="form-group  col-md-6">
            <label class="control-label"> Số lượng</label>
            <input class="form-control" name="quantity" type="number" required value="${data.quantity}">
        </div>
        <div class="form-group col-md-6">
            <label class="control-label"> Giá bán </label>
            <input class="form-control" name="price" type="text" value="${data.price}">
        </div>
        <div class="form-group col-md-6">
            <label class="control-label"> Nhà sản xuất </label>
            <input class="form-control" name="manufacturer" type="text" value="${data.manufacturer}">
        </div>
        <div class="form-group col-md-6">
            <label class="control-label"> Màu sắc </label>
            <input class="form-control" name="color" type="text" required value="${data.color}">
        </div>
        <div class="form-group  col-md-6">
            <label class="control-label"> Kích thước </label>
            <input class="form-control" name="size" type="text" required value="${data.size}">
        </div>
        <div class="form-group  col-md-6">
            <label class="control-label"> Mô tả </label>
            <input class="form-control" name="description" type="text" required value="${data.description}">
        </div>
        <div class="form-group col-md-6 ">
            <label for="exampleSelect1" class="control-label"> Danh mục </label>
            <select class="form-control" id="category">
                <option> Điện thoại </option>
                <option> Ti vi </option>
                <option> Máy giặt </option>
            </select>
        </div>
        <div class="form-group col-md-6 ">
                            <label class="control-label"> Ảnh </label>
                            <select class="form-control" id="image">
                            <option value="${data.image}"> ${data.image} </option>
                            </select>
                        </div>`;
            listUser.innerHTML = content;
            fetch("http://localhost:8888/category/getAll", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(datas => {
                    var listCategory = document.querySelector('#category');
                    var content = datas.map(function(user) {
                        if (user.categoryId != data.category.categoryId) {
                            return htmlTemplate = `<option value="${user.categoryId}"> ${user.categoryName} </option>`;
                        } else {
                            return htmlTemplate = `<option value="${user.categoryId}" selected> ${user.categoryName} </option>`;
                        }
                    });
                    listCategory.innerHTML = content.join('');
                })
                .catch(error => console.error(error));
            getUrl('#image')
            document.querySelector('#show-emp').click();
        })
        .catch(error => console.error(error));
}

function updateProduct() {
    var productId = parseInt(document.querySelector('input[name="productId"]').value)
    var productName = document.querySelector('input[name="productName"]').value
    var quantity = parseInt(document.querySelector('input[name="quantity"]').value)
    var price = parseFloat(document.querySelector('input[name="price"]').value)
    var manufacturer = document.querySelector('input[name="manufacturer"]').value
    var color = document.querySelector('input[name="color"]').value
    var size = document.querySelector('input[name="size"]').value
    var description = document.querySelector('input[name="description"]').value
    var image = document.querySelector('#image').value
    var categoryId = parseInt(document.querySelector('#category').value)
    var user = {
        "productName": productName,
        "price": price,
        "description": description,
        "image": image,
        "size": size,
        "manufacturer": manufacturer,
        "categoryId": categoryId,
        "quantity": quantity,
        "color": color
    };
    apiUrl = "http://localhost:8888/products/update/" + productId;
    fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(function(response) {
            if (response.ok) {
                alert("Product changed successfully!");
                location.reload();
            } else {
                alert('Response not OK');
                location.reload();
            }
        })
        .catch(function(error) {
            alert("Error: " + error.message);
        });
}

function createProductFinal() {
    var productName = document.querySelector('input[name="productNameCreate"]').value
    var quantity = parseInt(document.querySelector('input[name="quantityCreate"]').value)
    var price = parseFloat(document.querySelector('input[name="priceCreate"]').value)
    var manufacturer = document.querySelector('input[name="manufacturerCreate"]').value
    var color = document.querySelector('input[name="colorCreate"]').value
    var size = document.querySelector('input[name="sizeCreate"]').value
    var description = document.querySelector('input[name="descriptionCreate"]').value
    var image = document.querySelector('#imageCreate').value
    var categoryId = parseInt(document.querySelector('#categoryCreate').value)
    var user = {
        "productName": productName,
        "price": price,
        "description": description,
        "image": image,
        "size": size,
        "manufacturer": manufacturer,
        "category": categoryId,
        "quantity": quantity,
        "numberSell": 0,
        "color": color
    };
    apiUrl = "http://localhost:8888/products/add";
    fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(function(response) {
            if (response.ok) {
                alert("Product added successfully!");
                location.reload();
            } else {
                throw new Error('Response not OK');
            }
        })
        .catch(function(error) {
            alert("Error: " + error.message);
        });
}

function createProduct() {
    fetch("http://localhost:8888/category/getAll", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(datas => {
            var listCategory = document.querySelector('#categoryCreate');
            var content = datas.map(function(user) {
                return htmlTemplate = `<option value="${user.categoryId}"> ${user.categoryName} </option>`;
            });
            listCategory.innerHTML = content.join('');
        })
        .catch(error => console.error(error));
    getUrl('#imageCreate')
    document.querySelector('#add_product').click();
}

function searchProduct() {
    var chuoi = document.querySelector('#searchPro').value;
    var user = {
        "content": chuoi
    };
    fetch("http://localhost:8888/products/search/" + chuoi, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(datas => {
            var listUser = document.querySelector('#list_product');
            var content = datas.map(function(user) {
                return `<tr>
                <td>${user.productId}</td>
                <td>${user.productName}</td>
                <td><img src="${user.image}" alt="" width="100px;"></td>
                <td>${user.quantity}</td>
                <td>${user.numberSell}</td>
                <td style="width: 30px;">${user.manufacturer}</td>
                <td>${user.color}</td>
                <td><span class="badge bg-success">${user.size}</span></td>
                <td>${user.price}</td>
                <td>${user.category.categoryName}</td>
                <td>${user.description}</td>
                <td><button class="btn btn-primary btn-sm trash" type="button" title="Xóa" onclick="popupDaleteProduct(${user.productId})"><i class="fas fa-trash-alt"></i></button>
                    <button class="btn btn-primary btn-sm edit hide" type="button" title="Sửa" id="accept_delete" data-toggle="modal" data-target="#deleteModal"><i class="fas fa-trash-alt"></i></button>
                    <button class="btn btn-primary btn-sm edit" type="button" title="Sửa" onclick="getProductById(${user.productId})"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-primary btn-sm edit hide" type="button" title="Sửa" id="show-emp" data-toggle="modal" data-target="#ModalUP"><i class="fas fa-edit"></i></button>
                </td></tr>`;
            });
            listUser.innerHTML = content.join('');
        })
        .catch(error => console.error(error));
}






//Category 
function getAllCategory() {
    apiUrl = "http://localhost:8888/category/getAll"
    fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(datas => {
            var listCategory = document.querySelector('#list_category');
            var content = datas.map(function(user) {
                return `<tr>
                <td>${user.categoryId}</td>
                <td>${user.categoryName}</td>
                <td><button class="btn btn-primary btn-sm trash" type="button" title="Xóa" onclick="popupDaleteCategory(${user.categoryId})"><i class="fas fa-trash-alt"></i></button>
                    <button class="btn btn-primary btn-sm edit hide" type="button" title="Sửa" id="accept_delete_category" data-toggle="modal" data-target="#deleteCategoryModal"><i class="fas fa-trash-alt"></i></button>
                    <button class="btn btn-primary btn-sm edit" type="button" title="Sửa" onclick="getCategoryById(${user.categoryId})"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-primary btn-sm edit hide" type="button" title="Sửa" id="btn_update_category" data-toggle="modal" data-target="#form_update_category"><i class="fas fa-edit"></i></button>
                </td></tr>`;
            });
            listCategory.innerHTML = content.join('');
        })
        .catch(error => console.error(error));
}

function createCategory() {
    fetch("http://localhost:8888/category/count", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(datas => {
            document.querySelector('input[name="categoryIdCreate"]').value = datas + 1;
            console.log(datas)
        })
        .catch(error => console.error(error));
    document.querySelector('#add_category').click();
}

function updateCategory() {
    var categoryId = document.querySelector('input[name="categoryId"]').value
    var categoryName = document.querySelector('input[name="categoryName"]').value
    var user = {
        "categoryId": categoryId,
        "categoryName": categoryName
    };
    apiUrl = "http://localhost:8888/category/update/" + categoryId;
    fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(function(response) {
            if (response.ok) {
                alert("Category changed successfully!");
                location.reload();
            } else {
                throw new Error('Response not OK');
            }
        })
        .catch(function(error) {
            alert("Error: " + error.message);
        });
}

function popupDaleteCategory(id) {
    document.querySelector('#accept_to_delete_category').innerHTML = `
    <button class="btn btn-save" type="button" onclick="deleteCategoryById(${id})" style="margin-left: 150px;">Đồng ý</button>
    <a class="btn btn-cancel" data-dismiss="modal" href="#" style="margin-left: 30px;">Hủy bỏ</a>`
    document.querySelector('#accept_delete_category').click();
}

function deleteCategoryById(id) {
    fetch('http://localhost:8888/category/remove/' + id, {
            method: 'DELETE'
        })
        .then(function(response) {
            if (response.ok) {
                alert("Category deleted successfully!");
                location.reload();
            } else {
                throw new Error('Response not OK');
            }
        })
        .catch(function(error) {
            alert("Error: " + error.message);
        });
}

function createCategoryFinal() {
    var categoryId = document.querySelector('input[name="categoryIdCreate"]').value
    var categoryName = document.querySelector('input[name="categoryNameCreate"]').value
    var user = {
        "categoryId": categoryId,
        "categoryName": categoryName
    };
    apiUrl = "http://localhost:8888/category/add";
    fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(function(response) {
            if (response.ok) {
                alert("Category added successfully!");
                location.reload();
            } else {
                throw new Error('Response not OK');
            }
        })
        .catch(function(error) {
            alert("Error: " + error.message);
        });
}

function getCategoryById(id) {
    apiUrl = "http://localhost:8888/category/get/" + id;
    fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            var listUser = document.querySelector('#update_category');
            var content = `<div class="form-group col-md-6">
            <label class="control-label"> Mã sản phẩm </label>
            <input class="form-control" name="categoryId" type="text" disabled value="${data.categoryId}">
        </div>
        <div class="form-group col-md-6">
            <label class="control-label"> Tên sản phẩm</label>
            <input class="form-control" name="categoryName" type="text" required value="${data.categoryName}">
        </div>`
            listUser.innerHTML = content;
            document.querySelector('#btn_update_category').click();
        })
        .catch(error => console.error(error));
}





//Main 
function countCustomer() {
    fetch("http://localhost:8888/customers/count", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(datas => {
            document.querySelector('#countCustomer').innerHTML = `<h4>Tổng khách hàng</h4>
            <p><b>${datas} khách hàng</b></p>`
        })
        .catch(error => console.error(error));
}

function countProduct() {
    fetch("http://localhost:8888/products/count", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(datas => {
            document.querySelector('#countProduct').innerHTML = `<h4>Tổng sản phẩm</h4>
            <p><b>${datas} sản phẩm</b></p>`
        })
        .catch(error => console.error(error));
}

function countOrder() {
    fetch("http://localhost:8888/orders/count", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(datas => {
            document.querySelector('#countOrder').innerHTML = `<h4>Tổng đơn hàng</h4>
            <p><b>${datas} đơn hàng</b></p>`
        })
        .catch(error => console.error(error));
}

function countEndProduct() {
    fetch("http://localhost:8888/products/countEnd", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(datas => {
            document.querySelector('#countEndProduct').innerHTML = `<h4>Sắp hết hàng</h4>
            <p><b>${datas} sản phẩm</b></p>`
        })
        .catch(error => console.error(error));
}

function top5Sell() {
    apiUrl = "http://localhost:8888/products/topSell"
    fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(datas => {
            var listUser = document.querySelector('#top5Sell');
            var content = datas.map(function(user) {
                return `<tr><td>${user.productId}</td>
                <td>${user.productName}</td>
                <td>
                    ${user.numberSell}
                </td>
                <td>${user.quantity}</td>
                <td>${user.price}</td></tr>`;
            });
            listUser.innerHTML = content.join('');
        })
        .catch(error => console.error(error));
}

function top5Order() {
    apiUrl = "http://localhost:8888/orders/viewNearOrder"
    fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(datas => {
            var listUser = document.querySelector('#top5Order');
            var content = datas.map(function(user) {
                return `<tr><td>${user.orderId}</td>
                <td>${user.customer.name}</td>
                <td>${user.location}</td>
                <td>${user.paymentMethod}</td>
                <td>${user.total_price}</td>
                <td>${user.orderStatus}</td></tr>`;
            });
            listUser.innerHTML = content.join('');
        })
        .catch(error => console.error(error));
}

function topEndProduct() {
    apiUrl = "http://localhost:8888/products/topEndProduct"
    fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(datas => {
            var listUser = document.querySelector('#topEndProduct');
            var content = datas.map(function(user) {
                return `<tr><td>${user.productId}</td>
                <td>${user.productName}</td>
                <td>${user.quantity}</td>
                <td>${user.manufacturer}</td>
                <td>${user.category.categoryName}</td>
                <td>${user.description}</td></tr>`;
            });
            listUser.innerHTML = content.join('');
        })
        .catch(error => console.error(error));
}








//Order 
function getAllOrderByCustomerId() {
    var a = document.querySelector('#search').value;
    var apiUrl = "http://localhost:8888/orders/viewOrderByUser/" + a;
    fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(datas => {
            var listOrder = document.querySelector('#list_order');
            var content = datas.map(function(order) {
                return `<tr>
                <td>${order.orderId}</td>
				<td>${order.customer.name}</td>
                <td>${order.location}</td>
                <td>${order.date}</td>
                <td>${order.paymentMethod}</td>
                <td>${order.total_price}</td>
                <td>${order.orderStatus}</td>
                <td>
                    <button class="btn btn-primary btn-sm edit" type="button" title="Sửa" id="show-emp" data-toggle="modal" data-target="#ModalUP" onclick="getOrderById(${order.orderId})"><i class="fas fa-edit"></i></button>
                </td></tr>`;
            });
            listOrder.innerHTML = content.join('');
        })
        .catch(error => console.error(error));
}


function getAllOrder() {
    var apiUrl = "http://localhost:8888/orders/view";
    fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(datas => {
            var listOrder = document.querySelector('#list_order_all');
            var content = datas.map(function(order) {
                return `<tr>
                <td>${order.orderId}</td>
				<td>${order.customer.name}</td>
                <td>${order.location}</td>
                <td>${order.date}</td>
                <td>${order.paymentMethod}</td>
                <td>${order.total_price}</td>
                <td>${order.orderStatus}</td>
                <td>
                    <button class="btn btn-primary btn-sm edit" type="button" title="Sửa" id="show-emp" data-toggle="modal" data-target="#ModalUP" onclick="getOrderById(${order.orderId})"><i class="fas fa-edit"></i></button>
                </td></tr>`;
            });
            listOrder.innerHTML = content.join('');
        })
        .catch(error => console.error(error));
}


function getOrderById(id) {
    apiUrl = "http://localhost:8888/orders/view/" + id;
    fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            var listOrder123 = document.querySelector('#update_order');
            var content = `
        <div class="form-group col-md-6">
            <label class="control-label"> Mã hóa đơn </label>
            <input class="form-control" name="orderId" type="text" disabled value="${data.orderId}">
        </div>
        <div class="form-group  col-md-6">
            <label class="control-label"> Vị trí giao hàng</label>
            <input class="form-control" name="locations" type="text" required value="${data.location}">
        </div>
        <div class="form-group  col-md-6">
            <label class="control-label"> phương thức thanh toán </label>
            <input class="form-control" name="payment_method" type="text" required value="${data.paymentMethod}">
        </div>`;
            listOrder123.innerHTML = content;
        }).catch(error => console.error(error));
}


function updateOrder() {
    var orderId = parseInt(document.querySelector('input[name="orderId"]').value)
    var locations = document.querySelector('input[name="locations"]').value
    var payment_method = document.querySelector('input[name="payment_method"]').value

    apiUrl = "http://localhost:8888/orders/update/" + orderId + "/" + locations + "/" + payment_method

    fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify()
        })
        .then(function(response) {
            if (response.ok) {
                alert("Order changed successfully!");
                location.reload();
            } else {
                throw new Error('Response not OK');
            }
        })
        .catch(function(error) {
            alert("Error: " + error.message);
        });
}

getAllOrder();










//Customer
function getAllCustomer() {
    fetch('http://localhost:8888/customers/view')
        .then(response => response.json())
        .then(customers => {
            const tableBody = document.querySelector('#customerTable tbody');
            customers.forEach(customer => {
                const row = document.createElement('tr');
                row.innerHTML = `
            <td>${customer.cid}</td>
            <td>${customer.name}</td>
            <td>${customer.username}</td>
            <td>${customer.phone_number}</td>
            <td>${customer.email}</td>
            <td>${customer.password}</td>
            <td>
                <button class="btn btn-primary btn-sm trash" type="button" title="Xóa" onclick="popupDaleteCustomer(${customer.cid})">
                    <i class="fas fa-trash-alt"></i>
                </button>
                    <button class="btn btn-primary btn-sm edit hide" type="button" title="Sửa" id="accept_delete" data-toggle="modal" data-target="#deleteModal">
                <i class="fas fa-trash-alt"></i>
                </button>
                <button class="btn btn-primary btn-sm edit" type="button" title="Sửa" onclick="getCustomerById(${customer.cid})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-primary btn-sm edit hide" type="button" title="Sửa" id="updateCus" data-toggle="modal" data-target="#ModalUP">
                    <i class="fas fa-edit"></i>
                </button>
            </td>
        `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error(error));
}

function createCustomerFinal() {
    var name = document.querySelector('input[name="nameCreate"]').value
    var username = document.querySelector('input[name="usernameCreate"]').value
    var phone_number = document.querySelector('input[name="phone_numberCreate"]').value
    var email = document.querySelector('input[name="emailCreate"]').value
    var password = document.querySelector('input[name="passwordCreate"]').value
    var user = {
        "name": name,
        "username": username,
        "phone_number": phone_number,
        "email": email,
        "password": password
    };
    apiUrl = "http://localhost:8888/customers/add";
    fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(function(response) {
            if (response.ok) {
                alert("Customer added successfully!");
                location.reload();
            } else {
                throw new Error('Response not OK');
            }
        })
        .catch(function(error) {
            alert("Error: " + error.message);
        });
}

function popupDaleteCustomer(cid) {
    document.querySelector('#accept_to_delete').innerHTML = `
    <button class="btn btn-save" type="button" onclick="deleteCustomerById(${cid})" style="margin-left: 150px;">Đồng ý</button>
    <a class="btn btn-cancel" data-dismiss="modal" href="#" style="margin-left: 30px;">Hủy bỏ</a>`
    document.querySelector('#accept_delete').click();

}

function deleteCustomerById(cid) {
    fetch('http://localhost:8888/customers/remove/' + cid, {
            method: 'DELETE'
        })
        .then(function(response) {
            if (response.ok) {
                alert("Customer deleted successfully!");
                location.reload();
            } else {
                throw new Error('Response not OK');
            }
        })
        .catch(function(error) {
            alert("Error: " + error.message);
        });
}

function getCustomerById(cid) {
    apiUrl = "http://localhost:8888/customers/viewCustomer/" + cid;
    fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            var listCustomer = document.querySelector('#update_customer');
            var content = `<div class="form-group col-md-6">
            <label class="control-label"> Mã khách hàng </label>
            <input class="form-control" name="cid" type="text" disabled value="${data.cid}">
        </div>
        <div class="form-group col-md-6">
            <label class="control-label"> Tên khách hàng </label>
            <input class="form-control" name="name" type="text" required value="${data.name}">
        </div>
        <div class="form-group  col-md-6">
            <label class="control-label"> Tài khoản </label>
            <input class="form-control" name="username" type="text" required value="${data.username}">
        </div>
        <div class="form-group col-md-6">
            <label class="control-label"> Email </label>
            <input class="form-control" name="email" type="email" required value="${data.email}">
        </div>
        <div class="form-group col-md-6">
            <label class="control-label"> Số điện thoại </label>
            <input class="form-control" name="phone_number" type="text" required value="${data.phone_number}">
        </div>`;
            listCustomer.innerHTML = content;
            document.querySelector('#updateCus').click();
        })
        .catch(error => console.error(error));
}

function updateCustomer() {
    var cid = parseInt(document.querySelector('input[name="cid"]').value)
    var name = document.querySelector('input[name="name"]').value
    var username = document.querySelector('input[name="username"]').value
    var email = document.querySelector('input[name="email"]').value
    var phone_number = document.querySelector('input[name="phone_number"]').value
    var customer = {
        "cid": cid,
        "name": name,
        "username": username,
        "email": email,
        "phone_number": phone_number
    };
    console.log(customer);
    apiUrl = "http://localhost:8888/customers/update/" + cid;
    fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(function(response) {
            if (response.ok) {
                alert("Customer changed successfully!");
                location.reload();
            } else {
                throw new Error('Response not OK');
            }
        })
        .catch(function(error) {
            alert("Error: " + error.message);
        });
}






//FireBase
function getUrl(imgName) {
    var firebaseConfig = {
        apiKey: "AIzaSyDow9PLyg6kLQbKFTFqZ4duBdDQfXnJ23k",
        authDomain: "techecommerceserver.firebaseapp.com",
        storageBucket: "techecommerceserver.appspot.com",
    };
    firebase.initializeApp(firebaseConfig);

    var storageRef = firebase.storage().ref();
    imgtag = document.querySelector(imgName)
    storageRef
        .child("products_img")
        .listAll()
        .then(function(imgs) {
            var content = imgs.items.map(function(img) {
                var urls = img.location.path_
                console.log(urls)
                storageRef
                    .child(urls)
                    .getDownloadURL()
                    .then(function(url) {
                        htmlTemplate = `<option value="${url}"> ${img.name.split('.')[0]} </option>`;
                        imgtag.innerHTML += htmlTemplate;
                    });
            });
        })
        .catch(function(error) {
            console.error(error);
        });
}