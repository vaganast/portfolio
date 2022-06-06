import React, { useState } from 'react'

import { images } from '../../constants'
import { AppWrap, MotionWrap } from '../../wrapper'
import { client } from '../../client'
import './Footer.scss'

const Footer = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: ''});
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const { name, email, message } = formData;

    const handleChangeInput = (e) => {
      const { name, value } = e.target; 

      setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = () => {
      setLoading(true);

      const contact = {
        _type: 'contact',
        name: name,
        email: email,
        message: message,
      }

      /*edw xrisimopoioume to sanity client gia na anebasei ta data */     

      client.create(contact)
      .then(() => {
        setLoading(false);
        setIsFormSubmitted(true);   /*mas boithaei na diksoume success msg oti ta esteile sosta */
      })
    }
     
  return (
    <>
      <h2 className='head-text'>Take a coffee & chat with me </h2>

      <div className='app__footer-cards'>
        <div className='app__footer-card'>
          <img src={images.email} alt='email' />
          <a href='mailto:hello@vag.com' className='p-text'>hello@vag.com</a>
        </div>
        <div className='app__footer-card'>
          <img src={images.mobile} alt='mobile' />
          <a href='tel: +30 (2310) 000-000' className='p-text'>+30 (2310) 000-000</a>
        </div>
      </div>

{/*edw kanoume elegxo if form submited (allazei to state otan patame to koumpi ) tote deixnei tin form allios  to h3 */}

  {!isFormSubmitted ?  
      <div className='app__footer-form app__flex'>
        <div className='app__flex'>
          <input className='p-text' type='text' placeholder='Your Name' name='name' value={name} onChange={handleChangeInput} />
        </div>
          <div className='app__flex'>
            <input className='p-text' type='email' placeholder='Your Email' name='email' value={email} onChange={handleChangeInput} />
          </div>
        <div>
          <textarea 
          className='p-text'
          placeholder='Your Message'
          value={message}
          name='message'
          onChange={handleChangeInput}
           />
        </div>
          <button type='button' className='p-text' onClick={handleSubmit}>
            {/*klassika an kanei loading tote bgazei msg sending allios sendmessage*/}
            {loading ? 'Sending' : 'Send Message'}
          </button>
      </div>
                :   <div>
                      <h3 className='head-text'>Thank you for getting in touch with me ! </h3>
                    </div>
  }  
    </>
  )
}

export default AppWrap(
  MotionWrap(Footer, 'app__footer'),
  'contact',
  'app__whitebg'
)