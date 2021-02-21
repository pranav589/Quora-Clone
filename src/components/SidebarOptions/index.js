import React from 'react'
import AddIcon from '@material-ui/icons/Add';
import './styles.css'


const options=[
    {
        image:"https://qphs.fs.quoracdn.net/main-thumb-t-930-100-cbbsbwijdhpyzlpipejvqpiijhhoaday.jpeg",
        desc:"Mobile App Development"
    },
    {
        image:"https://qphs.fs.quoracdn.net/main-thumb-t-858-100-VnZbEVtOIGkEHXlnYId9slumV59IPgkA.jpeg",
        desc:"Hear Him!"
    },
    {
        image:"https://qphs.fs.quoracdn.net/main-thumb-t-1913-100-B8JrwaVauFzsaTSqXDqoWLCXzQb2mTE9.jpeg",
        desc:"Psycology"
    },
    {
        image:"https://qphs.fs.quoracdn.net/main-thumb-t-877-100-e7jKHEQr0HExAIA9rlsyHlV6HJyRruEo.jpeg",
        desc:"Cooking Tips "
    },
    {
        image:"https://qphs.fs.quoracdn.net/main-thumb-t-801-100-Sf8h894FXbQZQit0TeqDrrqS6xw6dwCQ.jpeg",
        desc:"The Indian"
    },
    {
        image:"https://qphs.fs.quoracdn.net/main-thumb-t-931-100-c8WCPwZ9qPsh5zLGQ5wHh1ddxtc9Cch7.jpeg",
        desc:"Scientific Facts!"
    },
    {
        image:"https://qphs.fs.quoracdn.net/main-thumb-t-1140-100-24q3tiv4WhPssc5TGwf0mvCM5aiqGVXW.jpeg",
        desc:"Health Tips"
    }
]

function SidebarOptions() {
    return (
        <div  className='sidebarOptions'>
            {
                options.map(option=>(
                    <div className='sidebarOption' key={option.image}>
                    <img src={option.image} alt={option.desc}/>
                    <p>{option.desc}</p>
                    </div>
                ))
            }
            <div className="sidebarOption">
            <AddIcon/>
            <p>Discover</p>
            </div>

            
        </div>
    )
}

export default SidebarOptions
