import React from 'react'
import { useWeather } from '../hooks/useWeather'
import { Form } from './Form'
import { Loading } from './Loading'
import { Result } from './Result'

export const AppWeather = () => {

  const {result, loading, error} = useWeather();

  return (
    <>
        <main className='two-columns'>
            <Form />

          { loading 
            ? <Loading />
            : result?.name ? <Result /> 
            : error ? <p>No search found</p>
            : <p>The weather will appear here</p>
          }
            
        </main>
    </>
  )
}
