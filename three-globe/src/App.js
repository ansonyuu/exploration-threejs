import React from 'react'
import styled from 'styled-components'
import _Globe from 'react-globe.gl'
import ThemeProvider from './theme/ThemeProvider'
import GlobalStyle from './theme/GlobalStyle'
import Venues from './venues-slugs.json'

const Globe = () => {
  const SortedPoints = Venues.sort((a, b) => b.lat - a.lat)
  const MapPoints = SortedPoints.map((obj) => ({
    lat: obj.latitude,
    lng: obj.longitude,
    name: obj.slug,
  }))

  const MapNames = Venues.map((obj) => ({
    name: obj.slug,
  }))
  console.log(MapPoints)
  return (
    <_Globe
      pointsData={MapPoints}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
      pointsAltitude={Math.random() / 3}
      pointLabel={MapNames}
    />
  )
}
const App = () => {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <Globe />,
    </ThemeProvider>
  )
}

export default App
