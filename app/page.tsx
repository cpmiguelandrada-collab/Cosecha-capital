"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">

      {/* NAVBAR */}

      <nav className="flex justify-between items-center px-10 py-6 border-b border-zinc-800">
        <h1 className="text-2xl font-bold text-green-500">
          SUPER TEST 123
        </h1>

        <div className="flex gap-4">
          <Link
            href="/login"
            className="bg-zinc-800 px-5 py-3 rounded-xl"
          >
            Iniciar sesión
          </Link>

          <Link
            href="/login"
            className="bg-green-600 px-5 py-3 rounded-xl"
          >
            Crear cuenta
          </Link>
        </div>
      </nav>

      {/* HERO */}

      <section className="max-w-7xl mx-auto px-10 py-28">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          <div>

            <p className="text-green-500 font-semibold mb-4">
              FINANCIAMIENTO AGRO DIGITAL
            </p>

            <h1 className="text-6xl font-bold leading-tight">
              Invertí en el agro argentino desde USD 100
            </h1>

            <p className="text-zinc-400 text-xl mt-8 leading-relaxed">
              Conectamos inversores con productores
              agropecuarios mediante proyectos
              transparentes, trazables y respaldados
              por economía real.
            </p>

            <div className="flex gap-5 mt-10">

              <Link
                href="/login"
                className="bg-green-600 px-8 py-4 rounded-2xl font-bold"
              >
                Comenzar a invertir
              </Link>

              <Link
                href="/login"
                className="bg-zinc-800 px-8 py-4 rounded-2xl"
              >
                Explorar proyectos
              </Link>

            </div>

          </div>

          <div className="bg-zinc-900 rounded-3xl p-10 border border-zinc-800">

            <div className="grid grid-cols-2 gap-6">

              <div className="bg-zinc-800 rounded-2xl p-8">
                <p className="text-zinc-400">
                  Capital financiado
                </p>

                <h2 className="text-4xl font-bold mt-3">
                  USD 2.4M
                </h2>
              </div>

              <div className="bg-zinc-800 rounded-2xl p-8">
                <p className="text-zinc-400">
                  Inversores activos
                </p>

                <h2 className="text-4xl font-bold mt-3">
                  120+
                </h2>
              </div>

              <div className="bg-zinc-800 rounded-2xl p-8">
                <p className="text-zinc-400">
                  ROI estimado
                </p>

                <h2 className="text-4xl font-bold mt-3">
                  12%
                </h2>
              </div>

              <div className="bg-zinc-800 rounded-2xl p-8">
                <p className="text-zinc-400">
                  Proyectos activos
                </p>

                <h2 className="text-4xl font-bold mt-3">
                  15
                </h2>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* HOW IT WORKS */}

      <section className="bg-zinc-950 py-24">

        <div className="max-w-7xl mx-auto px-10">

          <h2 className="text-5xl font-bold text-center">
            Cómo funciona
          </h2>

          <div className="grid md:grid-cols-3 gap-10 mt-20">

            <div className="bg-zinc-900 p-10 rounded-3xl">

              <h3 className="text-2xl font-bold">
                1. Elegí proyecto
              </h3>

              <p className="text-zinc-400 mt-5">
                Explorá oportunidades
                agrícolas verificadas.
              </p>

            </div>

            <div className="bg-zinc-900 p-10 rounded-3xl">

              <h3 className="text-2xl font-bold">
                2. Invertí online
              </h3>

              <p className="text-zinc-400 mt-5">
                Operá de forma segura
                mediante Mercado Pago.
              </p>

            </div>

            <div className="bg-zinc-900 p-10 rounded-3xl">

              <h3 className="text-2xl font-bold">
                3. Recibí retornos
              </h3>

              <p className="text-zinc-400 mt-5">
                Seguimiento, reportes
                y resultados proyectados.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="py-28">

        <div className="max-w-5xl mx-auto text-center px-10">

          <h2 className="text-5xl font-bold">
            Empezá a invertir en activos reales.
          </h2>

          <p className="text-zinc-400 text-xl mt-8">
            Tecnología financiera aplicada
            al agro argentino.
          </p>

          <Link
            href="/login"
            className="inline-block mt-10 bg-green-600 px-10 py-5 rounded-2xl font-bold"
          >
            Crear cuenta
          </Link>

        </div>

      </section>

    </div>
  );
}