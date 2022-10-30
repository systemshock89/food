function modal() {
    // Modal
    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        // modal.classList.toggle('show');
        document.body.style.overflow = 'hidden'; // убираем прокрутку страницы про открытом попапе
        clearInterval(modalTimerId); // если пользователь сам открыл попап, то уже не показываем ему попап снова через 5 сек
    }

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        // modal.classList.toggle('show');
        document.body.style.overflow = '';
    }

    // при клике на подложку, либо при клике на крестик закрываем окно
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    // закрываем окно при нажатии на клавишу Escape
    document.addEventListener('keydown', (e) => { // keyDown - срабатывает когда нажимается кнопка
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // показывать попап через 50 сек после открытия страницы
    const modalTimerId = setTimeout(openModal, 50000);

    function showModalByScroll() {
        // pageYOffset - сколько px отлистал пользователь по оси Y
        // document.documentElement.clientHeight - видимая часть, кот-ю видим на данный момент на сайте без прокрутки
        // document.documentElement.scrollHeight - высота с учетом прокрутки
        // в конце добавим -1px, тк на некоторых мониторах и браузерах без этого не срабатывает
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal();

            // как только один раз пользователь долистал до конца и ему показался попап, обработчик удаляется, чтоб больше попап не показывался
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    // когда пользователь долистает до самого конца страницы - показать попап
    window.addEventListener('scroll', showModalByScroll);
}

module.exports = modal;