import { t } from "ttag";

import ExternalLink from "metabase/core/components/ExternalLink";
import CS from "metabase/css/core/index.css";
import MetabaseSettings from "metabase/lib/settings";

import { SetupFooterRoot } from "./SetupHelp.styled";

export const SetupHelp = (): JSX.Element => {
  return (
    <SetupFooterRoot>
  {t`If you need assistance`},{" "}
  <ExternalLink
    className={CS.link}
    href={`mailto:hello@devinai.com`}
  >
    {t`click here to email us`}
  </ExternalLink>{" "}
  {t`at hello@devinai.com.`}
</SetupFooterRoot>
  );
};
