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
        modal = document.querySelector('.modal'),
        modalCloseBtn = document.querySelector('[data-close]');


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

    modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => { // modal ESC bosganda yuqolishi
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    //const modalTimerId = setTimeout(openModal, 5000);

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
            this.classes = classes;       // rest operator = massiv
            this.parent = document.querySelector(parentSelector); // render metodini joylash uchun ota elm chaqirdik
            this.transfer = 27; // kurs qaysidir valyutaga nisbatan kiritiladi
            this.changeToUAH();
        }

        changeToUAH() { // pulni konvertatsiya qilish metodi
            this.price = this.price * this.transfer;
        }

        render() { // htmlga joylashtiradigan metod
            const element = document.createElement('div');
           
            if(this.classes.length ===0){                // massivni bor yo'qligini tekshirish
                this.element = 'menu__item';             // bo'lmasa default qo'yilsin
                element.classList.add(this.element);
            } 
            else {
                this.classes.forEach(className => element.classList.add(className));  // bo'lsa forEach bn joylashtirish
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

    // const div = new MenuCard();                               // 1- usul
    // div.render();

    new MenuCard( // 1- card                 // 2 -usul chaqirish class ni
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container' // this.parent ga berildi! yani menu ichidagi container
    
    ).render();

    new MenuCard( // 2- card
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан! вегетарианских стейков',
        14,
        '.menu .container' // this.parent ga berildi! yani menu ichidagi container
        
    ).render();

    new MenuCard( // 3- card
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        21,
        '.menu .container' // this.parent ga berildi! yani menu ichidagi container
        
    ).render();

    // FORM

    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item =>   {           // kiritilgan malumotni pastdagi funksiyaga yuborish
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');   // yuborilgan malumot bor guncha sms chiqishi
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loading;
            form.appendChild(statusMessage);

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');

            request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            const formData = new FormData(form);  // form ichidagi (inputlardagi malumotlarni yigish)

            const object = {};
            formData.forEach(function(value, key) {
                object[key] = value;
            });

            const json = JSON.stringify(object);  // oddiy obyektni json farmatga utkazish
            
            request.send(json);

            request.addEventListener('load', () => {
                if(request.status === 200){
                    console.log(request.response);
                    statusMessage.textContent = message.success;
                    form.reset();    // form kataklarini tozalab
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 2000);
                } else {
                    statusMessage.textContent = message.failure;
                }
            });
        });
    }
});