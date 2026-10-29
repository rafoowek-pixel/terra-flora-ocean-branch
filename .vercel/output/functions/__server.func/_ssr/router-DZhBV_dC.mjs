import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, _ as createFileRoute, b as require_jsx_runtime, d as Scripts, f as HeadContent, g as lazyRouteComponent, h as Outlet, m as createRouter, v as createRootRoute, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DZhBV_dC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var places = [
	{
		id: "kyiv",
		name: "Kijów",
		lat: 50.45,
		lon: 30.52,
		rank: 2,
		aliases: [
			"kyiv",
			"kiev",
			"kijów",
			"kijow"
		]
	},
	{
		id: "kharkiv",
		name: "Charków",
		lat: 49.99,
		lon: 36.23,
		rank: 2,
		aliases: [
			"kharkiv",
			"charków",
			"charkow"
		]
	},
	{
		id: "odesa",
		name: "Odessa",
		lat: 46.48,
		lon: 30.73,
		rank: 2,
		aliases: ["odesa", "odessa"]
	},
	{
		id: "dnipro",
		name: "Dniepr",
		lat: 48.46,
		lon: 35.05,
		rank: 2,
		aliases: ["dnipro", "dniepr"]
	},
	{
		id: "donetsk",
		name: "Donieck",
		lat: 48.02,
		lon: 37.8,
		rank: 2,
		aliases: [
			"donetsk",
			"donieck",
			"donbas",
			"donbass"
		]
	},
	{
		id: "luhansk",
		name: "Ługańsk",
		lat: 48.57,
		lon: 39.32,
		rank: 2,
		aliases: [
			"luhansk",
			"lugansk",
			"ługańsk"
		]
	},
	{
		id: "zaporizhzhia",
		name: "Zaporoże",
		lat: 47.84,
		lon: 35.14,
		rank: 2,
		aliases: [
			"zaporizhzhia",
			"zaporizhia",
			"zaporoże",
			"zaporize"
		]
	},
	{
		id: "kherson",
		name: "Chersoń",
		lat: 46.64,
		lon: 32.62,
		rank: 2,
		aliases: [
			"kherson",
			"chersoń",
			"cherson"
		]
	},
	{
		id: "crimea",
		name: "Krym",
		lat: 45,
		lon: 34.1,
		rank: 1,
		aliases: [
			"crimea",
			"krym",
			"sevastopol",
			"sewastopol"
		]
	},
	{
		id: "kursk",
		name: "Kursk",
		lat: 51.73,
		lon: 36.19,
		rank: 2,
		aliases: ["kursk"]
	},
	{
		id: "belgorod",
		name: "Biełgorod",
		lat: 50.6,
		lon: 36.59,
		rank: 2,
		aliases: ["belgorod", "biełgorod"]
	},
	{
		id: "moscow",
		name: "Moskwa",
		lat: 55.75,
		lon: 37.62,
		rank: 2,
		aliases: [
			"moscow",
			"moskwa",
			"kremlin",
			"kreml"
		]
	},
	{
		id: "gaza",
		name: "Strefa Gazy",
		lat: 31.45,
		lon: 34.4,
		rank: 2,
		aliases: [
			"gaza",
			"rafah",
			"rafa",
			"khan younis"
		]
	},
	{
		id: "telaviv",
		name: "Tel Awiw",
		lat: 32.08,
		lon: 34.78,
		rank: 2,
		aliases: ["tel aviv", "tel awiw"]
	},
	{
		id: "jerusalem",
		name: "Jerozolima",
		lat: 31.78,
		lon: 35.22,
		rank: 2,
		aliases: ["jerusalem", "jerozolima"]
	},
	{
		id: "haifa",
		name: "Hajfa",
		lat: 32.82,
		lon: 34.99,
		rank: 2,
		aliases: ["haifa", "hajfa"]
	},
	{
		id: "beirut",
		name: "Bejrut",
		lat: 33.89,
		lon: 35.5,
		rank: 2,
		aliases: [
			"beirut",
			"bejrut",
			"lebanon",
			"liban"
		]
	},
	{
		id: "damascus",
		name: "Damaszek",
		lat: 33.51,
		lon: 36.29,
		rank: 2,
		aliases: [
			"damascus",
			"damaskus",
			"damaszek",
			"syria"
		]
	},
	{
		id: "baghdad",
		name: "Bagdad",
		lat: 33.32,
		lon: 44.37,
		rank: 2,
		aliases: ["baghdad", "bagdad"]
	},
	{
		id: "tehran",
		name: "Teheran",
		lat: 35.69,
		lon: 51.39,
		rank: 2,
		aliases: ["tehran", "teheran"]
	},
	{
		id: "isfahan",
		name: "Isfahan",
		lat: 32.65,
		lon: 51.68,
		rank: 2,
		aliases: ["isfahan", "esfahan"]
	},
	{
		id: "bandar",
		name: "Bandar Abbas",
		lat: 27.18,
		lon: 56.27,
		rank: 2,
		aliases: ["bandar abbas"]
	},
	{
		id: "iran",
		name: "Iran",
		lat: 32.4,
		lon: 53.7,
		rank: 0,
		aliases: ["iran", "iranian"]
	},
	{
		id: "israel",
		name: "Izrael",
		lat: 31.4,
		lon: 35,
		rank: 0,
		aliases: [
			"israel",
			"izrael",
			"israeli"
		]
	},
	{
		id: "iraq",
		name: "Irak",
		lat: 33.2,
		lon: 43.7,
		rank: 0,
		aliases: ["iraq", "irak"]
	},
	{
		id: "riyadh",
		name: "Rijad",
		lat: 24.71,
		lon: 46.68,
		rank: 2,
		aliases: ["riyadh", "rijad"]
	},
	{
		id: "jeddah",
		name: "Dżidda",
		lat: 21.49,
		lon: 39.19,
		rank: 2,
		aliases: [
			"jeddah",
			"jidda",
			"dżidda"
		]
	},
	{
		id: "doha",
		name: "Doha",
		lat: 25.29,
		lon: 51.53,
		rank: 2,
		aliases: [
			"doha",
			"qatar",
			"katar"
		]
	},
	{
		id: "abudhabi",
		name: "Abu Zabi",
		lat: 24.45,
		lon: 54.38,
		rank: 2,
		aliases: ["abu dhabi", "abu zabi"]
	},
	{
		id: "dubai",
		name: "Dubaj",
		lat: 25.2,
		lon: 55.27,
		rank: 2,
		aliases: ["dubai", "dubaj"]
	},
	{
		id: "sanaa",
		name: "Sana",
		lat: 15.35,
		lon: 44.21,
		rank: 2,
		aliases: [
			"sanaa",
			"sana'a",
			"yemen",
			"jemen",
			"houthi",
			"huti"
		]
	},
	{
		id: "aden",
		name: "Aden",
		lat: 12.79,
		lon: 45.02,
		rank: 2,
		aliases: ["aden"]
	},
	{
		id: "redsea",
		name: "Morze Czerwone",
		lat: 18.5,
		lon: 39.5,
		rank: 1,
		aliases: [
			"red sea",
			"morze czerwone",
			"bab el-mandeb",
			"bab-el-mandeb"
		]
	},
	{
		id: "hormuz",
		name: "Cieśnina Ormuz",
		lat: 26.56,
		lon: 56.25,
		rank: 1,
		aliases: [
			"hormuz",
			"ormuz",
			"strait of hormuz"
		]
	},
	{
		id: "suez",
		name: "Kanał Sueski",
		lat: 30.45,
		lon: 32.35,
		rank: 1,
		aliases: [
			"suez",
			"sueski",
			"suecki"
		]
	},
	{
		id: "khartoum",
		name: "Chartum",
		lat: 15.5,
		lon: 32.56,
		rank: 2,
		aliases: ["khartoum", "chartum"]
	},
	{
		id: "darfur",
		name: "Darfur",
		lat: 13.5,
		lon: 25,
		rank: 1,
		aliases: [
			"darfur",
			"el fasher",
			"al-fashir"
		]
	},
	{
		id: "sudan",
		name: "Sudan",
		lat: 15.6,
		lon: 32.5,
		rank: 0,
		aliases: ["sudan"]
	},
	{
		id: "mogadishu",
		name: "Mogadiszu",
		lat: 2.05,
		lon: 45.32,
		rank: 2,
		aliases: [
			"mogadishu",
			"mogadiszu",
			"somalia",
			"somalii"
		]
	},
	{
		id: "addis",
		name: "Addis Abeba",
		lat: 9.03,
		lon: 38.74,
		rank: 2,
		aliases: [
			"addis ababa",
			"addis abeba",
			"ethiopia",
			"etiopia"
		]
	},
	{
		id: "taipei",
		name: "Tajpej",
		lat: 25.03,
		lon: 121.57,
		rank: 2,
		aliases: [
			"taipei",
			"tajpej",
			"taiwan",
			"tajwan"
		]
	},
	{
		id: "taiwanstrait",
		name: "Cieśnina Tajwańska",
		lat: 24.5,
		lon: 119.4,
		rank: 1,
		aliases: [
			"taiwan strait",
			"cieśnina tajwańska",
			"ciesnina tajwanska"
		]
	},
	{
		id: "scsea",
		name: "Morze Południowochińskie",
		lat: 12,
		lon: 114,
		rank: 1,
		aliases: [
			"south china sea",
			"morze południowochińskie",
			"spratly",
			"paracele"
		]
	},
	{
		id: "beijing",
		name: "Pekin",
		lat: 39.9,
		lon: 116.4,
		rank: 2,
		aliases: ["beijing", "pekin"]
	},
	{
		id: "shanghai",
		name: "Szanghaj",
		lat: 31.23,
		lon: 121.47,
		rank: 2,
		aliases: ["shanghai", "szanghaj"]
	},
	{
		id: "hongkong",
		name: "Hongkong",
		lat: 22.32,
		lon: 114.17,
		rank: 2,
		aliases: ["hong kong", "hongkong"]
	},
	{
		id: "china",
		name: "Chiny",
		lat: 35,
		lon: 105,
		rank: 0,
		aliases: [
			"china",
			"chiny",
			"chinese"
		]
	},
	{
		id: "seoul",
		name: "Seul",
		lat: 37.57,
		lon: 126.98,
		rank: 2,
		aliases: [
			"seoul",
			"seul",
			"south korea",
			"korea południowa"
		]
	},
	{
		id: "pyongyang",
		name: "Phenian",
		lat: 39.03,
		lon: 125.75,
		rank: 2,
		aliases: [
			"pyongyang",
			"phenian",
			"north korea",
			"korea północna"
		]
	},
	{
		id: "tokyo",
		name: "Tokio",
		lat: 35.68,
		lon: 139.69,
		rank: 2,
		aliases: [
			"tokyo",
			"tokio",
			"japan",
			"japonia"
		]
	},
	{
		id: "manila",
		name: "Manila",
		lat: 14.6,
		lon: 120.98,
		rank: 2,
		aliases: [
			"manila",
			"philippines",
			"filipiny"
		]
	},
	{
		id: "singapore",
		name: "Singapur",
		lat: 1.29,
		lon: 103.85,
		rank: 2,
		aliases: ["singapore", "singapur"]
	},
	{
		id: "malacca",
		name: "Cieśnina Malakka",
		lat: 2.5,
		lon: 101.2,
		rank: 1,
		aliases: ["malacca", "malakka"]
	},
	{
		id: "jakarta",
		name: "Dżakarta",
		lat: -6.21,
		lon: 106.85,
		rank: 2,
		aliases: [
			"jakarta",
			"dżakarta",
			"indonesia",
			"indonezja"
		]
	},
	{
		id: "delhi",
		name: "Delhi",
		lat: 28.61,
		lon: 77.21,
		rank: 2,
		aliases: ["new delhi", "delhi"]
	},
	{
		id: "mumbai",
		name: "Mumbaj",
		lat: 19.08,
		lon: 72.88,
		rank: 2,
		aliases: ["mumbai", "mumbaj"]
	},
	{
		id: "kashmir",
		name: "Kaszmir",
		lat: 34.08,
		lon: 74.8,
		rank: 1,
		aliases: ["kashmir", "kaszmir"]
	},
	{
		id: "india",
		name: "Indie",
		lat: 22,
		lon: 79,
		rank: 0,
		aliases: ["india", "indie"]
	},
	{
		id: "islamabad",
		name: "Islamabad",
		lat: 33.69,
		lon: 73.04,
		rank: 2,
		aliases: ["islamabad", "pakistan"]
	},
	{
		id: "kabul",
		name: "Kabul",
		lat: 34.53,
		lon: 69.17,
		rank: 2,
		aliases: [
			"kabul",
			"afghanistan",
			"afganistan"
		]
	},
	{
		id: "yangon",
		name: "Yangon",
		lat: 16.84,
		lon: 96.17,
		rank: 2,
		aliases: [
			"yangon",
			"rangoon",
			"myanmar",
			"mjanma",
			"burma"
		]
	},
	{
		id: "goma",
		name: "Goma",
		lat: -1.68,
		lon: 29.23,
		rank: 2,
		aliases: [
			"goma",
			"kivu",
			"kiwu",
			"dr congo",
			"drc",
			"drk"
		]
	},
	{
		id: "haiti",
		name: "Haiti",
		lat: 18.54,
		lon: -72.34,
		rank: 1,
		aliases: ["haiti", "port-au-prince"]
	},
	{
		id: "bamako",
		name: "Bamako",
		lat: 12.64,
		lon: -8,
		rank: 2,
		aliases: ["bamako", "mali"]
	},
	{
		id: "ouaga",
		name: "Wagadugu",
		lat: 12.37,
		lon: -1.52,
		rank: 2,
		aliases: [
			"ouagadougou",
			"wagadugu",
			"burkina"
		]
	},
	{
		id: "niamey",
		name: "Niamey",
		lat: 13.51,
		lon: 2.13,
		rank: 2,
		aliases: ["niamey", "niger"]
	},
	{
		id: "sahel",
		name: "Sahel",
		lat: 15,
		lon: .5,
		rank: 1,
		aliases: ["sahel"]
	},
	{
		id: "lagos",
		name: "Lagos",
		lat: 6.45,
		lon: 3.4,
		rank: 2,
		aliases: ["lagos", "nigeria"]
	},
	{
		id: "tripoli",
		name: "Trypolis",
		lat: 32.89,
		lon: 13.18,
		rank: 2,
		aliases: [
			"tripoli",
			"trypolis",
			"libya",
			"libia"
		]
	},
	{
		id: "cairo",
		name: "Kair",
		lat: 30.04,
		lon: 31.24,
		rank: 2,
		aliases: [
			"cairo",
			"kair",
			"egypt",
			"egipt"
		]
	},
	{
		id: "ankara",
		name: "Ankara",
		lat: 39.93,
		lon: 32.86,
		rank: 2,
		aliases: ["ankara"]
	},
	{
		id: "istanbul",
		name: "Stambuł",
		lat: 41.01,
		lon: 28.98,
		rank: 2,
		aliases: [
			"istanbul",
			"stambuł",
			"bosporus",
			"bosfor"
		]
	},
	{
		id: "turkey",
		name: "Turcja",
		lat: 39,
		lon: 35,
		rank: 0,
		aliases: [
			"turkey",
			"türkiye",
			"turcja"
		]
	},
	{
		id: "tbilisi",
		name: "Tbilisi",
		lat: 41.69,
		lon: 44.8,
		rank: 2,
		aliases: ["tbilisi", "republic of georgia"]
	},
	{
		id: "baku",
		name: "Baku",
		lat: 40.41,
		lon: 49.87,
		rank: 2,
		aliases: [
			"baku",
			"azerbaijan",
			"azerbejdżan"
		]
	},
	{
		id: "yerevan",
		name: "Erywań",
		lat: 40.18,
		lon: 44.51,
		rank: 2,
		aliases: [
			"yerevan",
			"erywań",
			"armenia"
		]
	},
	{
		id: "minsk",
		name: "Mińsk",
		lat: 53.9,
		lon: 27.57,
		rank: 2,
		aliases: [
			"minsk",
			"mińsk",
			"belarus",
			"białoruś"
		]
	},
	{
		id: "warsaw",
		name: "Warszawa",
		lat: 52.23,
		lon: 21.01,
		rank: 2,
		aliases: ["warsaw", "warszawa"]
	},
	{
		id: "gdansk",
		name: "Gdańsk",
		lat: 54.35,
		lon: 18.65,
		rank: 2,
		aliases: [
			"gdansk",
			"gdańsk",
			"naftoport"
		]
	},
	{
		id: "kyiv-country",
		name: "Ukraina",
		lat: 49,
		lon: 31.5,
		rank: 0,
		aliases: [
			"ukraine",
			"ukraina",
			"ukrainian"
		]
	},
	{
		id: "russia",
		name: "Rosja",
		lat: 56,
		lon: 38,
		rank: 0,
		aliases: [
			"russia",
			"rosja",
			"russian"
		]
	},
	{
		id: "brussels",
		name: "Bruksela",
		lat: 50.85,
		lon: 4.35,
		rank: 2,
		aliases: [
			"brussels",
			"bruksela",
			"nato"
		]
	},
	{
		id: "london",
		name: "Londyn",
		lat: 51.51,
		lon: -.13,
		rank: 2,
		aliases: ["london", "londyn"]
	},
	{
		id: "paris",
		name: "Paryż",
		lat: 48.86,
		lon: 2.35,
		rank: 2,
		aliases: ["paris", "paryż"]
	},
	{
		id: "berlin",
		name: "Berlin",
		lat: 52.52,
		lon: 13.41,
		rank: 2,
		aliases: ["berlin"]
	},
	{
		id: "washington",
		name: "Waszyngton",
		lat: 38.91,
		lon: -77.04,
		rank: 2,
		aliases: [
			"washington",
			"waszyngton",
			"pentagon",
			"white house"
		]
	},
	{
		id: "nyc",
		name: "Nowy Jork",
		lat: 40.71,
		lon: -74.01,
		rank: 2,
		aliases: ["new york", "nowy jork"]
	},
	{
		id: "houston",
		name: "Houston",
		lat: 29.76,
		lon: -95.37,
		rank: 2,
		aliases: ["houston"]
	},
	{
		id: "panama",
		name: "Kanał Panamski",
		lat: 9.08,
		lon: -79.68,
		rank: 1,
		aliases: [
			"panama canal",
			"kanał panamski",
			"panama"
		]
	},
	{
		id: "caracas",
		name: "Caracas",
		lat: 10.48,
		lon: -66.9,
		rank: 2,
		aliases: [
			"caracas",
			"venezuela",
			"wenezuela"
		]
	},
	{
		id: "vienna",
		name: "Wiedeń",
		lat: 48.21,
		lon: 16.37,
		rank: 2,
		aliases: [
			"vienna",
			"wiedeń",
			"opec"
		]
	},
	{
		id: "pretoria",
		name: "Pretoria",
		lat: -25.75,
		lon: 28.19,
		rank: 2,
		aliases: [
			"pretoria",
			"south africa",
			"rpa"
		]
	},
	{
		id: "hanoi",
		name: "Hanoi",
		lat: 21.03,
		lon: 105.85,
		rank: 2,
		aliases: [
			"hanoi",
			"vietnam",
			"wietnam"
		]
	},
	{
		id: "canberra",
		name: "Canberra",
		lat: -35.28,
		lon: 149.13,
		rank: 2,
		aliases: [
			"canberra",
			"australia",
			"australii"
		]
	},
	{
		id: "mexico",
		name: "Meksyk",
		lat: 19.43,
		lon: -99.13,
		rank: 2,
		aliases: ["mexico city", "meksyk"]
	},
	{
		id: "brasilia",
		name: "Brasilia",
		lat: -15.79,
		lon: -47.88,
		rank: 2,
		aliases: [
			"brasilia",
			"brazil",
			"brazylia"
		]
	},
	{
		id: "nicosia",
		name: "Nikozja",
		lat: 35.17,
		lon: 33.36,
		rank: 2,
		aliases: [
			"nicosia",
			"nikozja",
			"cyprus",
			"cypr"
		]
	},
	{
		id: "athens",
		name: "Ateny",
		lat: 37.98,
		lon: 23.73,
		rank: 2,
		aliases: ["athens", "ateny"]
	},
	{
		id: "vilnius",
		name: "Wilno",
		lat: 54.69,
		lon: 25.28,
		rank: 2,
		aliases: ["vilnius", "wilno"]
	},
	{
		id: "riga",
		name: "Ryga",
		lat: 56.95,
		lon: 24.11,
		rank: 2,
		aliases: ["riga", "ryga"]
	},
	{
		id: "tallinn",
		name: "Tallinn",
		lat: 59.44,
		lon: 24.75,
		rank: 2,
		aliases: ["tallinn"]
	},
	{
		id: "helsinki",
		name: "Helsinki",
		lat: 60.17,
		lon: 24.94,
		rank: 2,
		aliases: ["helsinki"]
	},
	{
		id: "stockholm",
		name: "Sztokholm",
		lat: 59.33,
		lon: 18.07,
		rank: 2,
		aliases: ["stockholm", "sztokholm"]
	},
	{
		id: "chisinau",
		name: "Kiszyniów",
		lat: 47.01,
		lon: 28.86,
		rank: 2,
		aliases: [
			"chisinau",
			"kishinev",
			"kiszyniów",
			"moldova",
			"mołdawia"
		]
	},
	{
		id: "kaliningrad",
		name: "Królewiec",
		lat: 54.71,
		lon: 20.51,
		rank: 2,
		aliases: [
			"kaliningrad",
			"królewiec",
			"krolewiec"
		]
	},
	{
		id: "novorossiysk",
		name: "Noworosyjsk",
		lat: 44.72,
		lon: 37.77,
		rank: 2,
		aliases: ["novorossiysk", "noworosyjsk"]
	},
	{
		id: "primorsk",
		name: "Primorsk",
		lat: 60.35,
		lon: 28.71,
		rank: 2,
		aliases: ["primorsk", "ust-luga"]
	},
	{
		id: "rotterdam",
		name: "Rotterdam",
		lat: 51.95,
		lon: 4.14,
		rank: 2,
		aliases: ["rotterdam"]
	},
	{
		id: "cape",
		name: "Przylądek Dobrej Nadziei",
		lat: -34.36,
		lon: 18.48,
		rank: 1,
		aliases: ["cape of good hope", "dobrej nadziei"]
	},
	{
		id: "gulf",
		name: "Zatoka Perska",
		lat: 26.5,
		lon: 51.5,
		rank: 1,
		aliases: [
			"persian gulf",
			"zatoka perska",
			"arabian gulf"
		]
	}
];
var theaters = [
	{
		id: "t-donbas",
		title: "Donbas",
		lat: 48.15,
		lon: 37.8,
		blurb: "Wschodnia Ukraina. Najgęstsza linia starć i ostrzału."
	},
	{
		id: "t-zap",
		title: "Zaporoże",
		lat: 47.55,
		lon: 35.6,
		blurb: "Południe Ukrainy, podejścia do elektrowni i Dniepru."
	},
	{
		id: "t-kher",
		title: "Chersoń",
		lat: 46.64,
		lon: 32.62,
		blurb: "Dolny Dniepr i wybrzeże Morza Czarnego."
	},
	{
		id: "t-crimea",
		title: "Krym",
		lat: 44.95,
		lon: 34.1,
		blurb: "Półwysep, Flota Czarnomorska i szlaki zbożowe."
	},
	{
		id: "t-gaza",
		title: "Strefa Gazy",
		lat: 31.45,
		lon: 34.4,
		blurb: "Wojna w Gazie i bezpośrednie otoczenie."
	},
	{
		id: "t-leb",
		title: "Południowy Liban",
		lat: 33.27,
		lon: 35.4,
		blurb: "Pogranicze izraelsko-libańskie."
	},
	{
		id: "t-red",
		title: "Morze Czerwone",
		lat: 14.6,
		lon: 42.6,
		blurb: "Ataki na żeglugę przy Bab al-Mandab. Omijanie to tygodnie i droższy fracht."
	},
	{
		id: "t-yem",
		title: "Jemen",
		lat: 15.35,
		lon: 44.2,
		blurb: "Wojna domowa i zaplecze ataków na statki."
	},
	{
		id: "t-krt",
		title: "Chartum",
		lat: 15.55,
		lon: 32.53,
		blurb: "Wojna w Sudanie, stolica."
	},
	{
		id: "t-dar",
		title: "Darfur",
		lat: 13.45,
		lon: 24.9,
		blurb: "Darfur. Przemoc wobec ludności i kryzys humanitarny."
	},
	{
		id: "t-sahel",
		title: "Sahel",
		lat: 14.4,
		lon: -1.2,
		blurb: "Mali, Burkina Faso, Niger. Przewroty i dżihad."
	},
	{
		id: "t-kivu",
		title: "Kiwu",
		lat: -1.66,
		lon: 29.22,
		blurb: "Wschodnie DRK. Surowce krytyczne i grupy zbrojne."
	},
	{
		id: "t-mya",
		title: "Mjanma",
		lat: 21.2,
		lon: 96.1,
		blurb: "Wojna domowa po zamachu stanu."
	},
	{
		id: "t-hai",
		title: "Haiti",
		lat: 18.54,
		lon: -72.34,
		blurb: "Rozpad władzy i gangi w stolicy."
	},
	{
		id: "t-som",
		title: "Somalia",
		lat: 2.05,
		lon: 45.32,
		blurb: "Asz-Szabab i szlaki morskie Rogu Afryki."
	},
	{
		id: "t-dmz",
		title: "Półwysep Koreański",
		lat: 38.2,
		lon: 127,
		blurb: "DMZ. Napięcie, nie otwarta wojna — rakiety ruszają rynkami."
	},
	{
		id: "t-tw",
		title: "Cieśnina Tajwańska",
		lat: 24.5,
		lon: 119.5,
		blurb: "Najwrażliwszy morski szlak półprzewodników."
	},
	{
		id: "t-lake",
		title: "Jezioro Czad",
		lat: 12,
		lon: 13.8,
		blurb: "Boko Haram i pogranicze Nigerii, Czadu i Nigru."
	}
];
var bases = [
	{
		id: "ramstein",
		title: "Ramstein",
		lat: 49.44,
		lon: 7.6,
		tag: "Lotnictwo USA",
		detail: "Największy hub lotniczy USA w Europie. Niemcy."
	},
	{
		id: "lakenheath",
		title: "RAF Lakenheath",
		lat: 52.41,
		lon: .56,
		tag: "Lotnictwo USA",
		detail: "Myśliwce USA w Wielkiej Brytanii."
	},
	{
		id: "aviano",
		title: "Aviano",
		lat: 46.03,
		lon: 12.6,
		tag: "Lotnictwo USA",
		detail: "Baza USA we Włoszech, skrzydło myśliwskie."
	},
	{
		id: "sigonella",
		title: "Sigonella",
		lat: 37.4,
		lon: 14.92,
		tag: "Lotnictwo / morskie",
		detail: "Sycylia. Patrol morski NATO i USA nad Morzem Śródziemnym."
	},
	{
		id: "rota",
		title: "Rota",
		lat: 36.64,
		lon: -6.35,
		tag: "Marynarka USA",
		detail: "Hiszpania. Niszczyciele tarczy antyrakietowej."
	},
	{
		id: "souda",
		title: "Souda Bay",
		lat: 35.49,
		lon: 24.12,
		tag: "Marynarka",
		detail: "Kreta. Głębokowodna baza NATO na wschodnim Morzu Śródziemnym."
	},
	{
		id: "incirlik",
		title: "Incirlik",
		lat: 37,
		lon: 35.43,
		tag: "Lotnictwo",
		detail: "Turcja. Baza USA przy granicy z Syrią."
	},
	{
		id: "akrotiri",
		title: "Akrotiri",
		lat: 34.59,
		lon: 32.99,
		tag: "Lotnictwo UK",
		detail: "Cypr. Brytyjska baza wypadowa na Lewant."
	},
	{
		id: "gibraltar",
		title: "Gibraltar",
		lat: 36.14,
		lon: -5.35,
		tag: "Marynarka UK",
		detail: "Brama Morza Śródziemnego."
	},
	{
		id: "faslane",
		title: "Faslane",
		lat: 56.07,
		lon: -4.82,
		tag: "Marynarka UK",
		detail: "Szkocja. Atomowe okręty podwodne z pociskami balistycznymi."
	},
	{
		id: "portsmouth",
		title: "Portsmouth",
		lat: 50.8,
		lon: -1.11,
		tag: "Marynarka UK",
		detail: "Główna baza Royal Navy."
	},
	{
		id: "toulon",
		title: "Tulon",
		lat: 43.12,
		lon: 5.93,
		tag: "Marynarka FR",
		detail: "Baza francuskiej floty śródziemnomorskiej i lotniskowca."
	},
	{
		id: "brest",
		title: "Brest",
		lat: 48.38,
		lon: -4.49,
		tag: "Marynarka FR",
		detail: "Atlantyk. Francuskie okręty podwodne."
	},
	{
		id: "redzikowo",
		title: "Redzikowo",
		lat: 54.48,
		lon: 17.11,
		tag: "Tarcza NATO",
		detail: "Polska. Aegis Ashore — lądowa tarcza antyrakietowa USA."
	},
	{
		id: "powidz",
		title: "Powidz",
		lat: 52.38,
		lon: 17.85,
		tag: "Lotnictwo NATO",
		detail: "Polska. Magazyn i hub wojsk USA na wschodniej flance."
	},
	{
		id: "gdynia",
		title: "Port wojenny Gdynia",
		lat: 54.53,
		lon: 18.55,
		tag: "Marynarka PL",
		detail: "Główna baza Marynarki Wojennej RP."
	},
	{
		id: "amari",
		title: "Ämari",
		lat: 59.26,
		lon: 24.21,
		tag: "Lotnictwo NATO",
		detail: "Estonia. Rotacyjna obrona powietrzna Bałtyku."
	},
	{
		id: "lielvarde",
		title: "Lielvarde",
		lat: 56.78,
		lon: 24.85,
		tag: "Lotnictwo NATO",
		detail: "Łotwa. Baza sojusznicza."
	},
	{
		id: "siauliai",
		title: "Szawle",
		lat: 55.89,
		lon: 23.39,
		tag: "Lotnictwo NATO",
		detail: "Litwa. Baltic Air Policing."
	},
	{
		id: "mk",
		title: "Mihail Kogălniceanu",
		lat: 44.35,
		lon: 28.49,
		tag: "Lotnictwo NATO",
		detail: "Rumunia. Rozbudowywana baza USA nad Morzem Czarnym."
	},
	{
		id: "baltiysk",
		title: "Bałtyjsk",
		lat: 54.64,
		lon: 19.9,
		tag: "Marynarka RU",
		detail: "Obwód królewiecki. Jedyny całoroczny port Floty Bałtyckiej."
	},
	{
		id: "sevastopol",
		title: "Sewastopol",
		lat: 44.62,
		lon: 33.53,
		tag: "Marynarka RU",
		detail: "Główna historyczna baza Floty Czarnomorskiej."
	},
	{
		id: "novoross-naval",
		title: "Noworosyjsk",
		lat: 44.72,
		lon: 37.78,
		tag: "Marynarka RU",
		detail: "Port wojenny i naftowy. Eksport ropy i flota."
	},
	{
		id: "severomorsk",
		title: "Siewieromorsk",
		lat: 69.07,
		lon: 33.42,
		tag: "Marynarka RU",
		detail: "Półwysep Kola. Flota Północna i atomowe okręty."
	},
	{
		id: "engels",
		title: "Engels",
		lat: 51.48,
		lon: 46.21,
		tag: "Lotnictwo RU",
		detail: "Baza lotnictwa dalekiego zasięgu nad Wołgą."
	},
	{
		id: "hmeimim",
		title: "Hmeimim",
		lat: 35.41,
		lon: 35.95,
		tag: "Lotnictwo RU",
		detail: "Syria, Latakia. Rosyjska baza lotnicza."
	},
	{
		id: "tartus",
		title: "Tartus",
		lat: 34.89,
		lon: 35.87,
		tag: "Marynarka RU",
		detail: "Syria. Punkt wsparcia floty. Status operacyjny bywa zmienny."
	},
	{
		id: "vladivostok",
		title: "Władywostok",
		lat: 43.12,
		lon: 131.9,
		tag: "Marynarka RU",
		detail: "Flota Pacyfiku."
	},
	{
		id: "vilyuchinsk",
		title: "Wiluczinsk",
		lat: 52.93,
		lon: 158.4,
		tag: "Marynarka RU",
		detail: "Kamczatka. Atomowe okręty podwodne Pacyfiku."
	},
	{
		id: "aludeid",
		title: "Al Udeid",
		lat: 25.12,
		lon: 51.31,
		tag: "Lotnictwo USA",
		detail: "Katar. Największa baza USA na Bliskim Wschodzie, dowództwo operacji."
	},
	{
		id: "dhafra",
		title: "Al Dhafra",
		lat: 24.25,
		lon: 54.55,
		tag: "Lotnictwo USA",
		detail: "ZEA. Rozpoznanie i tankowce nad Zatoką."
	},
	{
		id: "bahrain",
		title: "NSA Bahrajn",
		lat: 26.21,
		lon: 50.61,
		tag: "Marynarka USA",
		detail: "Siedziba V Floty. Straż Cieśniny Ormuz."
	},
	{
		id: "diego",
		title: "Diego Garcia",
		lat: -7.32,
		lon: 72.41,
		tag: "Baza USA/UK",
		detail: "Ocean Indyjski. Strategiczny punkt między Zatoką a Azją."
	},
	{
		id: "djibouti-us",
		title: "Camp Lemonnier",
		lat: 11.55,
		lon: 43.15,
		tag: "Baza USA",
		detail: "Dżibuti. Jedyna stała baza USA w Afryce, przy Bab al-Mandab."
	},
	{
		id: "djibouti-cn",
		title: "Baza PLA Dżibuti",
		lat: 11.59,
		lon: 43.06,
		tag: "Marynarka CN",
		detail: "Pierwsza zamorska baza Chin, naprzeciwko Lemonnier."
	},
	{
		id: "nevatim",
		title: "Nevatim",
		lat: 31.21,
		lon: 35.01,
		tag: "Lotnictwo IL",
		detail: "Izrael. Baza F-35."
	},
	{
		id: "haifa-naval",
		title: "Hajfa",
		lat: 32.83,
		lon: 34.99,
		tag: "Marynarka IL",
		detail: "Główna baza morska Izraela."
	},
	{
		id: "bandar-abbas",
		title: "Bandar Abbas",
		lat: 27.14,
		lon: 56.27,
		tag: "Marynarka IR",
		detail: "Iran. Kwatera floty przy Ormuzie."
	},
	{
		id: "bushehr",
		title: "Buszehr",
		lat: 28.92,
		lon: 50.82,
		tag: "Wybrzeże IR",
		detail: "Zatoka Perska. Port, elektrownia jądrowa i infrastruktura militarna."
	},
	{
		id: "norfolk",
		title: "Norfolk",
		lat: 36.95,
		lon: -76.31,
		tag: "Marynarka USA",
		detail: "Największa baza morska świata. Wirginia."
	},
	{
		id: "pearl",
		title: "Pearl Harbor",
		lat: 21.35,
		lon: -157.97,
		tag: "Marynarka USA",
		detail: "Hawaje. Flota Pacyfiku."
	},
	{
		id: "andersen",
		title: "Andersen",
		lat: 13.58,
		lon: 144.92,
		tag: "Lotnictwo USA",
		detail: "Guam. Bombowce i tarcza na zachodnim Pacyfiku."
	},
	{
		id: "yokosuka",
		title: "Yokosuka",
		lat: 35.28,
		lon: 139.67,
		tag: "Marynarka USA",
		detail: "Japonia. Lotniskowiec VII Floty."
	},
	{
		id: "sasebo",
		title: "Sasebo",
		lat: 33.16,
		lon: 129.72,
		tag: "Marynarka USA",
		detail: "Japonia. Okręty desantowe."
	},
	{
		id: "kadena",
		title: "Kadena",
		lat: 26.35,
		lon: 127.77,
		tag: "Lotnictwo USA",
		detail: "Okinawa. Największe skrzydło USA na Pacyfiku."
	},
	{
		id: "misawa",
		title: "Misawa",
		lat: 40.7,
		lon: 141.37,
		tag: "Lotnictwo USA",
		detail: "Północna Japonia. Rozpoznanie."
	},
	{
		id: "humphreys",
		title: "Camp Humphreys",
		lat: 36.96,
		lon: 127.03,
		tag: "Wojska lądowe USA",
		detail: "Korea Południowa. Największy garnizon USA poza krajem."
	},
	{
		id: "osan",
		title: "Osan",
		lat: 37.09,
		lon: 127.03,
		tag: "Lotnictwo USA",
		detail: "Korea. Główna baza myśliwska przy DMZ."
	},
	{
		id: "kunsan",
		title: "Kunsan",
		lat: 35.9,
		lon: 126.62,
		tag: "Lotnictwo USA",
		detail: "Korea, wybrzeże Morza Żółtego."
	},
	{
		id: "yulin",
		title: "Yulin",
		lat: 18.22,
		lon: 109.53,
		tag: "Marynarka CN",
		detail: "Hainan. Baza atomowych okrętów podwodnych Chin."
	},
	{
		id: "qingdao",
		title: "Qingdao",
		lat: 36.07,
		lon: 120.38,
		tag: "Marynarka CN",
		detail: "Flota Północna Chin."
	},
	{
		id: "fiery",
		title: "Fiery Cross",
		lat: 9.55,
		lon: 112.89,
		tag: "Posterunek CN",
		detail: "Wyspy Spratly. Sztuczna wyspa z pasem startowym."
	},
	{
		id: "visakh",
		title: "Visakhapatnam",
		lat: 17.7,
		lon: 83.27,
		tag: "Marynarka IN",
		detail: "Indie. Dowództwo floty wschodniej i atomowe okręty."
	},
	{
		id: "zuoying",
		title: "Zuoying",
		lat: 22.7,
		lon: 120.28,
		tag: "Marynarka TW",
		detail: "Tajwan. Główna baza morska na południu."
	},
	{
		id: "hualien",
		title: "Hualien",
		lat: 24.02,
		lon: 121.62,
		tag: "Lotnictwo TW",
		detail: "Tajwan. Baza w górskim schronie, wschodnie wybrzeże."
	},
	{
		id: "pinegap",
		title: "Pine Gap",
		lat: -23.8,
		lon: 133.74,
		tag: "Rozpoznanie",
		detail: "Australia. Wspólna stacja USA/Australia, wczesne ostrzeganie."
	},
	{
		id: "darwin",
		title: "Darwin",
		lat: -12.41,
		lon: 130.88,
		tag: "Rotacja USA",
		detail: "Północna Australia. Rotacyjna obecność US Marines."
	},
	{
		id: "pituffik",
		title: "Pituffik",
		lat: 76.53,
		lon: -68.7,
		tag: "Kosmos / tarcza",
		detail: "Grenlandia. Wczesne ostrzeganie i Arktyka."
	}
];
var nodes = [
	{
		id: "hormuz",
		title: "Cieśnina Ormuz",
		lat: 26.56,
		lon: 56.25,
		tag: "Cieśnina",
		detail: "Około jednej piątej światowej ropy drogą morską. Zamknięcie podnosi ceny w godziny."
	},
	{
		id: "malacca",
		title: "Cieśnina Malakka",
		lat: 2.5,
		lon: 101.2,
		tag: "Cieśnina",
		detail: "Najkrótsza droga z Zatoki do Chin, Japonii i Korei."
	},
	{
		id: "bab",
		title: "Bab al-Mandab",
		lat: 12.58,
		lon: 43.33,
		tag: "Cieśnina",
		detail: "Wejście na Morze Czerwone. Ataki zmuszają statki do drogi wokół Afryki."
	},
	{
		id: "suez",
		title: "Kanał Sueski",
		lat: 30.45,
		lon: 32.34,
		tag: "Kanał",
		detail: "Europa–Azja bez Afryki. Blokada zatrzymuje kontenery i LNG."
	},
	{
		id: "panama",
		title: "Kanał Panamski",
		lat: 9.08,
		lon: -79.68,
		tag: "Kanał",
		detail: "Atlantyk–Pacyfik. Susza ogranicza tranzyt i podbija fracht."
	},
	{
		id: "bospor",
		title: "Bosfor",
		lat: 41.12,
		lon: 29.05,
		tag: "Cieśnina",
		detail: "Jedyna droga z Morza Czarnego. Zboże, ropa, flota."
	},
	{
		id: "danish",
		title: "Cieśniny Duńskie",
		lat: 55.7,
		lon: 10.9,
		tag: "Cieśnina",
		detail: "Wyjście z Bałtyku. Rosyjska ropa i flota Bałtycka."
	},
	{
		id: "gibraltar-str",
		title: "Gibraltar",
		lat: 35.96,
		lon: -5.5,
		tag: "Cieśnina",
		detail: "Wejście na Morze Śródziemne."
	},
	{
		id: "cape",
		title: "Przylądek Dobrej Nadziei",
		lat: -34.36,
		lon: 18.5,
		tag: "Objazd",
		detail: "Droga zapasowa, gdy Suez lub Morze Czerwone są zamknięte."
	},
	{
		id: "tw-strait",
		title: "Cieśnina Tajwańska",
		lat: 24.4,
		lon: 119.2,
		tag: "Cieśnina",
		detail: "Codzienny tranzyt handlu azjatyckiego tuż przy wybrzeżu Chin."
	},
	{
		id: "kerch",
		title: "Cieśnina Kerczeńska",
		lat: 45.3,
		lon: 36.6,
		tag: "Cieśnina",
		detail: "Morze Azowskie. Most, porty i ryzyko eskalacji."
	},
	{
		id: "ras-tanura",
		title: "Ras Tanura",
		lat: 26.64,
		lon: 50.16,
		tag: "Ropa",
		detail: "Arabia Saudyjska. Największy terminal naftowy świata."
	},
	{
		id: "fujairah",
		title: "Fudżajra",
		lat: 25.12,
		lon: 56.36,
		tag: "Ropa",
		detail: "ZEA, poza Ormuzem. Bunkierka i zapasowy załadunek."
	},
	{
		id: "ras-laffan",
		title: "Ras Laffan",
		lat: 25.91,
		lon: 51.58,
		tag: "LNG",
		detail: "Katar. Największy eksport LNG na świecie."
	},
	{
		id: "sabine",
		title: "Sabine Pass",
		lat: 29.74,
		lon: -93.87,
		tag: "LNG",
		detail: "USA, Luizjana. Główny terminal eksportu LNG."
	},
	{
		id: "yamal",
		title: "Sabetta / Jamał",
		lat: 71.27,
		lon: 72.07,
		tag: "LNG",
		detail: "Arktyka. Rosyjski LNG, zimą zależny od lodołamaczy."
	},
	{
		id: "ceyhan",
		title: "Ceyhan",
		lat: 36.86,
		lon: 35.94,
		tag: "Ropa",
		detail: "Turcja. Koniec ropociągu z Kurdystanu i Azerbejdżanu, omija Ormuz."
	},
	{
		id: "novoross-oil",
		title: "Noworosyjsk",
		lat: 44.72,
		lon: 37.8,
		tag: "Ropa",
		detail: "Główne okno eksportu rosyjskiej ropy na Morze Czarne."
	},
	{
		id: "primorsk",
		title: "Primorsk",
		lat: 60.35,
		lon: 28.71,
		tag: "Ropa",
		detail: "Zatoka Fińska. Bałtycki terminal rosyjskiej ropy."
	},
	{
		id: "ustluga",
		title: "Ust-Ługa",
		lat: 59.67,
		lon: 28.3,
		tag: "Ropa i fracht",
		detail: "Zatoka Fińska. Ropa, gaz i węgiel."
	},
	{
		id: "gdansk-oil",
		title: "Naftoport Gdańsk",
		lat: 54.4,
		lon: 18.72,
		tag: "Ropa",
		detail: "Polska. Morskie okno dostaw ropy, niezależne od rurociągów ze wschodu."
	},
	{
		id: "swinoujscie",
		title: "Świnoujście LNG",
		lat: 53.91,
		lon: 14.29,
		tag: "LNG",
		detail: "Polska. Terminal LNG, filar bezpieczeństwa gazowego."
	},
	{
		id: "rotterdam",
		title: "Rotterdam",
		lat: 51.95,
		lon: 4.14,
		tag: "Port",
		detail: "Największy port Europy. Ropa, kontenery, chemia."
	},
	{
		id: "antwerp",
		title: "Antwerpia",
		lat: 51.27,
		lon: 4.35,
		tag: "Port",
		detail: "Chemia i kontenery. Drugi port UE."
	},
	{
		id: "singapore",
		title: "Singapur",
		lat: 1.26,
		lon: 103.84,
		tag: "Port",
		detail: "Największy hub bunkierki. Zator tutaj czuć w całej Azji."
	},
	{
		id: "ningbo",
		title: "Ningbo-Zhoushan",
		lat: 29.93,
		lon: 121.85,
		tag: "Port",
		detail: "Największy port świata tonażem. Chiny."
	},
	{
		id: "houston",
		title: "Houston",
		lat: 29.73,
		lon: -95.02,
		tag: "Ropa i port",
		detail: "Zatoka Meksykańska. Rafinacja i eksport węglowodorów USA."
	},
	{
		id: "jamnagar",
		title: "Jamnagar",
		lat: 22.35,
		lon: 69.84,
		tag: "Rafineria",
		detail: "Indie. Największy kompleks rafineryjny świata."
	},
	{
		id: "odesa-port",
		title: "Port w Odessie",
		lat: 46.5,
		lon: 30.74,
		tag: "Zboże",
		detail: "Eksport ukraińskiego zboża. Zamknięcie rusza cenami żywności."
	},
	{
		id: "longbeach",
		title: "Los Angeles / Long Beach",
		lat: 33.74,
		lon: -118.25,
		tag: "Port",
		detail: "Główna brama kontenerowa USA–Azja."
	}
];
var lanes = [
	{
		id: "gulf-asia",
		name: "Zatoka–Azja",
		path: [
			[26.6, 56.3],
			[22.2, 60.8],
			[15.5, 55.5],
			[8.5, 72],
			[6.2, 80],
			[2.4, 101.4],
			[1.3, 103.8]
		]
	},
	{
		id: "suez-med",
		name: "Suez–Gibraltar",
		path: [
			[12.6, 43.4],
			[20, 38.5],
			[27.5, 34.2],
			[30.4, 32.4],
			[33.5, 28],
			[35.5, 18],
			[36.5, 2],
			[35.95, -5.5]
		]
	},
	{
		id: "cape-route",
		name: "Objazd przylądkowy",
		path: [
			[12.6, 43.4],
			[0, 48],
			[-20, 40],
			[-34.4, 20],
			[-34, 18.4],
			[-30, 10],
			[-10, -5],
			[10, -17],
			[36, -8],
			[48, -6],
			[50, 1]
		]
	},
	{
		id: "black-sea",
		name: "Morze Czarne–Bosfor",
		path: [
			[46.5, 30.7],
			[44.5, 34],
			[43.2, 34],
			[41.2, 29.1],
			[40.2, 26],
			[36, 23]
		]
	},
	{
		id: "baltic-exit",
		name: "Bałtyk–cieśniny",
		path: [
			[60.3, 28.6],
			[59.6, 24],
			[57.5, 19],
			[55.7, 12.6],
			[56, 11],
			[57.5, 8]
		]
	}
];
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* Path-based preview hosts serve the dev server under `/{port_id}/` and strip
* that prefix before forwarding, so SSR sees `/` while the browser URL keeps the
* prefix. TanStack Start resets `basepath` on hydration, so a `rewrite` keeps
* client routing and generated links aligned with the public URL.
*/
var PATH_BASED_PREVIEW_HOSTS = /* @__PURE__ */ new Set([
	"preview.grok.genai.mil",
	"preview.grok.mil",
	"preview.grokgsac.com"
]);
var PORT_ID_PREFIX = /^\/hds-[a-z0-9]+-\d+-[a-z0-9]+(?=\/|$)/i;
function previewPathPrefix(hostname, pathname) {
	if (!PATH_BASED_PREVIEW_HOSTS.has(hostname.toLowerCase())) return void 0;
	return PORT_ID_PREFIX.exec(pathname)?.[0];
}
function prefixRewrite(prefix) {
	return {
		input: ({ url }) => {
			if (url.pathname === prefix) url.pathname = "/";
			else if (url.pathname.startsWith(`${prefix}/`)) url.pathname = url.pathname.slice(prefix.length);
			return url;
		},
		output: ({ url }) => {
			url.pathname = `${prefix}${url.pathname}`;
			return url;
		}
	};
}
function previewPathRewrite() {
	if (typeof window === "undefined") return void 0;
	const prefix = previewPathPrefix(window.location.hostname, window.location.pathname);
	return prefix ? prefixRewrite(prefix) : void 0;
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var styles_default = "/assets/styles-B1qcoJkx.css";
var Route$2 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "MERIDIAN — geopolityka na żywo" },
			{
				name: "description",
				content: "Mapa sytuacji: konflikty, tankowce, samoloty wojskowe, bazy i węzły, które ruszają geopolityką. Odświeżanie co kilkadziesiąt sekund."
			},
			{
				name: "theme-color",
				content: "#080a0d"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "pl",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "bg-bg font-sans text-fg antialiased",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	})
});
var $$splitComponentImporter = () => import("./routes-Bi1JebCo.mjs").then((n) => n.t);
var Route$1 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var HEAT = /\b(war|airstrike|missile|shelling|killed|troops|invasion|sanction|blockade|drone|warship|ceasefire|nuclear|mobilis|explosion|bombing|artillery|navy|tanker|pipeline|opec|embargo|strike|wojna|ostrzał|sankcj|rakiet|atak|inwazj|blokad|rop[ay]|tankow)\b/i;
function escapeReg(value) {
	return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
var compiled = places.map((place) => ({
	place,
	regs: place.aliases.map((alias) => new RegExp(`(?:^|[^\\p{L}\\p{N}])${escapeReg(alias)}(?:$|[^\\p{L}\\p{N}])`, "iu"))
}));
function locate(text) {
	let best = null;
	for (const entry of compiled) for (const reg of entry.regs) {
		const match = reg.exec(text);
		if (!match) continue;
		const aliasLength = match[0].trim().length;
		const score = entry.place.rank * 1e3 + aliasLength;
		if (!best || score > best.score) best = {
			place: entry.place,
			score
		};
	}
	return best?.place ?? null;
}
function isHeat(text) {
	return HEAT.test(text);
}
var HOT_ZONES = [
	{
		name: "Ukraina",
		s: 44,
		n: 53,
		w: 22,
		e: 41
	},
	{
		name: "Lewant",
		s: 29,
		n: 37.6,
		w: 32,
		e: 37.5
	},
	{
		name: "Zatoka",
		s: 22,
		n: 31,
		w: 46,
		e: 60
	},
	{
		name: "Morze Czerwone",
		s: 12,
		n: 23,
		w: 36,
		e: 48
	},
	{
		name: "Tajwan",
		s: 20,
		n: 28,
		w: 117,
		e: 126
	},
	{
		name: "Korea",
		s: 33.5,
		n: 43.5,
		w: 124,
		e: 131
	},
	{
		name: "Bałtyk",
		s: 53,
		n: 61.2,
		w: 9,
		e: 31
	},
	{
		name: "Sahel",
		s: 10,
		n: 20,
		w: -15,
		e: 16
	}
];
function inHotZone(lat, lon) {
	const hit = HOT_ZONES.find((z) => lat >= z.s && lat <= z.n && lon >= z.w && lon <= z.e);
	return hit ? hit.name : null;
}
var STRATEGIC_TYPES = /* @__PURE__ */ new Set([
	"A124",
	"A332",
	"A400",
	"A50",
	"B1",
	"B2",
	"B52",
	"B703",
	"B752",
	"B762",
	"C130",
	"C135",
	"C17",
	"C30J",
	"C5M",
	"E3CF",
	"E3TF",
	"E6",
	"E8",
	"EUFI",
	"F15",
	"F16",
	"F18",
	"F18H",
	"F22",
	"F35",
	"FA18",
	"H6",
	"IL76",
	"K35R",
	"MG31",
	"P8",
	"R135",
	"RFAL",
	"SU24",
	"SU27",
	"SU30",
	"SU34",
	"SU35",
	"T095",
	"T160",
	"T22M",
	"V22"
]);
var EMERGENCY_SQUAWK = /* @__PURE__ */ new Set([
	"7500",
	"7600",
	"7700"
]);
function makeSource(ttl, empty, load) {
	let entry = null;
	let pending = null;
	return async (force) => {
		if (!force && entry && Date.now() - entry.at < ttl) return {
			data: entry.data,
			ok: true,
			detail: "z pamięci podręcznej"
		};
		if (!pending) pending = load().then((data) => {
			entry = {
				at: Date.now(),
				data
			};
			return data;
		}).finally(() => {
			pending = null;
		});
		try {
			return {
				data: await pending,
				ok: true,
				detail: "świeże"
			};
		} catch (error) {
			const message = error instanceof Error ? error.message : "błąd źródła";
			if (entry) return {
				data: entry.data,
				ok: true,
				detail: `ostatnie dobre (${message})`
			};
			return {
				data: empty,
				ok: false,
				detail: message
			};
		}
	};
}
async function getJson(url, headers, ms = 14e3) {
	const response = await fetch(url, {
		headers: {
			accept: "application/json",
			...headers
		},
		signal: AbortSignal.timeout(ms)
	});
	if (!response.ok) throw new Error(`HTTP ${response.status}`);
	return response.json();
}
async function getText(url) {
	const response = await fetch(url, {
		headers: {
			accept: "application/rss+xml, application/xml, text/xml, */*",
			"user-agent": "Meridian/1.0 (live geopolitical map)"
		},
		signal: AbortSignal.timeout(12e3)
	});
	if (!response.ok) throw new Error(`HTTP ${response.status}`);
	return response.text();
}
function round4(value) {
	return Math.round(value * 1e4) / 1e4;
}
function asRecord(value) {
	return value && typeof value === "object" ? value : null;
}
function num(value) {
	return typeof value === "number" && Number.isFinite(value) ? value : null;
}
function str(value) {
	return typeof value === "string" ? value.trim() : "";
}
function epochMs(value) {
	const n = num(value);
	if (n == null) return Date.now();
	if (n < 1e11) return n * 1e3;
	return n;
}
function decodeXml(value) {
	return value.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").replace(/<[^>]+>/g, " ").replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">").replace(/"/g, "\"").replace(/&#0?39;|'/g, "'").replace(/&nbsp;/g, " ").replace(/&#(\d+);/g, (_, code) => {
		const parsed = Number(code);
		return parsed > 0 && parsed < 65536 ? String.fromCharCode(parsed) : "";
	}).replace(/\s+/g, " ").trim();
}
function pickTag(chunk, tag) {
	const cdata = chunk.match(new RegExp(`<${tag}[^>]*>\\s*<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>`, "i"));
	if (cdata?.[1]) return cdata[1].trim();
	return chunk.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i"))?.[1]?.trim() ?? "";
}
function safeUrl(value) {
	try {
		const url = new URL(value.trim());
		if (url.protocol === "https:" || url.protocol === "http:") return url.toString();
	} catch {
		return;
	}
}
function hashId(value) {
	let hash = 0;
	for (let i = 0; i < value.length; i += 1) hash = hash * 31 + value.charCodeAt(i) | 0;
	return (hash >>> 0).toString(36);
}
function parseRss(xml, source) {
	return xml.split(/<item\b/i).slice(1, 36).map((chunk) => {
		const title = decodeXml(pickTag(chunk, "title"));
		const href = safeUrl(decodeXml(pickTag(chunk, "link")));
		const whenRaw = decodeXml(pickTag(chunk, "pubDate"));
		const parsed = whenRaw ? Date.parse(whenRaw) : NaN;
		const when = Number.isFinite(parsed) ? new Date(parsed).toISOString() : (/* @__PURE__ */ new Date()).toISOString();
		const desc = decodeXml(pickTag(chunk, "description")).slice(0, 320);
		return {
			id: hashId(`${source}:${title}`),
			title,
			href,
			source,
			when,
			desc
		};
	}).filter((item) => item.title.length > 8);
}
var FEEDS = [
	["BBC", "https://feeds.bbci.co.uk/news/world/rss.xml"],
	["Al Jazeera", "https://www.aljazeera.com/xml/rss/all.xml"],
	["Guardian", "https://www.theguardian.com/world/rss"],
	["RMF24", "https://www.rmf24.pl/fakty/swiat/feed"]
];
var loadNews = makeSource(15e4, {
	events: [],
	headlines: []
}, async () => {
	const batches = await Promise.all(FEEDS.map(async ([source, url]) => {
		try {
			return parseRss(await getText(url), source);
		} catch {
			return [];
		}
	}));
	const seen = /* @__PURE__ */ new Set();
	const stories = batches.flat().filter((story) => {
		const key = story.title.toLowerCase().slice(0, 90);
		if (seen.has(key)) return false;
		seen.add(key);
		return Date.now() - Date.parse(story.when) < 2592e5;
	}).sort((a, b) => b.when.localeCompare(a.when));
	if (!stories.length) throw new Error("brak depesz");
	const byPlace = /* @__PURE__ */ new Map();
	for (const story of stories) {
		const place = locate(`${story.title}. ${story.desc}`);
		if (!place) continue;
		const heat = isHeat(`${story.title}. ${story.desc}`);
		const headline = {
			id: story.id,
			title: story.title,
			href: story.href,
			source: story.source,
			when: story.when,
			place: place.name
		};
		const existing = byPlace.get(place.id);
		if (!existing) {
			byPlace.set(place.id, {
				id: place.id,
				place: place.name,
				lat: place.lat,
				lon: place.lon,
				heat,
				when: story.when,
				headlines: [headline]
			});
			continue;
		}
		if (heat) existing.heat = true;
		if (story.when > existing.when) existing.when = story.when;
		if (existing.headlines.length < 4) existing.headlines.push(headline);
	}
	return {
		events: [...byPlace.values()].sort((a, b) => Number(b.heat) - Number(a.heat) || b.when.localeCompare(a.when)).slice(0, 40),
		headlines: stories.slice(0, 50).map((story) => ({
			id: story.id,
			title: story.title,
			href: story.href,
			source: story.source,
			when: story.when,
			place: locate(`${story.title}. ${story.desc}`)?.name
		}))
	};
});
var loadAircraft = makeSource(2e4, [], async () => {
	let payload;
	try {
		payload = await getJson("https://api.adsb.lol/v2/mil");
	} catch {
		payload = await getJson("https://avioadsb.org/v1/mil");
	}
	const root = asRecord(payload);
	const list = root && Array.isArray(root.ac) ? root.ac : [];
	const now = Date.now();
	const aircraft = [];
	for (const item of list) {
		const row = item;
		if (typeof row.lat !== "number" || typeof row.lon !== "number") continue;
		if (Math.abs(row.lat) > 90 || Math.abs(row.lon) > 180) continue;
		const alt = typeof row.alt_baro === "number" ? row.alt_baro : null;
		const seen = typeof row.seen_pos === "number" ? row.seen_pos : 0;
		aircraft.push({
			id: row.hex || `${row.lat},${row.lon}`,
			callsign: str(row.flight) || str(row.hex) || "—",
			hex: str(row.hex),
			type: str(row.t) || "?",
			reg: str(row.r),
			lat: round4(row.lat),
			lon: round4(row.lon),
			altFt: alt,
			speedKt: typeof row.gs === "number" ? row.gs : 0,
			track: typeof row.track === "number" ? row.track : 0,
			squawk: str(row.squawk),
			fixMs: now - Math.max(0, seen) * 1e3
		});
		if (aircraft.length >= 450) break;
	}
	if (!aircraft.length) throw new Error("pusta odpowiedź ADS-B");
	return aircraft;
});
var loadHormuz = makeSource(25e3, {
	vessels: [],
	summary: null
}, async () => {
	const payload = asRecord(await getJson("https://hormuz.now/api/snapshot"));
	if (!payload) throw new Error("pusty kadr Ormuzu");
	const stats = asRecord(payload.stats);
	const summary = {
		tankers: num(stats?.tankers) ?? 0,
		cargo: num(stats?.cargo) ?? 0,
		moving: num(stats?.moving) ?? 0,
		anchored: num(stats?.anchored) ?? 0,
		inChoke: num(stats?.inChokePoint) ?? 0
	};
	const list = Array.isArray(payload.vessels) ? payload.vessels : [];
	const vessels = [];
	for (const item of list) {
		const row = item;
		if (typeof row.lat !== "number" || typeof row.lon !== "number") continue;
		const blob = `${row.category ?? ""} ${row.shiptypeLabel ?? ""} ${row.gtLabel ?? ""}`.toLowerCase();
		let kind = null;
		if (blob.includes("tanker")) kind = "tanker";
		else if (blob.includes("cargo") || blob.includes("bulk") || blob.includes("container")) kind = "cargo";
		if (!kind) continue;
		const dwt = typeof row.dwt === "number" && row.dwt > 0 ? row.dwt : null;
		const length = typeof row.length === "number" && row.length > 0 ? `${row.length} m` : "";
		const label = str(row.gtLabel) || str(row.shiptypeLabel) || kind;
		vessels.push({
			id: `hz-${row.mmsi ?? vessels.length}`,
			name: str(row.name) || "bez nazwy",
			kind,
			region: "Ormuz",
			lat: round4(row.lat),
			lon: round4(row.lon),
			speedKt: typeof row.speed === "number" ? row.speed : 0,
			course: typeof row.course === "number" ? row.course : 0,
			dest: str(row.destination),
			flag: str(row.flag),
			detail: [
				label,
				row.flag ? `bandera ${row.flag}` : "",
				dwt ? `${dwt.toLocaleString("pl-PL")} DWT` : "",
				length
			].filter(Boolean).join(" · "),
			fixMs: epochMs(row.posAt),
			dwt
		});
	}
	if (!vessels.length) throw new Error("brak statków w Ormuzie");
	return {
		vessels,
		summary
	};
});
var loadBaltic = makeSource(3e4, [], async () => {
	const headers = { "Digitraffic-User": "Meridian/1.0 (https://meridian.live)" };
	const [metaRaw, locRaw] = await Promise.all([getJson("https://meri.digitraffic.fi/api/ais/v1/vessels", headers), getJson("https://meri.digitraffic.fi/api/ais/v1/locations", headers)]);
	const metaList = Array.isArray(metaRaw) ? metaRaw : [];
	const meta = /* @__PURE__ */ new Map();
	for (const row of metaList) if (typeof row.mmsi === "number") meta.set(row.mmsi, row);
	const root = asRecord(locRaw);
	const features = root && Array.isArray(root.features) ? root.features : [];
	const vessels = [];
	const now = Date.now();
	for (const feature of features) {
		const coords = feature.geometry?.coordinates;
		const props = feature.properties;
		if (!coords || coords.length < 2 || !props) continue;
		const mmsi = props.mmsi ?? feature.mmsi;
		if (typeof mmsi !== "number") continue;
		const info = meta.get(mmsi);
		const shipType = info?.shipType ?? 0;
		const kind = shipType >= 80 && shipType <= 89 ? "tanker" : shipType >= 70 && shipType <= 79 ? "cargo" : null;
		if (!kind) continue;
		const fixMs = typeof props.timestampExternal === "number" ? props.timestampExternal : now;
		if (now - fixMs > 108e5) continue;
		const draught = typeof info?.draught === "number" && info.draught > 0 ? `${(info.draught / 10).toFixed(1)} m zanurzenia` : "";
		vessels.push({
			id: `bal-${mmsi}`,
			name: str(info?.name) || `MMSI ${mmsi}`,
			kind,
			region: "Bałtyk",
			lat: round4(coords[1] ?? 0),
			lon: round4(coords[0] ?? 0),
			speedKt: typeof props.sog === "number" ? props.sog : 0,
			course: typeof props.cog === "number" ? props.cog : 0,
			dest: str(info?.destination),
			flag: "",
			detail: [`AIS ${shipType}`, draught].filter(Boolean).join(" · "),
			fixMs,
			dwt: null
		});
	}
	if (!vessels.length) throw new Error("brak AIS na Bałtyku");
	return vessels;
});
var loadQuakes = makeSource(9e4, [], async () => {
	const payload = asRecord(await getJson("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson"));
	const features = payload && Array.isArray(payload.features) ? payload.features : [];
	const quakes = [];
	for (const feature of features) {
		const row = asRecord(feature);
		const geometry = asRecord(row?.geometry);
		const props = asRecord(row?.properties);
		const coords = geometry && Array.isArray(geometry.coordinates) ? geometry.coordinates : null;
		if (!coords || !props) continue;
		const lon = num(coords[0]);
		const lat = num(coords[1]);
		const depth = num(coords[2]) ?? 0;
		const mag = num(props.mag);
		if (lat == null || lon == null || mag == null) continue;
		const time = num(props.time) ?? Date.now();
		quakes.push({
			id: str(row?.id) || `q-${lat}-${lon}`,
			title: str(props.place) || "wstrząs",
			lat: round4(lat),
			lon: round4(lon),
			mag,
			depthKm: Math.round(depth),
			tsunami: props.tsunami === 1,
			when: new Date(time).toISOString(),
			href: safeUrl(str(props.url))
		});
	}
	return quakes.sort((a, b) => b.mag - a.mag).slice(0, 40);
});
var HAZARD_LABEL = {
	severeStorms: "Cyklon",
	wildfires: "Pożar",
	volcanoes: "Wulkan",
	floods: "Powódź",
	drought: "Susza",
	landslides: "Osuwisko",
	seaLakeIce: "Lód",
	dustHaze: "Pył",
	tempExtremes: "Ekstremum",
	snow: "Śnieg",
	manmade: "Zdarzenie"
};
function geometryPoint(value) {
	const flat = [];
	const walk = (node) => {
		if (!Array.isArray(node) || node.length === 0) return;
		if (typeof node[0] === "number" && typeof node[1] === "number") {
			flat.push([node[0], node[1]]);
			return;
		}
		for (const child of node) walk(child);
	};
	walk(value);
	if (!flat.length) return null;
	const lon = flat.reduce((sum, pair) => sum + (pair[0] ?? 0), 0) / flat.length;
	const lat = flat.reduce((sum, pair) => sum + (pair[1] ?? 0), 0) / flat.length;
	if (Math.abs(lat) > 90 || Math.abs(lon) > 180) return null;
	return {
		lat,
		lon
	};
}
var loadHazards = makeSource(24e4, [], async () => {
	const payload = asRecord(await getJson("https://eonet.gsfc.nasa.gov/api/v3/events?status=open&limit=60"));
	const events = payload && Array.isArray(payload.events) ? payload.events : [];
	const hazards = [];
	for (const event of events) {
		const row = asRecord(event);
		if (!row) continue;
		const categoryId = str(asRecord((Array.isArray(row.categories) ? row.categories : [])[0])?.id);
		if (categoryId === "earthquakes") continue;
		const geometries = Array.isArray(row.geometry) ? row.geometry : [];
		const last = asRecord(geometries[geometries.length - 1]);
		const point = geometryPoint(last?.coordinates);
		if (!point) continue;
		const whenRaw = str(last?.date);
		hazards.push({
			id: str(row.id) || hashId(str(row.title)),
			title: str(row.title) || "zagrożenie",
			kind: HAZARD_LABEL[categoryId] || "Zagrożenie",
			lat: round4(point.lat),
			lon: round4(point.lon),
			when: whenRaw || (/* @__PURE__ */ new Date()).toISOString(),
			href: safeUrl(str(asRecord(Array.isArray(row.sources) ? row.sources[0] : null)?.url))
		});
		if (hazards.length >= 35) break;
	}
	return hazards;
});
function clamp(value, min, max) {
	return Math.max(min, Math.min(max, value));
}
var flight = null;
function getFeed(force = false) {
	if (!force && flight) return flight;
	flight = build(force).finally(() => {
		flight = null;
	});
	return flight;
}
async function build(force) {
	const [news, aircraft, hormuz, baltic, quakes, hazards] = await Promise.all([
		loadNews(force),
		loadAircraft(force),
		loadHormuz(force),
		loadBaltic(force),
		loadQuakes(force),
		loadHazards(force)
	]);
	const vessels = [...hormuz.data.vessels, ...baltic.data];
	const heatStories = news.data.events.filter((event) => event.heat).length;
	const anchoredTankers = hormuz.data.vessels.filter((vessel) => vessel.kind === "tanker" && vessel.speedKt < 1).length;
	const milHot = aircraft.data.filter((plane) => (plane.altFt ?? 0) > 800 && inHotZone(plane.lat, plane.lon)).length;
	const maxMag = quakes.data.reduce((max, quake) => Math.max(max, quake.mag), 0);
	const parts = [
		{
			label: "Tło sytuacji",
			points: 12
		},
		{
			label: "Depesze o użyciu siły i sankcjach",
			points: Math.min(34, heatStories * 3)
		},
		{
			label: "Tankowce stojące w Ormuzie",
			points: Math.min(16, Math.round(anchoredTankers / 12))
		},
		{
			label: "Lotnictwo nad strefami gorącymi",
			points: Math.min(18, milHot)
		},
		{
			label: "Sejsmika",
			points: maxMag >= 6.5 ? 14 : maxMag >= 5.5 ? 8 : maxMag >= 4.5 ? 3 : 0
		},
		{
			label: "Otwarte zagrożenia naturalne",
			points: Math.min(8, hazards.data.length)
		}
	];
	const index = clamp(parts.reduce((sum, part) => sum + part.points, 0), 0, 100);
	const sources = [
		{
			id: "adsb",
			label: "Samoloty wojskowe",
			ok: aircraft.ok,
			detail: aircraft.ok ? `${aircraft.data.length} pozycji ADS-B · ${aircraft.detail}` : aircraft.detail
		},
		{
			id: "hormuz",
			label: "AIS Ormuz",
			ok: hormuz.ok,
			detail: hormuz.ok ? `${hormuz.data.vessels.length} tankowców i frachtu · ${hormuz.detail}` : hormuz.detail
		},
		{
			id: "baltic",
			label: "AIS Bałtyk",
			ok: baltic.ok,
			detail: baltic.ok ? `${baltic.data.length} statków towarowych · ${baltic.detail}` : baltic.detail
		},
		{
			id: "news",
			label: "Depesze",
			ok: news.ok,
			detail: news.ok ? `${news.data.headlines.length} tytułów, ${news.data.events.length} miejsc · ${news.detail}` : news.detail
		},
		{
			id: "usgs",
			label: "USGS",
			ok: quakes.ok,
			detail: quakes.ok ? `${quakes.data.length} wstrząsów ≥ 4.5 · ${quakes.detail}` : quakes.detail
		},
		{
			id: "eonet",
			label: "NASA EONET",
			ok: hazards.ok,
			detail: hazards.ok ? `${hazards.data.length} otwartych zdarzeń · ${hazards.detail}` : hazards.detail
		}
	];
	return {
		updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
		index,
		parts,
		sources,
		aircraft: aircraft.data,
		vessels,
		events: news.data.events,
		headlines: news.data.headlines,
		quakes: quakes.data,
		hazards: hazards.data,
		hormuz: hormuz.data.summary
	};
}
var Route = createFileRoute("/api/feed")({ server: { handlers: { GET: async ({ request }) => {
	const force = new URL(request.url).searchParams.get("fresh") === "1";
	try {
		const feed = await getFeed(force);
		return Response.json(feed, { headers: { "cache-control": "public, max-age=8, s-maxage=12, stale-while-revalidate=40" } });
	} catch {
		return Response.json({ error: "strumień niedostępny" }, { status: 502 });
	}
} } } });
var rootRouteChildren = {
	IndexRoute: Route$1.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$2
	}),
	ApiFeedRoute: Route.update({
		id: "/api/feed",
		path: "/api/feed",
		getParentRoute: () => Route$2
	})
};
var routeTree = Route$2._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		rewrite: previewPathRewrite(),
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { bases as a, theaters as c, inHotZone as i, __exportAll as l, EMERGENCY_SQUAWK as n, lanes as o, STRATEGIC_TYPES as r, nodes as s, router_exports as t };
