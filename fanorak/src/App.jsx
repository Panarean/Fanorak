import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes,Route,BrowserRouter, useNavigate }  from 'react-router-dom'

import { AppHeader,AppFooter } from './components'
import { Home, Signin, Signup, Signout } from './components/Pages'
import store from './store'

import { Provider } from 'react-redux'
import { Flex,Box } from '@chakra-ui/react'
function App() {
  
  return (
    <Provider store={store}>
        <BrowserRouter>
          <Flex flexDir={'column'} flex={1} >
            <AppHeader/>
            <Flex flex={1} alignItems={'center'}>
              <Routes >
                <Route exact path='/' element={<Home/>}/>
                <Route exact path='/signin' element={<Signin/>}/>
                <Route exact path='/signup' element={<Signup/>}/>
                <Route exact path='/signout' element={<Signout/>}/>
              </Routes>
            </Flex>
            
          </Flex>
        </BrowserRouter>
                
      <AppFooter/>
    </Provider>
  )
}

export default App
