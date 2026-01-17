export const isAuthenticated = () => {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("bandhan_token");
};

export const logout = () => {
  localStorage.removeItem("bandhan_token");
  localStorage.removeItem("bandhan_user");
  window.location.href = "/login";
};
