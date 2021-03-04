function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper , field}) {
    // Slider

    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width; // ekrandagi enini olish

    let slideIndex = 1;
    let offset = 0; // o'ng yoki chapga nechchi px yurganimizni bilish uchun offset

    if (slides.length < 10) { // nechta slide borligini kursatib turuvchi joyiga yozish! 10tadan kam busa 0 qushadi
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length; // 10 tadan kup busa nol keremas!
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%'; // 400% buldi 4 ta slide tuliq bulib turish u-n
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden'; // boshqa slide larni yopib turamiz

    slides.forEach(slide => { // hamma slide ulchamini bir xil qilish
        slide.style.width = width;
    });

    //  slider navigatsiya

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 15;
      display: flex;
      justify-content: center;
      margin-right: 15%;
      margin-left: 15%;
      list-style: none;
  `;
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
          box-sizing: content-box;
          flex: 0 1 auto;
          width: 30px;
          height: 6px;
          margin-right: 3px;
          margin-left: 3px;
          cursor: pointer;
          background-color: #fff;
          background-clip: padding-box;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
          opacity: .5;
          transition: opacity .6s ease;
      `;
        if (i == 0) { // birinchi element active bulib turishi uchun
            dot.style.opacity = 1;
        }

        indicators.append(dot);
        dots.push(dot);

    }

    // slider navigatsiya tugadi

    function deleteNotDigits(str) { // bu func 500px da harflani uchirish un kk
        return +str.replace(/\D/g, "");
    }

    next.addEventListener('click', () => {

        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`; // x uqi buyicha o'nga yurish

        if (slideIndex == slides.length) { // slide oxiriga kelgan busa birinchi slidega qaytsin
            slideIndex = 1;
        } else {
            slideIndex++; // slide oxiriga kelmagan bulsa bittaga kupayib ketvursin
        }

        if (slides.length < 10) { // next bosilganda nomerxam nextga qushilib o'zgaradi currentniki! total uzgarmaydi
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '.5'); // slider navigatsiya click qilganda uzgarishi
        dots[slideIndex - 1].style.opacity = 1;
    });

    prev.addEventListener('click', () => {

        if (offset == 0) { // offset = 0 1-chi slide
            offset = deleteNotDigits(width) * (slides.length - 1); // bu kod oxirgi slide
        } else {
            offset -= deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) { // orqani bosganda 1-chi elementda bolsa oxirgi elementga utishi k-k
            slideIndex = slides.length;
        } else {
            slideIndex--; // agar birinchi elementda bo'lmasa orqaga kamayib ketuvrish kerak
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '.5'); // slider navigatsiya click qilganda uzgarishi
        dots[slideIndex - 1].style.opacity = 1;
    });

    dots.forEach(dot => { // navigatsiya click b-n ishlatish!
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }

            dots.forEach(dot => dot.style.opacity = '.5');
            dots[slideIndex - 1].style.opacity = 1;

        });
    });
}

export default slider;