document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector("[data-menu-toggle]");
  const navigation = document.querySelector("[data-navigation]");
  if (toggle && navigation) {
    toggle.addEventListener("click", () => {
      const open = navigation.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  document.querySelectorAll("[data-draft-contact-form]").forEach((form) => {
    const submitField = form.querySelector('button[type="submit"]')?.closest(".field");
    if (submitField) {
      const turnstileField = document.createElement("div");
      turnstileField.className = "field full";
      turnstileField.innerHTML =
        '<div id="contact-turnstile" class="cf-turnstile" data-sitekey="0x4AAAAAAEO5r3HUA2hAWruS" data-action="content_form"></div>';
      submitField.before(turnstileField);
    }

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const status = form.querySelector("[data-form-status]");
      const submitButton = form.querySelector('button[type="submit"]');
      const turnstileToken = form.querySelector(
        '[name="cf-turnstile-response"]',
      )?.value;

      const setStatus = (message) => {
        if (status) {
          status.textContent = message;
          status.classList.add("visible");
        }
      };

      if (!turnstileToken) {
        setStatus("Please complete the security check before submitting.");
        return;
      }

      const formData = new FormData(form);
      submitButton?.setAttribute("disabled", "");
      setStatus("Sending your enquiry...");

      try {
        const response = await fetch("https://api.t2k.group/v1/content/forms", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Turnstile-Token": turnstileToken,
          },
          body: JSON.stringify({
            source: "https://t2k.group/contact",
            form_details: {
              name: formData.get("name"),
              email: formData.get("email"),
              message: formData.get("requirement"),
            },
          }),
        });

        if (!response.ok) {
          throw new Error(`Form submission failed with status ${response.status}`);
        }

        form.reset();
        setStatus("Thank you. Your enquiry has been sent.");
      } catch (error) {
        console.error("Contact form submission failed", error);
        setStatus("We could not send your enquiry. Please try again.");
      } finally {
        window.turnstile?.reset("#contact-turnstile");
        submitButton?.removeAttribute("disabled");
      }
    });
  });
});
