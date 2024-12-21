import reactImage from "../assets/react.svg"

export default function Home() {
  return (
    <section id="home" className="grid justify-center p-4">
        <h1 className="font-bold text-4xl color-cyan-400">Welcome to my website</h1>
        <div className="grid justify-center p-4">
          <img src={reactImage} alt="Test" className="w-72"/>
        </div>
    </section>
  )
}
