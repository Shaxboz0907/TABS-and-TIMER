function cards() {
    // Используем классы для создание карточек меню

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes; // rest operator = massiv
            this.parent = document.querySelector(parentSelector); // render metodini joylash uchun ota elm chaqirdik
            this.transfer = 27; // kurs qaysidir valyutaga nisbatan kiritiladi
            this.changeToUAH();
        }

        changeToUAH() { // pulni konvertatsiya qilish metodi
            this.price = this.price * this.transfer;
        }

        render() { // htmlga joylashtiradigan metod
            const element = document.createElement('div');

            if (this.classes.length === 0) { // massivni bor yo'qligini tekshirish
                this.element = 'menu__item'; // bo'lmasa default qo'yilsin
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className)); // bo'lsa forEach bn joylashtirish
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
            this.parent.append(element); // menu ichidagi containerda append orqali tartib bn elemnet joylashadi 
        }
    }

    const getResource = async (url) => { // asixron ishlaydigan func bor dedi (async)
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    };

    // axios.get('http://localhost:3000/menu') // AXIOS kutibxonasini ishlatish
    //     .then(data => {
    //         data.data.forEach(({img, altimg, title , descr, price}) => {
    //             new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //         });
    //     });


    getResource('http://localhost:3000/menu') // db.jsondan mulumotlarni olamiz
        .then(data => {
            data.forEach(({
                img,
                altimg,
                title,
                descr,
                price
            }) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });



    // getResource('http://localhost:3000/menu') // db.jsondan mulumotlarni olamiz 2-usul verstka u-n 
    //     .then(data => createCard(data));    
    //     function createCard(data){
    //         data.forEach(({img, altimg, title , descr, price}) => {
    //             const element = document.createElement('div');
    //             element.classList.add('menu__item');
    //             element.innerHTML = `
    //                 <img src=${img} alt=${altimg}>
    //                 <h3 class="menu__item-subtitle">${title}</h3>
    //                 <div class="menu__item-descr">${descr}</div>
    //                 <div class="menu__item-divider"></div>
    //                 <div class="menu__item-price">
    //                     <div class="menu__item-cost">Цена:</div>
    //                     <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //                 </div>     
    //             `;
    //             document.querySelector('.menu .container').append(element);
    //         });
    //     }

}

module.exports = cards;