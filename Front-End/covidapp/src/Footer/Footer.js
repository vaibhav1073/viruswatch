import React from 'react'
import "./Footer.css"
import { Link } from 'react-router-dom'
export default function Footer() {
  return (
      <div>
    <div className="footer-dark">
    <footer>
        <div className="container">
            <div className="row">
                <div className="col-sm-6 col-md-3 item">
                    <h3>About Us</h3>
                    <ul className='mt-3'>
                        <li>We provides the covid-19 cases of each country.</li>
                        <li>We also provieds the news regarding covid-19.</li>
                    </ul>
                </div>
                <div className="col-sm-6 col-md-3 item">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to="/aboutus">About Us</Link></li>
                        <li><Link to="/contactus">Contact Us</Link></li>
                        <li><Link to="/">News</Link></li>
                    </ul>
                </div>
                <div className="col-md-6 item text">
                    <h3>COVID-19 Tracker</h3>
                    <p>This is a fast COVID-19 Tracker application which provides the coronavirus cases across the world. We can find infected cases, total deaths, total tested cases in any country.</p>
                </div>
                <div className="col item social"><a href="/"><i className="icon ion-social-facebook"></i></a><a href="/"><i className="fa-brands fa-instagram"></i></a><a href="/"><i className="fa-brands fa-twitter"></i></a><a href="/"><i className="fa-brands fa-linkedin"></i></a></div>
            </div>
            <p className="copyright">COVID-19 Tracker &copy; 2022</p>
        </div>
    </footer>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/js/bootstrap.bundle.min.js"></script>
</div>
  )
}
