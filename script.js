
(function () {
    'use strict';

    /* ---------- 1) Preloader ---------- */
    window.addEventListener('load', function () {
        const pre = document.querySelector('.preloader');
        if (!pre) return;
        setTimeout(() => pre.classList.add('hidden'), 650);
    });

    document.addEventListener('DOMContentLoaded', function () {

        /* ---------- 2) Header scroll ---------- */
        const header = document.querySelector('.site-header');
        const onScroll = () => {
            if (window.scrollY > 40) header.classList.add('scrolled');
            else header.classList.remove('scrolled');

            const top = document.querySelector('.to-top');
            if (top) {
                if (window.scrollY > 600) top.classList.add('show');
                else top.classList.remove('show');
            }
        };
        if (header) {
            window.addEventListener('scroll', onScroll, { passive: true });
            onScroll();
        }

        /* ---------- 3) Mobile menu ---------- */
        const burger = document.querySelector('.burger');
        const navMain = document.querySelector('.nav-main');
        if (burger && navMain) {
            burger.addEventListener('click', () => {
                burger.classList.toggle('open');
                navMain.classList.toggle('open');
                document.body.style.overflow = navMain.classList.contains('open') ? 'hidden' : '';
            });
            navMain.querySelectorAll('a').forEach(a => {
                a.addEventListener('click', () => {
                    burger.classList.remove('open');
                    navMain.classList.remove('open');
                    document.body.style.overflow = '';
                });
            });
        }

        /* ---------- 4) Active link highlight ---------- */
        const page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
        document.querySelectorAll('.nav-main a').forEach(a => {
            const href = (a.getAttribute('href') || '').toLowerCase();
            if (href === page || (page === '' && href === 'index.html')) {
                a.classList.add('active');
            }
        });

        /* ---------- 5) Scroll reveal ---------- */
        const reveals = document.querySelectorAll('.reveal');
        if ('IntersectionObserver' in window) {
            const io = new IntersectionObserver((entries) => {
                entries.forEach(e => {
                    if (e.isIntersecting) {
                        e.target.classList.add('in');
                        io.unobserve(e.target);
                    }
                });
            }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
            reveals.forEach(el => io.observe(el));
        } else {
            reveals.forEach(el => el.classList.add('in'));
        }

        /* ---------- 6) Animated counters ---------- */
        const counters = document.querySelectorAll('[data-counter]');
        if (counters.length && 'IntersectionObserver' in window) {
            const io2 = new IntersectionObserver((entries) => {
                entries.forEach(e => {
                    if (!e.isIntersecting) return;
                    const el = e.target;
                    const target = parseInt(el.dataset.counter, 10);
                    const duration = 1800;
                    const start = performance.now();
                    const step = (t) => {
                        const p = Math.min((t - start) / duration, 1);
                        const eased = 1 - Math.pow(1 - p, 3);
                        el.textContent = Math.floor(eased * target);
                        if (p < 1) requestAnimationFrame(step);
                        else el.textContent = target;
                    };
                    requestAnimationFrame(step);
                    io2.unobserve(el);
                });
            }, { threshold: 0.5 });
            counters.forEach(c => io2.observe(c));
        }

        /* ---------- 7) Project filter ---------- */
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projects = document.querySelectorAll('.project');
        if (filterBtns.length) {
            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    filterBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    const f = btn.dataset.filter;
                    projects.forEach(p => {
                        if (f === 'all' || p.dataset.cat === f) {
                            p.classList.remove('hidden');
                        } else {
                            p.classList.add('hidden');
                        }
                    });
                });
            });
        }

        /* ---------- 8) Lightbox ---------- */
        const lightbox = document.querySelector('.lightbox');
        const lightboxImg = lightbox ? lightbox.querySelector('img') : null;
        const openLightbox = (src) => {
            if (!lightbox || !lightboxImg) return;
            lightboxImg.src = src;
            lightbox.classList.add('open');
            document.body.style.overflow = 'hidden';
        };
        const closeLightbox = () => {
            if (!lightbox) return;
            lightbox.classList.remove('open');
            document.body.style.overflow = '';
        };
        document.querySelectorAll('[data-lightbox]').forEach(el => {
            el.addEventListener('click', (ev) => {
                ev.preventDefault();
                const img = el.querySelector('img');
                const src = el.dataset.src || (img ? img.src : '');
                if (src) openLightbox(src);
            });
        });
        if (lightbox) {
            lightbox.addEventListener('click', (ev) => {
                if (ev.target === lightbox || ev.target.classList.contains('lightbox-close')) closeLightbox();
            });
            document.addEventListener('keydown', (ev) => {
                if (ev.key === 'Escape') closeLightbox();
            });
        }

        /* ---------- 9) Back to top ---------- */
        const toTop = document.querySelector('.to-top');
        if (toTop) {
            toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
        }

        /* ---------- 10) Contact form ---------- */
        const form = document.querySelector('.contact-form form');
        if (form) {
            form.addEventListener('submit', (ev) => {
                ev.preventDefault();
                const success = form.parentElement.querySelector('.form-success');
                if (success) {
                    success.classList.add('show');
                    setTimeout(() => success.classList.remove('show'), 5000);
                }
                form.reset();
                // Force floating labels back
                form.querySelectorAll('input, textarea').forEach(i => i.blur());
            });
        }

        /* ---------- 11) Year ---------- */
        document.querySelectorAll('[data-year]').forEach(el => {
            el.textContent = new Date().getFullYear();
        });

        /* ---------- 12) Parallax hero bg ---------- */
        const heroBg = document.querySelector('.hero-bg img');
        if (heroBg) {
            window.addEventListener('scroll', () => {
                const y = window.scrollY;
                if (y < window.innerHeight) {
                    heroBg.style.transform = `translateY(${y * 0.3}px) scale(${1 + y * 0.0004})`;
                }
            }, { passive: true });
        }
    });
})();
