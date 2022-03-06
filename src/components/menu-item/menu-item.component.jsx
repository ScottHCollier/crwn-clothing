import React from "react";
import { useNavigate } from "react-router-dom";

import {
    MenuItemContainer,
    BackgroundImageContainer,
    ContentContainer,
    ContentTitle,
    ContentSubtitle,
} from "./menu-item.styles";

function MenuItem({ title, imageUrl, size, linkUrl }) {
    let navigate = useNavigate();

    function handleClick() {
        navigate(linkUrl);
    }

    return (
        <MenuItemContainer size={size}>
            <BackgroundImageContainer
                className="background-image"
                style={{ backgroundImage: `url(${imageUrl})` }}
            ></BackgroundImageContainer>
            <ContentContainer onClick={handleClick}>
                <ContentTitle>{title.toUpperCase()}</ContentTitle>
                <ContentSubtitle>SHOP NOW</ContentSubtitle>
            </ContentContainer>
        </MenuItemContainer>
    );
}

export default MenuItem;
