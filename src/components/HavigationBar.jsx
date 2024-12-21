export default function NavigationBar() {
    return <nav>
        <ol className="flex gap-4 bg-teal-400 font-bold p-4">
            <li className="text-3xl"><a href="#home" className="p-4 hover:bg-teal-100">HOME</a></li>
            <li className="text-3xl"><a href="#about" className="p-4 hover:bg-teal-100">ABOUT ME</a></li>
            <li className="text-3xl"><a href="#game" className="p-4 hover:bg-teal-100">GAME</a></li>
        </ol>
    </nav>
}