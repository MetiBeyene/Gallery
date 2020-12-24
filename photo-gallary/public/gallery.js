const images = document.getElementById("images");
const imageHolder = document.createElement("div");
const url = "/json";
const getImages = async () => {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    data.forEach((pic) => {
        const photo = document.createElement("img");
        photo.src = pic.imageFile;
        images.appendChild(photo);
        console.log(photo.src);
    });
};
getImages();