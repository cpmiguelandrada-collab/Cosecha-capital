"use client";
import { initMercadoPago } from "@mercadopago/sdk-react";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
initMercadoPago(
  process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!
);

export default function Home() {
  const [session, setSession] = useState<any>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [projects, setProjects] = useState<any[]>([]);
  const [investments, setInvestments] = useState<any[]>([]);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [cuit, setCuit] = useState("");
  const [cbu, setCbu] = useState("");
  const [alias, setAlias] = useState("");

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [dniFile, setDniFile] = useState<any>(null);

  useEffect(() => {
    getSession();
    loadProjects();

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);

      if (session) {
        loadInvestments(session.user.id);
      }
    });
  }, []);

  async function getSession() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    setSession(session);

    if (session) {
      loadInvestments(session.user.id);
    }
  }

  async function signUp() {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Cuenta creada");
    }
  }

  async function signIn() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    setSession(null);
  }

  async function loadProjects() {
    const { data } = await supabase
      .from("projects")
      .select("*");

    if (data) {
      setProjects(data);
    }
  }

  async function loadInvestments(userId: string) {
    const { data } = await supabase
      .from("investments")
      .select("*")
      .eq("investor_id", userId);

    if (data) {
      setInvestments(data);
    }
  }

async function invest(project: any) {
  const amount = prompt("Monto a invertir");

  if (!amount) return;

  const response = await fetch(
    "/api/create-preference",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: project.title,
        amount,
      }),
    }
  );

  const data = await response.json();

  window.location.href = data.init_point;

  await supabase
    .from("investments")
    .insert([
      {
        investor_id: session.user.id,
        project_id: project.id,
        amount: Number(amount),
        status: "pending",
      },
    ]);

  loadInvestments(session.user.id);
}

  async function saveProfile() {
    let dniUrl = null;

    if (dniFile) {
      const fileName = `${session.user.id}-${dniFile.name}`;

      const { error: uploadError } = await supabase.storage
        .from("documents")
        .upload(fileName, dniFile);

      if (!uploadError) {
        const { data } = supabase.storage
          .from("documents")
          .getPublicUrl(fileName);

        dniUrl = data.publicUrl;
      }
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName,
        phone,
        cuit,
        cbu,
        alias,
        accepted_terms: acceptedTerms,
        dni_url: dniUrl,
        kyc_status: "pending",
      })
      .eq("id", session.user.id);

    if (error) {
      alert(error.message);
    } else {
      alert("Perfil actualizado");
    }
  }

  const totalInvested = investments.reduce(
    (acc, inv) => acc + Number(inv.amount),
    0
  );

  if (session) {
    return (
      <div className="min-h-screen bg-black text-white p-10">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">
            Cosecha Capital
          </h1>

          <button
            onClick={signOut}
            className="bg-red-600 px-6 py-3 rounded-xl"
          >
            Cerrar sesión
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <div className="bg-zinc-900 p-6 rounded-3xl">
            <p className="text-zinc-400">
              Portafolio
            </p>

            <h2 className="text-4xl font-bold mt-2">
              USD {totalInvested}
            </h2>
          </div>
        </div>
        <div className="mt-12">

  <h2 className="text-3xl font-bold mb-6">
    Mis inversiones
  </h2>

  <div className="space-y-4">

    {investments.map((investment) => (

      <div
        key={investment.id}
        className="bg-zinc-900 p-6 rounded-3xl flex justify-between items-center"
      >

        <div>

          <p className="text-zinc-500 text-sm">
            Proyecto
          </p>

          <h3 className="text-xl font-bold">
            {investment.project_id}
          </h3>

        </div>

        <div>

          <p className="text-zinc-500 text-sm">
            Monto
          </p>

          <h3 className="font-semibold">
            USD {investment.amount}
          </h3>

        </div>

        <div>

          <p className="text-zinc-500 text-sm">
            Estado
          </p>

          <h3 className="font-semibold text-green-500">
            {investment.status}
          </h3>

        </div>

        <div>

          <p className="text-zinc-500 text-sm">
            ROI
          </p>

          <h3 className="font-semibold">
            12%
          </h3>

        </div>

      </div>

    ))}

  </div>

</div>

        <div className="bg-zinc-900 p-6 rounded-3xl mt-10">
          <h2 className="text-2xl font-bold mb-6">
            Perfil
          </h2>

          <div className="grid gap-4">
            <input
              placeholder="Nombre completo"
              value={fullName}
              onChange={(e) =>
                setFullName(e.target.value)
              }
              className="p-4 rounded-xl bg-zinc-800"
            />

            <input
              placeholder="Teléfono"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              className="p-4 rounded-xl bg-zinc-800"
            />

            <input
              placeholder="CUIT"
              value={cuit}
              onChange={(e) =>
                setCuit(e.target.value)
              }
              className="p-4 rounded-xl bg-zinc-800"
            />

            <input
              placeholder="CBU"
              value={cbu}
              onChange={(e) =>
                setCbu(e.target.value)
              }
              className="p-4 rounded-xl bg-zinc-800"
            />

            <input
              placeholder="Alias"
              value={alias}
              onChange={(e) =>
                setAlias(e.target.value)
              }
              className="p-4 rounded-xl bg-zinc-800"
            />

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) =>
                  setAcceptedTerms(e.target.checked)
                }
              />

              <p>
                Acepto términos y condiciones
              </p>
            </div>

            <input
              type="file"
              onChange={(e) =>
                setDniFile(e.target.files?.[0])
              }
            />

            <button
              onClick={saveProfile}
              className="bg-blue-600 py-4 rounded-xl"
            >
              Guardar perfil
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-10">

  <div className="bg-zinc-900 p-6 rounded-3xl">
    <p className="text-zinc-500 text-sm">
      Portafolio Total
    </p>

    <h2 className="text-4xl font-bold mt-3">
      USD {totalInvested}
    </h2>
  </div>

  <div className="bg-zinc-900 p-6 rounded-3xl">
    <p className="text-zinc-500 text-sm">
      Inversiones Activas
    </p>

    <h2 className="text-4xl font-bold mt-3">
      {investments.length}
    </h2>
  </div>

  <div className="bg-zinc-900 p-6 rounded-3xl">
    <p className="text-zinc-500 text-sm">
      ROI Proyectado
    </p>

    <h2 className="text-4xl font-bold mt-3">
      12%
    </h2>
  </div>

  <div className="bg-zinc-900 p-6 rounded-3xl">
    <p className="text-zinc-500 text-sm">
      Retorno Esperado
    </p>

    <h2 className="text-4xl font-bold mt-3">
      USD {(Number(totalInvested)*1.12).toFixed(0)}
    </h2>
  </div>

