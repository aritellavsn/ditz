import cx from "classnames";
import PropTypes from "prop-types";
import { Component } from "react";

import CS from "metabase/css/core/index.css";
import { PLUGIN_LOGO_ICON_COMPONENTS } from "metabase/plugins";

class DefaultLogoIcon extends Component {
  static defaultProps = {
    height: 32,
  };
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    dark: PropTypes.bool,
  };

  render() {
    const { dark, height, width } = this.props;
    return (
      <svg
        className={cx(
          "Icon",
          { [CS.textBrand]: !dark },
          { [CS.textWhite]: dark },
        )}
        viewBox="0 0 66 85"
        width={width}
        height={height}
        fill="currentcolor"
        data-testid="main-logo"
      >
        <path
          d="M 24.25 24.25 L 167.5 24.25 L 167.5 167.5 L 24.25 167.5 Z M 24.25 24.25 "
          opacity="0.2"
        />
        <path d="M 24.25 24.25 L 167.5 24.25 L 167.5 167.5 L 24.25 167.5 Z M 24.25 24.25 " />
      </svg>
    );
  }
}

export default function LogoIcon(props) {
  const [Component = DefaultLogoIcon] = PLUGIN_LOGO_ICON_COMPONENTS;
  return <Component {...props} />;
}
