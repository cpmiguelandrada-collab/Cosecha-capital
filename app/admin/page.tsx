"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function AdminPage() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [investments, setInvestments] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const { data: profilesData } = await supabase
      .from("profiles")
      .select("*");

    const { data: investmentsData } = await supabase
      .from("investments")
      .select("*");

    if (profilesData) setProfiles(profilesData);

    if (investmentsData)
      setInvestments(investmentsData);
  }

  async function approveKyc(id: string) {
    await supabase
      .from("profiles")
      .update({
        kyc_status: "approved",
        verified: true,
      })
      .eq("id", id);

    loadData();
  }

  async function rejectKyc(id: string) {
    await supabase
      .from("profiles")
      .update({
        kyc_status: "rejected",
        verified: false,
      })
      .eq("id", id);

    loadData();
  }

async function approveInvestment(id: string) {
  await supabase
    .from("investments")
    .update({
      status: "approved",
    })
    .eq("id", id);

  loadData();
}

async function rejectInvestment(id: string) {
  await supabase
    .from("investments")
    .update({
      status: "rejected",
    })
    .eq("id", id);

  loadData();
}
  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-10">
        Admin Panel
      </h1>

      <div className="bg-zinc-900 rounded-3xl p-6 mb-10">
        <h2 className="text-2xl font-bold mb-6">
          Usuarios / KYC
        </h2>

        <div className="space-y-4">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className="bg-zinc-800 p-4 rounded-xl"
            >
              <p>
                <strong>Nombre:</strong>{" "}
                {profile.full_name || "Sin completar"}
              </p>

              <p>
                <strong>CUIT:</strong>{" "}
                {profile.cuit || "-"}
              </p>

              <p>
                <strong>KYC:</strong>{" "}
                {profile.kyc_status}
              </p>

              {profile.dni_url && (
                <a
                  href={profile.dni_url}
                  target="_blank"
                  className="text-green-400 underline"
                >
                  Ver DNI
                </a>
              )}

              <div className="mt-4 flex gap-4">
                <button
                  onClick={() =>
                    approveKyc(profile.id)
                  }
                  className="bg-green-600 px-4 py-2 rounded-lg"
                >
                  Aprobar
                </button>

                <button
                  onClick={() =>
                    rejectKyc(profile.id)
                  }
                  className="bg-red-600 px-4 py-2 rounded-lg"
                >
                  Rechazar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-zinc-900 rounded-3xl p-6">
        <h2 className="text-2xl font-bold mb-6">
          Inversiones
        </h2>

        <div className="space-y-4">
          {investments.map((investment) => (
            <div
              key={investment.id}
              className="bg-zinc-800 p-4 rounded-xl"
            >
              <p>
                <strong>Monto:</strong> USD{" "}
                {investment.amount}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {investment.status}
              </p>
              <div className="mt-4 flex gap-4">
  <button
    onClick={() =>
      approveInvestment(investment.id)
    }
    className="bg-green-600 px-4 py-2 rounded-lg"
  >
    Aprobar
  </button>

  <button
    onClick={() =>
      rejectInvestment(investment.id)
    }
    className="bg-red-600 px-4 py-2 rounded-lg"
  >
    Rechazar
  </button>
</div>

              <p>
                <strong>Investor ID:</strong>{" "}
                {investment.investor_id}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}