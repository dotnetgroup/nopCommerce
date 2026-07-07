// Furniture Store (UK) theme — progressive-enhancement carousel controls.
// The featured-products shelf already scrolls natively (CSS scroll-snap) on
// touch devices; this just wires up the desktop prev/next buttons.
(function () {
    'use strict';

    function initCarousel(carousel) {
        var scroller = carousel.querySelector('.item-grid');
        var prevBtn = carousel.querySelector('[data-ft-carousel-prev]');
        var nextBtn = carousel.querySelector('[data-ft-carousel-next]');

        if (!scroller || (!prevBtn && !nextBtn)) {
            return;
        }

        var getScrollStep = function () {
            var firstItem = scroller.querySelector('.item-box');
            var gap = 24;
            return firstItem ? firstItem.getBoundingClientRect().width + gap : scroller.clientWidth * 0.8;
        };

        if (prevBtn) {
            prevBtn.addEventListener('click', function () {
                scroller.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function () {
                scroller.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
            });
        }
    }

    // Category/listing page: mobile bottom-sheet filter drawer (desktop keeps the
    // sidebar visible at all times via CSS, so this only matters below 992px).
    function initFilterDrawer() {
        var panel = document.getElementById('ft-filters-panel');
        var backdrop = document.querySelector('.ft-filter-backdrop');
        var openBtn = document.querySelector('[data-ft-filters-open]');

        if (!panel || !openBtn) {
            return;
        }

        var dismissEls = document.querySelectorAll('[data-ft-filters-dismiss]');

        var openDrawer = function () {
            panel.classList.add('ft-filters--open');
            if (backdrop) {
                backdrop.classList.add('ft-filter-backdrop--visible');
            }
            document.body.classList.add('ft-no-scroll');
        };

        var closeDrawer = function () {
            panel.classList.remove('ft-filters--open');
            if (backdrop) {
                backdrop.classList.remove('ft-filter-backdrop--visible');
            }
            document.body.classList.remove('ft-no-scroll');
        };

        openBtn.addEventListener('click', openDrawer);

        for (var i = 0; i < dismissEls.length; i++) {
            dismissEls[i].addEventListener('click', closeDrawer);
        }
    }

    // Product detail page: sticky mobile Add-to-Basket bar. It never reimplements cart logic —
    // clicking it just re-triggers the real add-to-cart button rendered by _AddToCart. The bar
    // reveals itself once the real add-to-cart button has scrolled out of view.
    function initStickyBar() {
        var bar = document.querySelector('[data-ft-sticky-bar]');
        if (!bar) {
            return;
        }

        var addButton = bar.querySelector('[data-ft-sticky-add]');
        if (addButton) {
            var realButtonId = addButton.getAttribute('data-ft-sticky-add');
            addButton.addEventListener('click', function () {
                var realButton = document.getElementById(realButtonId);
                if (realButton) {
                    realButton.click();
                }
            });
        }

        // Reveal the bar only once the in-page add-to-cart button is no longer visible.
        var realButton = addButton ? document.getElementById(addButton.getAttribute('data-ft-sticky-add')) : null;

        var setVisible = function (visible) {
            bar.classList.toggle('ft-sticky-bar--visible', visible);
            bar.setAttribute('aria-hidden', visible ? 'false' : 'true');
        };

        if (realButton && 'IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function (entries) {
                // when the real button is NOT intersecting the viewport, show the sticky bar
                setVisible(!entries[0].isIntersecting);
            }, { threshold: 0 });
            observer.observe(realButton);
        } else {
            // Fallback: no observer support — just show it (CSS still hides it on desktop).
            setVisible(true);
        }
    }

    // Sticky header: add a --scrolled class once the page is scrolled, so the header
    // shell can show a subtle shadow/border only when it's detached from the top.
    function initStickyHeader() {
        var header = document.querySelector('[data-ft-header]');
        if (!header) {
            return;
        }

        var onScroll = function () {
            header.classList.toggle('ft-header-shell--scrolled', window.scrollY > 8);
        };

        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    document.addEventListener('DOMContentLoaded', function () {
        var carousels = document.querySelectorAll('[data-ft-carousel]');
        for (var i = 0; i < carousels.length; i++) {
            initCarousel(carousels[i]);
        }

        initFilterDrawer();
        initStickyBar();
        initStickyHeader();
    });
})();
