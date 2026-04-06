import { auth, db } from "./firebase-config.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

import {
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

async function signupDonor() {
  const businessName = document.getElementById("donor-name")?.value.trim();
  const contactName = document.getElementById("donor-contact")?.value.trim();
  const email = document.getElementById("donor-signup-email")?.value.trim();
  const phone = document.getElementById("donor-phone")?.value.trim();
  const address = document.getElementById("donor-address")?.value.trim();
  const password = document.getElementById("donor-new-password")?.value;
  const confirmPassword = document.getElementById("donor-confirm-password")?.value;

  if (!businessName || !contactName || !email || !phone || !address || !password || !confirmPassword) {
    alert("Please fill in all donor signup fields.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      role: "donor",
      businessName: businessName,
      contactName: contactName,
      email: email,
      phone: phone,
      address: address,
      createdAt: new Date().toISOString()
    });

    alert("Donor account created successfully.");
    window.location.href = "donor-dashboard.html";
  } catch (error) {
    alert("Donor signup failed: " + error.message);
  }
}

async function loginDonor() {
  const email = document.getElementById("donor-email")?.value.trim();
  const password = document.getElementById("donor-password")?.value;

  if (!email || !password) {
    alert("Please enter donor email and password.");
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists() && userDoc.data().role === "donor") {
      window.location.href = "donor-dashboard.html";
    } else {
      alert("This account is not registered as a donor.");
    }
  } catch (error) {
    if (error.code === "auth/invalid-credential") {
      alert("Incorrect donor email or password.");
    } else if (error.code === "auth/invalid-email") {
      alert("Invalid email format.");
    } else {
      alert("Donor login failed: " + error.message);
    }
  }
}

async function signupFoodBank() {
  const foodBankName = document.getElementById("foodbank-name")?.value.trim();
  const contactName = document.getElementById("foodbank-contact")?.value.trim();
  const email = document.getElementById("foodbank-signup-email")?.value.trim();
  const phone = document.getElementById("foodbank-phone")?.value.trim();
  const address = document.getElementById("foodbank-address")?.value.trim();
  const password = document.getElementById("foodbank-new-password")?.value;
  const confirmPassword = document.getElementById("foodbank-confirm-password")?.value;

  if (!foodBankName || !contactName || !email || !phone || !address || !password || !confirmPassword) {
    alert("Please fill in all food bank signup fields.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      role: "foodbank",
      foodBankName: foodBankName,
      contactName: contactName,
      email: email,
      phone: phone,
      address: address,
      createdAt: new Date().toISOString()
    });

    alert("Food bank account created successfully.");
    window.location.href = "foodbank-dashboard.html";
  } catch (error) {
    alert("Food bank signup failed: " + error.message);
  }
}

async function loginFoodBank() {
  const email = document.getElementById("foodbank-email")?.value.trim();
  const password = document.getElementById("foodbank-password")?.value;

  if (!email || !password) {
    alert("Please enter food bank email and password.");
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists() && userDoc.data().role === "foodbank") {
      window.location.href = "foodbank-dashboard.html";
    } else {
      alert("This account is not registered as a food bank.");
    }
  } catch (error) {
    if (error.code === "auth/invalid-credential") {
      alert("Incorrect food bank email or password.");
    } else if (error.code === "auth/invalid-email") {
      alert("Invalid email format.");
    } else {
      alert("Food bank login failed: " + error.message);
    }
  }
}

const donorSignupForm = document.getElementById("donor-signup-form");
if (donorSignupForm) {
  donorSignupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    signupDonor();
  });
}

const donorLoginForm = document.getElementById("donor-login-form");
if (donorLoginForm) {
  donorLoginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    loginDonor();
  });
}

const foodBankSignupForm = document.getElementById("foodbank-signup-form");
if (foodBankSignupForm) {
  foodBankSignupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    signupFoodBank();
  });
}

const foodBankLoginForm = document.getElementById("foodbank-login-form");
if (foodBankLoginForm) {
  foodBankLoginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    loginFoodBank();
  });
}