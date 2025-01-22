let editingRow = null;
// Real-time Validation Events
document.getElementById('NAME').addEventListener('input', validateName);
document.getElementById('AGE').addEventListener('input', validateAge);
document.getElementById('EMAIL').addEventListener('input', validateEmail);
document.getElementById('PROVINCE').addEventListener('input', validateProvince);

function enableSubmitButton() {
    if (isFormValid()) {
        document.getElementById('btnAdd').disabled = false;
        document.getElementById('btnUpdate').disabled = false;
    }
}

// Validate Name
function validateName() {
    let name = document.getElementById('NAME').value.trim();
    const nameRegex = /^[A-Za-z\s]+$/;
    const name2=" ";
    if (!name.match(nameRegex)) {
        document.getElementById('errorName').innerText = 'Name like letter no have symbol or number har bro !😁.';
        disableSubmitButton();
    } else if(name2==" "){
        document.getElementById('errorName').innerText = ' ';
        disableSubmitButton();
    }
    else {
        document.getElementById('errorName').innerText = '';
        enableSubmitButton();
    }
}

// Validate Age
function validateAge() {
    let age = document.getElementById('AGE').value;
    if (age <= 0 || isNaN(age)) {
        document.getElementById('errorAge').innerText = 'Age must be greater than 0 har bro !😵‍💫 ';
        disableSubmitButton();
    }
    else if (age<=0 || age>=100){
        document.getElementById('errorAge').innerText = 'Age must be between 1 and 100 har bro !😵‍💫   ';
       disableSubmitButton();

    }
    else {
        document.getElementById('errorAge').innerText = '';
        enableSubmitButton();
    }
}

// Validate Email
function validateEmail() {
    //  email not like symbol
    let email = document.getElementById('EMAIL').value.trim();
    const symbolRegex = /[!#$%^&*(),?":{}|<>]/g;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!email.match(emailRegex) || !email.includes('@gmail.com')) {
        document.getElementById('errorEmail').innerText = 'Email must end with @gmail.com har🥱 ';
        disableSubmitButton();
    }
    else if (symbolRegex.test(email)) { //symbol 
        document.getElementById('errorEmail').innerText = 'Email should not contain symbols har bro!';
        disableSubmitButton();
    }
    else if (!email.endsWith('@gmail.com')) {
        alert('Email must end with @email.com');
        return;
    }
    else {
        document.getElementById('errorEmail').innerText = '';
        enableSubmitButton();
    }

}

// Validate Province
function validateProvince() {
    let province = document.getElementById('PROVINCE').value.trim();
    const symbolRegex = /[!#$%^&*(),?":{}|<>/;.+-=]/g;
    // const number=/[0-9]/g;
    if (province === "") {
        document.getElementById('errorProvince').innerText = 'Enter information for Province bro🙄.';
        disableSubmitButton();
    } else if (symbolRegex.test(province)) {
        document.getElementById('errorProvince').innerText = 'Province should not contain symbols har bro!';
        disableSubmitButton();
        return;
    }
     else {
        document.getElementById('errorProvince').innerText = '';
        enableSubmitButton();
    }
}

// Disable Submit Button if any field is invalid
function disableSubmitButton() {
    document.getElementById('btnAdd').disabled = true;
    document.getElementById('btnUpdate').disabled = true;
}


function isFormValid() {
    return !document.querySelector('.error-message').innerText;
}
// Check if the form is valid

// Add new student data to the table
const btnadd = document.getElementById('btnAdd');
btnadd.addEventListener('click', function () {
    if (isFormValid()) {
        let name = document.getElementById('NAME').value.trim();
        let gender = document.getElementById('GENDER').value;
        let age = document.getElementById('AGE').value;
        let email = document.getElementById('EMAIL').value.trim();
        let province = document.getElementById('PROVINCE').value.trim();

        //have information all
        if (name && gender && age && email && province) {
            document.getElementById("NAME").style.border = "1px solid #ced4da";
            document.getElementById("AGE").style.border = "1px solid #ced4da";
            document.getElementById("GENDER").style.border = "1px solid #ced4da";
            document.getElementById("EMAIL").style.border = "1px solid #ced4da";
            document.getElementById("PROVINCE").style.border = "1px solid #ced4da";

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Insert data success😘",
                showConfirmButton: false,
                timer: 1500
            });

        }

        //chick Duplicate EMAIL
        let table = document.getElementById('studentTableBody');
        let rows = table.getElementsByTagName('tr');
        for (let i = 0; i < rows.length; i++) {
            if (rows[i].cells[4].textContent === email) {
                // alert('Name already exists in the table');
                Swal.fire({
                    position: "top-end",
                    icon: "warning",
                    title: "Email already exists in the table😭",
                    showConfirmButton: false,
                    timer: 1500
                });
                return;
            }
        }

        // Invalidate form inputs
        if (!name || !gender || !age || !email || !province) {
            // Create style when click not have information
            if (!name) {
                document.getElementById("NAME").style.border = "1px solid red";
                document.getElementById("errorName").innerText = "Enter name har bro forget tv na kmeang touch !😁.";
            }
            if (!age) { document.getElementById('AGE').style.border = "1px solid red"; document.getElementById('errorAge').innerText = "Enter Age har bro !😵‍💫 "; }
            if (!gender) { document.getElementById('GENDER').style.border = "1px solid red"; document.getElementById('errorGender').innerHTML = "Enter Gender pro !😵‍💫" }
            if (!email) { document.getElementById('EMAIL').style.border = "1px solid red"; document.getElementById('errorEmail').innerHTML = "Enter email pg har p'yat forget bro🥱 " }
            if (!province) { document.getElementById('PROVINCE').style.border = "1px solid red"; document.getElementById('errorProvince').innerHTML = "Enter Province har bro forget tv na kmeang touch !🙄 " }

            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "not have information😎",
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }



        let tableBody = document.getElementById('studentTableBody');
        let rowCount = tableBody.rows.length + 1;

        let newRow = tableBody.insertRow();
        newRow.innerHTML = `
            <tr>
                <td>${rowCount}</td>
                <td>${name}</td>
                <td>${gender}</td>
                <td>${age}</td>
                <td>${email}</td>
                <td>${province}</td>
                <td>
                    <button class="btn btn-primary btn-sm" onclick="editRow(this)">Edit😎</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteRow(this)">Delete❌</button>
                </td>
            </tr>
        `;

        clearForm();
    }
});