</div>

        <main className="mt-10">
          <h2 className="text-3xl font-bold mb-6">
            Proyectos agrícolas
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-zinc-900 p-8 rounded-3xl"
              >
                <h2 className="text-3xl font-bold">
                  {project.title}
                </h2>

                <p className="text-zinc-400 mt-4">
                  {project.description}
                </p>

                <div className="grid grid-cols-3 gap-4 mt-8">
                  <div>
                    <p className="text-zinc-500 text-sm">
                      Hectáreas
                    </p>

                    <p className="font-semibold">
                      {project.hectares}
                    </p>
                  </div>

                  <div>
                    <p className="text-zinc-500 text-sm">
                      Objetivo
                    </p>

                    <p className="font-semibold">
                      USD {project.target_amount}
                    </p>
                  </div>

                  <div>
                    <p className="text-zinc-500 text-sm">
                      Duración
                    </p>

                    <p className="font-semibold">
                      {project.duration_months} meses
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => invest(project)}
                  className="w-full mt-8 bg-green-600 hover:bg-green-500 py-4 rounded-2xl font-semibold"
                >
                  Invertir
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-zinc-900 p-10 rounded-3xl w-full max-w-md space-y-4">
        <h1 className="text-white text-3xl font-bold">
          Cosecha Capital
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-4 rounded-xl bg-zinc-800 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="w-full p-4 rounded-xl bg-zinc-800 text-white"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          onClick={signIn}
          className="w-full bg-green-600 text-white p-4 rounded-xl"
        >
          Iniciar sesión
        </button>

        <button
          onClick={signUp}
          className="w-full bg-zinc-700 text-white p-4 rounded-xl"
        >
          Crear cuenta
        </button>
      </div>
    </div>
  );
}