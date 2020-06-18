import React from "react";
import "./ErrorAlert.scss";
import { Snackbar, Box, Typography, Slide } from "@material-ui/core";
import useStoreUIAlertsSelector from "../../../hooks/useStoreUIAlertsSelector";
import { useDispatch } from "react-redux";
import { hideErrorAlert } from "../../../store/actions/ui";
import { FormattedMessage } from "react-intl";

const ErrorAlert = () => {
  const storeAlerts = useStoreUIAlertsSelector();
  const dispatch = useDispatch();

  return (
    <Snackbar
      TransitionComponent={Slide}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      autoHideDuration={5000}
      className="errorAlert"
      onClose={() => dispatch(hideErrorAlert())}
      open={storeAlerts.error.open}
    >
      <Box bgcolor="grid.main" className="alertMessage">
        {storeAlerts.error.title && (
          <Typography className="title red" variant="h3">
            <FormattedMessage id={storeAlerts.error.title} />
          </Typography>
        )}
        {storeAlerts.error.body && (
          <Typography className="body red" variant="body1">
            <b>Error:</b>
            <FormattedMessage id={storeAlerts.error.body} />
          </Typography>
        )}
      </Box>
    </Snackbar>
  );
};

export default ErrorAlert;