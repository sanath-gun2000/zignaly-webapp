import React from "react";
import "./profile.scss";
import { Box } from "@material-ui/core";
import useStoreViewsSelector from "../../../hooks/useStoreViewsSelector";
import withProviderLayout from "../../../layouts/providerLayout";
import { compose } from "recompose";
import AboutUs from "../../../components/Provider/Profile/AboutUs";
import Strategy from "../../../components/Provider/Profile/Strategy";
import WhoWeAre from "../../../components/Provider/Profile/WhoWeAre";
import Performance from "../../../components/Provider/Profile/Performance";
import Disclaimer from "../../../components/Provider/Profile/Disclaimer";

const CopyTradersProfile = () => {
  const storeViews = useStoreViewsSelector();
  return (
    <Box
      alignItems="flex-start"
      className="profilePage"
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      justifyContent="center"
    >
      <Box bgcolor="grid.main" className="aboutBox">
        <AboutUs provider={storeViews.provider} />
      </Box>
      <Box bgcolor="grid.main" className="whoWeAreBox">
        <WhoWeAre provider={storeViews.provider} />
      </Box>
      <Box bgcolor="grid.main" className="strategyBox">
        <Strategy provider={storeViews.provider} />
      </Box>
      <Box bgcolor="grid.main" className="performanceBox">
        <Performance provider={storeViews.provider} />
      </Box>
      <Disclaimer />
    </Box>
  );
};

export default compose(withProviderLayout)(CopyTradersProfile);
