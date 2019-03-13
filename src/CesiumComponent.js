import React, { Component } from 'react';
import axios from 'axios';
import * as parse from 'xml2js';
import './CesiumComponent.css';
import Viewer from "cesium/Source/Widgets/Viewer/Viewer";
import Tracks from './Tracks';
import * as ms from 'milsymbol';
import Cartesian3 from "cesium/Source/Core/Cartesian3";
import HorizontalOrigin from "cesium/Source/Scene/HorizontalOrigin";
import VerticalOrigin from "cesium/Source/Scene/VerticalOrigin";


class CesiumComponent extends Component {
  state = {
      homeButton: this.props.homeButton
  };


  componentDidMount() {
    
    this.viewer = new Viewer(this.cesiumContainer, {
        homeButton: this.state.homeButton
    });

    let tracks = [];
    axios.get('http://localhost:1337/localhost:8080/tracks')
        .then (
            response => {
                const {data} = response;
                //console.log(JSON.stringify(data));
                let {content} = data;
                console.log(content);
                parse.parseString(content, (err, results) => {
                    let trkTopTag = results['tracks'];
                    let trks = trkTopTag['track'];
                    for (let i = 0; i < trks.length; i++)
                    {
                      let track = new Tracks();
                      let trk = trks[i];
                      for (let index = 0; index < 1; index++) {
                        track.type = trk['type'][index];
                        track.lon = trk['lon'][index];
                        track.lat = trk['lat'][index];
                      }
                      tracks.push(track);
                    }
                  });

                  for (let i = 0; i < tracks.length; i++) {
                    let sym = new ms.Symbol(
                      tracks[i].type,
                      {size: 25, quantity: "Track "+(i+1), infoColor: "#FFFFFF"}
                      // quantity: "200",
                      // staffComments: "For Reinforcements",
                      // additionalInformation: "Added Support for JJ",
                      // direction: (750*360/6400),
                      // type: "Machine Gun",
                      // dtg: "2912398888111",
                      // location: "0900000.0E570306.0N"}
                    );
                    this.viewer.entities.add(
                      {
                        position : Cartesian3.fromDegrees(parseFloat(tracks[i].lon), parseFloat(tracks[i].lat)),
                        billboard : {
                          image : sym.asCanvas(), //Get the canvas for the billboard
                          //pixelOffset : new Cesium.Cartesian2(-sym.markerAnchor.x, -sym.markerAnchor.y), // Symbol offset
                          eyeOffset : new Cartesian3(0.0, 0.0, 0.0), // default
                          horizontalOrigin : HorizontalOrigin.LEFT, // default
                          verticalOrigin : VerticalOrigin.TOP
                        }
                      }
                    )
                  }
            }
        );
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