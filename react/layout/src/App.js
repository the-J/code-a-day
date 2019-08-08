import React from 'react'

import { Layout } from './components/Layout/Layout'
import { Footer } from './components/Footer/Footer'
import { Navbar } from './components/Navbar/Navbar'


const App = () => (
    <Layout>
        <Navbar/>
        <Footer/>
    </Layout>
)

export default App
