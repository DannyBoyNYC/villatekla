// animation
const animate = (imgArr) => {
  if (!imgArr) return;
  const arrLen = imgArr.length;
  let activeImgIndex = 0;
  setInterval(function () {
    var activeImg = document.querySelector('header img.active');
    if (imgArr.indexOf(activeImg) === arrLen - 1) {
      activeImgIndex = 0;
    } else {
      activeImgIndex++;
    }
    activeImg.classList.remove('active');
    imgArr[activeImgIndex].classList.add('active');
  }, 3000);
};

const header = document.querySelector('header');
const images = Array.from(header.querySelectorAll('img'));

animate(images);
