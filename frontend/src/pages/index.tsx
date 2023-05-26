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

  const selectTeam = (team: Team, checked: Boolean) => {
    if (selectedTeams.length == 2 && checked) {
      setSelectedTeams((prevTeams) => {
        prevTeams.shift();
        return [...prevTeams];
      });
    }

    setSelectedTeams((prevTeams) => {
      if (checked) {
        return [...prevTeams, team];
      } else return prevTeams.filter(({ club }) => team.club != club);
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
      <main>
        <section className="max-w-4xl mx-auto my-8 xl:pr-28">
          <h1 className="text-center my-4 font-bold text-xl">TEAMS</h1>
          <Table teams={teams} selectedTeams={selectedTeams} selectTeam={selectTeam} />
          {selectedTeams.length ? (
            <div className="xl:fixed xl:z-20 xl:top-24 xl:bottom-0 my-8 xl:right-4 2xl:right-[9%] w-72 overflow-y-auto border p-2">
              {selectedTeams.map((team, i) => (
                <div className="grid grid-cols-4 p-2" key={team.club}>
                  <div>Club:</div>
                  <div className="col-span-3">{team.club}</div>
                  <div>Played:</div>
                  <div className="col-span-3">{team.played}</div>
                  <div>Points:</div>
                  <div className="col-span-3">{team.points}</div>
                  <div className="my-3 col-span-2">Can over take:</div>
                  <div className="my-3 col-span-2 font-bold">{canOvertake(team, selectedTeams[i ? 0 : 1])}</div>
                </div>
              ))}
            </div>
          ) : null}
        </section>
      </main>
    </Layout>
  );
}
