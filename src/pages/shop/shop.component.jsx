import React from "react";
import { Routes, Route, useMatch } from "react-router-dom";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";

const ShopPage = () => {
    const match = useMatch("/shop/:collectionId");

    return (
        <div className="shop-page">
            <Routes>
                <Route path="/" element={<CollectionsOverview />} />
                <Route
                    path=":collectionId"
                    element={<CollectionPage match={match} />}
                />
            </Routes>
        </div>
    );
};

export default ShopPage;
