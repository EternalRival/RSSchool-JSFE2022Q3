class TVShow {
  #title;

  #description;

  #URN;

  #year;

  constructor(title, year, URN, description) {
    this.#title = title;
    this.#description = description;
    this.#URN = URN;
    this.#year = year;
  }

  getTitle() { return this.#title; }

  getYear() { return this.#year; }

  getDescription() { return this.#description; }

  async setAudio(element, options) {
    const audio = await import(`../assets/tv-shows/music/${this.#URN}.mp3`);
    Object.assign(element, { src: audio.default, ...options });
  }

  async setImage(element) {
    const image = await import(`../assets/tv-shows/img/${this.#URN}.jpg`);
    Object.assign(element, { src: image.default });
  }
}

const shows = {
  add(genre, tvShow) {
    if (this.list[genre]) this.list[genre].push(tvShow);
    else this.list[genre] = [tvShow];
  },
  list: {},
};

/* eslint-disable space-in-parens */
/* eslint-disable no-multi-spaces */
shows.add('General', new TVShow(   'Arcane',                     '2021',         'arcane',             'Set in utopian Piltover and the oppressed underground of Zaun, the story follows the origins of two iconic League champions-and the power that will tear them apart.'));
shows.add('General', new TVShow(   'Doctor Who',                 '1963 (2005)',  'doctor-who',         'The further adventures in time and space of the alien adventurer known as the Doctor and their companions from planet Earth.'));
shows.add('General', new TVShow(   'Game of Thrones',            '2011',         'game-of-thrones',    'Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.'));
shows.add('General', new TVShow(   'House, M.D.',                '2004',         'house-md',           'An antisocial maverick doctor who specializes in diagnostic medicine does whatever it takes to solve puzzling cases that come his way using his crack team of doctors and his wits.'));
shows.add('General', new TVShow(   'Peaky Blinders',             '2013',         'peaky-blinders',     'A gangster family epic set in 1900s England, centering on a gang who sew razor blades in the peaks of their caps, and their fierce boss Tommy Shelby.'));
shows.add('General', new TVShow(   'The Walking Dead',           '2010',         'twd',                'Sheriff Deputy Rick Grimes wakes up from a coma to learn the world is in ruins and must lead a group of survivors to stay alive.'));

shows.add('Comedy', new TVShow(    'ALF',                        '1986',         'alf',                'A furry alien wiseguy comes to live with the Tanner family after crashing into their garage.'));
shows.add('Comedy', new TVShow(    'Friends',                    '1994',         'friends',            'Follows the personal and professional lives of six twenty to thirty-something-year-old friends living in Manhattan.'));
shows.add('Comedy', new TVShow(    'How I Met Your Mother',      '2005',         'himym',              'A father recounts to his children - through a series of flashbacks - the journey he and his four best friends took leading up to him meeting their mother.'));
shows.add('Comedy', new TVShow(    'Scrubs',                     '2001',         'scrubs',             'In the unreal world of Sacred Heart Hospital, intern John "J.D." Dorian learns the ways of medicine, friendship and life.'));
shows.add('Comedy', new TVShow(    'The Big Bang Theory',        '2007',         'tbbt',               'A woman who moves into an apartment across the hall from two brilliant but socially awkward physicists shows them how little they know about life outside of the laboratory.'));
shows.add('Comedy', new TVShow(    'Young Sheldon',              '2017',         'sheldon',            'Meet a child genius named Sheldon Cooper and his family. Some unique challenges face Sheldon, who is socially impaired.'));

shows.add('Mystery', new TVShow(   'Charmed',                    '1998',         'charmed',            'Three sisters discover their destiny, to battle against the forces of evil, using their witchcraft. They are the Charmed Ones.'));
shows.add('Mystery', new TVShow(   'Dark',                       '2017',         'dark',               'A family saga with a supernatural twist, set in a German town where the disappearance of two young children exposes the relationships among four families.'));
shows.add('Mystery', new TVShow(   'Stranger things',            '2016',         'stranger-things',    'When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.'));
shows.add('Mystery', new TVShow(   'Supernatural',               '2005',         'supernatural',       'Two brothers follow their father\'s footsteps as hunters, fighting evil supernatural beings of many kinds, including monsters, demons, and gods that roam the earth.'));
shows.add('Mystery', new TVShow(   'Twin Peaks',                 '1990',         'twin-peaks',         'An idiosyncratic FBI agent investigates the murder of a young woman in the even more idiosyncratic town of Twin Peaks.'));
shows.add('Mystery', new TVShow(   'X-Files',                    '1993',         'x-files',            'Two F.B.I. Agents, Fox Mulder the believer and Dana Scully the skeptic, investigate the strange and unexplained, while hidden forces work to impede their efforts.'));

shows.add('Criminal', new TVShow(  'Breaking Bad',               '2008',         'breaking-bad',       'A chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine with a former student in order to secure his family\'s future.'));
shows.add('Criminal', new TVShow(  'Dexter',                     '2006',         'dexter',             'He\'s smart. He\'s lovable. He\'s Dexter Morgan, America\'s favorite serial killer, who spends his days solving crimes and nights committing them.'));
shows.add('Criminal', new TVShow(  'Fargo',                      '2014',         'fargo',              'Various chronicles of deception, intrigue and murder in and around frozen Minnesota. Yet all of these tales mysteriously lead back one way or another to Fargo, North Dakota.'));
shows.add('Criminal', new TVShow(  'iZombie',                    '2015',         'izombie',            'A medical resident finds that being a zombie has its perks, which she uses to assist the police.'));
shows.add('Criminal', new TVShow(  'Sherlock',                   '2010',         'sherlock',           'A modern update finds the famous sleuth and his doctor partner solving crime in 21st-century London.'));
shows.add('Criminal', new TVShow(  'True Detective',             '2014',         'true-detective',     'Seasonal anthology series in which police investigations unearth the personal and professional secrets of those involved, both within and outside the law.'));

shows.add('Superhero', new TVShow( 'Arrow',                      '2012',         'arrow',              'Spoiled billionaire playboy Oliver Queen is missing and presumed dead when his yacht is lost at sea. He returns five years later a changed man, determined to clean up the city as a hooded vigilante armed with a bow.'));
shows.add('Superhero', new TVShow( 'Batman',                     '1989',         'batman',             'The Dark Knight battles crime in Gotham City with occasional help from Robin and Batgirl.'));
shows.add('Superhero', new TVShow( 'The Flash',                  '2014',         'flash',              'After being struck by lightning, Barry Allen wakes up from his coma to discover he\'s been given the power of super speed, becoming the Flash, and fighting crime in Central City.'));
shows.add('Superhero', new TVShow( 'Smallville',                 '2001',         'smallville',         'A young Clark Kent struggles to find his place in the world as he learns to harness his alien powers for good and deals with the typical troubles of teenage life in Smallville, Kansas.'));
shows.add('Superhero', new TVShow( 'Spider-Man',                 '1994',         'spiderman',          'A young man with spider-like abilities fights crime as a superhero in New York City while trying to have a normal personal life.'));
shows.add('Superhero', new TVShow( 'X-Men',                      '1992',         'x-men',              'A team of mutant superheroes fight for justice and human acceptance in the Marvel Comics universe.'));

shows.add('Anime', new TVShow(     'Darker Than Black',          '2007',         'darker-than-black',  'In Tokyo, an impenetrable field known as "Hell\'s Gate" appeared ten years ago. At the same time, psychics who wield paranormal powers at the cost of their conscience also emerged. Hei is one of the most powerful of these psychic agents, and along with his blind associate, Yin, works for one of the many rival agencies vying to unlock the mysteries of Hell\'s Gate.'));
shows.add('Anime', new TVShow(     'Durarara!!',                 '2010',         'durarara',           'Tired of his mundane life, Mikado Ryugamine decides to move to Ikebukuro, a district in Tokyo, when a friend invites him. With everything from invisible gangs to rumored beings, Ikebukuro is full of connected mysteries where people\'s pasts intertwine with the present.'));
shows.add('Anime', new TVShow(     'Fairy Tail',                 '2009',         'fairy-tail',         'Lucy, an aspiring Celestial Wizard, becomes a friend and ally to powerful wizards Natsu, Gray, and Erza, who are part of the (in)famous wizard guild, Fairy Tail.'));
shows.add('Anime', new TVShow(     'Soul Eater',                 '2008',         'soul-eater',         'Set in the Shinigami technical school for weapon meisters, the series revolves around 3 duos. These pairs are a partnership between a weapon meister and a human weapon. Trying to reach a ranking of "Death Scythe" (and thus fit for use by the Shinigami) they must collect the souls of 99 evil humans and 1 witch. However, forces outside of the Academy make it more challenging of a feat, causing trouble around the world.'));
shows.add('Anime', new TVShow(     'Steins;Gate',                '2011',         'steins-gate',        'After discovering time travel, a university student and his colleagues must use their knowledge of it to stop an evil organization and their diabolical plans.'));
shows.add('Anime', new TVShow(     'Tengen Toppa Gurren Lagan',  '2007',         'ttgl',               'Two friends, Simon and Kamina, become the symbols of rebellion against the powerful Spiral King, who forced mankind into subterranean villages.'));

export default shows.list;
