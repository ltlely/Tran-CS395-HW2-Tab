document.addEventListener('DOMContentLoaded', () => {
    var imgUrl = 'https://source.unsplash.com/random/1920x1080/?pastel';
    document.getElementById('wallpaperImage').src = imgUrl;
});

document.addEventListener('DOMContentLoaded', () => {
    let editableName = document.getElementById("name");

    editableName.addEventListener("click", () => {
        let range = document.createRange();
        let sel = window.getSelection();
        range.selectNodeContents(editableName);
        sel.removeAllRanges();
        sel.addRange(range);
    });

    let isFirstClick = true;
    editableName.addEventListener("click", () => {
        if (isFirstClick) {
            editableName.textContent = '';
            isFirstClick = false;
        }
    });
});


