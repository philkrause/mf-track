import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Moment from 'react-moment'
import '../css/data.css'
import ReactMapGL, { Marker } from 'react-map-gl'
import ReactLoading from 'react-loading'
import SingleFlight from './SingleFlight'

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
    console.log("Calling the v2 mil endpoint")
    
    axios(
      {
        method: 'GET',
        url: 'https://adsbexchange-com1.p.rapidapi.com/v2/mil/',
        headers: {
          'X-RapidAPI-Key': process.env.ASDB_TOKEN,
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
                  const flightHEX = flight.hex
                return (
                  <Marker
                    key={index}
                    latitude={parseFloat(flight.lat)}
                    longitude={parseFloat(flight.lon)}
                  >
                  <SingleFlight singleFlightIcao={flightHEX}/>

                    <Link
                      to={{
                        pathname: `/flightmap/${flight.icao}`
                      }}>
                      <div className='tool-tip' >
                      <img style={{ width: '20px', transform: `rotate(${flight.track + 'deg'})` }} src={redJet} />
                        <div className="type">
                          <p>{flight.cou}</p>
                          <ul>
                            <li> Lat: {flight.lat}º</li>
                            <li> Lon: {flight.lon}º</li>
                            <li> Alt: {flight.alt_baro}ft.</li>
                            <li> Spd: {flight.tas}kn.</li>
                          </ul>
                        </div>
                      </div>
                    </Link>
                  </Marker>
                )
              })}

          </ReactMapGL>
          <div>
            <section className='legend'>
              <button onClick={() => intSort('squawk')}>Squawk</button>
              <button onClick={() => dataSort('hex')}>ICAO</button>
              <button onClick={() => dataSort('t')}>Type</button>
              <button onClick={() => intSort('alt_baro')}>Alt</button>
              <button onClick={() => intSort('tas')}>Spd</button>
              <button onClick={() => intSort('seen')}>LastRep</button>
              <button onClick={() => dataSort('call')}>Call</button>
              <button onClick={() => intSort('lat')}>Lat</button>
              <button onClick={() => intSort('lon')}>Long</button>
              <button onClick={() => dataSort('gnd')}>Grounded</button>
            </section>
            {data.map((m, index) => {
              return (

                <Link key={index} to={{ pathname: `/flightmap/${m.hex}` }} >
                  <section className='data' key={m.id}>
                    <p>{m.squawk ? m.squawk : 'n/a'}</p>
                    <p>{m.hex ? m.hex : 'n/a'}</p>
                    <p>{m.t ? m.t : 'n/a'}</p>
                    <p>{m.alt_baro ? m.alt_baro + 'ft.' : 'n/a'}</p>
                    <p>{m.tas ? m.tas + 'kn.' : 'n/a'}</p>
                    <p><Moment format='LTS'>{new Date(parseInt(m.now))}</Moment></p>
                    <p>{m.flight ? m.flight : 'n/a'}</p>
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