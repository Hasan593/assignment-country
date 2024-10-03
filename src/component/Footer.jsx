const Footer = () => {

    const date = new Date();
    const year = date.getFullYear();

    return (
        <>
         <div className="bg-green-950 h-12 mt-7 flex items-center justify-center">
            <p className="text-center text-white">© {year} Countries info. All Rights Reserved</p>   
         </div>   
        </>
    );
};

export default Footer;