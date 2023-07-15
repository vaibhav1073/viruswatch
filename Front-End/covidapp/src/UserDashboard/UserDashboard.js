import React from 'react'
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import "./UserDashboard.css";


export default function UserDashboard() {
  const [allcountry, setAllCountry] = useState([]);
  const [newcountry, setCountry] = useState();
  const [profile, setProfile] = useState({});
  const [usercountry, setUsercountry] = useState([]);
  const [unique, setUnique] = useState();
  const navigate = useNavigate()
  const { email } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/user/${email}`, { headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
      .then((res) => setProfile(res.data.User))
  })

  useEffect(() => {
    axios.get("https://api.apify.com/v2/key-value-stores/tVaYRsPHLjNdNBu7S/records/LATEST?disableRedirect=true")
      .then(res =>
        setAllCountry(res.data)) //
      .catch(err => console.log(err))
  }, [])
  const countryHandler = (e) => {
    const covidetails = allcountry.find(country => country.country === e.target.value)
    setCountry(covidetails);
  }
  const addwatchlist = (e) => {
    e.preventDefault();
    axios.post("http://localhost:9000/api/addlist",
      { "countryname": newcountry.country, "totaltested": newcountry.tested, "totaldeaths": newcountry.deceased, "totalinfected": newcountry.infected, "totalrecovered": newcountry.recovered, "lastupdate": newcountry.lastUpdatedApify },
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      })
      .then(res =>
        setUsercountry([...usercountry, res.data]) //
      );
  }
  useEffect(() => {
    axios.get("http://localhost:9000/api/getlist",
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      })
      .then(res =>
        setUsercountry(res.data)) //
  }, [])


  const removeData = (_id) => {
    axios.delete(`http://localhost:9000/api/removelist/${_id}`,
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      }).then((res) => {
        const temp = [...usercountry]
        const newstate = temp.filter((item) => item._id !== _id)
        setUsercountry(newstate)
      }
      ).catch((err) => console.log(err))

  }
  const View = (countryname, totaltested, totaldeaths, totalinfected, totalrecovered) => {
    setUnique({ countryname, totaltested, totaldeaths, totalinfected, totalrecovered })
  }
  return (
    <div>
      {localStorage.getItem('token') ? <div className='container'>
        <div className='row'>
          <div className='col-md-6'>
            <div className="card bg-white mt-3">
              <div className="card-body">
                <h4 style={{ color: "green" }}>Welcome, {profile?.firstname} {profile?.lastname}</h4>
                <h5 className='mt-4'><i className="fa-solid fa-envelope fa-lg me-3 text-primary"></i>{profile?.email}</h5>
                <h5 className='mt-3'><i className="fa-solid fa-house-user fa-lg me-3 text-primary"></i> {profile?.city} </h5>
                <h5 className='mt-3'><i className="fa-solid fa-phone fa-lg me-3 text-primary"></i> {profile?.phone} </h5>
              </div>
            </div>
          </div>
          <div className='col-md-6'>

            {
              (unique !== undefined) ? <table className="table">
                <thead>
                  <tr>
                    <th colSpan={2} scope="col" className='text-center'>COVID-19 Cases in <span className='text-danger'>{unique?.countryname}</span></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Total Tested</th>
                    <td>{unique?.totaltested}</td>
                  </tr>
                  <tr>
                    <th>Total Infected</th>
                    <td>{unique?.totalinfected}</td>
                  </tr>
                  <tr>
                    <th>Total Deaths</th>
                    <td>{unique?.totaldeaths}</td>
                  </tr>
                  <tr>
                    <th>Total Recovered</th>
                    <td>{unique?.totalrecovered}</td>
                  </tr>
                </tbody>
              </table> : null
            }

          </div>
        </div>
        <hr />
      </div> : navigate('/')}
      <div className='container text-center'>
        <div className='row mb-3'>
          <div className='col-md-8'>
            <h5 className='maintag text-black mt-5'>Here you can see the cases in any country:</h5>
            <div className='row'>
              <div className='col-md-8 ml-4 text-center'>
                <select style={{ width: "auto", textAlign: "center" }} className="form-select form-select-lg mb-3 mt-5" onChange={countryHandler}>
                  <option value="select country">---Select Country Here---</option>
                  {
                    allcountry.map(item => <option key={item.country} value={item.country}>{item.country}</option>)
                  }
                </select>

              </div>
              <div className='col-md-4'>
                <button className='btn btn-primary mt-5' onClick={addwatchlist}>Add to Watchlst</button>
              </div>
            </div>
            {
              (newcountry !== undefined) ? <div className="row mt-5">

                <div className='col-md-6'>
                  <div className="card " >
                    <img src={`https://countryflagsapi.com/png/${newcountry.country}`} className="card-img-top border border-dark rounded" alt="..." />
                    <div className="card-body">
                      <h5 className="card-title"><strong>{newcountry.country}</strong></h5>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">{`Total Deceased: ${newcountry.deceased}`}</li>
                        <li className="list-group-item">{`Confirmed Infected: ${newcountry.infected}`}</li>
                        <li className="list-group-item">{`Total Recovered: ${newcountry.recovered}`}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div> : null
            }
          </div>
          <div className='col-md-4'>
            <h5 className='text-into  mt-5'>Your WatchList</h5>
            <hr />
            <div className='mt-5'>
              {
                usercountry.map(item =>
                  <ul key={item._id} className='list-group'>
                    <li className='list-group-item list-group-item-success txtcountry'>{item.countryname}<i className="fa-solid fa-trash-can float-end text-denger" onClick={() => removeData(item._id)}></i><i className="fa-solid fa-eye float-end text-primary me-3" onClick={() => View(item.countryname, item.totaltested, item.totaldeaths, item.totalinfected, item.totalrecovered)}></i></li>
                  </ul>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
