// pages/privacidade.tsx

import Footer from '@/components/Footer'
import HeaderNav from '@/components/HeaderNav'
import Head from 'next/head'

const Privacidade = () => {
    return (
        <>
            <Head>
                <title>Política de Privacidade e Uso de Cookies</title>
                <meta name="description" content="Política de Privacidade e Uso de Cookies do nosso site" />
            </Head>
            <HeaderNav />
            <section className="bg-[#0f172a] text-white py-16 md:py-7">
                <div className="container mx-auto px-2">
                    <div className="max-w-3xl flex flex-col items-center justify-center  mx-auto text-center">
                        <h1 className="text-3xl font-semibold text-center">Política de Privacidade e Uso de Cookies</h1>
                    </div>
                </div>
            </section>
            <div className="max-w-4xl mx-auto p-6">

                <section className="mt-8">
                    <h2 className="text-2xl font-semibold">1. Introdução</h2>
                    <p className="mt-2 text-base">
                        Esta Política de Privacidade descreve como coletamos, usamos e protegemos as informações pessoais quando você acessa nosso site. Também explicamos como utilizamos cookies para melhorar sua experiência de navegação.
                    </p>
                </section>

                <section className="mt-8">
                    <h2 className="text-2xl font-semibold">2. Coleta de Informações Pessoais</h2>
                    <p className="mt-2 text-base">
                        Coletamos informações pessoais, como nome, e-mail e outras informações que você forneça ao interagir com nosso site, como ao preencher formulários ou se inscrever em nossos serviços.
                    </p>
                </section>

                <section className="mt-8">
                    <h2 className="text-2xl font-semibold">3. Uso de Cookies</h2>
                    <p className="mt-2 text-base">
                        Utilizamos cookies para melhorar a experiência de navegação, personalizar conteúdo, analisar tráfego e oferecer funcionalidades de redes sociais. Ao continuar navegando em nosso site, você concorda com o uso de cookies.
                    </p>
                    <p className="mt-2 text-base">Os cookies que utilizamos são:</p>
                    <ul className="list-disc pl-6 mt-2">
                        <li>Cookies de sessão: para manter você logado durante sua navegação.</li>
                        <li>Cookies analíticos: para entender como os visitantes utilizam nosso site.</li>
                        <li>Cookies de personalização: para fornecer uma experiência mais personalizada.</li>
                    </ul>
                    <p className="mt-2 text-base">
                        Você pode controlar o uso de cookies nas configurações do seu navegador a qualquer momento.
                    </p>
                </section>

                <section className="mt-8">
                    <h2 className="text-2xl font-semibold">4. Compartilhamento de Informações</h2>
                    <p className="mt-2 text-base">
                        Não compartilhamos suas informações pessoais com terceiros, exceto quando necessário para cumprir a lei, proteger nossos direitos ou com parceiros de confiança que nos auxiliam na operação do site.
                    </p>
                </section>

                <section className="mt-8">
                    <h2 className="text-2xl font-semibold">5. Segurança</h2>
                    <p className="mt-2 text-base">
                        Adotamos medidas de segurança para proteger suas informações pessoais contra acesso não autorizado ou perda, mas não podemos garantir segurança total na transmissão de dados pela internet.
                    </p>
                </section>

                <section className="mt-8">
                    <h2 className="text-2xl font-semibold">6. Alterações nesta Política</h2>
                    <p className="mt-2 text-base">
                        Podemos alterar esta Política de Privacidade e Uso de Cookies de tempos em tempos. Quaisquer alterações serão publicadas nesta página, e a data da última atualização será informada abaixo.
                    </p>
                </section>

                <section className="mt-8">
                    <h2 className="text-2xl font-semibold">7. Contato</h2>
                    <p className="mt-2 text-base">
                        Se você tiver dúvidas sobre nossa Política de Privacidade, entre em contato conosco através do nosso e-mail: <a href="mailto:josephleonardodeoliveira@gmail.com" className="text-blue-600">josephleonardodeoliveira@gmail.com</a>.
                    </p>
                </section>

            </div>
            <Footer />
        </>
    )
}

export default Privacidade
