function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    //modal.classList.toggle('show');           // 2-usul modalni ochib yopishga
    document.body.style.overflow = 'hidden'; // modal click qilinganda orqa fon scroll bo'lmasligi uchun
    
    if(modalTimerId){
        clearTimeout(modalTimerId);
    }
   
}

function closeModal(modalSelector) { // DRY (2 ta joyda bir xil narsani ishlatmaslig u-n func qilish kk)
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    // MODAL

    const modalTrigger = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector);

    modalTrigger.forEach(btn => { // trigger 2 ta bugani uchun forEach ishlatildi
        btn.addEventListener('click', () => openModal(modalSelector , modalTimerId));
    });    

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => { // modal ESC bosganda yuqolishi
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector , modalTimerId);
            window.removeEventListener('scroll', showModalByScroll); // har scroll qilganda chiqmaydi
        }

    }

    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {openModal};
export {closeModal};