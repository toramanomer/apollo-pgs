import { Amenity } from "./types.js";

export const validateFullAmenities = (amenityList: Amenity[]) =>
    amenityList.some(hasOwnPropertyName);

const hasOwnPropertyName = (amenity: Amenity): boolean => "name" in amenity;
