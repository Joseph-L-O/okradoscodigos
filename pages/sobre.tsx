import Footer from "@/components/Footer"
import HeaderNav from "@/components/HeaderNav"
import Image from "next/image"

export default function Sobre() {

    return (
        <div>
            <HeaderNav />
            <section className="bg-[#0f172a] text-white py-16 md:py-7">
                <div className="container mx-auto px-2">
                    <div className="max-w-3xl flex flex-col items-center justify-center  mx-auto text-center">
                        <Image alt="logo" src="/logo.png" width={600} height={600} className="w-[350px] h-[300px] opacity-90" />
                        <h1 className="text-xl md:text-2xl text-gray-300 mb-8">Sobre Mim</h1>
                    </div>
                </div>
            </section>
            <section className="py-12 md:py-16 bg-[#f8fafc]">
                <div className="container mx-auto px-4">
                    <p className="text-lg md:text-xl text-gray-800 mb-8 w-[80%] min-md:w-[50%] mx-auto">
                        Olá, eu sou OKra Q Programa, Sou apaixonado por tecnologia, programação e tudo que envolve criar coisas com código.
                        <br />
                        <br />
                        Esse blog nasceu como um espaço pra compartilhar minha jornada como dev, projetos que estou construindo, aprendizados, bugs (sim, eles também merecem espaço) e tudo que acho massa no universo tech.
                        <br />
                        <br />
                        Se você curte desenvolvimento, curiosidades de programação ou só quer acompanhar alguém tentando fazer a internet funcionar com Next.js, Supabase e café, fica por aqui. :)
                    </p>
                </div>
            </section>
            <Footer />
        </div>
    )
}