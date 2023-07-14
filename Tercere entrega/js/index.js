document.addEventListener("DOMContentLoaded", function (event) {
    let sliderInner = document.querySelector(".slider--inner");
    let images = sliderInner.querySelectorAll("img");
    let index = 0;

    setInterval(function () {

        let perc = index * -70;

        sliderInner.style.transform = "translateX(" + perc + "%)";
        index++;

        if (index >= images.length) {
            index = 0;
        }
    }, 6000);
});