function forms() {
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

    const postData = async (url, data) => { // asixron ishlaydigan func bor dedi async
        const res = await fetch(url, { // await shu func bajarilishini kutish
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data // body = 'formData'ga teng
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

            postData('http://localhost:3000/requests', json)
                //.then(data => data.text()) // server qaytargan malumotni text kurinishida olish
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch(() => { // catch xatolikni ushlaydi
                    showThanksModal(message.failure);
                }).finally(() => { // oxirgi bajariladigan ishlar yoziladi
                    form.reset(); // form kataklarini tozalab
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
}

module.exports = forms;