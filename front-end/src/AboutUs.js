import { useEffect, useState } from 'react'
import axios from 'axios'

/**
 * A React component that represents one Message in the list of messages.
 * @param {*} param0 an object holding any props and a few function definitions passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
  const AboutUs = () => {
    const [error, setError] = useState('')
    const [aboutus, setAboutUs] = useState({name:'',para:'',imageUrl:''})
    useEffect(() => {
      axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/aboutus`)
        .then(response =>{
          setAboutUs(response.data)
        })
    }, [])
    return (
      <>
        <h1>About Us</h1>
        {error && <p className="AboutUsForm-error">{error}</p>}
        {!error && (
          <article className="AboutUs-article">
            <h2>
              {aboutus.name}
            </h2>
            <p>{aboutus.para}</p>
            <img src={aboutus.imageUrl} alt="About Us" style={{ maxWidth: '100%' }} />
          </article>
        )}
      </>
    )
  }
  // this component expects to be passed all the details of the message it should display
  // format the date of the message nicely
  
  // state variables to hold the about us data
  



// make this component available to be imported into any other file
export default AboutUs
