export default function MapSetHooks(props) {

  // if (!auth.isAuthenticated()) {
  //   window.location.href = "/login"
  // }

  const [loading, setLoading] = useState(true)
  const [flight, setFlight] = useState('')


  const [data, setData] = useState(
    { lat: 0, lon: 0 }
  )
  const flightICAO = props
  console.log(JSON.stringify(flightICAO))
  const dataKey = `${flightICAO}-data`

  const [viewport, setViewPort] = useState({
    longitude: 25,
    latitude: 25,
    zoom: 6
  })

  // const postFlightForUser = () => {
  //   // TODO : add logic to only post if the user is logged in
  //   axios.post(`/user/${flightICAO}/adduserflight`, {}, { headers: { "Authorization": auth.authorizationHeader() } })
  // }

  //const fpost = (data) => axios.post('flightinfo/addflight', data)

  const axiosGet = () => {
    console.log("Calling the FLIGHTICAO Endpoint")
    axios(
      {
        method: 'GET',
        url: `https://adsbexchange-com1.p.rapidapi.com/v2/icao/${flightICAO}/`,
        headers: {
          'X-RapidAPI-Key': 'fbd6ba527bmsha3e7a0dc93136f2p1915dejsnc0ffb99db3c0',
          'X-RapidAPI-Host': 'adsbexchange-com1.p.rapidapi.com'
        }
      }
    ).then(resp => {
      // resp.data = undefined
      if (resp && resp.data && resp.data.ac && resp.data.ac) {
        setData(resp.data.ac[0])
        // setUserData(sessionStorage.getItem(access_token), resp.data.ac[0].icao)
        const data = resp.data.ac[0]
        //fpost(data)
        sessionStorage.setItem(dataKey, JSON.stringify(data))
        sessionStorage.setItem(dataKey + '-timeStampFlight', new Date().getTime())
        setViewPort(vp => {
          //console.log("svp", { vp }, { data })
          vp.latitude = parseFloat(data.lat)
          vp.longitude = parseFloat(data.lon)
          return vp
        })
        setLoading(false)
        //console.log("myinfo", data)
      } else {
        const sessionData = JSON.parse(sessionStorage.getItem("myData")).filter(f => f.icao === flightICAO)
        console.log("sessionData", sessionData)
        setViewPort(vp => {
          //console.log("svp", { vp }, { data })
          vp.latitude = parseFloat(data.lat)
          vp.longitude = parseFloat(data.lon)
          return vp
        })
        setData(sessionData[0])
        setLoading(false)
      }

    })
  }





  useEffect(() => {
    console.log("running effect")
    const storedTime = sessionStorage.getItem(dataKey + '-timeStampFlight')
    const cachedData = sessionStorage.getItem(dataKey)

    //postFlightForUser()

    if (new Date().getTime() - storedTime > (5 * 60 * 1000) || !cachedData) {
      console.log('api calling')
      axiosGet()
    } else {
      console.log('using session')
      const data = JSON.parse(cachedData)
      setData(data)
      setViewPort(vp => {
        vp.latitude = parseFloat(data.lat)
        vp.longitude = parseFloat(data.lon)
        return vp
      })
      setLoading(false)
    }

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
            mapboxApiAccessToken={'pk.eyJ1IjoiZGRqYW5nbyIsImEiOiJjanh1bGoxbGExNmxnM21udmxlZDE0ZXd1In0.bJagpDIel0t0x73k748YtQ'}
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
                <img style={{ width: '25px', transform: `rotate(${data.track + 'deg'})` }} src={redJet} />
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
                <img style={{ width: '25px', transform: `rotate(${data.track + 'deg'})` }} src={redJet} />
                  <p>{data.cou}</p>
                  <p>Model: {data.type}</p>
                  <p>Call: {data.call ? data.call : 'n/a'}</p>
                  <p>Speed: {data.tas ? data.tas + 'kn' : 'n/a'}</p>
                  <p>Altitude: {data.alt ? data.alt + 'ft' : 'n/a'}</p>
                </div>
              </Popup>
            ) : null}
          </ReactMapGL>
          <img style={{ width: '25px', transform: `rotate(${data.track + 'deg'})` }} src={redJet} />
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