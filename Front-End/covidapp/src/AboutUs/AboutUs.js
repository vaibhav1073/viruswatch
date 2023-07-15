import React from 'react';
import './About.css';
export default function AboutUs() {
  return (
    <div>
      <div className='container txt'>
        <h3 className='text-success text-center'>We champion health and a better future for all</h3>
        <p className='text-center'>Dedicated to the well-being of all people and guided by science, the World Health Organization leads and champions global efforts to give everyone, everywhere an equal chance to live a healthy life. </p>
      </div>
      <div className='container mt-5'>
        <div className='row bg '>
          <div className='col-md-6'>
            <h3 className='font-weight-bold'>Who We are?</h3>
            <hr />
            <p>Founded in 2022, COVID-19 Tracker is a fast , efficient application that gives the COVID-19 cases report of every country. We are giving updates regarding COVID-19 to the registered Users. </p>
          </div>
          <div className='col-md-6'>
            <h3 className='font-weight-bold'>Who We work with?</h3>
            <hr />
            <p>Collaboration is at the heart of all we do. From governments and civil society to international organizations, foundations, advocates, researchers and health workers, we mobilize every part of society to advance the health and security of all.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
