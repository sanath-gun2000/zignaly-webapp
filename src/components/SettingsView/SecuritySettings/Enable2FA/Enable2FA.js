import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress, OutlinedInput, FormControl } from "@material-ui/core";
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import "./Enable2FA.scss";
import { useForm } from "react-hook-form";
import CustomButton from "../../../CustomButton";
import tradeApi from "../../../../services/tradeApiClient";
import { showErrorAlert, showSuccessAlert } from "../../../../store/actions/ui";
import useStoreSessionSelector from "../../../../hooks/useStoreSessionSelector";
import { useStoreUserData } from "../../../../hooks/useStoreUserSelector";
import { enable2FA } from "../../../../store/actions/user";

/**
 * Provides a component to enable 2FA.
 *
 * @returns {JSX.Element} Component JSX.
 */
const Enable2FA = () => {
  const dispatch = useDispatch();
  const storeSession = useStoreSessionSelector();
  const storeUserData = useStoreUserData();
  const { handleSubmit, setError, register, errors } = useForm();
  const [editing, setEditing] = useState(false);
  const twoFAEnabled = storeUserData.TwoFAEnable;
  const [code, setCode] = useState(null);
  const [qrCodeImg, setQRCodeImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const intl = useIntl();

  useEffect(() => {
    if (editing) {
      // Get 2FA code.
      const payload = {
        token: storeSession.tradeApi.accessToken,
      };

      tradeApi
        .enable2FA1Step(payload)
        .then((response) => {
          setCode(response[0]);
          setQRCodeImg(response[1]);
        })
        .catch((e) => {
          dispatch(showErrorAlert(e));
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [editing]);

  /**
   * @typedef {Object} FormData
   * @property {string} code
   */

  /**
   * Function to submit form.
   *
   * @param {FormData} data Form data.
   * @returns {void}
   */
  const submitCode = (data) => {
    const payload = {
      token: storeSession.tradeApi.accessToken,
      code: data.code,
    };

    setLoading(true);

    const apiMethod = twoFAEnabled ? tradeApi.disable2FA : tradeApi.enable2FA2Step;

    apiMethod
      .call(tradeApi, payload)
      .then(() => {
        dispatch(enable2FA(!twoFAEnabled));
        setEditing(false);
        const msg = twoFAEnabled ? "security.2fa.disable.success" : "security.2fa.enable.success";
        showSuccessAlert("Success", intl.formatMessage({ id: msg }));
      })
      .catch((e) => {
        if (e.code === 37) {
          setError("code", "notMatch", "Wrong code.");
        } else {
          dispatch(showErrorAlert(e));
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Box className="enable2FA" display="flex" flexDirection="column">
      <Typography>
        <FormattedMessage id="security.2fa" />
      </Typography>
      {!editing && !twoFAEnabled ? (
        <CustomButton className="textPurple borderPurple bold" onClick={() => setEditing(true)}>
          <FormattedMessage id="security.setup" />
        </CustomButton>
      ) : !twoFAEnabled && !code ? (
        <Box pt="24px" display="flex" flexDirection="row" justifyContent="center">
          <CircularProgress disableShrink />
        </Box>
      ) : (
        <form onSubmit={handleSubmit(submitCode)}>
          {!twoFAEnabled && (
            <>
              <Typography variant="body1" className="bold">
                <FormattedMessage id="security.2fa.scan" />
              </Typography>
              <img src={qrCodeImg} aria-labelledby="QR Code" className="qrCode" />
              <Typography>
                <FormattedMessage id="security.2fa.manually" />
              </Typography>
              <Typography variant="body1" className="code">
                {code}
              </Typography>
            </>
          )}
          <Box display="flex" flexDirection="column">
            <label htmlFor="code">
              <Typography variant="body1" className="code">
                <FormattedMessage id="security.2fa.mobile" />
              </Typography>
            </label>
            <OutlinedInput
              name="code"
              id="code"
              inputProps={{
                min: 0,
              }}
              inputRef={register({ required: true, min: 0, minLength: 6, maxLength: 6 })}
              type="number"
              error={!!errors.code}
              placeholder="6 digits"
              className="customInput"
            />
            {errors.code && <span className="errorText">{errors.code.message}</span>}
          </Box>
          <CustomButton className="bgPurple bold" loading={loading} type="submit">
            <FormattedMessage id={`security.2fa.${twoFAEnabled ? "disable" : "enable"}`} />
          </CustomButton>
        </form>
      )}
    </Box>
  );
};

export default Enable2FA;
