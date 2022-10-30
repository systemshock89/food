function forms() {
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
        bindPostData(item);
    });

    const postData = async (url, data) => {

        // это ассинхронный код (не знаем, через сколько вернется ответ от сервера)
        // (fetch может не успеет выполнится, а res присвоится ничего) 
        // для этого перед ф-ей ставим оператор async
        // await - его парный оператор, который ставим перед теми операциями, кот-е необходимо дождаться
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        // здесь тоже возвращается промис и тоже нужно дождать результа промиса прежде чем 
        // выполнять return 
        return await res.json(); // преобразуем ответ в json
    };

    // отправляем данные в формате json
    // Метод Fetch
    function bindPostData(form) {
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

            // из FormData получим обычный объект (новый способ)
            // Сначала FormData превращаем в массив массивов (матрицу): ['сво-во', значение]. с помощью entries()
            // Затем превращаем ее в объект (Object)
            // А после объект превращаем в json Object.fromEntries()
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            // из FormData получим обычный объект (классический способ перебора)
            // const object = {};
            // formData.forEach(function(value, key){
            //     object[key] = value;
            // });
            // затем из объекта получим json JSON.stringify(object) и передадим его в ф-ю postData

            postData('http://localhost:3000/requests', json)
                .then(data => { // если ok
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
    function postDataFetchFormData(form) {
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
    function postDataXMLHttpRequestJson(form) {
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
            formData.forEach(function (value, key) {
                object[key] = value;
            });

            // из объекта получим json
            const json = JSON.stringify(object);

            request.send(json);

            request.addEventListener('load', () => {
                if (request.status === 200) {
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
    function postDataXMLHttpRequestFormData(form) {
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
                if (request.status === 200) {
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
    function showThanksModal(message) {
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
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }
}

module.exports = forms;