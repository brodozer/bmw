const accordeon = function () {
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

accordeon();
