const Header = () => {
    return (
        <>
            <div className="bg-blue-800 fixed top-0 md:h-16 h-20 w-full flex md:flex-row flex-col md:justify-between items-center px-5">
                <h1 className="text-3xl text-yellow-400 mb-2">Countries Information</h1>
                <div>
                    <input className="rounded-md p-1" placeholder="Search by country name..." type="text" />
                </div>
            </div>
        </>
    );
};

export default Header;