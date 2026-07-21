document.addEventListener('DOMContentLoaded', function() {
    const popup = document.querySelector('.popup');
    const openButtons = document.querySelectorAll('.hero__button, .footer__btn--red');
    const closeButton = document.querySelector('.popup__close');
    const overlay = document.querySelector('.popup__overlay');
    const form = document.querySelector('.popup__form');
    const agreement = document.getElementById('agreement');

    function openPopup(e) {
        e.preventDefault();
        popup.style.display = 'flex';
    }

    function closePopup() {
        popup.style.display = 'none';
    }

    openButtons.forEach(function(btn) {
        btn.addEventListener('click', openPopup);
    });

    closeButton.addEventListener('click', closePopup);
    overlay.addEventListener('click', closePopup);

    const phoneInput = form.querySelector('input[type="tel"]');
    phoneInput.addEventListener('input', function() {
        let value = this.value.replace(/[^\d+]/g, '');
        if (value.length > 0 && !value.startsWith('+')) value = '+' + value;
        this.value = value;
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let valid = true;
        const inputs = form.querySelectorAll('input[required]');

        inputs.forEach(function(input) {
            const value = input.value.trim();
            input.style.borderColor = '#111F35';

            if (!value) {
                input.style.borderColor = 'red';
                valid = false;
            }

            if (input.type === 'tel' && value.replace(/[^\d]/g, '').length < 10) {
                input.style.borderColor = 'red';
                valid = false;
            }

            if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                input.style.borderColor = 'red';
                valid = false;
            }
        });

        if (!agreement.checked) {
            agreement.style.outline = '1px solid red';
            valid = false;
        } else {
            agreement.style.outline = 'none';
        }

        if (valid) {
            alert('Форма отправлена!');
            closePopup();
            form.reset();
            inputs.forEach(function(input) {
                input.style.borderColor = '#111F35';
            });
            agreement.style.outline = 'none';
        }
    });

    const track = document.querySelector('.about__slider-track');
    const slides = document.querySelectorAll('.about__slider-slide');
    const prevBtn = document.querySelector('.about__slider-btn--prev');
    const nextBtn = document.querySelector('.about__slider-btn--next');
    let currentSlide = 0;

    function showSlide(index) {
        if (index < 0) {
            track.style.transition = 'none';
            track.style.transform = 'translateX(-' + ((slides.length - 1) * 750) + 'px)';
            currentSlide = slides.length - 1;
            setTimeout(function() {
                track.style.transition = 'transform 0.5s ease';
            }, 50);
            return;
        }
        if (index >= slides.length) {
            track.style.transition = 'none';
            track.style.transform = 'translateX(0px)';
            currentSlide = 0;
            setTimeout(function() {
                track.style.transition = 'transform 0.5s ease';
            }, 50);
            return;
        }
        track.style.transform = 'translateX(-' + (index * 750) + 'px)';
        currentSlide = index;
    }

    prevBtn.addEventListener('click', function() {
        showSlide(currentSlide - 1);
    });

    nextBtn.addEventListener('click', function() {
        showSlide(currentSlide + 1);
    });

    const formSectionSelect = document.querySelector('.form-section__select');
    const formSectionInput = formSectionSelect.querySelector('input');
    const formSectionDropdown = document.querySelector('.form-section__dropdown');
    const formSectionItems = document.querySelectorAll('.form-section__dropdown-item');

    formSectionInput.addEventListener('click', function() {
        formSectionDropdown.style.display = formSectionDropdown.style.display === 'block' ? 'none' : 'block';
    });

    formSectionItems.forEach(function(item) {
        item.addEventListener('click', function() {
            formSectionInput.value = this.textContent;
            formSectionDropdown.style.display = 'none';
        });
    });

    document.addEventListener('click', function(e) {
        if (!formSectionSelect.contains(e.target)) {
            formSectionDropdown.style.display = 'none';
        }
    });

    const formSectionForm = document.querySelector('.form-section__form');
    const formSectionAgreement = document.getElementById('form-agreement');

    const fioInput = formSectionForm.querySelector('.form-section__input[type="text"]:not([readonly])');
    fioInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^а-яА-ЯёЁa-zA-Z\s]/g, '');
    });

    const phoneInput2 = formSectionForm.querySelector('.form-section__input[type="tel"]');
    phoneInput2.addEventListener('input', function() {
        let value = this.value.replace(/[^\d+]/g, '');
        if (value.length > 0 && !value.startsWith('+')) value = '+' + value;
        this.value = value;
    });

    formSectionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let valid = true;
        const inputs = formSectionForm.querySelectorAll('.form-section__input[type="text"]:not([readonly]), .form-section__input[type="tel"], .form-section__input[type="email"]');

        inputs.forEach(function(input) {
            if (!input.value.trim()) {
                input.style.border = '2px solid red';
                valid = false;
            } else {
                input.style.border = 'none';
            }
        });

        if (!formSectionAgreement.checked) {
            formSectionAgreement.style.outline = '2px solid red';
            valid = false;
        } else {
            formSectionAgreement.style.outline = 'none';
        }

        if (valid) {
            alert('Форма отправлена!');
            formSectionForm.reset();
        }
    });
});