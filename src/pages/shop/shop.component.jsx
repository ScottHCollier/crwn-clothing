import React, { Component } from "react";
import { Routes, Route, useMatch } from "react-router-dom";
import { connect } from "react-redux";
import { collection, getDocs } from "firebase/firestore";
import {
    db,
    convertCollectionSnapToMap,
} from "../../firebase/firebase.utils.js";

import { updateCollections } from "../../redux/shop/shop.actions";

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

class ShopContainer extends Component {
    unsubscribeFromSnapshot = null;

    componentDidMount = async () => {
        const { updateCollections } = this.props;
        const collectionSnap = await getDocs(collection(db, "collections"));
        const collectionsMap = convertCollectionSnapToMap(collectionSnap);
        updateCollections(collectionsMap);
    };

    componentWillUnmount() {}

    render() {
        return <ShopPage />;
    }
}

const mapDispatchToProps = (dispatch) => ({
    updateCollections: (collectionsMap) =>
        dispatch(updateCollections(collectionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopContainer);
