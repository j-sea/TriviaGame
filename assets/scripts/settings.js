// Game Settings
const SECONDS_PER_QUESTION = 30;
const SECONDS_PER_POPUP = 4;
const MAX_QUESTIONS_PER_GAME = 5;
const QUESTIONS = [
    {
        q: '<h3>T.V. Show (Animated)</h3><p>This show sets itself apart with incredibly heavy-hitting morals as it progresses. If you haven\'t seen this show, I highly <em>highly</em> recommend it for all ages. It\'s a show full of love without stipulations.</p>',
        a: 'Steven Universe',
        ia: [
            'Barney and Friends',
            'Powerpuff Girls',
            'Akira',
        ],
        r: '<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/MIREK5ZL1jA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    },
    {
        q: '<h3>T.V. Show (Animated)</h3><p>Amusing and energetic, this show sets itself apart with its wildly weird world based on Irish and Celtic mythology and its deep exploration of friendship and overcoming life\'s hardships.</p>',
        a: 'Adventure Time',
        ia: [
            'Spongebob Squarepants',
            'The Secret of Kells',
            'Pan\'s Labyrinth',
        ],
        r: '<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/gfijG7pmMqk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    },
    {
        q: '<h3>T.V. Show (Musical Comedy)</h3><p>Hilariously tongue-in-cheek, this show is a great way to relax and enjoy your leisure time. Follow our protagonist as they journey to save their beloved. And yes, they all really do sing. It\'s amazing.</p>',
        a: 'Galavant',
        ia: [
            'Glee',
            'High School Musical',
            'Sing',
        ],
        r: '<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/QWnDwM0RSX4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    },
    {
        q: '<h3>T.V. Show (Comedy)</h3><p>One of the best cop shows in existence with a perfect casting, this series maintains a light-hearted mood most of the time while handling several serious topics with a mostly-mature attitude. A relative in the police force informed me it was the most accurate portrayal of police office politics on television.</p>',
        a: 'Brooklyn Nine-Nine',
        ia: [
            'Law & Order',
            'Southland',
            'Super Troopers',
        ],
        r: '<iframe width="560" height="315" src="https://www.youtube.com/embed/nYtJSpH4aUY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    },
    {
        q: '<h3>Roguelike Video Game</h3><p>One of the best aesthetics in a roguelike in recent years, this game continues to challenge you more and more even after you manage to beat it\'s increasingly-harder modes. While a solid roguelike, it is also a top-quality metroidvania game.</p>',
        a: 'Dead Cells',
        ia: [
            'Rogue Legacy',
            'Darkest Dungeon',
            'Vagante',
        ],
        r: '<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/RvGaSPTcTxc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    },
    {
        q: '<h3>T.V. Show (Animated)</h3><p>One of the most frustratingly-relatable and loveable shows, navigating feelings plays a key role in its protagonist\'s daily life just trying to survive, and we get to share in the ups and downs that come along with them through karaoke.</p>',
        a: 'Aggretsuko',
        ia: [
            'Disenchanted',
            'Steven Universe',
            'Dr. Horrible\'s Sing-Along Blog',
        ],
        r: '<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/z9jGaJJlNyo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    },
    {
        q: '<h3>Music Band (Indie Rock)</h3><p>The female vocal lead of this quartet carries a diverse array of songs across over six albums varying greatly in genre and feel. They became more widely known after writing a song for a movie based off a graphic novel series. Great to sing and dance along with.</p>',
        a: 'Metric',
        ia: [
            'No Doubt',
            'Garbage',
            'Paramore',
        ],
        r: '<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/uly3S2KjUf4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    },
    {
        q: '<h3>Music Band (Rock)</h3><p>Formed in 1994, this band never shies away from culturally-relevant lyrics. The male vocal lead carries several albums across different genres such as alternative rock, space rock, and even electronica. You can try to sing along with him, but it will be difficult without a wide vocal range.</p>',
        a: 'Muse',
        ia: [
            'Linkin Park',
            'System of a Down',
            'Rage Against the Machine',
        ],
        r: '<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/X8f5RgwY8CI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    },
    {
        q: '<h3>Music Band (Rock)</h3><p>This band arrived in the 90s with a powerful dynamic, self-written lyrics, and an outlet for all the frustrations of life; however, their careers really took off with their debut album in 2000. Regardless of being loved and hated by music enthusiasts, they were always working on expanding their musical range and accomplished multiple unique albums, each with an artistic theme behind them. You\'ll run out of breath singing along.</p>',
        a: 'Linkin Park',
        ia: [
            'System of a Down',
            'Disturbed',
            'Korn',
        ],
        r: '<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/AsNvb56CTa4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    },
    {
        q: '<h3>Music Artist (Pop Rock)</h3><p>This artist came onto the scene in the 2000s while double-majoring at Stanford but really only hit it big in 2017 with an album that is a reflection of life\'s many intense ups and downs.</p>',
        a: 'K.Flay',
        ia: [
            'Amy Lee',
            'Liz Phair',
            'Skylar Grey',
        ],
        r: '<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/3SHFLj-pTQE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    },
];
