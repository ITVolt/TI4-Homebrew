const { world, refPackageId } = require("@tabletop-playground/api");

const localeStrings = {
  "faction.abbr.nokar": "Nokar",
  "faction.full.nokar": "The Nokar Sellships",
  "planet.zarr": "Zarr",
  "planet.nokk": "Nokk",
  "technology.name.local_contracts": "Local Contracts",
  "unit.destroyer.sabre_2": "Sabre 2",
  "unit.flagship.annah_regia": "Annah Regia",
  "unit.mech.freelance_outfit": "Freelance Outfit",
  "unit_modifier.desc.annah_regia": "NOT YET IMPLEMENTED!!! +1 to SPACE COMBAT for each 2 destroyers owned",
};


const factions = [{
  faction: "nokar",
  abilities: [
    "hired_guns",
    "private_fleet",
    "desperados",
  ],
  commodities: 4,
  home: 3228,
  leaders: {
    agents: ["sal_sparrow"],
    commanders: ["jack_hallard"],
    heroes: ["starsails"],
  },
  promissoryNotes: ["nokar_navigator"],
  icon: "discordant-stars/faction-icons/nokar.png",
  source: "homebrew.discordant_stars",
  startingTech: [], //"psychoarchaeology", "dark_energy_tap", "ai_development_algorithm"],
  startingUnits: {
    carrier: 2,
    destroyer: 1,
    fighter: 2,
    infantry: 4,
    pds: 1,
    space_dock: 1,
  },
  techs: ["local_contracts"],
  units: ["annah_regia", "sabre", "sabre_2", "freelance_outfit"],
  packageId: refPackageId,
  unpackExtra: [
    {
      tokenNsid: "token.unit:homebrew.discordant_stars.destroyer/nokar",
      tokenCount: 4,
    },
  ],
}];

 const nsidToTemplateId = {
    "sheet.faction:homebrew.discordant_stars/nokar":
      "D2F25CA4444D5A63AF6B44B92655D45C",
    "tile.system:homebrew.discordant_stars/3228":
      "57D1D9BD4C70FBA7F8833C8A475E2206",
    "token.command:homebrew.discordant_stars/nokar":
      "3A7E08DE4F4A5EC582BECABADF44B6E0",
    "token.control:homebrew.discordant_stars/nokar":
      "55F19E1C4D6C361B126420AC3A317C09",
    "token.unit:homebrew.discordant_stars.destroyer/nokar":
      "8615515545240877DDCA4D839EC45AFD",
};

const technologies = [{
    localeName: "technology.name.local_contracts",
    cardNsid:
      "card.technology.yellow.nokar:homebrew.discordant_stars/local_contracts",
    type: "Yellow",
    requirements: { Yellow: 2 },
    source: "homebrew.discordant_stars",
    faction: "nokar",
  }, {
    localeName: "unit.destroyer.sabre_2",
    cardNsid: "card.technology.unit_upgrade.nokar:homebrew.discordant_stars/sabre_2",
    type: "unitUpgrade",
    requirements: { Red: 2 },
    abbrev: " SB II",
    faction: "nokar",
    unitPosition: 5,
  },
];

const systems = [
  {
    tile: 3228,
    source: "homebrew.discordant_stars",
    home: true,
    packageId: refPackageId,
    img: "discordant-stars/tiles/homeworld/tile_3228.jpg",
    planets: [
      { localeName: "planet.zarr", resources: 2, influence: 1 },
      { localeName: "planet.nokk", resources: 1, influence: 1 },
    ],
  },
];

const unitAttrs = [
  {
    unit: "flagship",
    upgradeLevel: 1,
    localeName: "unit.flagship.annah_regia",
    triggerNsid:
      "card.technology.unit_upgrade.nokar:franken.discordant_stars/annah_regia",
    spaceCombat: { dice: 2, hit: 9 },
    capacity: 6,
  },
  {
    unit: "destroyer",
    upgradeLevel: 1,
    localeName: "unit.destroyer.sabre",
    triggerNsid: "card.technology.unit_upgrade.nokar:franken.discordant_stars/sabre",
    spaceCombat: { dice: 1, hit: 8 },
  },
  {
    unit: "destroyer",
    upgradeLevel: 2,
    localeName: "unit.destroyer.sabre_2",
    triggerNsid: "card.technology.unit_upgrade.nokar:homebrew.discordant_stars/sabre_2",
    spaceCombat: { dice: 1, hit: 7 },
    antiFighterBarrage: { dice: 3, hit: 6 },
    move: 3,
  },
  {
    unit: "mech",
    upgradeLevel: 1,
    localeName: "unit.mech.freelance_outfit",
    triggerNsid: "card.leader.mech.nokar:homebrew.discordant_stars/freelance_outfit",
  },
];

const unitModifiers = [
  {
    isCombat: true,
    localeName: "unit.flagship.annah_regia",
    localeDescription: "unit_modifier.desc.annah_regia",
    triggerUnitAbility: "unit.flagship.annah_regia",
    owner: "self",
    priority: "adjust",
    filter: (auxData) => {
      return (
          auxData.rollType === "spaceCombat" &&
          auxData.self.has("flagship")
      );
    },
    applyAll: (unitAttrsSet, auxData) => {
      let destroyerCount = 0;

      // TODO: find all plastics

      unitAttrsSet.get("flagship").raw.spaceCombat.hit -= Math.floor(destroyerCount/2);
    },
  },];

  // TODO: add saber death roll

console.log("DISCORDANT STARS ADDING NOKAR");
world.TI4.homebrew.inject({
  localeStrings,
  factions,
  nsidToTemplateId,
  systems,
  technologies,
  unitAttrs,
  unitModifiers,
});
