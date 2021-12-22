import { geolocated } from "react-geolocated";

export const distance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  // let coords = [0, 0];
  // console.log("coords: ", coords);
  // if (navigator?.geolocation) {
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       coords[0] = position.coords.latitude;
  //       coords[1] = position.coords.longitude;
  //       console.log("coords in: ", coords);
  //     },
  //     (err) => {
  //       console.log("geoloc err: ", err);
  //     }
  //   );
  // }
  // console.log("coords: ", coords);
  // const lat1 = coords[0];
  // const lon1 = coords[1];
  // if (lat1 === 0 || lon1 === 0) {
  //   return null;
  // }
  const p = 0.017453292519943295; // Math.PI / 180
  const c = Math.cos;
  const a =
    0.5 -
    c((lat1 - lat2) * p) / 2 +
    (c(lat2 * p) * c(lat1 * p) * (1 - c((lon1 - lon2) * p))) / 2;
  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
};
