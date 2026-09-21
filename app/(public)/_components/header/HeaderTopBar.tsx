import TopBar from './TopBar';

export default function HeaderTopBar() {
    return (
        <header className='w-full bg-white'>
            <div className='sticky top-0 z-40 w-full bg-white md:static'>
                <div className='max-w-screen-2xl mx-auto relative'>
                    <TopBar />
                </div>
            </div>
        </header>
    )
}