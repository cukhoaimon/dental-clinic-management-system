let credential = {
  phone: "123",
  password: "123",
};

let detail = {
  id: 1,
  name: "Nguyễn Văn A",
  phone: "123",
};

export async function loginApi({ phone, password }) {
  if (phone !== credential.phone)
    throw new Error("Số điện thoại không tồn tại");

  if (password !== credential.password)
    throw new Error("Mật khẩu không chính xác");

  return true;

  // TODO: call api
  // const response = await fetch("http://localhost:3000/api/auth/login", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ phoneNum, password }),
  // });
  // const data = await response.json();
  // if (response.ok) {
  //   return data;
  // } else {
  //   throw new Error(data.message);
  // }
}

export async function getCurrentUser() {
  // TODO: call api
  const phone = "123";

  if (!phone) return null;

  if (phone !== credential.phone) return null;

  return { ...detail, role: "authenticated" };
}
