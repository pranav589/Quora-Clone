import React from 'react'
import './styles.css'

const widgets=[
    {
        img:"https://qphs.fs.quoracdn.net/main-thumb-ti-1737435-100-jxcfmjdvwvpkcketifttdmeeimxcatua.jpeg",
        title:'Mobile App Programmer',
        desc:'The best Mobile App Development Company'
    },
    {
        img:"https://qphs.fs.quoracdn.net/main-thumb-ti-1574818-100-mzdwostcualpwcxekyrvyqqpychetdoc.jpeg",
        title:'Quotes forver',
        desc:'daily quotes'
    },
    {
        img:"https://qphs.fs.quoracdn.net/main-thumb-ti-1644613-100-ydflucgoeztbhwyurtmlqqrgfqmjmhpl.jpeg",
        title:'Arts',
        desc:'Best of arts'
    },
    {
        img:"https://qphs.fs.quoracdn.net/main-thumb-ti-1647318-100-kmwvqbpzatmylibelrowrerfqbspekwo.jpeg",
        title:'Friedrich Nietzche',
        desc:'A Space dedicated to great work of Friedrich..'
    },

]

function WidgetOptions() {
    return (
        <div className='widgetOptions'>

                {
                    widgets.map(widget=>(
                        <div className="widgetOptions__content" key={widget.img}>
                        <img src={widget.img} alt=""/>
                        <div className="widgetOptions__contentTitle">
                            <h5>{widget.title}</h5>
                            <p>{widget.desc}</p>
                        </div>
                        </div>
                    ))
                }

        </div>
    )
}

export default WidgetOptions
