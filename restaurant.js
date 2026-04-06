import { db } from "./firebase-config.js";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

const auth = getAuth();

let donations = [];

window.addDonation = addDonation;

async function addDonation() {
  const user = auth.currentUser;
  if (!user) return;

  const donation = {
    name: document.getElementById("foodName").value,
    type: document.getElementById("foodType").value,
    qty: document.getElementById("quantity").value,
    expiry: document.getElementById("expiry").value,
    location: document.getElementById("donationLocation").value,
    pickupDate: document.getElementById("pickupDate").value,
    pickupTime: document.getElementById("pickupTime").value,
    uid: user.uid
  };

  try {
    await addDoc(collection(db, "donations"), donation);
    alert("Saved!");

    clearForm();
    loadDonations();
  } catch (err) {
    console.log(err);
  }
}

async function loadDonations() {
  const user = auth.currentUser;
  if (!user) return;

  const q = query(collection(db, "donations"), where("uid", "==", user.uid));
  const snap = await getDocs(q);

  donations = [];

  snap.forEach(docSnap => {
    donations.push({
      id: docSnap.id,
      ...docSnap.data()
    });
  });

  displayDonations();
}

function displayDonations() {
  const container = document.getElementById("donationList");
  container.innerHTML = "";

  donations.forEach(item => {
    const div = document.createElement("div");
    div.className = "listing";

    div.innerHTML = `
      <h3>${item.name}</h3>
      <p>${item.type} | ${item.qty} kg</p>
      <p>${item.location}</p>
      <button class="delete-btn">Delete</button>
    `;

    container.appendChild(div);

    const btn = div.querySelector(".delete-btn");

    btn.addEventListener("click", function () {
      alert("Donation marked as deleted");

      div.classList.add("deleted");   // turn grey
      btn.disabled = true;            // disable button
      btn.textContent = "Deleted";
    });
  });
}

function clearForm() {
  document.getElementById("foodName").value = "";
  document.getElementById("quantity").value = "";
  document.getElementById("expiry").value = "";
  document.getElementById("donationLocation").value = "";
  document.getElementById("pickupDate").value = "";
  document.getElementById("pickupTime").value = "";
}

loadDonations();