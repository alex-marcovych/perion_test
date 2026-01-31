const tl = gsap.timeline();

tl.from(".button", {opacity: 0, duration: 1.5})
    .from(".background", {opacity: 0, duration: 2.3}, 0)
    .from(".title", {opacity: 0, duration: 2.3}, 0)
    .fromTo(".item-left", {x: 410}, {x: 200, duration: 1.7}, "-=1.7")
    .fromTo(".item-right", {x: -410}, {x: -200, duration: 1.7}, "<")
    .to(".close", {rotate: 45, duration: 1}, "-=1")
    .fromTo(".item__btn", {opacity: 0}, {opacity: 1, duration: 1.5, delay: 1}, "-=0.5");

const trans = document.getElementById("trans");
const buttons = document.querySelectorAll(".item__btn");

buttons.forEach(btn => {
    const modalId = btn.dataset.modal;
    const modal = document.getElementById(modalId);

    btn.addEventListener('click', () => openModal(btn, modal));
    modal.querySelector(".close").addEventListener("click", () => closeModal(btn, modal));
})

function openModal(btn, modal) {
    const rect = btn.getBoundingClientRect();

    gsap.set(trans, {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        borderRadius: 14,
        opacity: 1,
    });

    gsap.timeline()
        .to(trans, {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
            borderRadius: 0,
            duration: 0.7,
            ease: "power4.inOut",
        })
        .to(modal, { opacity: 1, duration: 0.3, pointerEvents: "auto" }, "-=0.2")
}

function closeModal(btn, modal) {
    const rect = btn.getBoundingClientRect();

    gsap.timeline()
        .to(modal, {
            opacity: 0,
            pointerEvents: "none",
            duration: 0.2
        })
        .to(trans, {
            top: rect.top + window.scrollY,
            left: rect.left + window.scrollX,
            width: rect.width,
            height: rect.height,
            borderRadius: 14,
            duration: 0.6,
            ease: "power4.inOut"
        }, "-=0.1")
        .set(modal, {
            clearProps: "all",
            pointerEvents: "none"
        })
        .set(trans, {
            clearProps: "all",
            opacity: 0
        });
}
