"use strict"

let tags = [];
let tagId = 0;

const getId = () => {
    const id = Math.floor(Math.random() * 1000);
    const found = tags.find(i => i.id === id);
    if (found) {
        getId();
    } else {
        return id;
    }
};
const remove = (e, id) => {

    const index = tags.findIndex(i => i.id === id);
    const result = confirm(`Are you sure you want to remove "${tags[index].name}" tag?`);
    if (result) {
        // remove element
        $(e).parents('tr').remove();

        // remove array item
        tags.splice(index, 1);
        toggleEmpty();
    }
};
const edit = (e, id) => {
    $('#group-add').hide();
    $('#group-update').show();

    // console.log('Edit', $(e).parents('tr').find('td:nth-child(2)'));
    // console.log('Edit', $(e).parents('tr').find('td').eq(1));

    const name = $(e).parents('tr').find('td:first-child').text();
    $('#tag').val(name);
    tagId = id;
}
const clear = () => {
    $('#group-add').show();
    $('#group-update').hide();
    $('#tag').val('')
    tagId = 0;
}
const toggleEmpty = () => {
    if (tags.length) {
        $('#empty').hide();
        $('#removeAll').show();
    } else {
        $('#empty').show();
        $('#removeAll').hide();
    }
}

$(function () {
})

$('#add').click(function () {
    const tag = $('#tag').val();

    if (!tag) {
        alert('Please enter tag');
        return;
    }

    const newTag = {
        id: getId(),
        name: tag
    };
    tags.push(newTag)

    $('table tbody').append(`
        <tr data-id="${newTag.id}">
            <td>${newTag.name}</td>
            <td class="text-center">
                <button type="button" class="btn btn-warning btn-sm mr-2" onclick="edit(this, ${newTag.id})">Edit</a>
                <button type="button" class="btn btn-danger btn-sm" onclick="remove(this, ${newTag.id})">Delete</a>
            </td>
        </tr>
    `);

    $('#tag').val('')
    toggleEmpty();

    // ajax
})
$('#tag').keyup(function (e) {
    if (e.key === 'Enter') {
        if (tagId === 0) {
            $('#add').click();
        } else {
            $('#update').click();
        }
    }
})
$('#update').click(function () {
    const name = $('#tag').val();

    if (!name) {
        alert('Please enter tag');
        return;
    }

    const index = tags.findIndex(i => i.id === tagId);
    tags[index].name = name;

    $(`[data-id=${tagId}]`).find('td:first-child').text(name);

    clear();
})
$('#cancel').click(clear)
$('#removeAll').click(function () {
    const result = confirm('Are you sure you want to remove all tags?');
    if (result) {
        tags = [];
        $('table tbody tr').not(`[id=empty]`).remove();
        $('#empty').show();
    }
})
$('#showModal').click(function () {
    $('#myModal').modal('show');
})