import { ENABLE_BACKEND } from "./config";

export async function saveProfile(data: any) {
  if (!ENABLE_BACKEND) {
    localStorage.setItem("relationship_profile", JSON.stringify(data));
    return;
  }

  await fetch("/api/relationship-profile", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
