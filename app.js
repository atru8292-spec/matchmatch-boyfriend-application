(function () {
  "use strict";

  /* ---------------- i18n ---------------- */

  var STRINGS = {
    en: {
      hero_role: "MatchMatch · Founder",
      eyebrow_city: "Mexico City",
      hero_title_1: "Boyfriend",
      hero_title_2: "Application",
      lede_intro: "So, you think we could be a good match? Tell me about yourself, honestly and in your own words, and let's find out.",
      btn_start: "Start the application",

      step_count_1: "Step 1 of 5",
      step_title_1: "General info",
      full_name_label: "What's your full name?",
      instagram_label: "What's your Instagram?",
      age_label: "How old are you?",
      height_label: "How tall are you? (cm)",
      city_label: "Where do you live?",
      city_ph: "City / neighborhood",
      living_situation_label: "What's your current living situation?",
      smoke_label: "Do you smoke?",
      drink_label: "Do you drink?",
      religious_label: "Are you religious?",
      religious_detail_label: "If relevant — how much does it shape your everyday life? (optional)",
      religious_detail_ph: "Values, lifestyle, holidays, how you'd raise kids — whatever's actually true for you",
      has_kids_label: "Do you have kids?",
      wants_kids_label: "Do you want to have kids?",
      political_views_label: "What are your political views? (optional)",
      occupation_label: "What is your current job title or occupation?",
      income_label: "What is your approximate monthly income? (USD)",

      step_count_2: "Step 2 of 5",
      step_title_2: "Relationship",
      relationship_type_label: "What kind of relationships you're looking for?",
      relationship_vision_label: "How do you see this kind of relationship you're looking for?",
      relationship_vision_ph: "Tell me what this relationship would look like in your everyday life – how you spend time together, whether you live together, and anything else that feels important to you.",
      finances_handling_label: "How do you prefer to handle finances in a relationship?",
      finances_detail_label: "Tell me more about your preferred financial arrangement.",
      finances_detail_ph: "What does it look like in practice, especially as the relationship becomes more serious?",
      gender_roles_label: "How do you see the roles of a man and a woman in a relationship?",
      gender_roles_ph: "Are there any roles, responsibilities, or expectations that you consider important?",
      good_partner_meaning_label: "What does being a good partner mean to you?",
      what_makes_you_great_label: "What makes you a great partner?",
      looking_for_partner_label: "What are you looking for in a partner?",
      show_care_label: "How do you like to show care and generosity in a relationship?",
      why_good_match_label: "Why do you think we'd be a good match?",
      non_negotiables_label: "What are your non-negotiables in a relationship?",
      conflict_handling_label: "How do you usually handle conflict in a relationship?",
      cheating_definition_label: "What would you consider cheating in a relationship?",
      communication_skill_label: "How good are you at communication in a relationship?",

      step_count_3: "Step 3 of 5",
      step_title_3: "Personality",
      life_focus_label: "What are you currently focused on in life outside of a relationship?",
      life_focus_ph: "Tell me about the goals, projects, experiences, or personal growth you're currently focused on.",
      parents_relationship_label: "How would you describe relationships with your parents?",
      parents_relationship_ph: "Tell me a little about how your relationship looks today and how involved you are in each other's lives.",
      last_relationship_ended_label: "When did your last serious relationship end, and why?",
      therapy_label: "Have you been in therapy?",
      improving_self_label: "What's one thing you're currently working on improving in yourself?",
      love_give_label: "What are your love languages? How do you usually show love?",
      love_receive_label: "What are your love languages? How do you feel loved?",

      step_count_4: "Step 4 of 5",
      step_title_4: "Lifestyle",
      values_label: "Which of these values matter most to you in life?",
      values_other_label: "Anything else that matters deeply to you?",
      typical_week_label: "What does your typical week look like?",
      ideal_weekend_label: "What's your ideal way to spend a weekend together?",

      step_count_5: "Step 5 of 5",
      step_title_5: "Photos & video",
      portrait_label: "Upload your best latest portrait photo",
      fulllength_label: "Upload your best latest full-length photo",
      video_label: "Leave a short video introduction (optional)",
      upload_click: "Click to choose a file or drag here",
      upload_hint_10: "Size limit: 10 MB",
      upload_hint_200: "Size limit: 200 MB",

      btn_back: "Back",
      btn_continue: "Continue",
      btn_submit: "Submit application",
      btn_sending: "Sending…",

      done_eyebrow: "Application received",
      done_title_1: "Thank",
      done_title_2: "you",
      done_lede: "Your application is in. Anya reviews every submission personally — if it looks like a good fit, you'll hear from her directly.",

      select_placeholder: "Select one",
      error_generic: "Something went wrong sending your application. Please try again in a moment."
    },

    es: {
      hero_role: "MatchMatch · Fundadora",
      eyebrow_city: "Ciudad de México",
      hero_title_1: "Solicitud",
      hero_title_2: "de novio",
      lede_intro: "¿Crees que podríamos ser una buena pareja? Cuéntame sobre ti, con honestidad y en tus propias palabras, y vamos a averiguarlo.",
      btn_start: "Comenzar la solicitud",

      step_count_1: "Paso 1 de 5",
      step_title_1: "Información general",
      full_name_label: "¿Cuál es tu nombre completo?",
      instagram_label: "¿Cuál es tu Instagram?",
      age_label: "¿Cuántos años tienes?",
      height_label: "¿Cuánto mides? (cm)",
      city_label: "¿Dónde vives?",
      city_ph: "Ciudad / colonia",
      living_situation_label: "¿Cuál es tu situación de vivienda actual?",
      smoke_label: "¿Fumas?",
      drink_label: "¿Bebes alcohol?",
      religious_label: "¿Eres religioso?",
      religious_detail_label: "Si aplica — ¿cuánto influye en tu vida diaria? (opcional)",
      religious_detail_ph: "Valores, estilo de vida, festividades, cómo criarías a tus hijos — lo que sea cierto para ti",
      has_kids_label: "¿Tienes hijos?",
      wants_kids_label: "¿Quieres tener hijos?",
      political_views_label: "¿Cuáles son tus opiniones políticas? (opcional)",
      occupation_label: "¿Cuál es tu puesto de trabajo u ocupación actual?",
      income_label: "¿Cuál es tu ingreso mensual aproximado? (USD)",

      step_count_2: "Paso 2 de 5",
      step_title_2: "Relación",
      relationship_type_label: "¿Qué tipo de relación estás buscando?",
      relationship_vision_label: "¿Cómo te imaginas este tipo de relación que buscas?",
      relationship_vision_ph: "Cuéntame cómo se vería esta relación en tu día a día: cómo pasarían tiempo juntos, si vivirían juntos, y cualquier otra cosa que sea importante para ti.",
      finances_handling_label: "¿Cómo prefieres manejar las finanzas en una relación?",
      finances_detail_label: "Cuéntame más sobre el arreglo financiero que prefieres.",
      finances_detail_ph: "¿Cómo se vería esto en la práctica, sobre todo cuando la relación se vuelve más seria?",
      gender_roles_label: "¿Cómo ves los roles del hombre y la mujer en una relación?",
      gender_roles_ph: "¿Hay roles, responsabilidades o expectativas que consideres importantes?",
      good_partner_meaning_label: "¿Qué significa para ti ser una buena pareja?",
      what_makes_you_great_label: "¿Qué te hace una gran pareja?",
      looking_for_partner_label: "¿Qué buscas en una pareja?",
      show_care_label: "¿Cómo te gusta mostrar cariño y generosidad en una relación?",
      why_good_match_label: "¿Por qué crees que seríamos una buena pareja?",
      non_negotiables_label: "¿Cuáles son tus innegociables en una relación?",
      conflict_handling_label: "¿Cómo sueles manejar los conflictos en una relación?",
      cheating_definition_label: "¿Qué consideras infidelidad en una relación?",
      communication_skill_label: "¿Qué tan bueno eres comunicándote en una relación?",

      step_count_3: "Paso 3 de 5",
      step_title_3: "Personalidad",
      life_focus_label: "¿En qué te estás enfocando actualmente en tu vida, fuera de una relación?",
      life_focus_ph: "Cuéntame sobre las metas, proyectos, experiencias o crecimiento personal en los que te estás enfocando.",
      parents_relationship_label: "¿Cómo describirías tu relación con tus padres?",
      parents_relationship_ph: "Cuéntame un poco cómo es esa relación hoy y qué tan presentes están el uno en la vida del otro.",
      last_relationship_ended_label: "¿Cuándo terminó tu última relación seria y por qué?",
      therapy_label: "¿Has estado en terapia?",
      improving_self_label: "¿Qué es algo en lo que estás trabajando para mejorar como persona?",
      love_give_label: "¿Cuáles son tus lenguajes del amor? ¿Cómo sueles demostrar amor?",
      love_receive_label: "¿Cuáles son tus lenguajes del amor? ¿Cómo te sientes amado?",

      step_count_4: "Paso 4 de 5",
      step_title_4: "Estilo de vida",
      values_label: "¿Cuáles de estos valores son los más importantes para ti en la vida?",
      values_other_label: "¿Algo más que sea muy importante para ti?",
      typical_week_label: "¿Cómo es una semana típica para ti?",
      ideal_weekend_label: "¿Cuál sería tu forma ideal de pasar un fin de semana juntos?",

      step_count_5: "Paso 5 de 5",
      step_title_5: "Fotos y video",
      portrait_label: "Sube tu mejor foto de retrato reciente",
      fulllength_label: "Sube tu mejor foto de cuerpo completo reciente",
      video_label: "Deja un breve video de presentación (opcional)",
      upload_click: "Haz clic para elegir un archivo o arrástralo aquí",
      upload_hint_10: "Límite de tamaño: 10 MB",
      upload_hint_200: "Límite de tamaño: 200 MB",

      btn_back: "Atrás",
      btn_continue: "Continuar",
      btn_submit: "Enviar solicitud",
      btn_sending: "Enviando…",

      done_eyebrow: "Solicitud recibida",
      done_title_1: "Muchas",
      done_title_2: "gracias",
      done_lede: "Tu solicitud fue enviada. Anya revisa cada solicitud personalmente — si parece una buena opción, te contactará directamente.",

      select_placeholder: "Selecciona una opción",
      error_generic: "Algo salió mal al enviar tu solicitud. Por favor, inténtalo de nuevo en un momento."
    }
  };

  // English option value -> Spanish display text. Option `value` attributes
  // stay in English always, so submitted data is language-independent.
  var OPTION_ES = {
    "Living alone": "Vivo solo",
    "Living with roommates": "Vivo con compañeros de piso",
    "Living with family": "Vivo con mi familia",
    "Other": "Otro",
    "No": "No",
    "Sometimes": "A veces",
    "Trying to quit": "Intentando dejarlo",
    "Occasionally": "Ocasionalmente",
    "Yes": "Sí",
    "Socially": "Socialmente",
    "Not religious / atheist": "No soy religioso / ateo",
    "Agnostic": "Agnóstico",
    "Spiritual but not religious": "Espiritual, pero no religioso",
    "Christian — Catholic": "Cristiano — Católico",
    "Christian — Protestant": "Cristiano — Protestante",
    "Christian — Orthodox": "Cristiano — Ortodoxo",
    "Christian — other": "Cristiano — otro",
    "Jewish": "Judío",
    "Muslim": "Musulmán",
    "Buddhist": "Budista",
    "Hindu": "Hindú",
    "Maybe": "Tal vez",
    "Not sure yet": "Aún no estoy seguro",
    "Apolitical": "Apolítico",
    "Moderate": "Moderado",
    "Left": "Izquierda",
    "Right": "Derecha",
    "Socialist": "Socialista",
    "Under $1,000": "Menos de $1,000",
    "Prefer not to say": "Prefiero no decir",
    "Long-term relationship / marriage": "Relación a largo plazo / matrimonio",
    "Serious relationship, not rushing marriage": "Relación seria, sin prisa por casarme",
    "Casual, open to see where it goes": "Casual, abierto a ver qué pasa",
    "The man takes full financial responsibility": "El hombre asume toda la responsabilidad económica",
    "The man provides, but expects the woman to contribute financially too": "El hombre provee, pero espera que la mujer también contribuya económicamente",
    "Both partners split expenses equally (50/50)": "Ambos dividen los gastos por igual (50/50)",
    "Both partners contribute proportionally to their income": "Ambos contribuyen proporcionalmente a sus ingresos",
    "Each partner keeps their finances separate": "Cada quien mantiene sus finanzas por separado",
    "Words of affirmation": "Palabras de afirmación",
    "Quality time": "Tiempo de calidad",
    "Acts of service": "Actos de servicio",
    "Physical touch": "Contacto físico",
    "Gift giving": "Dar regalos",
    "Family": "Familia",
    "Financial security": "Seguridad financiera",
    "Career & ambition": "Carrera y ambición",
    "Freedom & independence": "Libertad e independencia",
    "Love & partnership": "Amor y compañía",
    "Personal growth": "Crecimiento personal",
    "Health & wellbeing": "Salud y bienestar",
    "Peace of mind": "Tranquilidad",
    "Spirituality / faith": "Espiritualidad / fe",
    "Community & friends": "Comunidad y amistades",
    "Creativity": "Creatividad",
    "Fun & enjoying life": "Diversión y disfrutar la vida",
    "Trying a new restaurant, museum, concert etc": "Probar un restaurante nuevo, museo, concierto, etc.",
    "Movie night at home": "Noche de película en casa",
    "Outdoor adventure": "Aventura al aire libre",
    "A road trip / exploring somewhere by car": "Un road trip / explorar en coche",
    "Something spontaneous and unplanned": "Algo espontáneo y sin planear",
    "Spa day, rooftop pool, or other wellness experience": "Día de spa, alberca en rooftop, u otra experiencia de bienestar",
    "A beach or resort getaway": "Una escapada a la playa o un resort",
    "Getting dressed up and going somewhere special": "Arreglarse e ir a algún lugar especial",
    "Hang out with our friends and family": "Pasar tiempo con amigos y familia"
  };

  var currentLang = "en";

  function t(key) {
    return (STRINGS[currentLang] && STRINGS[currentLang][key]) || STRINGS.en[key] || "";
  }

  function optionText(value) {
    if (currentLang === "es" && OPTION_ES[value]) return OPTION_ES[value];
    return value;
  }

  function applyLanguage(lang) {
    currentLang = STRINGS[lang] ? lang : "en";

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder")));
    });

    // upload zone default text — skip elements currently showing a chosen filename
    document.querySelectorAll(".upload").forEach(function (wrap) {
      if (wrap.classList.contains("has-file")) return;
      var text = wrap.querySelector(".upload__text");
      if (text) text.textContent = t("upload_click");
    });

    // select placeholder ("Select one")
    document.querySelectorAll('option[value=""]').forEach(function (opt) {
      opt.textContent = t("select_placeholder");
    });

    // real select options — value attribute stays English, display text swaps
    document.querySelectorAll("select option[value]:not([value=''])").forEach(function (opt) {
      opt.textContent = optionText(opt.value);
    });

    // checkbox labels
    document.querySelectorAll(".check").forEach(function (check) {
      var input = check.querySelector("input");
      var span = check.querySelector("span");
      if (input && span) span.textContent = optionText(input.value);
    });

    // submit button reflects "sending" state if mid-submit
    if (submitBtn && submitBtn.disabled) {
      submitBtn.textContent = t("btn_sending");
    }

    document.documentElement.setAttribute("lang", currentLang);
    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === currentLang);
    });

    try { localStorage.setItem("mm_lang", currentLang); } catch (e) {}
  }

  /* ---------------- stepper ---------------- */

  var steps = Array.prototype.slice.call(document.querySelectorAll(".step"));
  var form = document.getElementById("appForm");
  var progressFill = document.getElementById("progressFill");
  var errorBox = document.getElementById("formError");
  var submitBtn = document.getElementById("submitBtn");
  var current = 0;
  var TOTAL = steps.length - 1; // exclude the "done" screen from the count

  function showStep(index) {
    steps.forEach(function (el) {
      el.dataset.active = String(Number(el.dataset.step) === index);
    });
    current = index;
    progressFill.style.width = (index / TOTAL) * 100 + "%";
    window.scrollTo({ top: 0, behavior: "smooth" });
    saveDraft();
  }

  /* ---------------- draft autosave ---------------- */

  var DRAFT_KEY = "mm_boyfriend_draft";

  function saveDraft() {
    try {
      var data = {};
      Array.from(form.elements).forEach(function (el) {
        if (!el.name || el.type === "file") return;
        if (el.type === "checkbox") {
          if (!el.checked) return;
          if (!Array.isArray(data[el.name])) data[el.name] = [];
          data[el.name].push(el.value);
          return;
        }
        data[el.name] = el.value;
      });
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ step: current, fields: data }));
    } catch (e) {}
  }

  function restoreDraft() {
    var raw;
    try { raw = localStorage.getItem(DRAFT_KEY); } catch (e) { return; }
    if (!raw) return;
    var draft;
    try { draft = JSON.parse(raw); } catch (e) { return; }
    if (!draft || !draft.fields) return;

    Object.keys(draft.fields).forEach(function (name) {
      var value = draft.fields[name];
      var els = form.querySelectorAll('[name="' + name + '"]');
      if (!els.length) return;
      if (els[0].type === "checkbox") {
        var arr = Array.isArray(value) ? value : [value];
        els.forEach(function (el) { el.checked = arr.indexOf(el.value) !== -1; });
        return;
      }
      els[0].value = value;
    });

    if (sliderOut && slider) sliderOut.textContent = slider.value;

    if (typeof draft.step === "number" && draft.step >= 0 && draft.step <= TOTAL) {
      showStep(draft.step);
    }
  }

  function clearDraft() {
    try { localStorage.removeItem(DRAFT_KEY); } catch (e) {}
  }

  form.addEventListener("input", saveDraft);
  form.addEventListener("change", saveDraft);

  function fieldsInStep(index) {
    var el = steps.find(function (s) { return Number(s.dataset.step) === index; });
    if (!el) return [];
    return Array.prototype.slice.call(el.querySelectorAll("input, select, textarea"));
  }

  function validateStep(index) {
    var fields = fieldsInStep(index);
    var valid = true;
    fields.forEach(function (f) {
      if (!f.checkValidity()) {
        valid = false;
      }
    });
    if (!valid) {
      var firstInvalid = fields.find(function (f) { return !f.checkValidity(); });
      if (firstInvalid) firstInvalid.reportValidity();
    }
    return valid;
  }

  document.querySelectorAll("[data-next]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (current > 0 && !validateStep(current)) return;
      if (current < TOTAL) showStep(current + 1);
    });
  });

  document.querySelectorAll("[data-prev]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (current > 0) showStep(current - 1);
    });
  });

  // slider live output
  var slider = document.getElementById("communication_skill");
  var sliderOut = document.getElementById("communication_skill_out");
  if (slider) {
    slider.addEventListener("input", function () {
      sliderOut.textContent = slider.value;
    });
  }

  // upload zone feedback
  document.querySelectorAll("[data-upload]").forEach(function (wrap) {
    var input = wrap.querySelector("input[type=file]");
    var text = wrap.querySelector(".upload__text");
    input.addEventListener("change", function () {
      if (input.files && input.files[0]) {
        wrap.classList.add("has-file");
        text.textContent = input.files[0].name;
      } else {
        wrap.classList.remove("has-file");
        text.textContent = t("upload_click");
      }
    });
  });

  function showError(message) {
    errorBox.textContent = message;
    errorBox.hidden = false;
  }
  function clearError() {
    errorBox.hidden = true;
    errorBox.textContent = "";
  }

  var cachedAccessToken = null;

  function getAccessToken() {
    if (cachedAccessToken) return Promise.resolve(cachedAccessToken);
    return fetch("/api/token")
      .then(function (res) {
        if (!res.ok) throw new Error("token_failed");
        return res.json();
      })
      .then(function (data) {
        cachedAccessToken = data.accessToken;
        return cachedAccessToken;
      });
  }

  function uploadFileDirectly(folderId, file) {
    if (!file) return Promise.resolve("");
    return getAccessToken().then(function (token) {
      // 1. Browser itself initiates the resumable session — Google only
      // returns CORS headers on the follow-up PUT when the session was
      // started with the browser's real Origin header.
      return fetch(
        "https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable&supportsAllDrives=true",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json; charset=UTF-8",
            "X-Upload-Content-Type": file.type || "application/octet-stream",
          },
          body: JSON.stringify({ name: file.name, parents: [folderId] }),
        }
      )
        .then(function (initRes) {
          if (!initRes.ok) throw new Error("upload_session_failed");
          var uploadUrl = initRes.headers.get("location");
          if (!uploadUrl) throw new Error("no_upload_url");
          return fetch(uploadUrl, {
            method: "PUT",
            headers: { "Content-Type": file.type || "application/octet-stream" },
            body: file,
          });
        })
        .then(function (res) {
          if (!res.ok) throw new Error("upload_failed");
          return res.json();
        })
        .then(function (fileData) {
          return fileData.webViewLink || ("https://drive.google.com/file/d/" + fileData.id + "/view");
        });
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    clearError();

    if (!validateStep(5)) return;

    var data = new FormData(form);
    var fullName = data.get("full_name") || "Unnamed";

    var portraitFile = data.get("portrait_photo");
    var fulllengthFile = data.get("fulllength_photo");
    var videoFile = data.get("intro_video");

    // build the text-only payload (skip file inputs, collect repeated
    // checkbox keys like love_language_give/values into arrays)
    var payload = {};
    Array.from(form.elements).forEach(function (el) {
      if (!el.name || el.type === "file") return;
      if (el.type === "checkbox") {
        if (!el.checked) return;
        if (!Array.isArray(payload[el.name])) payload[el.name] = [];
        payload[el.name].push(el.value);
        return;
      }
      payload[el.name] = el.value;
    });

    submitBtn.disabled = true;
    submitBtn.textContent = t("btn_sending");

    fetch("/api/create-folder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: fullName }),
    })
      .then(function (res) {
        if (!res.ok) throw new Error("create_folder_failed");
        return res.json();
      })
      .then(function (folder) {
        payload.folderLink = folder.folderLink;
        return Promise.all([
          uploadFileDirectly(folder.folderId, portraitFile && portraitFile.size ? portraitFile : null),
          uploadFileDirectly(folder.folderId, fulllengthFile && fulllengthFile.size ? fulllengthFile : null),
          uploadFileDirectly(folder.folderId, videoFile && videoFile.size ? videoFile : null),
        ]);
      })
      .then(function (links) {
        payload.portraitLink = links[0];
        payload.fulllengthLink = links[1];
        payload.videoLink = links[2];
        return fetch("/api/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      })
      .then(function (res) {
        if (!res.ok) throw new Error("Request failed: " + res.status);
        clearDraft();
        showStep(6);
      })
      .catch(function (err) {
        showError(t("error_generic"));
        submitBtn.disabled = false;
        submitBtn.textContent = t("btn_submit");
      });
  });

  document.querySelectorAll(".lang-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyLanguage(btn.getAttribute("data-lang"));
    });
  });

  var savedLang = "en";
  try { savedLang = localStorage.getItem("mm_lang") || "en"; } catch (e) {}
  applyLanguage(savedLang);

  showStep(0);
  restoreDraft();
})();
