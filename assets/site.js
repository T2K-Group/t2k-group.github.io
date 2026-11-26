document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector("[data-menu-toggle]");
  const navigation = document.querySelector("[data-navigation]");
  if (toggle && navigation) {
    toggle.addEventListener("click", () => {
      const open = navigation.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  document.querySelectorAll("[data-contact-form]").forEach((form) => {
    const demoTopic = "Digital Poll Clerk 20-minute demo";
    const topic = form.querySelector('select[name="topic"]');
    const demoPreferences = form.querySelectorAll("[data-demo-preference]");
    const updateDemoPreferences = () => {
      const isDemo = topic?.value === demoTopic;
      demoPreferences.forEach((field) => {
        field.hidden = !isDemo;
        const input = field.querySelector("input");
        if (input) input.disabled = !isDemo;
      });
    };

    if (topic && new URLSearchParams(window.location.search).get("topic") === "digital-poll-clerk") {
      topic.value = demoTopic;
    }
    topic?.addEventListener("change", updateDemoPreferences);
    updateDemoPreferences();

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
      const message = [formData.get("requirement")];
      if (formData.get("topic") === demoTopic) {
        const date = formData.get("demo-date");
        const time = formData.get("demo-time");
        if (date) {
          const [year, month, day] = date.split("-");
          message.push(`Preferred demo date: ${day}/${month}/${year}`);
        }
        if (time) message.push(`Preferred demo time (UK): ${time}`);
      }
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
              organisation: formData.get("organisation"),
              topic: formData.get("topic"),
              message: message.join("\n"),
            },
          }),
        });

        if (!response.ok) {
          throw new Error(`Form submission failed with status ${response.status}`);
        }

        form.reset();
        updateDemoPreferences();
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

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('[data-navigation] a').forEach((link) => {
    link.addEventListener('click', () => {
      document.querySelector('[data-navigation]')?.classList.remove('open');
      document.querySelector('[data-menu-toggle]')?.setAttribute('aria-expanded', 'false');
    });
  });
});
