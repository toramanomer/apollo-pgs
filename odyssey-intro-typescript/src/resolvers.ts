import { validateFullAmenities } from "./helpers.js";
import type { Resolvers } from "./types.js";

export const resolvers: Resolvers = {
    Query: {
        featuredListings: (parent, args, contextValue, info) => {
            return contextValue.dataSources.listingAPI.getFeaturedListings();
        },
        listing: (parent, args, contextValue, info) => {
            return contextValue.dataSources.listingAPI.getListing(args.id);
        },
    },
    Listing: {
        amenities: async ({ id, amenities }, args, { dataSources }, info) => {
            return validateFullAmenities(amenities)
                ? amenities
                : dataSources.listingAPI.getAmenities(id);
        },
    },
    Mutation: {
        createListing: async (parent, { input }, { dataSources }, info) => {
            try {
                const response =
                    await dataSources.listingAPI.createListing(input);
                return {
                    code: 200,
                    success: true,
                    message: "Listing successfully created!",
                    listing: response,
                };
            } catch (err) {
                return {
                    code: 500,
                    success: false,
                    message: `Something went wrong: ${err.extensions.response.body}`,
                    listing: null,
                };
            }
        },
    },
};
