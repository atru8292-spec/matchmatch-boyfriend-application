const questions = require("./questions.js");
const fs = require("fs");
const path = require("path");

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// alternate label alignment inside pills for the quiet "detail rhythm" from the reference
let alignToggle = 0;
function nextAlign() {
  alignToggle = (alignToggle + 1) % 2;
  return alignToggle === 0 ? "left" : "right";
}

function renderSingleField(f, idx) {
  const id = f.name;
  const req = f.required ? "required" : "";
  if (f.type === "text") {
    return `<input type="text" id="${id}" name="${id}" class="pill-input" ${f.placeholder ? `placeholder="${esc(f.placeholder)}"` : ""} ${req}>`;
  }
  if (f.type === "number") {
    return `<input type="number" id="${id}" name="${id}" class="pill-input" ${f.min != null ? `min="${f.min}"` : ""} ${f.max != null ? `max="${f.max}"` : ""} ${req}>`;
  }
  if (f.type === "textarea") {
    return `<textarea id="${id}" name="${id}" class="area-input" rows="4" ${req}></textarea>`;
  }
  if (f.type === "select") {
    const opts = f.options.map((o) => `<option>${esc(o)}</option>`).join("");
    return `<select id="${id}" name="${id}" class="pill-input pill-select" ${req}>
      <option value="" disabled selected hidden>Select one</option>${opts}
    </select>`;
  }
  if (f.type === "slider") {
    return `<div class="slider">
      <input type="range" id="${id}" name="${id}" min="${f.min}" max="${f.max}" value="${f.value}">
      <output for="${id}" id="${id}_out">${f.value}</output>
    </div>
    <div class="slider__scale"><span>${f.min}</span><span>${f.max}</span></div>`;
  }
  if (f.type === "checks") {
    const chips = f.options
      .map((o) => `<label class="check"><input type="checkbox" name="${id}" value="${esc(o)}"><span>${esc(o)}</span></label>`)
      .join("\n          ");
    return `<div class="checks">\n          ${chips}\n        </div>`;
  }
  if (f.type === "file") {
    return `<div class="upload" data-upload>
      <input type="file" id="${id}" name="${id}" accept="${f.accept}" ${req}>
      <div class="upload__zone">
        <span class="upload__text">Click to choose a file or drag here</span>
        <span class="upload__hint">${esc(f.hint || "")}</span>
      </div>
    </div>`;
  }
  return "";
}

function renderStep(f, stepIndex, counter, isLast) {
  const isTextlike = f.type === "text" || f.type === "number";
  const needsContinueOnly = f.type === "checks" || f.type === "file" || f.type === "textarea" || f.type === "slider" || f.pair;

  let body = "";
  if (f.pair) {
    body = `<div class="field-row">
      ${f.pair
        .map((sub) => {
          const align = nextAlign();
          return `<div class="field" data-align="${align}">
        <label for="${sub.name}">${esc(sub.label)}</label>
        ${renderSingleField(sub, 0)}
      </div>`;
        })
        .join("\n      ")}
    </div>`;
  } else {
    const align = f.type === "text" || f.type === "number" || f.type === "select" ? nextAlign() : "left";
    const srLabel = f.type === "checks" || f.type === "file" ? "" : `<label class="sr-only" for="${f.name}">${esc(f.label)}</label>`;
    body = `<div class="field" data-align="${align}">
      ${srLabel}
      ${f.helper ? `<p class="q__helper">${esc(f.helper)}</p>` : ""}
      ${renderSingleField(f, 0)}
    </div>`;
  }

  return `  <!-- ${counter} — ${f.name || (f.pair ? f.pair.map((p) => p.name).join("/") : "")} -->
  <section class="step" data-step="${stepIndex}">
    <p class="q__count">/${String(counter).padStart(2, "0")}</p>
    <p class="q__eyebrow">${esc(f.section)}</p>
    <h2 class="q__label">${esc(f.label)}</h2>
    ${body}
    <p class="error" id="err_${stepIndex}" role="alert" hidden></p>
    <div class="step__nav">
      <button type="button" class="btn btn--ghost" data-prev>Back</button>
      <button type="button" class="btn btn--primary" data-next>${
        isLast ? "Submit application" : needsContinueOnly ? "Continue" : "Continue <span class=\"kbd\">↵</span>"
      }</button>
    </div>
  </section>`;
}

const stepsHtml = questions.map((f, i) => renderStep(f, i + 1, i + 1, i === questions.length - 1)).join("\n\n");
const totalSteps = questions.length;

const template = fs.readFileSync(path.join(__dirname, "template.html"), "utf8");
const out = template
  .replace("<!--STEPS-->", stepsHtml)
  .replace("<!--DONE_STEP-->", String(totalSteps + 1));

fs.writeFileSync(path.join(__dirname, "..", "index.html"), out);
console.log(`Generated index.html with ${totalSteps} question screens.`);
