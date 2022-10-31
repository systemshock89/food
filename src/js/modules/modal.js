function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    // modal.classList.toggle('show');
    document.body.style.overflow = 'hidden'; // убираем прокрутку страницы про открытом попапе

    console.log(modalTimerId);
    if(modalTimerId){
        clearInterval(modalTimerId); // если пользователь сам открыл попап, то уже не показываем ему попап снова через 5 сек
    }
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    // modal.classList.toggle('show');
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    // Modal
    const modalTrigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);

    modalTrigger.forEach(btn => {
        
        // btn.addEventListener('click', openModal);
        /* Нам нужно передать в ф-ю  openModal значение modalSelector
        Но если мы в колбэке напишем openModal(modalSelector)
        то нарушим то, что ф-я openModal не должна сразу вызываться
        она должна передаться и вызваться только после события click.
        Чтобы работало правильно, нужно создать стрелочную ф-ю, кот-я оборачивает нашу ф-ю
        и она уже будет запускаться после клика
        */

        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });

    // при клике на подложку, либо при клике на крестик закрываем окно
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    // закрываем окно при нажатии на клавишу Escape
    document.addEventListener('keydown', (e) => { // keyDown - срабатывает когда нажимается кнопка
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });


    function showModalByScroll() {
        // pageYOffset - сколько px отлистал пользователь по оси Y
        // document.documentElement.clientHeight - видимая часть, кот-ю видим на данный момент на сайте без прокрутки
        // document.documentElement.scrollHeight - высота с учетом прокрутки
        // в конце добавим -1px, тк на некоторых мониторах и браузерах без этого не срабатывает
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal(modalSelector, modalTimerId);

            // как только один раз пользователь долистал до конца и ему показался попап, обработчик удаляется, чтоб больше попап не показывался
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    // когда пользователь долистает до самого конца страницы - показать попап
    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {closeModal}; // эти две ф-и требуются в модуле forms.js
export {openModal};