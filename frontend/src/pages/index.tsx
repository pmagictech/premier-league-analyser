import { useState } from "react";

import Layout from "@src/components/Layout";
import Table from "@src/components/Table";
import { Team } from "@src/types";

export const getServerSideProps = async () => {
  const res = await fetch(`${process.env.SERVER_URL ?? ""}/table`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const teams = await res.json();

  return { props: { teams } };
};

export default function Home({ teams }: { teams: Team[] }) {
  const [selectedTeams, setSelectedTeams] = useState<Team[]>([]);

  const handleSelectTeam = (team: Team, isSelected: Boolean) => {
    setSelectedTeams((prevTeams) => {
      if (isSelected) return prevTeams.filter(({ club }) => team.club != club);

      if (selectedTeams.length == 2) prevTeams.shift();

      return [...prevTeams, team];
    });
  };

  const canOvertake = (firstTeam: Team, secTeam?: Team) => {
    if (!secTeam) return "";

    const possiblePoints = (38 - firstTeam.played) * 3;

    if (possiblePoints + firstTeam.points > secTeam.points)
      return `Yes (${possiblePoints - (secTeam.points - firstTeam.points)} pts)`;

    return "No";
  };

  return (
    <Layout>
      <section className="my-8">
        <h1 className="text-center my-4 font-bold text-xl">TEAMS</h1>
        <div className="container mx-auto xl:grid xl:grid-cols-12 gap-8">
          <div className="col-span-2"></div>
          <div className="col-span-7">
            <Table teams={teams} selectedTeams={selectedTeams} onSelectTeam={handleSelectTeam} />
          </div>
          <div className="col-span-3 w-72 xl:sticky h-72 xl:z-20 xl:top-16 xl:bottom-0">
            {selectedTeams.length ? (
              <div className="bg-white dark:bg-slate-800 text-sm text-slate-500 dark:text-slate-400 shadow-md shadow-slate-300 h-full p-3">
                <h2 className="px-2 mb-3 font-bold text-lg">Result</h2>
                {selectedTeams.map((team, i) => (
                  <div className="grid grid-cols-4 px-2 mb-4" key={team.club}>
                    <div className="font-bold">Club:</div>
                    <div className="col-span-3 text-right">{team.club}</div>
                    <div className="font-bold">Played:</div>
                    <div className="col-span-3 text-right">{team.played}</div>
                    <div className="font-bold">Points:</div>
                    <div className="col-span-3 text-right">{team.points}</div>
                    <div className="my-2 col-span-2 font-bold">Can over take:</div>
                    <div className="my-2 col-span-2 font-bold text-right">
                      {canOvertake(team, selectedTeams[i ? 0 : 1])}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </Layout>
  );
}
