import React from 'react'
import "./ContactUs.css";
export default function ContactUs() {
  return (
    <div>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 offset-md-2'>
            <div className="bg-info text-light py-3 text-center rounded">
              <h2>Contact Us</h2>
            </div>
            <h3 className='mt-5'>General enquiries</h3>
            <hr />
            <h6>COVID-19 Tracker Headquarters in Geneva</h6>
            <p className='mt-4'>Avenue Appia 20</p>
            <p>1211 Geneva</p>
            <p>Switzerland</p>
            <p><span className='email'><i className="fa-solid fa-envelope fa-lg text-success"></i> covid19tracker@gmail.com</span></p>
            <p><span className='email'><i class="fa-solid fa-phone fa-lg text-success"></i> +91 22 334 55 564</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}
