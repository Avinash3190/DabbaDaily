// Mock data layer simulating the backend microservices.
// Replace these functions with real fetch() calls to Spring Boot services later.

export type Role = "customer" | "admin";
export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  pincode?: string;
  role: Role;
  subscription?: "none" | "weekly" | "monthly";
};
export type MealType = "breakfast" | "lunch" | "dinner";
export type MenuItem = {
  id: string;
  name: string;
  description: string;
  mealType: MealType;
  veg: boolean;
  price: number;
  available: boolean;
  image?: string;
};
export type OrderStatus = "placed" | "preparing" | "out_for_delivery" | "delivered" | "cancelled";
export type PaymentMethod = "online" | "card" | "cod";
export type Order = {
  id: string;
  userId: string;
  items: { menuItemId: string; name: string; qty: number; price: number }[];
  total: number;
  status: OrderStatus;
  placedAt: string;
  address: string;
  paymentStatus: "pending" | "paid" | "failed";
  paymentMethod: PaymentMethod;
  deliveryOtp: string;
};
export type Notification = {
  id: string;
  userId: string;
  type: "email" | "sms" | "delivery";
  message: string;
  createdAt: string;
  read: boolean;
};

const K = {
  users: "tiffin.users",
  session: "tiffin.session",
  menu: "tiffin.menu",
  orders: "tiffin.orders",
  notifs: "tiffin.notifs",
};

const read = <T,>(k: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try { const v = localStorage.getItem(k); return v ? JSON.parse(v) as T : fallback; }
  catch { return fallback; }
};
const write = <T,>(k: string, v: T) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(k, JSON.stringify(v));
};

const uid = () => Math.random().toString(36).slice(2, 10);

// Seed default menu + admin once
export function seed() {
  if (typeof window === "undefined") return;
  if (!localStorage.getItem(K.menu)) {
    const menu: MenuItem[] = [
      { id: uid(), name: "Poha & Masala Chai", description: "Flattened rice with peanuts and a strong cup of chai", mealType: "breakfast", veg: true, price: 80, available: true },
      { id: uid(), name: "Egg Bhurji & Pav", description: "Spiced scrambled eggs with buttered pav", mealType: "breakfast", veg: false, price: 110, available: true },
      { id: uid(), name: "Dal Rice Thali", description: "Toor dal, jeera rice, sabzi, chapati, pickle", mealType: "lunch", veg: true, price: 150, available: true },
      { id: uid(), name: "Chicken Curry Thali", description: "Home-style chicken curry with rice, roti, salad", mealType: "lunch", veg: false, price: 220, available: true },
      { id: uid(), name: "Paneer Butter Masala Combo", description: "Paneer butter masala, 3 rotis, jeera rice", mealType: "dinner", veg: true, price: 200, available: true },
      { id: uid(), name: "Fish Fry Thali", description: "Konkani fish fry with rice, sol kadhi, chapati", mealType: "dinner", veg: false, price: 260, available: true },
    ];
    write(K.menu, menu);
  }
  const users = read<User[]>(K.users, []);
  if (!users.find(u => u.email === "admin@tiffin.in")) {
    users.push({ id: "admin-1", name: "Admin", email: "admin@tiffin.in", role: "admin" });
    write(K.users, users);
    const pw = read<Record<string, string>>("tiffin.pw", {});
    pw["admin@tiffin.in"] = "admin123";
    write("tiffin.pw", pw);
  }
}

// ---------- Auth Service ----------
export function register(input: { name: string; email: string; password: string; phone?: string }): User {
  const users = read<User[]>(K.users, []);
  if (users.some(u => u.email === input.email)) throw new Error("Email already registered");
  const user: User = { id: uid(), name: input.name, email: input.email, phone: input.phone, role: "customer", subscription: "none" };
  users.push(user);
  write(K.users, users);
  const pw = read<Record<string, string>>("tiffin.pw", {});
  // Simulated "encrypted" password (do NOT use in production)
  pw[input.email] = btoa(input.password);
  write("tiffin.pw", pw);
  setSession(user);
  return user;
}
export function login(email: string, password: string): User {
  const users = read<User[]>(K.users, []);
  const pw = read<Record<string, string>>("tiffin.pw", {});
  const u = users.find(x => x.email === email);
  if (!u) throw new Error("User not found");
  const stored = pw[email];
  const ok = stored === password || stored === btoa(password);
  if (!ok) throw new Error("Invalid password");
  setSession(u);
  return u;
}
export function logout() {
  if (typeof window !== "undefined") localStorage.removeItem(K.session);
}
export function getSession(): { user: User; token: string } | null {
  return read<{ user: User; token: string } | null>(K.session, null);
}
function setSession(user: User) {
  // Mock JWT
  const token = btoa(JSON.stringify({ sub: user.id, role: user.role, iat: Date.now() }));
  write(K.session, { user, token });
}

// Sign in / register a user coming from an OAuth provider (Google).
// No password is stored. Reuses an existing local user with the same email,
// otherwise creates one.
export function oauthSignIn(input: { email: string; name?: string }): User {
  const users = read<User[]>(K.users, []);
  let user = users.find(u => u.email === input.email);
  if (!user) {
    user = {
      id: uid(),
      name: input.name || input.email.split("@")[0],
      email: input.email,
      role: "customer",
      subscription: "none",
    };
    users.push(user);
    write(K.users, users);
  }
  setSession(user);
  return user;
}

