import React, { Component } from 'react';
import { ContentContainer } from 'containers';
import { Menu, HeaderBar } from 'components';

class WrapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      height: 0,
    };
    this.onPressMenu = this.onPressMenu.bind(this);
  }

  componentDidMount() {
    this.setHeight();
  }

  onPressMenu() {
    this.setState({
      menu: !this.state.menu,
    });
  }

  setHeight() {
    const resize = () => {
      const heights = window.innerHeight;
      this.setState({ height: heights });
    };
    resize();
    window.onresize = () => {
      resize();
    };
  }

  render() {
    return (
      <div className="container">
        <HeaderBar />
        <Menu
          height={`${this.state.height}px`}
          onPressOverlay={this.onPressMenu}
          onPressMenu={this.onPressMenu}
          isActive={this.state.menu}
        />
        <ContentContainer {...this.props} />
      </div>
    );
  }
}

// WrapContainer.propTypes = {
//   children: PropTypes.element.isRequired,
// };

export default WrapContainer;
