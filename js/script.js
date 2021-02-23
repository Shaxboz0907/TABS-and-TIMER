window.addEventListener('DOMContentLoaded', () => {

    // TABS

    const tabs = document.querySelectorAll(".tabheader__item"),
        tabsContent = document.querySelectorAll(".tabcontent"),
        tabsParent = document.querySelector(".tabheader__items");


    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add("hide");
            item.classList.remove("show", "fade");
        });

        tabs.forEach(item => {
            item.classList.remove("tabheader__item_active");
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add("show", "fade");
        tabsContent[i].classList.remove("hide");
        tabs[i].classList.add("tabheader__item_active");
    }

    hideTabContent();
    showTabContent();


    tabsParent.addEventListener("click", (event) => {

        const target = event.target;

        if (target && target.classList.contains("tabheader__item")) {

            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }

    });

    //TIMER

    const deadline = "2021-12-31";

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };


    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock('.timer', deadline);

    // MODAL

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');



    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        //modal.classList.toggle('show');           // 2-usul modalni ochib yopishga
        document.body.style.overflow = 'hidden'; // modal click qilinganda orqa fon scroll bo'lmasligi uchun
        //clearTimeout(modalTimerId);
    }
    modalTrigger.forEach(btn => { // trigger 2 ta bugani uchun forEach ishlatildi
        btn.addEventListener('click', openModal);
    });

    function closeModal() { // DRY (2 ta joyda bir xil narsani ishlatmaslig u-n func qilish kk)
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }



    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => { // modal ESC bosganda yuqolishi
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 50000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll); // har scroll qilganda chiqmaydi
        }

    }

    window.addEventListener('scroll', showModalByScroll);


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

    const getResource = async (url) =>{  // asixron ishlaydigan func bor dedi (async)
        const res = await fetch(url); 

        if(!res.ok){
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    };

    getResource('http://localhost:3000/menu') // db.jsondan mulumotlarni olamiz
        .then( data => {
            data.forEach(({img, altimg, title , descr, price}) => {
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

    
    // FORM

    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => { // kiritilgan malumotni pastdagi funksiyaga yuborish
        bindPostData(item);
    });

    const postData = async (url, data) =>{  // asixron ishlaydigan func bor dedi async
        const res = await fetch(url, {      // await shu func bajarilishini kutish
            method: 'POST',
            headers: {
                'Content-type' : 'application/json'
            },
            body: data              // body = 'formData'ga teng
        });
        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img'); // spinner img yaratish
            statusMessage.src = message.loading; // source ni shunday quysaxam buladi
            statusMessage.style.cssText = `
                display: block ;
                margin : 0 auto ;
            `;
            //form.appendChild(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage); // form dan kiyin chiqadi spinner(tepadagi modal un)
                   
            const formData = new FormData(form); // form ichidagi (inputlardagi malumotlarni yigish)

            const json = JSON.stringify(Object.fromEntries(formData.entries())); // obyektni obyekt qilish
            
            postData('http://localhost:3000/requests', json ) 
            //.then(data => data.text()) // server qaytargan malumotni text kurinishida olish
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() =>{                 // catch xatolikni ushlaydi
                showThanksModal(message.failure);
            }).finally(() => {              // oxirgi bajariladigan ishlar yoziladi
                form.reset();               // form kataklarini tozalab
            });

        });
    }

    function showThanksModal(message) {
        const prevModalDailog = document.querySelector('.modal__dialog');

        prevModalDailog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class ="modal__close" data-close>x</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDailog.classList.add('show');
            prevModalDailog.classList.remove('hide');
            closeModal();
        }, 4000);
    }

   
});