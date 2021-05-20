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

    const popupOpen = () => {
        popup.classList.remove('hidden');
    };

    const popupClose = () => {
        popup.classList.add('hidden');
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

const menu = new Menu();

menu.listener();
smoothScroll(menu);
accordeon();
tabs();
modal();
