function modal() {
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
}

module.exports = modal;