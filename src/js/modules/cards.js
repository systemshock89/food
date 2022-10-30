function cards() {
    // Используем классы для карточек
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
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

        changeToUAH() { // ковертация $ в гривны
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');

            // если никакой класс не был передан, то присвоим класс по дефолту
            if (this.classes.length === 0) {
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

    // получим данные карточек
    const getResource = async (url, data) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`); // объект ошибки
            // оператор throw выкидывает новую ошибку
        }

        return await res.json();
    };

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({
                img,
                altimg,
                title,
                descr,
                price
            }) => { // используем деструктуризацию объекта. (вытащим св-ва)

                // надо передать в конструктор все св-ва объекта: obj.img, obj.alt и тд
                // но лучше исп-ть деструктуризацию объекта
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

    // получим данные карточек (с помощью биб-ки axios)
    // возвращается более подробный ответ и data уже сконвертирована в массив
    // axios.get('http://localhost:3000/menu')
    // .then(data => {
    //     data.data.forEach(({img, altimg, title, descr, price}) => { 
    //         new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //     });
    // });

    // еще способ (когда не нужна шаблонизация, например, если необходимо только один раз что-то построить) c помощью ф-и createCard
    // getResource('http://localhost:3000/menu')
    // .then(data => createCard(data));

    // function createCard(data){
    //     data.forEach( ({img, altimg, title, descr, price}) => {
    //         const element = document.createElement('div');
    //         price = price * 27;

    //         element.classList.add('menu__item');
    //         element.innerHTML = `
    //             <img src=${img} alt=${altimg}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //             </div>
    //         `;

    //         document.querySelector('.menu .container').append(element);
    //     });
    // }

    // вручную заполняем конструктор с карточками данными (нужно повторить столько раз, сколько карточек)
    // испльзуем объект на месте, поэтому сократим запись 'const item ='
    // new MenuCard(
    //     "img/tabs/vegy.jpg", 
    //     "vegy", 
    //     'Меню "Фитнес"',
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //     9,
    //     ".menu .container",
    //     // "menu__item"
    //     ).render();
    // /Используем классы для карточек
}

module.exports = cards;