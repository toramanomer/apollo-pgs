import { RESTDataSource } from "@apollo/datasource-rest";
import { Listing, Amenity, CreateListingInput } from "../types.js";

export class ListingAPI extends RESTDataSource {
    baseURL = "https://rt-airlock-services-listing.herokuapp.com/";

    getFeaturedListings(): Promise<Listing[]> {
        return this.get<Listing[]>("featured-listings");
    }

    getListing(listingId: string): Promise<Listing> {
        return this.get<Listing>(`listings/${listingId}`);
    }

    getAmenities(listingId: string): Promise<Amenity[]> {
        console.log("Making a follow-up call for amenities with ", listingId);
        return this.get<Amenity[]>(`listings/${listingId}/amenities`);
    }
    createListing(listing: CreateListingInput): Promise<Listing> {
        return this.post("listings", {
            body: { listing },
        });
    }
}
