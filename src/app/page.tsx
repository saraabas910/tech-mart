import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-50"> 
  
      <h1 className='font-bold text-5xl drop-shadow-lg text-gray-800 mb-8'>
        WELCOME TO TECH MART
      </h1>


      <Link href="/products"> 
        <button className="bg-black text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-950 transition-all shadow-md active:scale-95">
          Start Shopping
        </button>
      </Link>
    </div>
  );
}