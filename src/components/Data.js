import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import auth from '../auth'
import axios from 'axios'
import Moment from 'react-moment'
import '../css/data.css'
import ReactMapGL, { Marker } from 'react-map-gl'
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
import kuwait from '../images/kuwait.png'
import poland from '../images/poland.png'
import portugal from '../images/portugal.png'
import japan from '../images/japan.png'
import malaysia from '../images/malaysia.png'
import mexico from '../images/mexico.png'
import netherlands from '../images/netherlands.png'
import newzealand from '../images/newzealand.png'
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


export default function Data() {

  // if (!auth.isAuthenticated()) {
  //   window.location.href = "/login"
  // }


  const [viewport, setViewPort] = useState({
    longitude: 25,
    latitude: 25,
    zoom: 1
  })



  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)



  const axiosGet = () => {
    axios(
      {
        method: 'GET',
        url: 'https://adsbexchange-com1.p.rapidapi.com/mil/',
        headers: {
          'X-RapidAPI-Key': process.env.ADSB_TOKEN,
          'X-RapidAPI-Host': 'adsbexchange-com1.p.rapidapi.com'
        }
      }
    ).then(resp => {
      console.log(resp.data)
      if (sessionStorage)
        setData(resp.data.ac.filter(f => f.lat && f.lon))

      sessionStorage.setItem('myData', JSON.stringify(resp.data.ac.filter(f => f.lat && f.lon)))
      sessionStorage.setItem('timeStamp', new Date().getTime())
      setLoading(false)
    })
  }




  useEffect(() => {
    const storedTime = sessionStorage.getItem("timeStamp")
    const cachedData = sessionStorage.getItem("myData")


    if ((new Date().getTime() - storedTime > (5 * 60 * 1000)) || !cachedData) {
      console.log('API CALLING')
      axiosGet()
    } else {
      console.log('API PULLING CACHE')
      setData(JSON.parse(cachedData))
      setLoading(false)
    }
  }, [])

  const dataSort = (type) => {
    const sorted = [].concat(data)
      .sort((a, b) => {
        if (a[type] < b[type]) {
          return -1
        } else if (a[type] > b[type]) {
          return 1
        } else {
          return 0
        }
      })
    setData(sorted)
  }

  const intSort = (type) => {
    const sorted = [].concat(data).sort((a, b) => b[type] - a[type])
    console.log({ sorted })
    return setData(sorted)
  }
  const render = () => {


    if (loading === true) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ReactLoading type={"bars"} color={"rgb(0,131,240)"} height={'17%'} width={'17%'} />
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
            height='440px'
          >
            {data.map((flight, index) => {
              return (
                <Marker
                  key={index}
                  latitude={parseFloat(flight.lat)}
                  longitude={parseFloat(flight.lon)}
                >
                  <Link
                    to={{
                      pathname: `/flightmap/${flight.icao}`
                    }}>
                    <div className='tool-tip' >
                      <img style={{ width: '20px' }} src={flags[flight.cou.replace(/\s/g, '').toLowerCase()]} />
                      <div className="type">
                        <p>{flight.cou}</p>
                        <ul>
                          <li> Lat: {flight.lat}º</li>
                          <li> Lon: {flight.lon}º</li>
                          <li> Alt: {flight.alt}ft.</li>
                          <li> Spd: {flight.spd}kn.</li>
                        </ul>
                      </div>
                    </div>
                    {/* transform: `rotate(${flight.trak + 'deg'})`  */}
                  </Link>
                </Marker>
              )
            })}

          </ReactMapGL>
          <div>
            <section className='legend'>
              <button onClick={() => dataSort('cou')}>Military</button>
              <button onClick={() => intSort('sqk')}>Squawk</button>
              <button onClick={() => dataSort('icao')}>ICAO</button>
              <button onClick={() => dataSort('icao')}>Type</button>
              <button onClick={() => intSort('alt')}>Alt</button>
              <button onClick={() => intSort('spd')}>Spd</button>
              <button onClick={() => intSort('postime')}>LastRep</button>
              <button onClick={() => dataSort('call')}>Call</button>
              <button onClick={() => intSort('lat')}>Lat</button>
              <button onClick={() => intSort('lon')}>Long</button>
              <button onClick={() => dataSort('gnd')}>Grounded</button>

            </section>
            {data.map((m, index) => {

              return (

                <Link key={index} to={{ pathname: `/flightmap/${m.icao}` }} >
                  <section className='data' key={m.id}>
                    <p><img style={{ width: '15px' }} src={flags[m.cou.replace(/\s/g, '').toLowerCase()]} />{m.cou ? m.cou : 'n/a'}</p>
                    <p>{m.sqk ? m.sqk : 'n/a'}</p>
                    <p>{m.icao ? m.icao : 'n/a'}</p>
                    <p>{m.type ? m.type : 'n/a'}</p>
                    <p>{m.alt ? m.alt + 'ft.' : 'n/a'}</p>
                    <p>{m.spd ? m.spd + 'kn.' : 'n/a'}</p>
                    <p><Moment format='LTS'>{new Date(parseInt(m.postime))}</Moment></p>
                    <p>{m.call ? m.call : 'n/a'}</p>
                    <p>{Number(m.lat).toFixed(5)}</p>
                    <p>{Number(m.lon).toFixed(5)}</p>
                    <p>{m.gnd > 0 ? 'True' : 'False'}</p>
                  </section>
                </Link>

              )
            })
            }
          </div>
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