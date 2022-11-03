window.onload = function () {
    document.getElementById('form-edit').style.display = 'none';
    var data = document.getElementById('data');

    if (data.rows.length == 0) {
        document.getElementById('data-head').style.display = 'none';
        document.getElementById('data').innerHTML = '<tr id="data-kosong"><td colspan="5" class="text-center">Data Kosong</td></tr>';
    }
}

function hide() {
    document.querySelector('.card').style.display = 'none';
}

function searchId(id) {
    var data = document.getElementById('data');
    for (var i = 0; i < data.rows.length; i++) {
        if (data.rows[i].id == id) {
            return i;
        }
    }
}

function updateNo() {
    var data = document.getElementById('data');
    for (var i = 0; i < data.rows.length; i++) {
        data.rows[i].cells[0].innerHTML = i + 1;
    }
}

function resetForm() {
    document.getElementById('nama').value = '';
    document.getElementById('nim').value = '';
    document.getElementById('prodi').value = 'Teknik Informatika';

    document.getElementById('editnama').value = '';
    document.getElementById('editnim').value = '';
    document.getElementById('editprodi').value = 'Teknik Informatika';
}

function addData() {
    if (document.getElementById('nama').value == '' || document.getElementById('nim').value == '') {
        alert('Nama dan NIM tidak boleh kosong');
        return false;
    }

    if (document.getElementById('data-kosong')) {
        document.getElementById('data-head').style.display = 'table-row-group';
        document.getElementById('data-kosong').remove();
    }

    var nama = document.getElementById('nama').value;
    var nim = document.getElementById('nim').value;
    var prodi = document.getElementById('prodi').value;
    var data = document.getElementById('data');
    var no = data.rows.length + 1;
    var row = data.insertRow(data.rows.length);
    row.id = nim;
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    cell1.innerHTML = no;
    cell2.innerHTML = nama;
    cell3.innerHTML = nim;
    cell4.innerHTML = prodi;
    cell5.innerHTML = '<div class="btn-group"><button type="button" class="btn btn-primary" onclick="editData(' + nim + ');">Edit</button><button type="button" class="btn btn-danger" onclick="removeData(' + nim + ');">Hapus</button></div>';
    resetForm();
}

function removeData(no) {
    var idx = searchId(no);
    var data = document.getElementById('data');
    data.deleteRow(idx);

    if (data.rows.length == 0) {
        document.getElementById('data-head').style.display = 'none';
        document.getElementById('data').innerHTML = '<tr id="data-kosong"><td colspan="5" class="text-center">Data Kosong</td></tr>';
    } else {
        updateNo();
    }
}

function editData(no) {
    var idx = searchId(no);
    console.log(idx);
    console.log(no);
    var data = document.getElementById('data');
    var nama = data.rows[idx].cells[1].innerHTML;
    var nim = data.rows[idx].cells[2].innerHTML;
    var prodi = data.rows[idx].cells[3].innerHTML;

    document.getElementById('no').value = no;
    document.getElementById('editnama').value = nama;
    document.getElementById('editnim').value = nim;
    document.getElementById('editprodi').value = prodi;
    document.getElementById('form-edit').style.display = 'block';
    document.getElementById('form-add').style.display = 'none';
}

function editDataSubmit() {
    var no = document.getElementById('no').value;
    var nama = document.getElementById('editnama').value;
    var nim = document.getElementById('editnim').value;
    var prodi = document.getElementById('editprodi').value;
    var data = document.getElementById('data');
    var idx = searchId(no);

    data.rows[idx].cells[1].innerHTML = nama;
    data.rows[idx].cells[2].innerHTML = nim;
    data.rows[idx].cells[3].innerHTML = prodi;
    data.rows[idx].cells[4].innerHTML = '<div class="btn-group"><button type="button" class="btn btn-primary" onclick="editData(' + nim + ');">Edit</button><button type="button" class="btn btn-danger" onclick="removeData(' + nim + ');">Hapus</button></div>';
    data.rows[idx].id = nim;

    updateNo();
    document.getElementById('form-edit').style.display = 'none';
    document.getElementById('form-add').style.display = 'block';
}