// Set this to the API Gateway invoke URL once the contact-handler Lambda is deployed.
// Example: "https://abc123xyz.execute-api.us-east-1.amazonaws.com/contact"
const FORM_ENDPOINT = "https://aqi5k7u6x5.execute-api.us-east-1.amazonaws.com";

document.getElementById("year").textContent = new Date().getFullYear();

const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!FORM_ENDPOINT) {
    status.textContent = "Form is not connected yet. Call or text (347) 784-1290 for now.";
    status.className = "form-status err";
    return;
  }

  const data = Object.fromEntries(new FormData(form).entries());
  const button = form.querySelector("button[type=submit]");

  button.disabled = true;
  status.textContent = "Sending...";
  status.className = "form-status";

  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Request failed");

    status.textContent = "Thanks, we got it. We will reach out shortly.";
    status.className = "form-status ok";
    form.reset();
  } catch (err) {
    status.textContent = "Something went wrong. Please call or text (347) 784-1290.";
    status.className = "form-status err";
  } finally {
    button.disabled = false;
  }
});
