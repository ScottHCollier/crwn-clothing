import React, { Component } from "react";
import { Routes, Route, useMatch } from "react-router-dom";
import { connect } from "react-redux";
import { collection, getDocs } from "firebase/firestore";
import {
    db,
    convertCollectionSnapToMap,
} from "../../firebase/firebase.utils.js";

import { updateCollections } from "../../redux/shop/shop.actions";
import WithSpinner from "../../components/with-spinner/with-spinner.component";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const ShopPage = ({ loading }) => {
    const match = useMatch("/shop/:collectionId");

    return (
        <div className="shop-page">
            <Routes>
                <Route
                    path="/"
                    element={
                        <CollectionsOverviewWithSpinner isLoading={loading} />
                    }
                />
                <Route
                    path=":collectionId"
                    element={
                        <CollectionPageWithSpinner
                            isLoading={loading}
                            match={match}
                        />
                    }
                />
            </Routes>
        </div>
    );
};

class ShopContainer extends Component {
    state = {
        loading: true,
    };
    unsubscribeFromSnapshot = null;

    componentDidMount = async () => {
        const { updateCollections } = this.props;
        const collectionSnap = await getDocs(collection(db, "collections"));
        const collectionsMap = convertCollectionSnapToMap(collectionSnap);
        updateCollections(collectionsMap);
        this.setState({ loading: false });
    };

    componentWillUnmount() {}

    render() {
        return <ShopPage loading={this.state.loading} />;
    }
}

const mapDispatchToProps = (dispatch) => ({
    updateCollections: (collectionsMap) =>
        dispatch(updateCollections(collectionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopContainer);
