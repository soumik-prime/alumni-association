import Navbar from './navigation/Navbar';
import TopBar from './TopBar';


export default function Header() {
    return (
        <>
            <header className='w-full bg-white'>
            <div className='sticky top-0 z-40 w-full bg-white md:static'>
                <div className='max-w-screen-2xl mx-auto relative'>
                    <TopBar />
                </div>
            </div>
            </header>
            <div className='w-full bg-white/95 backdrop-blur md:sticky md:top-0 md:z-30'>
                <div className='max-w-screen-2xl mx-auto relative'>
                    <Navbar />
                </div>
            </div>
        </>
    )
}