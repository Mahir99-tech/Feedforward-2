import { db } from "./firebase-config.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

let allDonations = [];

window.filterDonations = filterDonations;

async function loadDonations() {
  try {
    const querySnapshot = await getDocs(collection(db, "donations"));

    allDonations = [];

    querySnapshot.forEach((doc) => {
      allDonations.push(doc.data());
    });

    displayDonations(allDonations);
  } catch (error) {
    console.error("Error loading donations:", error);
    document.getElementById("donations").innerHTML = "<p>Could not load donations.</p>";
  }
}

function displayDonations(list) {
  const container = document.getElementById("donations");
  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = "<p>No donations available yet.</p>";
    return;
  }

  for (let i = 0; i < list.length; i++) {
    const item = list[i];

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML =
      "<h3>" + item.name + "</h3>" +
      "<p><strong>Type:</strong> " + item.type + "</p>" +
      "<p><strong>Quantity:</strong> " + item.qty + " kg</p>" +
      "<p><strong>Best Before:</strong> " + item.expiry + "</p>" +
      "<p><strong>Location:</strong> " + item.location + "</p>" +
      "<p><strong>Pickup Date:</strong> " + item.pickupDate + "</p>" +
      "<p><strong>Pickup Time:</strong> " + item.pickupTime + "</p>" +
      "<button class='claim-btn'>Claim</button>";

    container.appendChild(card);

    const btn = card.querySelector(".claim-btn");

    btn.addEventListener("click", function () {
      alert("Food claimed! Coordinate pickup manually.");

      card.classList.add("claimed");
      btn.disabled = true;
      btn.textContent = "Claimed";
    });
  }
}

function filterDonations() {
  const type = document.getElementById("filterType").value;

  if (type === "all") {
    displayDonations(allDonations);
    return;
  }

  const filtered = [];

  for (let i = 0; i < allDonations.length; i++) {
    if (allDonations[i].type === type) {
      filtered.push(allDonations[i]);
    }
  }

  displayDonations(filtered);
}

loadDonations();