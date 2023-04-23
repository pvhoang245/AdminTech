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

function popupDaleteProduct(id) {
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
            // nếu thành công, hiển thị thông báo và làm mới trang
            if (response.ok) {
                alert("Product deleted successfully!");
                location.reload();
            } else {
                // nếu có lỗi, hiển thị thông báo lỗi
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
        <div class="form-group col-md-6">
            <label class="control-label"> Ảnh </label>
            <input class="form-control" type="text" name="image" value="${data.image}">
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
    var image = document.querySelector('input[name="image"]').value
    var categoryId = parseInt(document.querySelector('#category').value)
        // tạo đối tượng user từ dữ liệu form
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
    // gửi yêu cầu POST đến API
    fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(function(response) {
            // nếu thành công, hiển thị thông báo và làm mới trang
            if (response.ok) {
                alert("Product changed successfully!");
                location.reload();
            } else {
                // nếu có lỗi, hiển thị thông báo lỗi
                throw new Error('Response not OK');
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
    var image = document.querySelector('input[name="imageCreate"]').value
    var categoryId = parseInt(document.querySelector('#categoryCreate').value)
        // tạo đối tượng user từ dữ liệu form
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
    // gửi yêu cầu POST đến API
    fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(function(response) {
            // nếu thành công, hiển thị thông báo và làm mới trang
            if (response.ok) {
                alert("Product added successfully!");
                location.reload();
            } else {
                // nếu có lỗi, hiển thị thông báo lỗi
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
    document.querySelector('#add_product').click();
}

function searchProduct() {
    var chuoi = document.querySelector('#searchPro').value;
    var user = {
        "content": chuoi
    };
    fetch("http://localhost:8888/products/search", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
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
        // tạo đối tượng user từ dữ liệu form
    var user = {
        "categoryId": categoryId,
        "categoryName": categoryName
    };
    apiUrl = "http://localhost:8888/category/update/" + categoryId;
    // gửi yêu cầu POST đến API
    fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(function(response) {
            // nếu thành công, hiển thị thông báo và làm mới trang
            if (response.ok) {
                alert("Category changed successfully!");
                location.reload();
            } else {
                // nếu có lỗi, hiển thị thông báo lỗi
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
            // nếu thành công, hiển thị thông báo và làm mới trang
            if (response.ok) {
                alert("Category deleted successfully!");
                location.reload();
            } else {
                // nếu có lỗi, hiển thị thông báo lỗi
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
        // tạo đối tượng user từ dữ liệu form
    var user = {
        "categoryId": categoryId,
        "categoryName": categoryName
    };
    apiUrl = "http://localhost:8888/category/add";
    // gửi yêu cầu POST đến API
    fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(function(response) {
            // nếu thành công, hiển thị thông báo và làm mới trang
            if (response.ok) {
                alert("Category added successfully!");
                location.reload();
            } else {
                // nếu có lỗi, hiển thị thông báo lỗi
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