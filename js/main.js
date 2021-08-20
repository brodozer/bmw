const accordeon = () => {
    const removeClass = function (elems, className) {
        elems.forEach((element) => {
            element.classList.remove(className);
        });
    };

    const addClass = function (elems, className) {
        elems.forEach((element) => {
            element.classList.add(className);
        });
    };

    const featureLinkElems = document.querySelectorAll('.feature__link');
    const featureSubElems = document.querySelectorAll('.feature-sub');

    featureLinkElems.forEach((el, i) => {
        el.addEventListener('click', () => {
            if (!el.classList.contains('feature__link_active')) {
                removeClass(featureLinkElems, 'feature__link_active');
                addClass(featureSubElems, 'hidden');
                el.classList.add('feature__link_active');
                featureSubElems[i].classList.remove('hidden');
            } else {
                el.classList.remove('feature__link_active');
                featureSubElems[i].classList.add('hidden');
            }
        });
    });
};

const smoothScroll = (menu) => {
    const link = document.querySelectorAll('.menu-list__link, .main__scroll, .main__button');

    link.forEach((l) => {
        l.addEventListener('click', (e) => {
            const id = l.getAttribute('href');
            if (id.indexOf('#') !== -1) {
                e.preventDefault();
                document.getElementById(id.substring(1)).scrollIntoView({ behavior: 'smooth' });
            }
            menu.closeMenu();
        });
    });
};

const tabs = () => {
    const tabBtns = document.querySelectorAll('[data-tabs-handler]');
    const tabContent = document.querySelectorAll('[data-tabs-field]');

    for (const btn of tabBtns) {
        btn.addEventListener('click', () => {
            tabBtns.forEach((b) => {
                if (btn === b) {
                    btn.classList.add('design-list__item_active');
                } else {
                    b.classList.remove('design-list__item_active');
                }
            });
            tabContent.forEach((c) => {
                if (btn.dataset.tabsHandler === c.dataset.tabsField) {
                    c.classList.remove('hidden');
                } else {
                    c.classList.add('hidden');
                }
            });
        });
    }
};

const modal = () => {
    const popup = document.querySelector('.modal');
    const popupBtns = document.querySelectorAll('.more');
    const body = document.body;

    const lockScroll = () => {
        const scrollWidth = window.innerWidth - body.clientWidth;
        const scrollPosition = window.pageYOffset;
        body.dataset.positionY = scrollPosition;
        body.style.cssText = `
            position: fixed;
            top: -${scrollPosition}px;
            left: 0;
            overflow: hidden;
            width: 100%;
            height: 100vh;
            padding-right: ${scrollWidth}px;
        `;
    };

    const unlockScroll = () => {
        body.style.cssText = '';
        window.scroll(0, body.dataset.positionY);
    };

    const popupOpen = () => {
        popup.classList.remove('hidden');
        lockScroll();
    };

    const popupClose = () => {
        popup.classList.add('hidden');
        unlockScroll();
    };

    popupBtns.forEach((btn) => {
        btn.addEventListener('click', popupOpen);
    });

    popup.addEventListener('click', (e) => {
        const target = e.target;
        if (target.classList.contains('overlay') || target.classList.contains('modal__close')) {
            popupClose();
        }
    });
};

class Menu {
    constructor() {
        this.btn = document.querySelector('.humburger-menu');
        this.nav = document.querySelector('.menu');
    }

    closeMenu() {
        if (this.nav.classList.contains('menu-active')) {
            this.nav.classList.remove('menu-active');
        }
    }

    listener() {
        this.btn.addEventListener('click', () => {
            this.nav.classList.toggle('menu-active');
        });
    }
}

const sendForm = () => {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    let key = true;
    const forms = document.querySelectorAll('form');
    const validate = (value) => {
        if (/^\s*$/.test(value)) {
            key = false;
        }
    };

    const small = document.createElement('small');

    const callback = (response, form) => {
        const btn = form.querySelector('button');
        form.reset();
        small.innerHTML = 'Ваша заявка №' + response.id + 'принята';
        small.style.color = 'green';
        form.appendChild(small);
        btn.disabled = true;
        btn.style.background = 'gray';
        setTimeout(() => {
            small.innerHTML = '';
            btn.disabled = false;
            btn.style.background = 'linear-gradient(93.53deg, #ED3125 11.43%, #E8223A 80.79%)';
        }, 5000);
    };

    const falseCallback = (response, f) => {
        small.innerHTML = 'Что-то пошло не так. Попробуйте позже';
        f.appendChild(small);
    };

    const send = (data, form, cb, fcb) => {
        const request = new XMLHttpRequest();
        request.open('POST', url);
        request.addEventListener('readystatechange', () => {
            if (request.readyState !== 4) return;
            if (request.status === 200 || request.status === 201) {
                const response = JSON.parse(request.responseText);
                cb(response, form);
            } else {
                fcb(request.responseText, form);
            }
        });
        request.send(data);
    };

    forms.forEach((f) => {
        f.addEventListener('submit', (ev) => {
            ev.preventDefault();
            let data = {};
            for (const { name, value } of f.elements) {
                if (name) {
                    data[name] = value;
                }
            }
            console.dir(data);
            for (k in data) {
                validate(data[k]);
            }
            if (key) {
                send(JSON.stringify(data), f, callback, falseCallback);
            }
        });
    });
};

const menu = new Menu();

menu.listener();
smoothScroll(menu);
accordeon();
tabs();
modal();
sendForm();
