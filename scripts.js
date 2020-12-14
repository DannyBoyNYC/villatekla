// animation
const animate = (imgArr) => {
  const arrLen = imgArr.length;
  let activeImgIndex = 0;

  setInterval(function () {
    var activeImg = document.querySelector("header img.active");
    // console.log(" indexOf(activeImg) ", imgArr.indexOf(activeImg));
    if (imgArr.indexOf(activeImg) === arrLen - 1) {
      console.log(" 1 ", imgArr.indexOf(activeImg), arrLen - 1);
      activeImgIndex = 0;
    } else {
      console.log(" 2 ", activeImgIndex);
      activeImgIndex++;
      activeImg.classList.remove("active");
      imgArr[activeImgIndex].classList.add("active");
    }
  }, 5000);
};

const header = document.querySelector("header");
const images = Array.from(header.querySelectorAll("img"));

animate(images);
