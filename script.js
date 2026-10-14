document.addEventListener("DOMContentLoaded", function () {

  const header = document.getElementById("header");
  const nav = document.getElementById("nav");
  const menu = document.getElementById("menu");
  const modal = document.getElementById("modal");

  // Header / mobile menu
  window.addEventListener("scroll", function () {
    header.classList.toggle("scrolled", window.scrollY > 60);
  });

  if (menu) {
    menu.addEventListener("click", function () {
      nav.classList.toggle("active");
    });
  }

  document.querySelectorAll("#nav a").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("active");
    });
  });

  // BOOK NOW / BOOK A SERVICE
  document.querySelectorAll("[data-book]").forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      const firstInput = modal.querySelector("input");
      if (firstInput) {
        setTimeout(function () { firstInput.focus(); }, 100);
      }
    });
  });

  const closeButton = document.querySelector("[data-close]");

  if (closeButton) {
    closeButton.addEventListener("click", closeModal);
  }

  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeModal();
    }
  });

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }

  // REQUEST A QUOTE / SEND REQUEST
  const contactForm = document.getElementById("contactForm");
  const message = document.getElementById("message");

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const data = new FormData(contactForm);
    const name = data.get("name");
    const phone = data.get("phone");
    const email = data.get("email");
    const service = data.get("service");
    const text = data.get("message");

    const subject = encodeURIComponent("New Quote Request - Prime Heating");
    const body = encodeURIComponent(
      "Name: " + name + "\n" +
      "Phone: " + phone + "\n" +
      "Email: " + email + "\n" +
      "Service: " + service + "\n\n" +
      "Message:\n" + text
    );

    window.location.href =
      "mailto:zino.lid@gmail.com?subject=" + subject + "&body=" + body;

    message.textContent =
      "Your email application is opening with the quote request.";
  });

  // BOOKING FORM
  const bookingForm = document.getElementById("bookForm");
  const bookingMsg = document.getElementById("bookingMsg");

  bookingForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const data = new FormData(bookingForm);
    const name = data.get("name");
    const phone = data.get("phone");
    const service = data.get("service");
    const date = data.get("date");
    const time = data.get("time");

    const subject = encodeURIComponent("New Booking Request - Prime Heating");
    const body = encodeURIComponent(
      "Name: " + name + "\n" +
      "Phone: " + phone + "\n" +
      "Service: " + service + "\n" +
      "Requested date: " + date + "\n" +
      "Requested time: " + time
    );

    window.location.href =
      "mailto:zino.lid@gmail.com?subject=" + subject + "&body=" + body;

    bookingMsg.textContent =
      "Your booking request is ready to be sent by email.";
  });

  // Counters
  const counters = document.querySelectorAll("[data-n]");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const target = Number(el.dataset.n);
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 35));

        const timer = setInterval(function () {
          current += step;

          if (current >= target) {
            current = target;
            clearInterval(timer);
          }

          el.textContent = current + (target === 24 ? "/7" : "+");
        }, 35);

        observer.unobserve(el);
      });
    }, { threshold: 0.6 });

    counters.forEach(function (counter) {
      observer.observe(counter);
    });
  }

});

// GET A QUOTE buttons: go to the form and focus the name field.
document.querySelectorAll("[data-quote]").forEach(function (button) {
  button.addEventListener("click", function () {
    setTimeout(function () {
      const input = document.querySelector('#contactForm input[name="name"]');
      if (input) input.focus();
    }, 400);
  });
});
