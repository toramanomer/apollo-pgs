import { ListingAPI } from "./datasources/listing-api.js";

export type DataSourceContext = {
    dataSources: {
        listingAPI: ListingAPI;
    };
};
