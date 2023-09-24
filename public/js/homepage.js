/*eslint-disable*/
/* ----- Navbar ----- */
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach((section) => {
        let top = window.scrollY;
        let offset = section.offsetTop - 150;
        let height = section.offsetHeight;
        let id = section.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach((link) => {
                link.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });
};
/* ----- Navbar ----- */

/* ----- Counters ----- */
const counters = document.querySelectorAll('.counter');

counters.forEach((counter) => {
    counter.innerHTML = 0;

    const updateCounter = () => {
        const targetCount = +counter.getAttribute('data-target');

        const startingCount = Number(counter.innerHTML);

        const incr = targetCount / 100;

        if (startingCount < targetCount) {
            counter.innerHTML = `${Math.round(startingCount + incr)}`;
            setTimeout(updateCounter, 35);
        } else {
            counter.innerHTML = targetCount;
        }
    };

    updateCounter();
});

/* ----- Counters ----- */
