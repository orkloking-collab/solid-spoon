/* ============================================================================
   MovieBazar — MOVIES DATA
   ============================================================================
   👉 Notun movie / post add korte: niche array te notun object add korun.
   👉 Poster image: assets/img/posters/<id>.svg  (nijer picture use korte
      'poster' field er path change korben, jemon: 'assets/img/posters/my.jpg')
   👉 Download link: parts[] er 'url' e asol link boshan.

   Fields:
   id          → unique slug (movie.html?id=<id>)
   title       → English title
   titleBn     → Bengali title (optional)
   year        → release year
   genres      → array of genres
   quality     → 480p / 720p / 1080p / 4K
   size        → file size text
   runtime     → duration text
   language    → Bangla / Hindi / English ...
   rating      → number (out of 10)
   views       → number
   date        → publish date (YYYY-MM-DD)
   featured    → true = homepage hero te dekhabe
   free        → true = legally free movie (Internet Archive) — "Watch Now"
   license     → license note (free movie gulor jonno)
   synopsis    → short description
   cast        → array (optional)
   parts       → download parts [{label, quality, size, url}]
   poster      → poster image path
   backdrop    → wide image path

   ⭐ VIDEO — protyek movie page e asol video chole ⭐
   video: {
     embed: 'https://archive.org/embed/<id>',   // iframe player (recommended)
     src:   'https://.../movie.mp4',            // ba direct mp4/webm file
     poster: 'assets/img/backdrops/x.svg',      // optional
     note:  'Demo video — replace with your own' // optional caption
   }
   ========================================================================== */

/* Internet Archive embed player — verified, legally free (PD / CC) sources */
const IA = 'https://archive.org/embed/';

