import { FormControl, MenuItem, Select, Card, CardContent } from '@mui/material'
import React, { useEffect, useState } from 'react'
import "./Chart.css"
import InfoBox from '../InfoBox/InfoBox';
import Table from '../Table/Table';

import { sortData } from "../help"
import LineGraph from '../LineGraph/LineGraph';


export default function Chart() {
    useEffect(() => {
        const getCountriesData = async () => {
            await fetch('https://disease.sh/v3/covid-19/countries').then((response) => response.json()).then((data) => {
                const countries = data.map((country) => (
                    {
                        name: country.country,
                        value: country.countryInfo.iso2
                    }))
                const sortedData = sortData(data)
                setTableData(sortedData)
                setCountries(countries)
            })
        }

        getCountriesData();
    }, [])


    const [countries, setCountries] = useState([])
    const [country, setCountry] = useState('worldwide')
    const [countryInfo, setCountryInfo] = useState({})
    const [tableData, setTableData] = useState([])

    useEffect(() => {
        fetch('https://disease.sh/v3/covid-19/all')
            .then(response => response.json())
            .then(data => { setCountryInfo(data) })

    }, [])

    const onCountryChange = async (event) => {
        const countryCode = event.target.value;
        setCountry(countryCode);

        const url = countryCode === 'worldwide' ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`

        await fetch(url).then((response) => response.json()).then(data => { setCountryInfo(data) })
    }
    console.log("Country Info>>>", countryInfo);

    return (
        <div className='container'>
            <div className="app__header">
                <h1>Live Covid Stats</h1>
                <FormControl className='app__dropdown'>
                    <Select variant='outlined'
                        value={country} onChange={onCountryChange}>
                        <MenuItem value='worldwide'>Worldwide
                        </MenuItem>
                        {countries.map(country => (
                            <MenuItem value={country.value}>{country.name}</MenuItem>
                        ))}


                    </Select>

                </FormControl>
            </div>



            <div className="app">
                <div className="app__left">
                    
                       <div className="app__main">
                       <div className="container">
                         <div className="app__stats">
                        <div class="card card-style" >
                            <div class="card-body">
                                <h6 class="card-subtitle mb-2 text-muted">Covid 19 Cases</h6>
                                <h3 class="card-title">{countryInfo.cases}</h3>
                                
                            </div>
                        </div>
                        <div class="card card-style" >
                            <div class="card-body">
                                <h6 class="card-subtitle mb-2 text-muted">Recovered</h6>
                                <h3 class="card-title">{countryInfo.recovered}</h3>
                                
                            </div>
                        </div><div class="card card-style" >
                            <div class="card-body">
                                <h6 class="card-subtitle mb-2 text-muted">Total Deaths</h6>
                                <h3 class="card-title">{countryInfo.deaths}</h3>
                                
                            </div>
                        </div>

                       </div>
                        </div>

                        

                    

                    
                       <div className="container bg-color ">
                       <LineGraph />
                       </div>
                       
                       </div>

                      

                    
                </div>



                <Card className="app__right">
                    <CardContent>
                        <h3>Live Cases by Country</h3>
                        <Table countries={tableData}></Table>
                        <h4>World-wide New Cases</h4>
                    </CardContent>


                </Card>
            </div>



        </div>
    )
}
{/* <Card className="infobox">
                            <InfoBox title="Covid-19 cases" cases={countryInfo.cases} />
                            <InfoBox title="Recovered" cases={countryInfo.recovered} />
                            <InfoBox title="Deaths" cases={countryInfo.deaths} />
                        </Card> */}