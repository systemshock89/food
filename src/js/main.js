"use strict";

window.addEventListener('DOMContentLoaded', () => {

    // Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent(){
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
            // item.style.display = 'none';
        });

        tabs.forEach(item =>{
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0){
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        // tabsContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if(target && target.classList.contains('tabheader__item')){
            tabs.forEach((item, i) => {
                if(target == item){
                    hideTabContent();
                    showTabContent(i);
                }

            });

        }

    });
    // /Tabs

    // Timer
    const deadline = '2023-05-11';

    function getTimeRemaining(endtime){
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date());

        if(t <= 0){
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;

        } else {
   // Math.floor округление до ближайшего целого
            // (1000 * 60 * 60 * 24) сколько в сутках миллисекунд
            days = Math.floor(t / (1000 * 60 * 60 * 24));

            // 1000 * 60 * 60 делим на кол-во миллисекунд в одном часе
            // чтобы не получить 100 часов, нужно исп-ть %
            // % делит на 24 и возвращает остаток от деления
            hours = Math.floor((t / (1000 * 60 * 60)) % 24);
            minutes = Math.floor((t / 1000 / 60) % 60);
            seconds = Math.floor((t / 1000 ) % 60);
        }

            return {
                'total': t,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds

            };
    }

    // подсталяем 0 к цифрам, если они < 10, чтобы было напр 01
    function getZero(num){
        if(num >=0 && num < 10){
            return `0${num}`;
        } else{
            return num;
        }
    }

    function setClock(selector, endtime){
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        // чтобы не было мигания верстки с цифрами из верстки (тк по интервалу эта ф-я запустится только через 1 сек)
        updateClock();
        
        function updateClock(){
            const t = getTimeRemaining(endtime); // разница между планируемым временем и текущим
            
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if(t.total <= 0){
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);
    // /Timer

    // Modal
    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

    function openModal(){
        modal.classList.add('show');
        modal.classList.remove('hide');
        // modal.classList.toggle('show');
        document.body.style.overflow = 'hidden'; // убираем прокрутку страницы про открытом попапе
        clearInterval(modalTimerId); // если пользователь сам открыл попап, то уже не показываем ему попап снова через 5 сек
    }
    
    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });
   
    function closeModal(){
        modal.classList.add('hide');
        modal.classList.remove('show');
         // modal.classList.toggle('show');
        document.body.style.overflow = '';
    }

    // при клике на подложку, либо при клике на крестик закрываем окно
    modal.addEventListener('click', (e) => {
        if(e.target === modal || e.target.getAttribute('data-close') == ''){
            closeModal();
        }
    });

    // закрываем окно при нажатии на клавишу Escape
    document.addEventListener('keydown', (e) => { // keyDown - срабатывает когда нажимается кнопка
        if(e.code === 'Escape' && modal.classList.contains('show') ){
            closeModal();
        }
    });

    // показывать попап через 50 сек после открытия страницы
    const modalTimerId = setTimeout(openModal, 50000);

    function showModalByScroll(){
        // pageYOffset - сколько px отлистал пользователь по оси Y
         // document.documentElement.clientHeight - видимая часть, кот-ю видим на данный момент на сайте без прокрутки
         // document.documentElement.scrollHeight - высота с учетом прокрутки
         // в конце добавим -1px, тк на некоторых мониторах и браузерах без этого не срабатывает
         if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1){
            openModal();

            // как только один раз пользователь долистал до конца и ему показался попап, обработчик удаляется, чтоб больше попап не показывался
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    // когда пользователь долистает до самого конца страницы - показать попап
    window.addEventListener('scroll', showModalByScroll);
    // /Modal


    // Используем классы для карточек
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes){
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes; // rest элемент для того чтобы передавать несколько классов
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27; // курс валют
            this.changeToUAH(); // можно ковертиацию вызвать здесь
        }

        changeToUAH(){ // ковертация $ в гривны
            this.price = this.price * this.transfer;
        }

        render(){
            const element = document.createElement('div');

            // если никакой класс не был передан, то присвоим класс по дефолту
            if(this.classes.length === 0){
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            
            this.parent.append(element);
        }
    }

    // испльзуем объект на месте, поэтому сократим запись 'const item ='
    new MenuCard(
        "img/tabs/vegy.jpg", 
        "vegy", 
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        ".menu .container",
        // "menu__item"
        ).render();

    new MenuCard(
        "img/tabs/elite.jpg", 
        "elite", 
        'Меню "“Премиум”"',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        550,
        ".menu .container",
        "menu__item"
        ).render();

    new MenuCard(
        "img/tabs/post.jpg", 
        "post", 
        'Меню “Постное”',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        430,
        ".menu .container",
        "menu__item"
        ).render();
    // /Используем классы для карточек


    // Forms
    // вариант ajax использующий XMLHttpRequest
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с Вами свяжемся',
        failture: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        // postDataFormData(item);
        postData(item);
    });

    // отправляем данные в формате json
    // Метод Fetch
    function postData(form){
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // spinner
            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            // соберем все данные с формы в формат FormData
            // ! у всех input-ов обязательно должен быть атрибут name
            const formData = new FormData(form);

            // из FormData получим обычный объект 
            const object = {};
            formData.forEach(function(value, key){
                object[key] = value;
            });

            fetch('server.php', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(object) // из объекта получим json
            }).then((data) => data.text()) // преобразовали данные ответа сервера в текст
            .then(data => { // если ok
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => { // если ошибка
                showThanksModal(message.failture);
            }).finally(() => {
                form.reset();
            });

        });
    }

     // отправляем данные в формате FormData
    // Метод Fetch
    function postDataFetchFormData(form){
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // spinner
            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            // соберем все данные с формы в формат FormData
            // ! у всех input-ов обязательно должен быть атрибут name
            const formData = new FormData(form);

            fetch('server.php', {
                method: 'POST',
                // headers: {
                //     'Content-type': 'application/json'
                // },
                body: formData
            }).then((data) => data.text()) // преобразовали данные ответа сервера в текст
            .then(data => { // если ok
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => { // если ошибка
                showThanksModal(message.failture);
            }).finally(() => {
                form.reset();
            });

        });
    }

    // отправляем данные в формате json
    // Устар. метод XMLHttpRequest
    function postDataXMLHttpRequestJson(form){
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');

            request.setRequestHeader('Content-type', 'application/json');

            // соберем все данные с формы в формат FormData
            // ! у всех input-ов обязательно должен быть атрибут name
            const formData = new FormData(form);

            // из FormData получим обычный объект 
            const object = {};
            formData.forEach(function(value, key){
                object[key] = value;
            });

            // из объекта получим json
            const json = JSON.stringify(object);

            request.send(json);

            request.addEventListener('load', () => {
                if (request.status === 200){
                    console.log(request.response);
                    showThanksModal(message.success);
                    form.reset();
                    statusMessage.remove();
                } else {
                    showThanksModal(message.failture);
                }
            });

        });
    }

    // отправляем данные в формате FormData
      // Устар. метод XMLHttpRequest
      function postDataXMLHttpRequestFormData(form){
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loading;
            form.append(statusMessage);

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');

            // если отправляем заголовок, то получаем Missing boundary in multipart/form-data POST data in 
            // решение: не отправлять заголовок вовсе, он устанавливается автоматически
            // https://inoyakaigor.ru/blog/94
            // request.setRequestHeader('Content-type', 'multipart/form-data');

            // соберем все данные с формы в формат FormData
            // ! у всех input-ов обязательно должен быть атрибут name
            const formData = new FormData(form);
 
            // если в openserver HTTP apache, то получаем ошибку.
            // Нужно поставить Nginx 1.12 или apache + nginx
            request.send(formData);

            request.addEventListener('load', () => {
                if (request.status === 200){
                    console.log(request.response);
                    statusMessage.textContent = message.success;
                    form.reset();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 2000);
                } else {
                    statusMessage.textContent = message.failture;
                }
            });

        });

    }

    // ф-я показывающая сообщения после отправки формы
    function showThanksModal(message){
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        
        document.querySelector('.modal').append(thanksModal);

        // спустя 4 сек убирать сообщение и возвращать форму к изначальному состоянию
        setTimeout(() =>{
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }
    // /Forms


});