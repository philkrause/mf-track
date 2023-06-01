import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import FlightDetails from './FlightDetails'
import redJet from '../images/redjet.png'
import auth from '../auth'
import ReactLoading from 'react-loading'
import algeria from '../images/algeria.png'
import argentina from '../images/argentina.png'
import australia from '../images/australia.png'
import austria from '../images/austria.png'
import azerbaijan from '../images/azerbaijan.png'
import bahrain from '../images/bahrain.png'
import belgium from '../images/belgium.png'
import bolivia from '../images/bolivia.png'
import brazil from '../images/brazil.png'
import canada from '../images/canada.png'
import chile from '../images/chile.png'
import czechrepublic from '../images/czechrepublic.png'
import denmark from '../images/denmark.png'
import ecuador from '../images/ecuador.png'
import egypt from '../images/egypt.png'
import finland from '../images/finland.png'
import france from '../images/france.png'
import germany from '../images/germany.png'
import greece from '../images/greece.png'
import hungary from '../images/hungary.png'
import india from '../images/india.png'
import ireland from '../images/ireland.png'
import italy from '../images/italy.png'
import israel from '../images/israel.png'
import malaysia from '../images/malaysia.png'
import mexico from '../images/mexico.png'
import newzealand from '../images/newzealand.png'
import poland from '../images/poland.png'
import portugal from '../images/portugal.png'
import japan from '../images/japan.png'
import kuwait from '../images/kuwait.png'
import netherlands from '../images/netherlands.png'
import nigeria from '../images/nigeria.png'
import oman from '../images/oman.png'
import saudiarabia from '../images/saudiarabia.png'
import slovakia from '../images/slovakia.png'
import slovenia from '../images/slovenia.png'
import spain from '../images/spain.png'
import sweden from '../images/sweden.png'
import switzerland from '../images/switzerland.png'
import taiwan from '../images/taiwan.png'
import turkey from '../images/turkey.png'
import unitedkingdom from '../images/unitedkingdom.png'
import nato from '../images/unitednations.png'
import unitedstates from '../images/unitedstates.png'
import qatar from '../images/qatar.png'

const flags = {
  algeria,
  australia,
  austria,
  argentina,
  azerbaijan,
  bahrain,
  belgium,
  bolivia,
  brazil,
  canada,
  chile,
  czechrepublic,
  denmark,
  ecuador,
  egypt,
  finland,
  france,
  germany,
  greece,
  hungary,
  india,
  ireland,
  israel,
  italy,
  japan,
  kuwait,
  malaysia,
  mexico,
  nato,
  netherlands,
  newzealand,
  nigeria,
  oman,
  poland,
  portugal,
  saudiarabia,
  slovakia,
  slovenia,
  spain,
  sweden,
  switzerland,
  taiwan,
  turkey,
  unitedkingdom,
  unitedstates,
  qatar
}

export default function MapSetHooks(props) {

  // if (!auth.isAuthenticated()) {
  //   window.location.href = "/login"
  // }

  const [loading, setLoading] = useState(true)
  const [flight, setFlight] = useState('')


  const [data, setData] = useState(
    { lon: 0, lat: 0 }
  )
  const flightICAO = props.match.params.icao

  const dataKey = `${flightICAO}-data`

  const [viewport, setViewPort] = useState({
    longitude: 25,
    latitude: 25,
    zoom: 6
  })



  const axiosGet = () => {
    console.log("running get")
    axios.get(`/user/${flightICAO}/oneuserflight`, {
      // headers: {
      //   "Authorization": auth.authorizationHeader()
      // }
    }
    ).then(resp => {
      setData(resp.data)
      const data = resp.data

      setViewPort(vp => {
        vp.latitude = parseFloat(data.lat)
        vp.longitude = parseFloat(data.lon)
        return vp
      })
      setLoading(false)

    })
  }

  useEffect(() => {
    console.log("running effect")
    axiosGet()
  }, [])


  const render = () => {
    if (loading === true) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ReactLoading type={"bars"} color={"rgb(0,131,240)"} height={'20%'} width={'20%'} />
        </div>
      )
    } else {
      return (
        <>

          <ReactMapGL
            {...viewport}
            mapboxApiAccessToken={process.env.MAPBOX_TOKEN}
            mapStyle='mapbox://styles/ddjango/cjy5w2fle12rc1dp6ibud3rtw'
            onViewportChange={viewport => {
              setViewPort(viewport)
            }}
            width='100vw'
            height='415px'
          >
            <Marker latitude={parseFloat(data.lat)} longitude={parseFloat(data.lon)}>
              <button
                style={{ border: 'none' }}
                onClick={e => {
                  e.preventDefault();
                  setFlight(data)
                }}
              >
                <img style={{ width: '25px', transform: `rotate(${data.trak + 'deg'})` }} src={redJet} />
              </button>
            </Marker>
            {flight ? (
              <Popup
                latitude={parseFloat(data.lat)}
                longitude={parseFloat(data.lon)}
                onClose={() => {
                  setFlight(null)
                }}
              >
                <div className='flight-marker'>
                  <img style={{ width: '25px', margin: '0' }} src={flags[data.cou.replace(/\s/g, '').toLowerCase()]} />
                  <p>{data.cou}</p>
                  <p>Model: {data.type}</p>
                  <p>Call: {data.call ? data.call : 'n/a'}</p>
                  <p>Speed: {data.spd ? data.spd + 'kn' : 'n/a'}</p>
                  <p>Altitude: {data.alt ? data.alt + 'ft' : 'n/a'}</p>
                </div>
              </Popup>
            ) : null}
          </ReactMapGL>
          <img style={{ width: '55px', margin: '0' }} src={flags[data.cou.replace(/\s/g, '').toLowerCase()]} />
          <FlightDetails
            {...data} />
        </>
      )
    }

  }


  return (
    <>

      <div>{render()}</div>

    </>
  )

}



{/* <button onClick={(e) => {
  e.preventDefault()
  setViewPort(
    {
      longitude: parseFloat(flight.lat),
      latitude: parseFloat(flight.lon),
      zoom: 7,
      transitionDuration: 5000,
      transitionInterpolator: new FlyToInterpolator()
    }
  )
}}></button> */}