window.MOVIES = [

  /* ================= 20 POSTS (apnar content — demo video soho) ============= */
  {
    id: 'rakkhosher-rajjo',
    title: 'Rakkhosher Rajjo',
    titleBn: 'রাক্ষসের রাজ্য',
    year: 2025, genres: ['Action', 'Thriller'],
    quality: '720p', size: '780MB', runtime: '2h 14m', language: 'Bangla',
    rating: 8.1, views: 12453, date: '2025-11-02', featured: true,
    synopsis: 'Ek purono karigar je kolonir secret guli unglen kore... ekjon police officer-er sath theke jhorana hoy ek rater moddhe. Sundarban-er ghana jungle-te udbhav hoy ek rakkhosher rajjyar rahasya.',
    cast: ['Arifin Shuvo', 'Nusrat Imrose Tisha', 'Iresh Zaker'],
    parts: [
      { label: 'Part 01', quality: '480p', size: '300MB', url: '#' },
      { label: 'Part 02', quality: '480p', size: '300MB', url: '#' },
      { label: 'Full Movie', quality: '720p', size: '780MB', url: '#' },
    ],
    video: { embed: IA + 'Tears-of-Steel', note: 'Demo video — apnar asol video link ekhane boshaben' },
    poster: 'assets/img/posters/rakkhosher-rajjo.svg',
    backdrop: 'assets/img/backdrops/rakkhosher-rajjo.svg',
  },

  {
    id: 'dhaka-nights',
    title: 'Dhaka Nights',
    titleBn: 'ঢাকা নাইটস',
    year: 2025, genres: ['Crime', 'Drama'],
    quality: '1080p', size: '1.4GB', runtime: '2h 22m', language: 'Bangla',
    rating: 7.8, views: 9821, date: '2025-10-28', featured: true,
    synopsis: 'Dhaka city-r atoj bhor raate ekjon young journalist ek political conspiracy-te atke pore. Tar jibon o karjar moddhe ekta uncomfortable choice korte hoy.',
    cast: ['Chanchal Chowdhury', 'Aupee Karim', 'Mostofa Monowar'],
    parts: [
      { label: 'Part 01', quality: '720p', size: '500MB', url: '#' },
      { label: 'Part 02', quality: '720p', size: '500MB', url: '#' },
      { label: 'Full Movie', quality: '1080p', size: '1.4GB', url: '#' },
    ],
    video: { embed: IA + 'night-of-the-living-dead-1968-hd', note: 'Demo video — apnar asol video link ekhane boshaben' },
    poster: 'assets/img/posters/dhaka-nights.svg',
    backdrop: 'assets/img/backdrops/dhaka-nights.svg',
  },

  {
    id: 'operation-sundarban',
    title: 'Operation Sundarban',
    titleBn: 'অপারেশন সুন্দরবন',
    year: 2024, genres: ['Action', 'Adventure'],
    quality: '720p', size: '850MB', runtime: '2h 05m', language: 'Bangla',
    rating: 7.5, views: 15230, date: '2025-10-20', featured: true,
    synopsis: 'Sundarban-er bakkhali dakatdhoroner biruddhe ekjon forester-er team ekta risky mission-e jay. Nature-er obhijogta o manusher lobher sangram cholche.',
    cast: ['Siam Ahmed', 'Pori Moni', 'ABM Sumon'],
    parts: [
      { label: 'Part 01', quality: '480p', size: '300MB', url: '#' },
      { label: 'Part 02', quality: '480p', size: '300MB', url: '#' },
      { label: 'Full Movie', quality: '720p', size: '850MB', url: '#' },
    ],
    video: { embed: IA + 'BigBuckBunnyFULLHD60FPS', note: 'Demo video — apnar asol video link ekhane boshaben' },
    poster: 'assets/img/posters/operation-sundarban.svg',
    backdrop: 'assets/img/backdrops/operation-sundarban.svg',
  },

  {
    id: 'chandni-chowk-chronicles',
    title: 'Chandni Chowk Chronicles',
    titleBn: 'চাঁদনী চক ক্রনিকলস',
    year: 2025, genres: ['Drama', 'Romance'],
    quality: '720p', size: '700MB', runtime: '2h 31m', language: 'Hindi',
    rating: 7.2, views: 7640, date: '2025-10-15', featured: false,
    synopsis: 'Puran Delhi-r ekta chhoto gali-te dui poribar-er teen generation-er kahini — bhalobasha, birodh o ekta purono hotel-er future niye.',
    cast: ['Randeep Hooda', 'Tabu', 'Vicky Kaushal'],
    parts: [
      { label: 'Part 01', quality: '480p', size: '300MB', url: '#' },
      { label: 'Part 02', quality: '480p', size: '300MB', url: '#' },
      { label: 'Full Movie', quality: '720p', size: '700MB', url: '#' },
    ],
    video: { embed: IA + 'TheGeneral720p1926', note: 'Demo video — apnar asol video link ekhane boshaben' },
    poster: 'assets/img/posters/chandni-chowk-chronicles.svg',
    backdrop: 'assets/img/backdrops/chandni-chowk-chronicles.svg',
  },

  {
    id: 'the-last-paddle',
    title: 'The Last Paddle',
    titleBn: 'দ্যা লাস্ট প্যাডল',
    year: 2025, genres: ['Sports', 'Drama'],
    quality: '1080p', size: '1.2GB', runtime: '2h 08m', language: 'Bangla',
    rating: 8.4, views: 5410, date: '2025-10-10', featured: false,
    synopsis: 'Ekjon retiring rowing coach ek last team niye national championship-e participate kore. Unar chele chhara onno keu nai — kintu chele bap-er podium-e phire ashte chay na.',
    cast: ['Ferdous Ahmed', 'Jaya Ahsan', 'Rawnak Hasan'],
    parts: [
      { label: 'Full Movie', quality: '1080p', size: '1.2GB', url: '#' },
    ],
    video: { embed: IA + 'CosmosLaundromatFirstCycle', note: 'Demo video — apnar asol video link ekhane boshaben' },
    poster: 'assets/img/posters/the-last-paddle.svg',
    backdrop: 'assets/img/backdrops/the-last-paddle.svg',
  },

  {
    id: 'bengaluru-express',
    title: 'Bengaluru Express',
    titleBn: 'বেঙ্গালুরু এক্সপ্রেস',
    year: 2024, genres: ['Thriller'],
    quality: '720p', size: '690MB', runtime: '1h 58m', language: 'Hindi',
    rating: 6.9, views: 11200, date: '2025-10-05', featured: false,
    synopsis: 'Ek raate Bengaluru te dhukcha ek express train. Compartment-e ekjon stranger, ekta missing bag, ar 40 minute-er moddhe sotti kotha ber korte hobe.',
    cast: ['Rakul Preet Singh', 'Amit Sadh'],
    parts: [
      { label: 'Part 01', quality: '480p', size: '300MB', url: '#' },
      { label: 'Full Movie', quality: '720p', size: '690MB', url: '#' },
    ],
    video: { embed: IA + 'sintel_202207', note: 'Demo video — apnar asol video link ekhane boshaben' },
    poster: 'assets/img/posters/bengaluru-express.svg',
    backdrop: 'assets/img/backdrops/bengaluru-express.svg',
  },

  {
    id: 'meghna-racer',
    title: 'Meghna Racer',
    titleBn: 'মেঘনা রেসার',
    year: 2025, genres: ['Action'],
    quality: '720p', size: '640MB', runtime: '2h 02m', language: 'Bangla',
    rating: 6.5, views: 8930, date: '2025-09-30', featured: false,
    synopsis: 'Dhaka-r road-e ekjon street racer ek illegal racing gang-er dodultey atke pore — ar tader leader tar purono bondhuta.',
    cast: ['Sajol', 'Sabila Nur', 'Ziaul Roshan'],
    parts: [
      { label: 'Part 01', quality: '480p', size: '300MB', url: '#' },
      { label: 'Full Movie', quality: '720p', size: '640MB', url: '#' },
    ],
    video: { embed: IA + 'ElephantsDream_628', note: 'Demo video — apnar asol video link ekhane boshaben' },
    poster: 'assets/img/posters/meghna-racer.svg',
    backdrop: 'assets/img/backdrops/meghna-racer.svg',
  },

  {
    id: 'shadow-of-padma',
    title: 'Shadow of Padma',
    titleBn: 'শ্যাডো অফ পদ্মা',
    year: 2024, genres: ['Mystery', 'Thriller'],
    quality: '720p', size: '760MB', runtime: '2h 18m', language: 'Bangla',
    rating: 7.9, views: 13450, date: '2025-09-25', featured: false,
    synopsis: 'Padma nodir kinare ekta chhoto gram-e 30 bochorer purono ekta gopon rog bair hoy. Ekjon notun doctor secret guli khule dey.',
    cast: ['Azmeri Haque Badhon', 'Nasir Uddin Khan'],
    parts: [
      { label: 'Part 01', quality: '480p', size: '300MB', url: '#' },
      { label: 'Part 02', quality: '480p', size: '300MB', url: '#' },
      { label: 'Full Movie', quality: '720p', size: '760MB', url: '#' },
    ],
    video: { embed: IA + 'CarnivalOfSouls_201508', note: 'Demo video — apnar asol video link ekhane boshaben' },
    poster: 'assets/img/posters/shadow-of-padma.svg',
    backdrop: 'assets/img/backdrops/shadow-of-padma.svg',
  },

  {
    id: 'karate-master-bhai',
    title: 'Karate Master Bhai',
    titleBn: 'কারাতে মাস্টার ভাই',
    year: 2025, genres: ['Comedy', 'Action'],
    quality: '720p', size: '720MB', runtime: '2h 10m', language: 'Bangla',
    rating: 7.0, views: 6210, date: '2025-09-20', featured: false,
    synopsis: 'Ekjon chhoto chele karate shikhte chay, ar tar coach ekjon fully unqualified "master" — comedy-er ekta nosto journey shuru.',
    cast: ['Bappy Chowdhury', 'Shobnom Bubly'],
    parts: [
      { label: 'Full Movie', quality: '720p', size: '720MB', url: '#' },
    ],
    video: { embed: IA + 'agent327operationbarbershop', note: 'Demo video — apnar asol video link ekhane boshaben' },
    poster: 'assets/img/posters/karate-master-bhai.svg',
    backdrop: 'assets/img/backdrops/karate-master-bhai.svg',
  },

  {
    id: 'love-in-coxs-bazar',
    title: "Love in Cox's Bazar",
    titleBn: 'লাভ ইন কক্সবাজার',
    year: 2025, genres: ['Romance', 'Drama'],
    quality: '1080p', size: '1.1GB', runtime: '2h 25m', language: 'Bangla',
    rating: 7.4, views: 9870, date: '2025-09-15', featured: false,
    synopsis: 'Somudrer kinare ek raate dui notun — ekta purono prem-er kahini notun kore likhe jay. Kintu probal dhoroner onno keu o ache samudrer kachakachi.',
    cast: ['Tawsif Mahbub', 'Saberi Alam', 'Mishu Sabbir'],
    parts: [
      { label: 'Part 01', quality: '720p', size: '500MB', url: '#' },
      { label: 'Full Movie', quality: '1080p', size: '1.1GB', url: '#' },
    ],
    video: { embed: IA + 'springopenmovie', note: 'Demo video — apnar asol video link ekhane boshaben' },
    poster: 'assets/img/posters/love-in-coxs-bazar.svg',
    backdrop: 'assets/img/backdrops/love-in-coxs-bazar.svg',
  },

  {
    id: 'the-mumbai-heist',
    title: 'The Mumbai Heist',
    titleBn: 'দ্য মুম্বাই হেইস্ট',
    year: 2024, genres: ['Crime', 'Thriller'],
    quality: '720p', size: '810MB', runtime: '2h 12m', language: 'Hindi',
    rating: 8.0, views: 16870, date: '2025-09-10', featured: false,
    synopsis: 'Char outsider ek jewellery heist plan kore Mumbai-te. Sob thik cholche jotokkhon na ekjon nijer chinte parche.',
    cast: ['Abhishek Bachchan', 'Fatima Sana Shaikh', 'Vijay Sethupathi'],
    parts: [
      { label: 'Part 01', quality: '480p', size: '300MB', url: '#' },
      { label: 'Part 02', quality: '480p', size: '300MB', url: '#' },
      { label: 'Full Movie', quality: '720p', size: '810MB', url: '#' },
    ],
    video: { embed: IA + 'Tears-of-Steel', note: 'Demo video — apnar asol video link ekhane boshaben' },
    poster: 'assets/img/posters/the-mumbai-heist.svg',
    backdrop: 'assets/img/backdrops/the-mumbai-heist.svg',
  },

  {
    id: 'aguner-gaan',
    title: 'Aguner Gaan',
    titleBn: 'আগুনের গান',
    year: 2025, genres: ['Drama', 'Music'],
    quality: '720p', size: '680MB', runtime: '2h 30m', language: 'Bangla',
    rating: 8.2, views: 4320, date: '2025-09-05', featured: false,
    synopsis: '1971-er ekta gram-e ekjon gaan-er guru o tar chele-der kahini. Gaan-i ekta generation-er mukti sangramer kotha bole.',
    cast: ['Raisul Islam Asad', 'Bidya Sinha Saha Mim'],
    parts: [
      { label: 'Full Movie', quality: '720p', size: '680MB', url: '#' },
    ],
    video: { embed: IA + 'sintel_202207', note: 'Demo video — apnar asol video link ekhane boshaben' },
    poster: 'assets/img/posters/aguner-gaan.svg',
    backdrop: 'assets/img/backdrops/aguner-gaan.svg',
  },

  {
    id: 'cyber-dhaka',
    title: 'Cyber Dhaka',
    titleBn: 'সাইবার ঢাকা',
    year: 2025, genres: ['Sci-Fi', 'Thriller'],
    quality: '1080p', size: '1.5GB', runtime: '2h 06m', language: 'Bangla',
    rating: 7.6, views: 7210, date: '2025-08-30', featured: false,
    synopsis: '2030-er Dhaka — ekta AI traffic system nijei city control korche. Ekjon young hacker bojhe pelen system manush der biruddhe jugeche.',
    cast: ['Afran Nisho', 'Tanjin Tisha'],
    parts: [
      { label: 'Part 01', quality: '720p', size: '500MB', url: '#' },
      { label: 'Part 02', quality: '720p', size: '500MB', url: '#' },
      { label: 'Full Movie', quality: '1080p', size: '1.5GB', url: '#' },
    ],
    video: { embed: IA + 'ElephantsDream_628', note: 'Demo video — apnar asol video link ekhane boshaben' },
    poster: 'assets/img/posters/cyber-dhaka.svg',
    backdrop: 'assets/img/backdrops/cyber-dhaka.svg',
  },

  {
    id: 'jungle-manush',
    title: 'Jungle Manush',
    titleBn: 'জঙ্গল মানুষ',
    year: 2024, genres: ['Adventure', 'Horror'],
    quality: '720p', size: '730MB', runtime: '1h 52m', language: 'Bangla',
    rating: 6.8, views: 10540, date: '2025-08-25', featured: false,
    synopsis: 'Chittagong hill tract-er ekta remote area-te documentary team atke pore — ar sekhane rat-e ki achhe seta keu bhabte pare nai.',
    cast: ['Shamol Mawla', 'Sanzana Mim'],
    parts: [
      { label: 'Part 01', quality: '480p', size: '300MB', url: '#' },
      { label: 'Full Movie', quality: '720p', size: '730MB', url: '#' },
    ],
    video: { embed: IA + 'night-of-the-living-dead-1968-hd', note: 'Demo video — apnar asol video link ekhane boshaben' },
    poster: 'assets/img/posters/jungle-manush.svg',
    backdrop: 'assets/img/backdrops/jungle-manush.svg',
  },

  {
    id: 'silent-storm',
    title: 'Silent Storm',
    titleBn: 'সাইলেন্ট স্টর্ম',
    year: 2025, genres: ['Action', 'War'],
    quality: '1080p', size: '1.3GB', runtime: '2h 20m', language: 'English',
    rating: 7.7, views: 6120, date: '2025-08-20', featured: false,
    synopsis: 'Ekta special ops team ek storm-er majhe ek hostage rescue korte jay — kintu communication nai, backup nai, shudhu 90 minute.',
    cast: ['Action ensemble cast'],
    parts: [
      { label: 'Part 01', quality: '720p', size: '500MB', url: '#' },
      { label: 'Full Movie', quality: '1080p', size: '1.3GB', url: '#' },
    ],
    video: { embed: IA + 'agent327operationbarbershop', note: 'Demo video — apnar asol video link ekhane boshaben' },
    poster: 'assets/img/posters/silent-storm.svg',
    backdrop: 'assets/img/backdrops/silent-storm.svg',
  },

  {
    id: 'teen-teen-chatti',
    title: 'Teen Teen Chatti',
    titleBn: 'তিন তিন চাট্টি',
    year: 2025, genres: ['Comedy', 'Family'],
    quality: '720p', size: '660MB', runtime: '2h 00m', language: 'Bangla',
    rating: 7.1, views: 5230, date: '2025-08-15', featured: false,
    synopsis: 'Ekta joint family-e tin meye-ar biye niye ekta hilarious rush. Baba-ma keu ki kinben seta jiggesha kore na...',
    cast: ['Family comedy ensemble'],
    parts: [
      { label: 'Full Movie', quality: '720p', size: '660MB', url: '#' },
    ],
    video: { embed: IA + 'BigBuckBunnyFULLHD60FPS', note: 'Demo video — apnar asol video link ekhane boshaben' },
    poster: 'assets/img/posters/teen-teen-chatti.svg',
    backdrop: 'assets/img/backdrops/teen-teen-chatti.svg',
  },

  {
    id: 'kolkata-underground',
    title: 'Kolkata Underground',
    titleBn: 'কলকাতা আন্ডারগ্রাউন্ড',
    year: 2024, genres: ['Crime', 'Drama'],
    quality: '720p', size: '790MB', runtime: '2h 16m', language: 'Bengali',
    rating: 7.3, views: 8910, date: '2025-08-10', featured: false,
    synopsis: 'Kolkata-r metro rail construction-er niche purono ek tunnel ber hoy — ar tate ache 50 bochorer ekta gopon kahini.',
    cast: ['Parambrata Chatterjee', 'Koel Mallick'],
    parts: [
      { label: 'Part 01', quality: '480p', size: '300MB', url: '#' },
      { label: 'Part 02', quality: '480p', size: '300MB', url: '#' },
      { label: 'Full Movie', quality: '720p', size: '790MB', url: '#' },
    ],
    video: { embed: IA + 'CarnivalOfSouls_201508', note: 'Demo video — apnar asol video link ekhane boshaben' },
    poster: 'assets/img/posters/kolkata-underground.svg',
    backdrop: 'assets/img/backdrops/kolkata-underground.svg',
  },

  {
    id: 'bishwanath-the-warrior',
    title: 'Bishwanath: The Warrior',
    titleBn: 'বিশ্বনাথ: দ্য ওয়ারিয়র',
    year: 2025, genres: ['Action', 'History'],
    quality: '1080p', size: '1.6GB', runtime: '2h 35m', language: 'Bangla',
    rating: 8.3, views: 14320, date: '2025-08-05', featured: false,
    synopsis: '17th century-er Bengal-e ekjon ordinary kishan ek warrior hoy uthon — British East India Company-r biruddhe ekta lorai shuru hoy.',
    cast: ['Shakib Khan', 'Nusraat Faria'],
    parts: [
      { label: 'Part 01', quality: '720p', size: '500MB', url: '#' },
      { label: 'Part 02', quality: '720p', size: '500MB', url: '#' },
      { label: 'Full Movie', quality: '1080p', size: '1.6GB', url: '#' },
    ],
    video: { embed: IA + 'TheGeneral720p1926', note: 'Demo video — apnar asol video link ekhane boshaben' },
    poster: 'assets/img/posters/bishwanath-the-warrior.svg',
    backdrop: 'assets/img/backdrops/bishwanath-the-warrior.svg',
  },

  {
    id: 'monsoon-wedding-crashers',
    title: 'Monsoon Wedding Crashers',
    titleBn: 'মনসুন ওয়েডিং ক্র্যাসার্স',
    year: 2025, genres: ['Comedy', 'Romance'],
    quality: '720p', size: '710MB', runtime: '2h 08m', language: 'Bangla',
    rating: 6.6, views: 4610, date: '2025-07-30', featured: false,
    synopsis: 'Borsha kale dui bondhu ek biye-te jay kintu vul-e onno biye-te chole jay. Chaos, bhul-biswas ar ekta asol bhalobasha.',
    cast: ['Ziaul Hoque Polash', 'Sums Karlosi'],
    parts: [
      { label: 'Full Movie', quality: '720p', size: '710MB', url: '#' },
    ],
    video: { embed: IA + 'CosmosLaundromatFirstCycle', note: 'Demo video — apnar asol video link ekhane boshaben' },
    poster: 'assets/img/posters/monsoon-wedding-crashers.svg',
    backdrop: 'assets/img/backdrops/monsoon-wedding-crashers.svg',
  },

  {
    id: 'final-mission-delta',
    title: 'Final Mission: Delta',
    titleBn: 'ফাইনাল মিশন: ডেল্টা',
    year: 2025, genres: ['Action', 'Spy'],
    quality: '1080p', size: '1.45GB', runtime: '2h 18m', language: 'Hindi',
    rating: 7.9, views: 11230, date: '2025-07-25', featured: false,
    synopsis: 'Ekjon retired agent tar chele-er bikash hoye jawa ek spy network rokhte last mission-e fire jay. Time kom, bishwas aro kom.',
    cast: ['Spy thriller ensemble'],
    parts: [
      { label: 'Part 01', quality: '720p', size: '500MB', url: '#' },
      { label: 'Part 02', quality: '720p', size: '500MB', url: '#' },
      { label: 'Full Movie', quality: '1080p', size: '1.45GB', url: '#' },
    ],
    video: { embed: IA + 'nosferatu-1922', note: 'Demo video — apnar asol video link ekhane boshaben' },
    poster: 'assets/img/posters/final-mission-delta.svg',
    backdrop: 'assets/img/backdrops/final-mission-delta.svg',
  },

  /* ============ REAL FREE MOVIES — asol video, legally free (PD / CC) ======== */
  {
    id: 'night-of-the-living-dead',
    title: 'Night of the Living Dead',
    titleBn: 'নাইট অফ দ্য লিভিং ডেড',
    year: 1968, genres: ['Horror', 'Classic'],
    quality: '1080p', size: '1.0GB', runtime: '1h 36m', language: 'English',
    rating: 7.8, views: 26978, date: '2025-07-20', featured: true, free: true,
    license: 'Public Domain (US)',
    synopsis: 'George A. Romero-r zombie classic. Ekta rural farmhouse-e atke pore satta stranger, ar baire relentless zombie horde. Ekhon obdi sob theke influential horror film.',
    cast: ['Duane Jones', 'Judith O\'Dea', 'Karl Hardman'],
    parts: [
      { label: 'Watch Online', quality: '1080p', size: 'Stream', url: 'https://archive.org/details/night-of-the-living-dead-1968-hd' },
      { label: 'Download (Archive.org)', quality: 'H.264', size: '1.0GB', url: 'https://archive.org/details/night-of-the-living-dead-1968-hd' },
    ],
    video: { embed: IA + 'night-of-the-living-dead-1968-hd', note: 'Internet Archive — Public Domain' },
    poster: 'assets/img/posters/night-of-the-living-dead.svg',
    backdrop: 'assets/img/backdrops/night-of-the-living-dead.svg',
  },

  {
    id: 'nosferatu',
    title: 'Nosferatu',
    titleBn: 'নসফেরাটু',
    year: 1922, genres: ['Horror', 'Classic'],
    quality: '720p', size: '1.4GB', runtime: '1h 34m', language: 'Silent',
    rating: 7.9, views: 2380, date: '2025-07-18', featured: false, free: true,
    license: 'Public Domain (1922)',
    synopsis: 'F.W. Murnau-r unauthorized Dracula adaptation — Count Orlok. Silent era-r sob theke bhayabah vampire film, german expressionism-r masterpiece.',
    cast: ['Max Schreck', 'Gustav von Wangenheim', 'Greta Schroder'],
    parts: [
      { label: 'Watch Online', quality: '720p', size: 'Stream', url: 'https://archive.org/details/nosferatu-1922' },
      { label: 'Download (Archive.org)', quality: 'MPEG4', size: '1.4GB', url: 'https://archive.org/details/nosferatu-1922' },
    ],
    video: { embed: IA + 'nosferatu-1922', note: 'Internet Archive — Public Domain' },
    poster: 'assets/img/posters/nosferatu.svg',
    backdrop: 'assets/img/backdrops/nosferatu.svg',
  },

  {
    id: 'carnival-of-souls',
    title: 'Carnival of Souls',
    titleBn: 'কার্নিভাল অফ সোলস',
    year: 1962, genres: ['Horror', 'Classic'],
    quality: '720p', size: '1.2GB', runtime: '1h 23m', language: 'English',
    rating: 7.1, views: 5843, date: '2025-07-16', featured: false, free: true,
    license: 'Public Domain (US)',
    synopsis: 'Ekta car accident-er por ekjon organist ghore ghore ek abandoned pavilion-te akorshon pay — ar ekta ghorhbhod manush. Cult psychological horror.',
    cast: ['Candace Hilligoss', 'Frances Feist', 'Sidney Berger'],
    parts: [
      { label: 'Watch Online', quality: '720p', size: 'Stream', url: 'https://archive.org/details/CarnivalOfSouls_201508' },
      { label: 'Download (Archive.org)', quality: 'MPEG4', size: '1.2GB', url: 'https://archive.org/details/CarnivalOfSouls_201508' },
    ],
    video: { embed: IA + 'CarnivalOfSouls_201508', note: 'Internet Archive — Public Domain' },
    poster: 'assets/img/posters/carnival-of-souls.svg',
    backdrop: 'assets/img/backdrops/carnival-of-souls.svg',
  },

  {
    id: 'the-general',
    title: 'The General',
    titleBn: 'দ্য জেনারেল',
    year: 1926, genres: ['Comedy', 'Classic'],
    quality: '720p', size: '1.4GB', runtime: '1h 47m', language: 'Silent',
    rating: 8.1, views: 24176, date: '2025-07-14', featured: false, free: true,
    license: 'Public Domain (US)',
    synopsis: 'Buster Keaton-r silent masterpiece — Union spies tar locomotive churi kore dey, ar se nijei dodultey jay enemy line-er moddhe. Film history-r sob theke bhalo chase scene.',
    cast: ['Buster Keaton', 'Marion Mack', 'Glen Cavender'],
    parts: [
      { label: 'Watch Online', quality: '720p', size: 'Stream', url: 'https://archive.org/details/TheGeneral720p1926' },
      { label: 'Download (Archive.org)', quality: 'MPEG4', size: '1.4GB', url: 'https://archive.org/details/TheGeneral720p1926' },
    ],
    video: { embed: IA + 'TheGeneral720p1926', note: 'Internet Archive — Public Domain' },
    poster: 'assets/img/posters/the-general.svg',
    backdrop: 'assets/img/backdrops/the-general.svg',
  },

  {
    id: 'big-buck-bunny',
    title: 'Big Buck Bunny',
    titleBn: 'বিগ বাক বানি',
    year: 2008, genres: ['Animation', 'Comedy'],
    quality: '1080p', size: '373MB', runtime: '10m', language: 'English',
    rating: 7.4, views: 18920, date: '2025-07-12', featured: true, free: true,
    license: 'CC BY 3.0 — Blender Foundation',
    synopsis: 'Blender Foundation-r prothom open movie. Ekta boro, dayalu khorgo-er sath teen chhoto rodent-er shoytanperi kore — animated revenge comedy.',
    cast: ['Blender Animation Studio'],
    parts: [
      { label: 'Watch Online', quality: '1080p', size: 'Stream', url: 'https://archive.org/details/BigBuckBunnyFULLHD60FPS' },
      { label: 'Download (Archive.org)', quality: 'MPEG4', size: '373MB', url: 'https://archive.org/details/BigBuckBunnyFULLHD60FPS' },
    ],
    video: { embed: IA + 'BigBuckBunnyFULLHD60FPS', note: 'Blender Foundation — CC BY 3.0' },
    poster: 'assets/img/posters/big-buck-bunny.svg',
    backdrop: 'assets/img/backdrops/big-buck-bunny.svg',
  },

  {
    id: 'sintel',
    title: 'Sintel',
    titleBn: 'সিন্টেল',
    year: 2010, genres: ['Animation', 'Fantasy'],
    quality: '1080p', size: '1.2GB', runtime: '15m', language: 'English',
    rating: 8.0, views: 15640, date: '2025-07-10', featured: false, free: true,
    license: 'CC BY-ND — Blender Foundation',
    synopsis: 'Anime-style fantasy short — ekjon chhele Sintel nijer pet dragon Scales khuje beriye jay. Visually stunning, emotionally powerful open movie.',
    cast: ['Blender Animation Studio'],
    parts: [
      { label: 'Watch Online', quality: '1080p', size: 'Stream', url: 'https://archive.org/details/sintel_202207' },
      { label: 'Download (Archive.org)', quality: 'H.264', size: '1.2GB', url: 'https://archive.org/details/sintel_202207' },
    ],
    video: { embed: IA + 'sintel_202207', note: 'Blender Foundation — CC BY-ND' },
    poster: 'assets/img/posters/sintel.svg',
    backdrop: 'assets/img/backdrops/sintel.svg',
  },

  {
    id: 'tears-of-steel',
    title: 'Tears of Steel',
    titleBn: 'টিয়ার্স অফ স্টিল',
    year: 2012, genres: ['Sci-Fi', 'Action'],
    quality: '1080p', size: '3.2GB', runtime: '12m', language: 'English',
    rating: 7.3, views: 9870, date: '2025-07-08', featured: false, free: true,
    license: 'CC BY 3.0 — Blender Foundation',
    synopsis: 'Amsterdam-r ekta sci-fi short — robots vs manush. Blender Foundation VFX pipeline test korar jonno banano, pura open-source tool diye.',
    cast: ['Derek de Lint', 'Sergio Hasselbaink', 'Rogier Schippers'],
    parts: [
      { label: 'Watch Online', quality: '1080p', size: 'Stream', url: 'https://archive.org/details/Tears-of-Steel' },
      { label: 'Download (Archive.org)', quality: 'MKV', size: '3.2GB', url: 'https://archive.org/details/Tears-of-Steel' },
    ],
    video: { embed: IA + 'Tears-of-Steel', note: 'Blender Foundation — CC BY 3.0' },
    poster: 'assets/img/posters/tears-of-steel.svg',
    backdrop: 'assets/img/backdrops/tears-of-steel.svg',
  },

  {
    id: 'cosmos-laundromat',
    title: 'Cosmos Laundromat: First Cycle',
    titleBn: 'কসমস লন্ড্রোম্যাট',
    year: 2015, genres: ['Animation', 'Comedy'],
    quality: '1080p', size: '264MB', runtime: '12m', language: 'English',
    rating: 7.2, views: 4320, date: '2025-07-06', featured: false, free: true,
    license: 'CC BY 4.0 — Blender Foundation',
    synopsis: 'Suicidal sheep Franck ekta quirky salesman-er kach theke "lifetime" gift ney — infinite life-er dark comedy. Blender open movie.',
    cast: ['Blender Animation Studio'],
    parts: [
      { label: 'Watch Online', quality: '1080p', size: 'Stream', url: 'https://archive.org/details/CosmosLaundromatFirstCycle' },
      { label: 'Download (Archive.org)', quality: 'MPEG4', size: '264MB', url: 'https://archive.org/details/CosmosLaundromatFirstCycle' },
    ],
    video: { embed: IA + 'CosmosLaundromatFirstCycle', note: 'Blender Foundation — CC BY 4.0' },
    poster: 'assets/img/posters/cosmos-laundromat.svg',
    backdrop: 'assets/img/backdrops/cosmos-laundromat.svg',
  },

  {
    id: 'agent-327',
    title: 'Agent 327: Operation Barbershop',
    titleBn: 'এজেন্ট ৩২৭',
    year: 2017, genres: ['Animation', 'Spy'],
    quality: '1080p', size: '233MB', runtime: '4m', language: 'English',
    rating: 7.6, views: 7650, date: '2025-07-04', featured: false, free: true,
    license: 'CC BY-ND — Blender Animation Studio',
    synopsis: 'Dutch comic-based spy animation — Agent 327 ekta shady barbershop-er clue investigate kore, kintu mercenary Boris Kloris tar pechone. Anime/comic style action.',
    cast: ['Blender Animation Studio'],
    parts: [
      { label: 'Watch Online', quality: '1080p', size: 'Stream', url: 'https://archive.org/details/agent327operationbarbershop' },
      { label: 'Download (Archive.org)', quality: 'MPEG4', size: '233MB', url: 'https://archive.org/details/agent327operationbarbershop' },
    ],
    video: { embed: IA + 'agent327operationbarbershop', note: 'Blender Animation Studio — CC BY-ND' },
    poster: 'assets/img/posters/agent-327.svg',
    backdrop: 'assets/img/backdrops/agent-327.svg',
  },

  {
    id: 'elephants-dream',
    title: 'Elephants Dream',
    titleBn: 'এলিফ্যান্টস ড্রিম',
    year: 2006, genres: ['Animation', 'Sci-Fi'],
    quality: '720p', size: '264MB', runtime: '11m', language: 'English',
    rating: 6.9, views: 5820, date: '2025-07-02', featured: false, free: true,
    license: 'CC BY 2.5 — Blender Foundation',
    synopsis: 'Prothom Blender open movie — dujo strange character Proog ar Emo ekta capricious infinite machine explore kore. Surreal sci-fi animation.',
    cast: ['Blender Animation Studio'],
    parts: [
      { label: 'Watch Online', quality: '720p', size: 'Stream', url: 'https://archive.org/details/ElephantsDream_628' },
      { label: 'Download (Archive.org)', quality: 'MPEG4', size: '264MB', url: 'https://archive.org/details/ElephantsDream_628' },
    ],
    video: { embed: IA + 'ElephantsDream_628', note: 'Blender Foundation — CC BY 2.5' },
    poster: 'assets/img/posters/elephants-dream.svg',
    backdrop: 'assets/img/backdrops/elephants-dream.svg',
  },

  {
    id: 'spring',
    title: 'Spring',
    titleBn: 'স্প্রিং',
    year: 2019, genres: ['Animation', 'Fantasy'],
    quality: '1080p', size: '173MB', runtime: '8m', language: 'Silent',
    rating: 7.5, views: 5402, date: '2025-06-30', featured: false, free: true,
    license: 'CC BY 4.0 — Blender Animation Studio',
    synopsis: 'Anime-style poetic short — ekjon shepherd girl ar tar dog purono spirits-er biruddhe life cycle chalate jay. Germany-r mountain inspiration.',
    cast: ['Blender Animation Studio'],
    parts: [
      { label: 'Watch Online', quality: '1080p', size: 'Stream', url: 'https://archive.org/details/springopenmovie' },
      { label: 'Download (Archive.org)', quality: 'MPEG4', size: '173MB', url: 'https://archive.org/details/springopenmovie' },
    ],
    video: { embed: IA + 'springopenmovie', note: 'Blender Animation Studio — CC BY 4.0' },
    poster: 'assets/img/posters/spring.svg',
    backdrop: 'assets/img/backdrops/spring.svg',
  },
];
