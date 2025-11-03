const templateSelect = document.getElementById("templateSelect");
const captionInput = document.getElementById("captionInput");
const previewImage = document.getElementById("previewImage");
const memeList = document.getElementById("memeList");
const memeTemplate = document.getElementById("memeCard");
const captionError = document.getElementById("errorCaption");
const errors = {
    caption : document.getElementById("errorCaption")
};

let memes = [];

templateSelect.addEventListener("change", () => {
    previewImage.src = templateSelect.value;
});

function addMeme() {
    let captionText = captionInput.value;
    if(captionText.trim() === "") {
        showError("caption");
        return;
    } 

    removeError();
    memes.push({ img: templateSelect.value, caption: captionText });
    renderMemes();
    captionInput.value = "";
}

function showError(field) {
    const messages = {
        caption : "Enter a valid caption"
    }
    errors[field].textContent = messages[field];
}

function removeError() {
    for (let key in errors) {
        errors[key].textContent = '';
    }
}

function renderMemes() {
    memeList.innerHTML = "";
    memes.forEach((m, i) => {
        let node = memeTemplate.content.cloneNode(true);
        node.querySelector(".meme-img").src = m.img;
        node.querySelector(".meme-caption").textContent = m.caption;
        node.querySelector(".editBtn").onclick = () => editMeme(i);
        node.querySelector(".deleteBtn").onclick = () => deleteMeme(i);
        memeList.appendChild(node);
    });
}

function editMeme(i) {
    let txt = prompt("Edit caption:", memes[i].caption);
    if (txt !== null) memes[i].caption = txt;
    renderMemes();
}

function deleteMeme(i) {
    memes.splice(i, 1);
    renderMemes();
}
