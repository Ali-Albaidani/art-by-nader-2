
const form = document.getElementById("contactForm");
const feedback = document.getElementById("feedback");

const fields = {
  name: { el: document.getElementById("name"), error: document.getElementById("nameError")},
  email: { el: document.getElementById("email"), error: document.getElementById("emailError")},
  subject: { el: document.getElementById("subject"), error: document.getElementById("subjectError")},
  message: { el: document.getElementById("message"), error: document.getElementById("messageError")}
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

Object.keys(fields).forEach(key => {
  fields[key].el.addEventListener("input", () => validateField(key));
});

function validateField(key) {
  const value = fields[key].el.value.trim();
  let error = "";

  if (value === "") {
    error = "هذا الحقل مطلوب";
} else if (key === "email" &&!emailRegex.test(value)) {
    error = "صيغة البريد الإلكتروني غير صحيحة";
}

  fields[key].error.textContent = error;
  return error === "";
}

form.addEventListener("submit", function(e) {
  e.preventDefault();

  let allValid = true;
  Object.keys(fields).forEach(key => {
    if (!validateField(key)) allValid = false;
});

  if (allValid) {
    feedback.innerHTML = `<p style="color:green;">تم إرسال النموذج بنجاح!</p>`;
    form.reset();
    Object.keys(fields).forEach(key => fields[key].error.textContent = "");
} else {
    feedback.innerHTML = `<p style="color:red;">يرجى تصحيح الأخطاء أعلاه قبل الإرسال.</p>`;
}
});
