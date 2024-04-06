const contact_mail = "1155159019@link.cuhk.edu.hk" as const




function Footer() {
    return <footer className='grid grid-flow-col justify-around overflow-y-scroll  bg-gray-700 text-white h-[7vh] items-center font-mono  font-medium  cursor-default' >
        <div>IERG4210 Assignment Final Phase</div>
        <div>By: Shum Ching Chit </div>
        <div>SID: 1155159019</div>
        <div>Contact: <a href={"mailto:" + contact_mail} className=' underline  cursor-pointer'>{contact_mail}</a></div>
    </footer>
}



export default Footer