// Function to Clear form inputs
function clearForm() {
    document.getElementById('NAME').value = '';
    document.getElementById('AGE').value = '';
    document.getElementById('EMAIL').value = '';
    document.getElementById('PROVINCE').value = '';
    disableSubmitButton();  // Disable buttons after clearing the form hay bro !
}

// Edit row data
function editRow(button) {
    editingRow = button.closest('tr');
    let cells = editingRow.cells;
    document.getElementById('NAME').value = cells[1].textContent;
    document.getElementById('GENDER').value = cells[2].textContent;
    document.getElementById('AGE').value = cells[3].textContent;
    document.getElementById('EMAIL').value = cells[4].textContent;
    document.getElementById('PROVINCE').value = cells[5].textContent;

    document.getElementById('btnAdd').style.display = 'none';
    document.getElementById('btnUpdate').style.display = 'inline-block';
    document.getElementById('btnUpdate').style.border = 'none';
}

// Update row data
const btnUpdate = document.getElementById('btnUpdate');
btnUpdate.addEventListener('click', function () {
    if (isFormValid()) {
        let name = document.getElementById('NAME').value.trim();
        let gender = document.getElementById('GENDER').value;
        let age = document.getElementById('AGE').value;
        let email = document.getElementById('EMAIL').value.trim();
        let province = document.getElementById('PROVINCE').value.trim();

        editingRow.cells[1].textContent = name;
        editingRow.cells[2].textContent = gender;
        editingRow.cells[3].textContent = age;
        editingRow.cells[4].textContent = email;
        editingRow.cells[5].textContent = province;

        //update success
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Update data success🥹",
            showConfirmButton: false,
            timer: 1500
        });

        clearForm();  //function clear form

        document.getElementById('btnAdd').style.display = 'inline-block';
        document.getElementById('btnUpdate').style.display = 'none';
        // document.getElementById('btnCancel').style.display = 'inline-block';
    }
});

// Delete row
// function deleteRow(button) {
//// Delete row
function deleteRow(button) {
    // Create a confirmation prompt

    let confirmDelete = confirm("Are you sure you want to delete this data?");

    // If the user confirms, delete the row
    if (confirmDelete) {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Delete data success",
            showConfirmButton: false,
            timer: 1500
        });

        clearForm();//

        button.closest('tr').remove();
        document.getElementById('btnAdd').style.display = 'inline-block';
        document.getElementById('btnUpdate').style.display = 'none';
    }
}

// button.closest('tr').remove();

// }