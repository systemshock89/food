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

// получим данные карточек
const getResource = async (url, data) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`); // объект ошибки
        // оператор throw выкидывает новую ошибку
    }

    return await res.json();
};

export {postData};
export {getResource};