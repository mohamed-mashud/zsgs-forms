const templateSelect = document.getElementById("templateSelect");
const captionInput = document.getElementById("captionInput");
const previewImage = document.getElementById("previewImage");
const memeList = document.getElementById("memeList");
const memeTemplate = document.getElementById("memeCard");

let memes = [];

templateSelect.addEventListener("change", () => {
    previewImage.src = templateSelect.value;
});

function addMeme() {
    memes.push({ img: templateSelect.value, caption: captionInput.value });
    renderMemes();
    captionInput.value = "";
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
