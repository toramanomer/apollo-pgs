import type { Amenity } from "./types.js";

const hasOwnPropertyName = (amenity: Amenity): boolean => "name" in amenity;

export const validateFullAmenities = (amenityList: Amenity[]) =>
    amenityList.some(hasOwnPropertyName);
