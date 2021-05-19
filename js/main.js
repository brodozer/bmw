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

const smoothScroll = () => {
    const link = document.querySelectorAll('[href^="#"]:not([href="#"])');

    link.forEach((l) => {
        l.addEventListener('click', (e) => {
            e.preventDefault();
            const id = l.getAttribute('href').substring(1);
            //console.log('id:', id);
            document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
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

accordeon();
smoothScroll();
tabs();
