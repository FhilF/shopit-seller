import regionJson from "./ph-addresses/short-region";
import provinceJson from "./ph-addresses/province";
import cityJson from "./ph-addresses/city";
import barangayJson from "./ph-addresses/barangay";

export const placeObj = {
  region: { id: "id", label: "name", json: regionJson },
  province: {
    id: "province_code",
    label: "province_name",
    json: provinceJson,
  },
  city: {
    id: "city_code",
    label: "city_name",
    json: cityJson,
  },
  barangay: {
    id: "brgy_code",
    label: "brgy_name",
    json: barangayJson,
  },
};
