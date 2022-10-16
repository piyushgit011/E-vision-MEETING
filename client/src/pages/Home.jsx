import React from 'react'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import WhatWeAre from '../components/WhatWeAre'
import Services from '../components/Services'

export default function Home() {
  return (
    <div>
      <Hero/>
      <WhatWeAre/>
      <Services/>
      <Footer/>
    </div>
  )
}