// ---------- User Service ----------
export function updateProfile(userId: string, patch: Partial<User>): User {
  const users = read<User[]>(K.users, []);
  const idx = users.findIndex(u => u.id === userId);
  if (idx < 0) throw new Error("User not found");
  users[idx] = { ...users[idx], ...patch };
  write(K.users, users);
  const s = getSession();
  if (s?.user.id === userId) setSession(users[idx]);
  return users[idx];
}
export function getUser(userId: string): User | undefined {
  return read<User[]>(K.users, []).find(u => u.id === userId);
}
export function listUsers(): User[] { return read<User[]>(K.users, []); }
export function deleteUser(userId: string) {
  write(K.users, read<User[]>(K.users, []).filter(u => u.id !== userId));
}
export function setUserRole(userId: string, role: Role) {
  return updateProfile(userId, { role });
}

// ---------- Menu Service ----------
export function listMenu(): MenuItem[] { return read<MenuItem[]>(K.menu, []); }
export function saveMenuItem(item: MenuItem) {
  const menu = listMenu();
  const i = menu.findIndex(m => m.id === item.id);
  if (i >= 0) menu[i] = item; else menu.push({ ...item, id: uid() });
  write(K.menu, menu);
}
export function deleteMenuItem(id: string) {
  write(K.menu, listMenu().filter(m => m.id !== id));
}

// ---------- Order Service ----------
export function listOrders(userId?: string): Order[] {
  const all = read<Order[]>(K.orders, []);
  return userId ? all.filter(o => o.userId === userId) : all;
}
export function placeOrder(userId: string, items: Order["items"], address: string, paymentMethod: PaymentMethod = "online"): Order {
  const order: Order = {
    id: uid(),
    userId,
    items,
    total: items.reduce((s, i) => s + i.price * i.qty, 0),
    status: "placed",
    placedAt: new Date().toISOString(),
    address,
    paymentStatus: paymentMethod === "cod" ? "pending" : "pending",
    paymentMethod,
    deliveryOtp: Math.floor(1000 + Math.random() * 9000).toString(),
  };
  const orders = read<Order[]>(K.orders, []);
  orders.unshift(order);
  write(K.orders, orders);
  pushNotif(userId, "email", `Order #${order.id.slice(0,6)} placed. Total ₹${order.total} · OTP ${order.deliveryOtp}`);
  return order;
}
export function updateOrderStatus(orderId: string, status: OrderStatus) {
  const orders = read<Order[]>(K.orders, []);
  const i = orders.findIndex(o => o.id === orderId);
  if (i < 0) return;
  orders[i].status = status;
  write(K.orders, orders);
  pushNotif(orders[i].userId, "delivery", `Order #${orderId.slice(0,6)}: ${status.replace(/_/g, " ")}`);
}
export function cancelOrder(orderId: string) { updateOrderStatus(orderId, "cancelled"); }

// Confirm delivery using customer OTP. For COD, payment is collected on success.
export function confirmDeliveryWithOtp(orderId: string, otp: string): { ok: boolean; message: string } {
  const orders = read<Order[]>(K.orders, []);
  const i = orders.findIndex(o => o.id === orderId);
  if (i < 0) return { ok: false, message: "Order not found" };
  const o = orders[i];
  if (o.deliveryOtp !== otp.trim()) return { ok: false, message: "Invalid OTP" };
  o.status = "delivered";
  if (o.paymentMethod === "cod") o.paymentStatus = "paid";
  orders[i] = o;
  write(K.orders, orders);
  pushNotif(o.userId, "delivery", `Order #${orderId.slice(0,6)} delivered successfully${o.paymentMethod === "cod" ? " · cash collected" : ""}`);
  return { ok: true, message: "Delivered" };
}

// ---------- Payment Service ----------
export function processPayment(orderId: string): "paid" | "failed" {
  const orders = read<Order[]>(K.orders, []);
  const i = orders.findIndex(o => o.id === orderId);
  if (i < 0) return "failed";
  // Mock 95% success
  const result = Math.random() > 0.05 ? "paid" : "failed";
  orders[i].paymentStatus = result;
  write(K.orders, orders);
  pushNotif(orders[i].userId, "email", `Payment ${result} for order #${orderId.slice(0,6)}`);
  return result;
}

// ---------- Notification Service ----------
export function listNotifications(userId: string): Notification[] {
  return read<Notification[]>(K.notifs, []).filter(n => n.userId === userId);
}
export function markAllRead(userId: string) {
  const all = read<Notification[]>(K.notifs, []);
  write(K.notifs, all.map(n => n.userId === userId ? { ...n, read: true } : n));
}
function pushNotif(userId: string, type: Notification["type"], message: string) {
  const all = read<Notification[]>(K.notifs, []);
  all.unshift({ id: uid(), userId, type, message, createdAt: new Date().toISOString(), read: false });
  write(K.notifs, all);
}
