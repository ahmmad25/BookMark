var nameInput = document.getElementById("name")
var urlInput = document.getElementById("url")
var addBtn = document.getElementById("addBtn")

var tableBody = document.getElementById("tableBody")

var bookMarks;
if (localStorage.getItem("bookMarks") == null) {
  bookMarks = [];
} else {
  bookMarks = JSON.parse(localStorage.getItem("bookMarks"));
}


var nameRegex = /^[A-Za-z_]{1,}$/
function isNameValid(){
  if (nameRegex.test(nameInput.value)){
    return true;
  }
  else {
    return false
  }
}
var urlRegex = /^(https:\/\/)?(www\.)?[A-za-z0-9_\.]{1,}\.[a-z]{3}$/
function isUrlValid(){
  if(urlRegex.test(urlInput.value)){
    return true;
  }else{
    return false;
  }
}

nameInput.onkeyup=function(){
  if(isUrlValid() && isNameValid()){
    addBtn.removeAttribute("disabled")
  }else{
    addBtn.disbled = "true"
  }
}



urlInput.onkeyup = function () {
  if (isUrlValid() && isNameValid()) {
    addBtn.removeAttribute("disabled")
  } else {
    addBtn.disbled = "true"
  }
}





addBtn.onclick = function () {
  var bookMark = {
    name: nameInput.value,
    URL: urlInput.value,

  }
  bookMarks.push(bookMark);
  localStorage.setItem("bookMarks", JSON.stringify(bookMarks));
  displayBook()
}


function displayBook() {
  var marks = ``;
  for (var i = 0; i < bookMarks.length; i++) {
    marks += `
    <tr>
    <th scope="row">${[i]}</th>
    <td>  ${bookMarks[i].name}</td>
    <td><a href="${bookMarks[i].URL}"><button class="btn btn-success"><i class="fa-solid fa-eye"></i> Visit</button></a></td>
    <td><button onclick="deleteBook(${i})" class="btn btn-danger"><i class="fa-solid fa-trash text-white"></i> Delete</button></td>
    </tr>
    `
  }
  tableBody.innerHTML = marks;
}

function deleteBook(index){
  localStorage.setItem("bookMarks", JSON.stringify(bookMarks)); 
  bookMarks.splice(index,1)
  displayBook()
}

