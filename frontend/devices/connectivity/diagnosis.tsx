import React from "react";
import { DiagnosticMessages } from "../../constants";
import { Col, Row, docLinkClick } from "../../ui/index";
import { bitArray } from "../../util";
import { TRUTH_TABLE } from "./truth_table";
import { t } from "../../i18next_wrapper";
import { goToFbosSettings } from "../../settings/maybe_highlight";

export type ConnectionName =
  | "userAPI"
  | "userMQTT"
  | "botMQTT"
  | "botAPI"
  | "botFirmware";

export type ConnectionStatusFlags = Record<ConnectionName, boolean>;
export interface DiagnosisSaucerProps extends ConnectionStatusFlags {
  className?: string;
}

export const diagnosisStatus = (flags: ConnectionStatusFlags): boolean =>
  flags.userMQTT && flags.botAPI && flags.botMQTT && flags.botFirmware;

export const DiagnosisSaucer = (props: DiagnosisSaucerProps) => {
  const diagnosisBoolean = diagnosisStatus(props);
  const diagnosisColor = diagnosisBoolean ? "green" : "red";
  const title = diagnosisBoolean ? t("Ok") : t("Error");
  const classes = [
    "diagnosis-indicator", "saucer", "active", diagnosisColor, props.className,
  ];
  return <div className={classes.join(" ")}
    title={title}>
    <i className={`fa fa-${diagnosisBoolean ? "check" : "times"}`} />
  </div>;
};

export function Diagnosis(statusFlags: ConnectionStatusFlags) {
  const diagnosisBoolean = diagnosisStatus(statusFlags);
  const diagnosisColor = diagnosisBoolean ? "green" : "red";
  return <div className={"diagnosis-section"}>
    <div className={"connectivity-diagnosis"}>
      <h4>{t("Diagnosis")}</h4>
    </div>
    <Row>
      <Col xs={1}>
        <DiagnosisSaucer {...statusFlags} />
        <div className={"saucer-connector last " + diagnosisColor} />
      </Col>
      <Col xs={10} className={"connectivity-diagnosis"}>
        <p className="blinking">
          {t("Always")}&nbsp;
          <a className="blinking" onClick={goToFbosSettings}>
            <u>{t("upgrade FarmBot OS")}</u>
          </a>
            &nbsp;{t("before troubleshooting.")}
        </p>
        <p>
          {diagnosisMessage(getDiagnosisCode(statusFlags))}
        </p>
        <a onClick={docLinkClick("connecting-farmbot-to-the-internet")}>
          <i className="fa fa-external-link" />
          {t("Click here to learn more about error codes.")}
        </a>
        <a onClick={docLinkClick("for-it-security-professionals")}>
          <i className="fa fa-external-link" />
          {t("Click here for IT security professionals info.")}
        </a>
      </Col>
    </Row>
  </div>;
}

export function getDiagnosisCode(statusFlags: ConnectionStatusFlags) {
  const errorCode = bitArray(
    statusFlags.userAPI,
    statusFlags.userMQTT,
    statusFlags.botMQTT,
    statusFlags.botAPI,
    statusFlags.botFirmware);
  return errorCode;
}

export function diagnosisMessage(errorCode: number) {
  const errMsg = TRUTH_TABLE[errorCode] || DiagnosticMessages.MISC;
  return `${t(errMsg)} (code ${errorCode})`;
}
