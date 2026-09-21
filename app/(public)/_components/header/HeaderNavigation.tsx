import Navbar from './Navbar';

export default function HeaderNavigation() {
    return (
        <div className='w-full bg-white/95 backdrop-blur md:sticky md:top-0 md:z-30'>
            <div className='max-w-screen-2xl mx-auto relative'>
                <Navbar />
            </div>
        </div>
    )
}