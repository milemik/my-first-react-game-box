import boxlogo from "../assets/box-logo.png"

export default function Home() {
  return (
    <section id="home" className="grid justify-center p-4">
        <h1 className="font-bold text-4xl color-cyan-400">Welcome to my website</h1>
        <div className="grid justify-center p-4">
          <p className="text-2xl text-center font-bold">Lets box</p>
          <img src={boxlogo} alt="Test" className="w-72"/>
        </div>
    </section>
  )
}
