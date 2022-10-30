function slider() {
    // Slider variant 2
    const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width;
    let slideIndex = 1;
    let offset = 0; // отступ, чтобы знать, на сколько отступили вправо/влево

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%'; // ширина = кол-во слайдов * 100%, чтобы все слайды поместились в этом блоке
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width; // чтобы все слайды были одинаковой ширины
    });

    // dots
    slider.style.position = 'relative';
    const indicators = document.createElement('ol'),
        dots = [];
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        indicators.append(dot);

        // активный эл-т
        if (i == 0) {
            dot.style.opacity = 1;
        }

        dots.push(dot); // получим массив 
    }
    // /dots

    // регулярка: все Не числа в строке заменить на 'пусто', получив число
    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    next.addEventListener('click', () => {
        // если долистали до самого конца, то возвратимся в начало
        if (offset == deleteNotDigits(width) * (slides.length - 1)) { // width превратим в число и отрежем px
            offset = 0;
        } else { // если слайд не последний, то смещаем на ширину одного слайда
            offset += deleteNotDigits(width);
            // offset += +width.slice(0, width.length - 2);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        setCurrent(slides);

        setActiveDot(dots);
    });

    prev.addEventListener('click', () => {
        // если долистали до самого начала, то возвратимся в конец слайдера
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else { // если слайд не первый, то смещаем на ширину одного слайда
            offset -= deleteNotDigits(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        setCurrent(slides);

        setActiveDot(dots);
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            slideIndex = slideTo;

            offset = deleteNotDigits(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;

            setCurrent(slides);

            setActiveDot(dots);

        });
    });

    function setCurrent(slides) {
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    function setActiveDot(dots) {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = '1';
    }
    // Slider variant 2


    // Slider variant 1
    // const slides = document.querySelectorAll('.offer__slide'),
    //       prev = document.querySelector('.offer__slider-prev'),
    //       next = document.querySelector('.offer__slider-next'),
    //       total = document.querySelector('#total'),
    //       current = document.querySelector('#current');
    // let slideIndex = 1;

    // showSlides(slideIndex); // инициализируем слайдер, передав туда начальное знач-е slideIndex

    // if(slides.length < 10) {
    //     total.textContent = `0${slides.length}`;
    // } else {
    //     total.textContent = slides.length;
    // }

    // function showSlides(n){ // n - slideIndex

    //     // если ушли в правую границу слайдера, то перемещаемся в начало
    //     if(n > slides.length){
    //         slideIndex = 1;
    //     }

    //     // если ушли в левую границу, то перемещаемся в конец слайдера
    //     if(n < 1){
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach(item => item.style.display = 'none');       
    //     slides[slideIndex - 1].style.display = 'block';

    //     if(slides.length < 10) {
    //         current.textContent = `0${slideIndex}`;
    //     } else {
    //         current.textContent = slideIndex;
    //     }        
    // }

    // function plusSlides(n){
    //     showSlides( slideIndex += n); // slideIndex увеличен на значение n, либо уменьшен
    // }

    // prev.addEventListener('click', () => {
    //     plusSlides(-1);
    // });

    // next.addEventListener('click', () => {
    //     plusSlides(+1);
    // });
    // /Slider variant 1
}

module.exports = slider;