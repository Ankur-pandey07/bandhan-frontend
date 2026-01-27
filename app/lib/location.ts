export async function getCityFromCoords(
  lat: number,
  lng: number
): Promise<string> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );
    const data = await res.json();

    return (
      data.address?.city ||
      data.address?.town ||
      data.address?.village ||
      "Unknown location"
    );
  } catch {
    return "Unknown location";
  }
}
