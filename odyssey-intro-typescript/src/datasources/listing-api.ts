import { RESTDataSource } from "@apollo/datasource-rest";
import type { Listing, Amenity, CreateListingInput } from "../types.ts";

export class ListingAPI extends RESTDataSource {
    baseURL = "https://rt-airlock-services-listing.herokuapp.com/";

    public getFeaturedListings(): Promise<Listing[]> {
        return this.get<Listing[]>("featured-listings");
    }

    public getListing(listingId: string): Promise<Listing> {
        return this.get<Listing>(`listings/${listingId}`);
    }

    public getAmenities(listingId: string): Promise<Amenity[]> {
        console.log("Making a follow-up call for amenities with ", listingId);
        return this.get<Amenity[]>(`listings/${listingId}/amenities`);
    }

    public createListing(listing: CreateListingInput): Promise<Listing> {
        return this.post<Listing>("listings", {
            body: { listing },
        });
    }
}
