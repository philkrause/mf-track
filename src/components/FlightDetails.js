import React, { Component } from 'react'
// import { faThList } from '@fortawesome/free-solid-svg-icons';
import Moment from 'react-moment'



class FlightDetails extends Component {

  render() {
    return (
      <>

        <section className='one-flight'>

          <div className='one-data'>
            <section className='tool-tip'>Country: {this.props.cou ? this.props.cou : 'n/a'}
              <div className="type">
                <h3>Military Registration</h3>
                <ul>
                  <li> The Aircraft's Military Registration Origin</li>
                </ul>
                <i></i>
              </div>
            </section>
            <div>
              <section className='tool-tip'>Type: {this.props.type ? this.props.type : 'n/a'}
                <div className="type">
                  <h3>{this.props.type}</h3>
                  <ul>
                      <li>The Aicraft's Model</li>
                      <li>This model code is determined from the ICAO.</li>
                    </ul>
                    <i></i>
                </div>
              </section>
            </div>
              <div>
                <section className='tool-tip'>Squawk: {this.props.sqk ? this.props.sqk : 'n/a'}
                  <div className="type">
                    <h3>Transponder Code</h3>
                    <ul>
                      <li> This is a 4-digit code (each digit is from 0-7) entered by the pilot, and typically assigned by air traffic control. </li>
                      <li> A sqwak code of 1200 typically means the aircraft is operation under VFR and not receiving radar services. 7500 = Hijack code, 7600 = Lost Communications, radio problem, 7700 = Emergency.</li>
                    </ul>
                    <i></i>
                  </div>
                </section>
              </div>
              <div>
                <section className='tool-tip'>ICAO: {this.props.icao ? this.props.icao : 'n/a'}
                  <div className="type">
                    <h3>International Civil Aviation Organization </h3>
                    <ul>
                      <li>One of the most important fields. This is the six-digit hexadecimal identifier broadcast by the aircraft over the air in order to identify itself. </li>
                      <li>Blocks of these codes are assigned to countries. Each country then assigns individual codes to aircraft registered in that country. </li>
                    </ul>
                    <i></i>
                  </div>
                </section>
              </div>
              <section className='tool-tip'> OPICAO: {this.props.opicao ? this.props.opicao : 'n/a'}
                <div className="type">
                  <h3>OPICAO</h3>
                  <ul>
                    <li> The ICAO code of the operator.</li>
                  </ul>
                  <i></i>
                </div>
              </section>
            </div>
            <div className='one-data'>
              <section className='tool-tip'>Speed: {this.props.spd ? this.props.spd + 'kn' : 'n/a'}
                <div className="type">
                  <h3>Speed</h3>
                  <ul>
                    <li> This speed is return in knots.</li>
                    <li> 1 knot is equal to 1 Nautical Mile/hr</li>
                  </ul>
                  <i></i>
                </div>
              </section>
              <div>
                <section className='tool-tip'>Vertical Speed: {this.props.vsi ? this.props.vsi + 'ft/min' : 'n/a'}
                  <div className="type">
                    <h3>Vertical Speed</h3>
                    <ul>
                      <li>Vertical Speed in feet per minute</li>
                    </ul>
                    <i></i>
                  </div> </section>
              </div>
              <section className='tool-tip'>Altitude: {this.props.alt ? this.props.alt + 'ft' : 'n/a'}
                <div className="type">
                  <h3>Altitude</h3>
                  <ul>
                    <li> The altitude in feet at standard pressure</li>
                  </ul>
                  <i></i>
                </div>
              </section>
              <section className='tool-tip'>Wake Turbulence: {this.props.wtc ? this.props.wtc : 'n/a'}
                <div className="type">
                  <h3>Wake Turbulence Category</h3>
                  <ul>
                    <li>0 = None</li>
                    <li>1 = Light</li>
                    <li>2 = Medium</li>
                    <li>3 = Heavy</li>
                  </ul>
                  <i></i>
                </div>
              </section>
              <section className='tool-tip'>Track Angle: {this.props.trak ? this.props.trak + 'º' : 'n/a'}
                <div className="type">
                  <h3>Track Angle</h3>
                  <ul>
                    <li> Aircraft’s track angle across the ground clockwise from 0° north.</li>
                  </ul>
                  <i></i>
                </div> </section>
            </div>
            <div className='one-data'>
              <section className='tool-tip'>Call: {this.props.call ? this.props.call : 'n/a'}
                <div className="type">
                  <h3>The Callsign of the Aircraft.</h3>
                  <ul>
                    <li> Typically, this can be set by the pilot by entering it into the transponder prior to flight. </li>
                    <li> Some aircraft simply leave it as their registration number.  Occasionally, you might see "nicknames" in this field by the flight crew.</li>
                  </ul>
                  <i></i>
                </div>
              </section>
              <section className='tool-tip'>Last Reported: <Moment format='LTS'>{new Date(parseInt(this.props.postime))}</Moment>
                <div className="type">
                  <h3>Last Reported</h3>
                  <ul>
                    <li>The time (at UTC in JavaScript ticks, UNIX epoch format in milliseconds) that the position was last reported by the aircraft. This field is the time at which the aircraft was at the lat/long/altitude reported above. </li>
                    <li> The time has been converted for your Time Zone</li>
                  </ul>
                  <i></i>
                </div>
              </section>
              <section className='tool-tip'>Latitude: {this.props.lat ? this.props.lat + 'º' : 'n/a'}
                <div className="type">
                  <h3>Latitude</h3>
                  <ul>
                    <li>The aircraft’s latitude over the ground.</li>
                  </ul>
                  <i></i>
                </div>
              </section>
              <section className='tool-tip'>Longitude: {this.props.lon ? this.props.lon + 'º' : 'n/a'}
                <div className="type">
                  <h3>Longitude</h3>
                  <ul>
                    <li>The aircraft's longitude over the ground.</li>
                  </ul>
                  <i></i>
                </div>
              </section>
              <section className='tool-tip'>GAltitude: {this.props.galt ? this.props.galt + 'ft' : 'n/a'}
                <div className="type">
                  <h3>GAltitude</h3>
                  <ul>
                    <li> The altitude adjusted for local air pressure, should be roughly the height above mean sea level.</li>
                  </ul>
                  <i></i>
                </div>
              </section>
            </div>
        </section>
      </>
        )
      }
    }
    
    export default FlightDetails
    
