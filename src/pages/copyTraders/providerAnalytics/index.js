import React, { useState, useEffect } from "react";
import "./providerAnalytics.scss";
import { Box, Typography } from "@material-ui/core";
import withProviderLayout from "../../../layouts/providerLayout";
import { compose } from "recompose";
import { FormattedMessage } from "react-intl";
import CopiersGraph from "../../../components/Provider/Analytics/CopiersGraph";
import tradeApi from "../../../services/tradeApiClient";
import useStoreSessionSelector from "../../../hooks/useStoreSessionSelector";
import useStoreViewsSelector from "../../../hooks/useStoreViewsSelector";
import GraphLabels from "../../../components/Balance/TotalEquity/GraphLabels";

const CopyTradersAnalytics = () => {
  const storeSession = useStoreSessionSelector();
  const storeViews = useStoreViewsSelector();
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const getProviderFollowers = async () => {
      try {
        const payload = {
          token: storeSession.tradeApi.accessToken,
          providerId: storeViews.provider.id,
        };
        const response = await tradeApi.providerFollowersGet(payload);
        setFollowers(response);
      } catch (e) {
        alert(e.message);
      }
    };

    getProviderFollowers();
  }, []);

  return (
    <Box className="profileAnalyticsPage">
      <Box bgcolor="grid.main" className="tradingPerformanceBox">
        <Typography variant="h3">
          <FormattedMessage id="copyt.tradingperformance" />
        </Typography>
      </Box>

      <Box bgcolor="grid.main" className="copiersBox">
        <Typography variant="h3">
          <FormattedMessage id="trader.people" />
        </Typography>
        <CopiersGraph list={followers} />
        <GraphLabels list={followers} />
      </Box>
    </Box>
  );
};

export default compose(withProviderLayout)(CopyTradersAnalytics);
