import regionJson from "./ph-addresses/short-region";
import provinceJson from "./ph-addresses/province";
import cityJson from "./ph-addresses/city";
import barangayJson from "./ph-addresses/barangay";

const placeObj = {
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
export const getAddressValue = (data, type, valueKey, returnKey, parentKey) => {
  if (!data) return "";

  if (type === "barangay" && valueKey === "label") {
    const city = cityJson.filter((v) => v.city_name === parentKey);

    if (city.length < 0) {
      return "";
    }
    const cityCode = city[0].city_code;
    const filtered = placeObj[type].json.filter(
      (v) => v[placeObj[type][valueKey]] === data && cityCode === v.city_code
    );

    if (filtered.length === 0) return "";
    return filtered[0][placeObj[type][returnKey]];
  }

  const filtered = placeObj[type].json.filter(
    (v) => v[placeObj[type][valueKey]] === data
  );
  if (filtered.length === 0) return "";
  return filtered[0][placeObj[type][returnKey]];
  // return filtered[0].value;
};
