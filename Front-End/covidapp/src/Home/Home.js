import React, { useState, useEffect } from 'react'
import axios from "axios";
import "./Home.css"
import { ResponsiveContainer, LineChart, XAxis, Line, YAxis, CartesianGrid } from 'recharts';
import Chart from '../Chart/Chart';

export default function Home() {
  const [global, setGlobal] = useState([]);
  const [allcountry, setAllCountry] = useState([]);
  const [newcountry, setCountry] = useState();
  const data = [
    { name: "Totaldeaths", value: global.Global?.TotalDeaths },
    { name: "TotalRecovered", value: global.Global?.TotalRecovered },
    { name: "NewConfirmed", value: global.Global?.NewConfirmed },
    { name: "NewDeaths", value: global.Global?.NewDeaths },
    { name: "NewRecovered", value: global.Global?.NewRecovered },
    { name: "TotalConfirmed", value: global.Global?.TotalConfirmed },
  ]

  useEffect(() => {
    axios.get("https://api.covid19api.com/summary")
      .then(res => {
        setGlobal(res.data);
      })
  }, [])
  useEffect(() => {
    axios.get("https://api.apify.com/v2/key-value-stores/tVaYRsPHLjNdNBu7S/records/LATEST?disableRedirect=true")
      .then(res =>
        setAllCountry(res.data))
      .catch(err => console.log(err))
  }, [])
  const countryHandler = (e) => {
    const covidetails = allcountry.find(country => country.country === e.target.value)
    console.log(allcountry)
    setCountry(covidetails);
  }
  return (
    <div className=' '>
      


      <div className='container-fluid text-center'>
        <h2 className='text-center blink mt-3'>🔴 LIVE Covid-19 Tracker</h2>
        <div className='row mt-3'>
         <Chart />
          {/* <h2 className='text-success'><u> World Wide <span className='text-danger'>COVID-19 </span> Report  </u></h2> */}
          <div className='col-md-12 container '>
            <div className="row mt-2 d-flex justify-content-around ">
              <div className='col-md-5'>
                <div className="card bg-light text-black" >
                  <div className="card-body">
                    <img className="img-thumbnail img-responsive " src="/mask1.jpg" class="card-img-top" alt="covid" />
                    <h4 className="card-title  text">Total Confirmed</h4>
                    <h6 className="text-success text num">{global.Global?.TotalConfirmed}<span className='icon'><i className="fa-solid fa-check text-danger fa-lg"></i></span></h6>
                  </div>
                </div>
              </div>
              <div className='col-md-5 '>
                <div className="card bg-light">
                  <div className="card-body">
                    <img className="img-thumbnail img-responsive card-img-top" src="/mask2.jpg" alt="covid " />
                    <h4 className="card-title text">New Confirmed Cases</h4>
                    <h6 className='text-success text num'>+{global.Global?.NewConfirmed}<span className='icon'><i className="fa-solid fa-arrow-up"></i></span></h6>
                  </div>
                </div>
              </div>

            </div>
            <div className='row mt-2 d-flex justify-content-around'>
              <div className='col-md-5'>
                <div className="card bg-light text-black" >
                  <div className="card-body">
                    <img className="img-thumbnail img-responsive" src="/recovery1.jpg" class="card-img-top" alt="covid " />
                    <h4 className="card-title text-primary text">Total Recovered</h4>
                    <h6 className='text-primary num text'>{global.Global?.TotalRecovered}</h6>
                  </div>
                </div>
              </div>
              <div className='col-md-5'>
                <div className="card bg-light text-black">
                  <div className="card-body">
                    <img className="img-thumbnail img-responsive" src="/recovery2.jpg" class="card-img-top" alt="covid i" />
                    <h4 className="card-title text-primary text">New Recovered</h4>
                    <h6 className='text-primary num'>{global.Global?.NewRecovered}</h6>
                  </div>
                </div>
              </div>

            </div>
            <div className='row mt-2 d-flex justify-content-around'>
              <div className='col-md-5'>
                <div className="card bg-light text-black" >
                  <div className="card-body">
                    <img className="img-thumbnail img-responsive" src="/death1.jpg" class="card-img-top" alt="covid " />
                    <h4 className="card-title text-dark text">New Deaths</h4>
                    <h6 className='text-dark text num'>+{global.Global?.NewDeaths}<span className='icon'><i className="fa-solid fa-arrow-up"></i></span></h6>
                  </div>
                </div>
              </div>
              <div className='col-md-5'>
                <div className="card bg-light text-black">
                  <div className="card-body">
                    <img className="img-thumbnail img-responsive" src="/death2.jpg" class="card-img-top" alt="covid " />
                    <h4 className="card-title text-dark text">Total Deaths</h4>
                    <h6 className='text-dark num text'>{global.Global?.TotalDeaths}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            {/* <ResponsiveContainer width="100%" height="100" aspect={2}>
              <LineChart data={data} margin={{ left: 40, top: 50, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis />
                <YAxis />
                <Line dataKey="value" />
              </LineChart>
            </ResponsiveContainer> */}
            {/* <div className='mt-5'>
              <pre>
                0 = Totaldeaths,
                1 = TotalRecovered,
                2 = NewConfirmed,
                3 = NewDeaths,
                4 = NewRecovered,
                5 = TotalConfirmed
              </pre>

            </div> */}
          </div>
        </div>
      </div>
      <div className='container text-center'>
        <h4 className='maintag text-black mt-5'>Select the country to view cases</h4>
        <select className="form-select form-select-lg mb-3 mt-5" onChange={countryHandler}>
          <option value="select country">---Select Country Here---</option>
          {
            allcountry.map(item => <option key={item.country} value={item.country}>{item.country}</option>)
          }
        </select>
        {
          (newcountry !== undefined) ? <div className="container text-center">



            <div class="card w-50 col-mx-auto" >
              <img src={`https://countryflagsapi.com/png/${newcountry.country}`} className="card-img-top border border-dark rounded" alt="..." />
              <div class="card-body">
                <h5 class="card-title"><strong>{newcountry.country}</strong></h5>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">{`Total Deceased: ${newcountry.deceased}`}</li>
                  <li class="list-group-item">{`Confirmed Infected: ${newcountry.infected}`}</li>
                </ul>
              </div>
            </div>


            {/* 
            <div className='col-md-4'>
              <div className="card bg-green text-center" >
                <div className="card-body">
                  <h4 className="card-title text">Country Name</h4>
                  <h6 className="card-text text-success text num">{newcountry.country}</h6>
                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <div className="card bg-blue">
                <div className="card-body">
                  <h4 className="card-title text-primary text">Total Tested</h4>
                  <h6 className='text-primary text num'>{newcountry.tested}</h6>
                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <div className="card bg-red" >
                <div className="card-body">
                  <h4 className="card-title text-dark text">Total Deaths</h4>
                  <h6 className='text-dark text num'>{newcountry.deceased}</h6>
                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <div className="card bg-green" >
                <div className="card-body">
                  <h4 className="card-title text">Total Infected</h4>
                  <h6 className='text-success text num'>{newcountry.infected}</h6>
                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <div className="card bg-blue">
                <div className="card-body">
                  <h4 className="card-title text-primary text">Total Recovered</h4>
                  <h6 className='text-primary text num'>{newcountry.recovered}</h6>
                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <div className="card bg-white">
                <div className="card-body">
                  <h4 className="card-title text-dark text">Last Update</h4>
                  <h6 className='text-black text num'>{newcountry.lastUpdatedApify}</h6>
                </div>
              </div>
            </div> */}
          </div> : null
        }
        <div>
          {/* <p className='text-para'>COVID-19 Report of Each Country:</p> */}
          {/* <table className="table table-hover">
            <thead className='theads'>
              <tr>
                <th scope="col">Country Name</th>
                <th scope="col">Total Infected</th>
                <th scope="col">Total Deaths</th>
                <th scope="col">Total Tested</th>
              </tr>
            </thead>
            <tbody>
              {
                allcountry.map(index => <tr key={index.country}>
                  <td className='one'>{index.country}</td>
                  <td className='two'>{index.infected}</td>
                  <td className='three'>{index.deceased}</td>
                  <td className='four'>{index.tested}</td>
                </tr>
                )

              }
            </tbody>
          </table> */}
        </div>
      </div>
    </div>
  )
}
