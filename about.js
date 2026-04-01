(() => {
  const { CONTACT_EMAIL, buildContactMailto } = window.RobleData;
  const { showToast } = window.RobleStore;

  const contactForm = document.getElementById("contactForm");
  const contactFeedback = document.getElementById("contactFeedback");

  document.querySelectorAll("[data-contact-email]").forEach((link) => {
    link.href = `mailto:${CONTACT_EMAIL}`;
  });

  if (!contactForm) return;

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const subject = String(formData.get("subject") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !email || !subject || !message) {
      showToast("Completa nombre, correo, asunto y mensaje para enviar la consulta.");
      return;
    }

    if (contactFeedback) {
      contactFeedback.textContent = `Se abrira tu correo para enviar la consulta a ${CONTACT_EMAIL}.`;
    }

    window.location.href = buildContactMailto({ name, email, phone, subject, message });
    showToast("Se preparo tu consulta para enviarla por mail.");
  });
})();
