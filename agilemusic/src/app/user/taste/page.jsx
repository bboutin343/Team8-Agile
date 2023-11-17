"use client"
import React, {useState} from 'react'
import axios from 'axios';

export default function TasteSelection() {
    const [rock, setRock] = useState(false)
    const [punk, setPunk] = useState(false)
    const [alternative, setAlternative] = useState(false)
    const [metal, setMetal] = useState(false)
    const [pop, setPop] = useState(false)
    const [hipHop, setHipHop] = useState(false)
    const [jazz, setJazz] = useState(false)
    const [classical, setClassical] = useState(false)
    const [electronic, setElectronic] = useState(false)
    const [reggae, setReggae] = useState(false)
    const [sixties, set60s] = useState(false)
    const [seventies, set70s] = useState(false)
    const [eighties, set80s] = useState(false)
    const [nineties, set90s] = useState(false)
    const [two00s, set00s] = useState(false)
    const [twenty10s, set10s] = useState(false)
    const [twenty20s, set20s] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault();
        let genres = []
        let decades = []
        if (rock) {
            genres.push("rock")
        }
        if (punk) {
            genres.push("punk")
        }
        if (alternative) {
            genres.push("alternative")
        }
        if (metal) {
            genres.push("metal")
        }
        if (pop) {
            genres.push("pop")
        }
        if (hipHop) {
            genres.push("hip hop")
        }
        if (jazz) {
            genres.push("jazz")
        }
        if (classical) {
            genres.push("classical")
        }
        if (electronic) {
            genres.push("electronic")
        }
        if (reggae) {
            genres.push("reggae")
        }

        if (sixties) {
            decades.push("1960s")
        }
        if (seventies) {
            decades.push("1970s")
        }
        if (eighties) {
            decades.push("1980s")
        }
        if (nineties) {
            decades.push("1990s")
        }
        if (two00s) {
            decades.push("2000s")
        }
        if (twenty10s) {
            decades.push("2010s")
        }
        if (twenty20s) {
            decades.push("2020s")
        }
        
        const userId = cookies.get("userId")
        //axios.post("/api/user", {action: "update", genres: genres, decades: decades})
        
    }
    return (
        <div className="TasteSelect">
            <h1>Welcome! Fill out this quick form so we can get some info on what to recommend to you</h1>
            <form id='tasteForm' onSubmit={handleSubmit}>
                <label>What are your favorite genres?
                    <br/>
                    <input type="checkbox" id="rock" onChange={()=>setRock(!rock)} name="rock" value="rock"/>
                    <label htmlFor="rock">rock</label><br/>
                    <input type="checkbox" id="punk" onChange={()=>setPunk(!punk)} name="punk" value="punk"/>
                    <label htmlFor="punk">punk</label><br/>
                    <input type="checkbox" id="alternative" onChange={()=>setAlternative(!alternative)} name="alternative" value="alternative"/>
                    <label htmlFor="alternative">alternative</label><br/>
                    <input type="checkbox" id="metal" onChange={()=>setMetal(!metal)} name="metal" value="metal"/>
                    <label htmlFor="metal">metal</label><br/>
                    <input type="checkbox" id="pop" onChange={()=>setPop(!pop)} name="pop" value="pop"/>
                    <label htmlFor="pop">pop</label><br/>
                    <input type="checkbox" id="hip hop" onChange={()=>setHipHop(!hipHop)} name="hip hop" value="hip hop"/>
                    <label htmlFor="hip hop">hip hop</label><br/>
                    <input type="checkbox" id="jazz" onChange={()=>setJazz(!jazz)} name="jazz" value="jazz"/>
                    <label htmlFor="jazz">jazz</label><br/>
                    <input type="checkbox" id="classical" onChange={()=>setClassical(!classical)} name="classical" value="classical"/>
                    <label htmlFor="classical">classical</label><br/>
                    <input type="checkbox" id="electronic" onChange={()=>setElectronic(!electronic) }name="electronic" value="electronic"/>
                    <label htmlFor="electronic">electronic</label><br/>
                    <input type="checkbox" id="reggae" onChange={()=>setReggae(!reggae)} name="reggae" value="reggae"/>
                    <label htmlFor="reggae">reggae</label><br/>
                </label>
                <br/>
                <label>What decades of music do you like?
                    <br/>
                    <input type="checkbox" id="1960s" onChange={()=>set60s(!sixties)} name="1960s" value="1960s"/>
                    <label htmlFor="1960s">1960s</label><br/>
                    <input type="checkbox" id="1970s" onChange={()=>set70s(!seventies)} name="1970s" value="1970s"/>
                    <label htmlFor="1970s">1970s</label><br/>
                    <input type="checkbox" id="1980s" onChange={()=>set80s(!eighties)} name="1980s" value="1980s"/>
                    <label htmlFor="1980s">1980s</label><br/>
                    <input type="checkbox" id="1990s" onChange={()=>set90s(!nineties)} name="1990s" value="1990s"/>
                    <label htmlFor="1990s">1990s</label><br/>
                    <input type="checkbox" id="2000s" onChange={()=>set00s(!two00s)} name="2000s" value="2000s"/>
                    <label htmlFor="2000s">2000s</label><br/>
                    <input type="checkbox" id="2010s" onChange={()=>set10s(!twenty10s)} name="2010s" value="2010s"/>
                    <label htmlFor="2010s">2010s</label><br/>
                    <input type="checkbox" id="2020s" onChange={()=>set20s(!twenty20s)} name="2020s" value="2020s"/>
                    <label htmlFor="2020s">2020s</label><br/>
                </label>
                <br/>
                <button type="submit" value="Submit">Submit</button>
            </form>
        </div>
    )
}