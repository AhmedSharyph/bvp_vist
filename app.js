const API_URL = "YOUR_APPS_SCRIPT_WEBAPP_URL";

function saveVisit() {
  const record = {
    staff_name: staff.value,
    patient_name: patient.value,
    visit_type: "Bedridden",
    notes: notes.value
  };

  let visits = JSON.parse(localStorage.getItem("visits") || "[]");
  visits.push(record);
  localStorage.setItem("visits", JSON.stringify(visits));

  alert("Saved offline");
}

async function syncData() {
  let visits = JSON.parse(localStorage.getItem("visits") || "[]");
  if (!visits.length) return;

  for (let v of visits) {
    await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(v)
    });
  }

  localStorage.removeItem("visits");
  alert("Synced successfully");
}

window.addEventListener("online", syncData);
