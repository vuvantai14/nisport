import {
  ADMIN_EMAIL,
  getUsers,
  initCommonLayout,
  saveUsers,
  setCurrentUser,
  showCenterNotice
} from "./common.js";

function setAuthMessage(element, message, type) {
  if (!element) return;
  element.textContent = message;
  element.className = `auth-message ${type}`;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function seedAdminAccount() {
  const users = getUsers();
  const adminIndex = users.findIndex((user) => user.email === ADMIN_EMAIL);
  const adminUser = {
    id: adminIndex === -1 ? 1 : users[adminIndex].id,
    firstName: "Admin",
    lastName: "Ni Sport",
    fullName: "Admin Ni Sport",
    email: ADMIN_EMAIL,
    phone: "",
    address: "",
    role: "admin",
    createdAt: users[adminIndex]?.createdAt || new Date().toISOString()
  };

  if (adminIndex === -1) users.push(adminUser);
  else users[adminIndex] = { ...users[adminIndex], ...adminUser };
  saveUsers(users);
}

export function initRegister() {
  const registerForm = document.getElementById("registerForm");
  const registerMessage = document.getElementById("registerMessage");
  if (!registerForm) return;

  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const lastName = document.getElementById("lastName").value.trim();
    const firstName = document.getElementById("firstName").value.trim();
    const email = document.getElementById("registerEmail").value.trim().toLowerCase();
    const password = document.getElementById("registerPassword").value.trim();
    const users = getUsers();

    if (!lastName || !firstName || !email || !password) {
      setAuthMessage(registerMessage, "Vui lòng nhập đầy đủ thông tin.", "error");
      return;
    }
    if (!isValidEmail(email)) {
      setAuthMessage(registerMessage, "Email chưa đúng định dạng.", "error");
      return;
    }
    if (password.length < 6) {
      setAuthMessage(registerMessage, "Mật khẩu cần có ít nhất 6 ký tự.", "error");
      return;
    }
    if (users.some((user) => user.email === email)) {
      setAuthMessage(registerMessage, "Email này đã được đăng ký. Vui lòng đăng nhập.", "error");
      return;
    }

    users.push({
      id: Date.now(),
      lastName,
      firstName,
      fullName: `${lastName} ${firstName}`.trim(),
      email,
      phone: "",
      address: "",
      role: "customer",
      createdAt: new Date().toISOString()
    });
    saveUsers(users);
    setAuthMessage(registerMessage, "Tạo tài khoản thành công.", "success");
    showCenterNotice("Tạo tài khoản thành công. Giai đoạn sau sẽ đăng nhập bằng API thật.", "success", () => {
      window.location.href = "login.html";
    });
  });
}

export function initLogin() {
  const loginForm = document.getElementById("loginForm");
  const loginMessage = document.getElementById("loginMessage");
  if (!loginForm) return;

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value.trim();
    const users = getUsers();

    if (!email || !password) {
      setAuthMessage(loginMessage, "Vui lòng nhập email và mật khẩu.", "error");
      return;
    }

    let user = null;
    if (email === ADMIN_EMAIL && password === "123456") {
      user = users.find((item) => item.email === ADMIN_EMAIL);
    } else {
      user = users.find((item) => item.email === email && item.role !== "admin");
    }

    if (!user || password.length < 6) {
      setAuthMessage(loginMessage, "Thông tin đăng nhập chưa hợp lệ.", "error");
      return;
    }

    setCurrentUser({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: user.fullName || `${user.lastName || ""} ${user.firstName || ""}`.trim(),
      email: user.email,
      phone: user.phone || "",
      address: user.address || "",
      role: user.role || "customer",
      createdAt: user.createdAt
    });

    setAuthMessage(loginMessage, "Đăng nhập thành công.", "success");
    showCenterNotice("Đăng nhập thành công.", "success", () => {
      window.location.href = user.role === "admin" ? "admin.html" : "index.html";
    });
  });
}

export function initAuthPage() {
  seedAdminAccount();
  initCommonLayout();
  initLogin();
  initRegister();
}

if (document.getElementById("loginForm") || document.getElementById("registerForm")) {
  initAuthPage();
}
