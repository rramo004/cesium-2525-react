import React, { Component } from 'react';
import './CesiumComponent.css';
import Viewer from "cesium/Source/Widgets/Viewer/Viewer";

class CesiumComponent extends Component {
  
  componentDidMount() {
    this.viewer = new Viewer(this.cesiumContainer);
  }

  render() {
      return (
          <div>
              <div id="cesiumContainer" ref={ element => this.cesiumContainer = element }/>
          </div>
      );
  }
}

export default CesiumComponent;