const truths = [
  {
    title: "Jehovah Is the Only True God",
    icon: "fas fa-book-open",
    summary: "Jehovah is the sole true God, His name appearing over 7,000 times in Scripture, declaring His supremacy. Jesus, His created Son, is subordinate, as shown when he prayed to Jehovah (John 17:1-3). The Trinity, rooted in Babylonian triads, misleads people into idolatry, like Israel’s worship of Baal (2 Kings 17:16). True worshipers honor Jehovah alone, studying His Word to align with His truth. This ensures His approval and eternal life under His Kingdom, while false doctrines lead to spiritual ruin and divine disapproval.",
    scriptures: [
      { text: "You, whose name is Jehovah, you alone are the Most High over all the earth.", reference: "Psalm 83:18", tooltip: "Jehovah’s name distinguishes Him." },
      { text: "The Father is greater than I am.", reference: "John 14:28", tooltip: "Jesus acknowledges Jehovah’s superiority." }
    ]
  },
  {
    title: "Worship Must Be Pure",
    icon: "fas fa-id-card-alt",
    summary: "Jehovah demands worship free from human traditions, rooted in His Word. Rituals like rosaries or incense, absent from Scripture, echo Canaanite practices (Judges 2:13). True worshipers obey biblical commands, as Daniel did despite opposition (Daniel 6:10). False religions promote emotional rituals, misleading followers into empty practices, like the Pharisees’ traditions (Mark 7:7-8). Pure worship involves heartfelt obedience, ensuring Jehovah’s approval. By rejecting pagan customs, true worshipers gain hope for eternal life, while false worship leads to spiritual ruin and divine judgment.",
    scriptures: [
      { text: "True worshipers will worship the Father with spirit and truth.", reference: "John 4:23", tooltip: "Worship requires truth." },
      { text: "They worship me in vain, for they teach commands of men as doctrines.", reference: "Matthew 15:9", tooltip: "Human traditions void worship." }
    ]
  },
  {
    title: "Jesus Died on a Stake",
    icon: "fas fa-hammer",
    summary: "Jesus died on an upright stake, called <em>stauros</em> in Greek, not a cross, a pagan symbol tied to sun worship. Israel’s use of pagan altars led to judgment (1 Kings 12:28-30). Jehovah forbids images in worship, demanding purity. False teachings promote the cross, misleading people into idolatry, unlike early Christians who rejected symbols (Acts 15:29). True worshipers honor Jesus’ sacrifice scripturally, ensuring Jehovah’s approval. Paul focused on Christ’s death, not symbols (1 Corinthians 2:2). False worship defiles devotion, leading to spiritual ruin, while pure worship aligns with Jehovah’s will.",
    scriptures: [
      { text: "He carried the torture stake himself.", reference: "John 19:17", tooltip: "Greek term stauros means stake." },
      { text: "You must not make for yourself a carved image.", reference: "Exodus 20:4", tooltip: "Images are forbidden in worship." }
    ]
  },
  {
    title: "Hellfire Is a Myth",
    icon: "fas fa-fire-alt",
    summary: "The dead are unconscious, awaiting resurrection, not burning in hellfire, as Ecclesiastes teaches (Ecclesiastes 9:5). Jehovah, a God of love, never intended torment, as burning “had not come into His heart” (Jeremiah 7:31). Jonah’s story shows His mercy (Jonah 3:10). False religions use the pagan hellfire myth to instill fear, misleading followers, like the Pharisees’ false teachings (Matthew 23:15). True worshipers trust in Jehovah’s resurrection promise, ensuring acceptable worship. This hope offers eternal life on earth, while false doctrines defile worship, leading to spiritual ruin and divine disapproval.",
    scriptures: [
      { text: "To burn their sons and daughters in the fire, something I had not commanded and that had not come into my heart.", reference: "Jeremiah 7:31", tooltip: "Jehovah rejects burning." },
      { text: "The dead know nothing at all.", reference: "Ecclesiastes 9:5", tooltip: "The dead are unconscious." }
    ]
  },
  {
    title: "God’s Kingdom Rules",
    icon: "fas fa-globe",
    summary: "Jehovah’s Kingdom, with Jesus as King since 1914, is a real government that will transform earth into a paradise. Daniel’s prophecy confirms its permanence (Daniel 2:44). Jesus taught to pray for it (Matthew 6:10). False teachings call it symbolic, like Israel’s trust in Egypt (Isaiah 31:1), misleading people to cling to human systems. True worshipers dedicate their lives to the Kingdom, ensuring Jehovah’s approval. This faith offers eternal life, while false hopes lead to spiritual ruin and divine judgment, as they defy Jehovah’s purpose.",
    scriptures: [
      { text: "In the days of those kings the God of heaven will set up a kingdom that will never be destroyed.", reference: "Daniel 2:44", tooltip: "A divine government." },
      { text: "Let your Kingdom come.", reference: "Matthew 6:10", tooltip: "Prioritize the Kingdom." }
    ]
  },
  {
    title: "144,000 Rule in Heaven",
    icon: "fas fa-cloud",
    summary: "Only 144,000 faithful ones will rule with Christ in heaven, while most will live on earth (Revelation 14:1). Jesus promised the meek an earthly inheritance (Matthew 5:5). False religions claim all go to heaven, like Israel’s false gods (Jeremiah 2:11), misleading followers. Abraham looked to an earthly hope (Hebrews 11:10). True worshipers honor Jehovah’s plan, ensuring His approval. This distinction aligns with His purpose, offering eternal life on earth, while false teachings lead to spiritual ruin and divine disapproval.",
    scriptures: [
      { text: "I saw, and look! the Lamb standing on Mount Zion, and with him 144,000.", reference: "Revelation 14:1", tooltip: "A fixed number." },
      { text: "The meek will inherit the earth.", reference: "Matthew 5:5", tooltip: "Earthly hope for most." }
    ]
  },
  {
    title: "Free Will Shapes Destiny",
    icon: "fas fa-balance-scale",
    summary: "Jehovah grants free will, allowing humans to choose obedience or disobedience. Moses urged choosing life (Deuteronomy 30:19). Joseph resisted temptation (Genesis 39:9), while Adam’s choice led to death (Genesis 3:6). False doctrines like predestination deny accountability, rooted in pagan fatalism, misleading people into apathy, like Israel’s rebellion (Jeremiah 7:13). True worshipers embrace free will, ensuring Jehovah’s approval. This responsibility offers eternal life, while false teachings defile worship, leading to spiritual ruin and divine judgment, as they reject Jehovah’s gift of choice.",
    scriptures: [
      { text: "I have put life and death before you... choose life.", reference: "Deuteronomy 30:19", tooltip: "Choose your path." },
      { text: "Each of us will render an account for himself to God.", reference: "Romans 14:12", tooltip: "Accountability matters." }
    ]
  },
  {
    title: "Blood Is Sacred",
    icon: "fas fa-tint",
    summary: "Blood, representing life, is sacred to Jehovah, who commands abstinence from it (Leviticus 17:11). Early Christians obeyed this despite persecution (Acts 15:29). False religions use blood in rituals or treatments, like Israel’s pagan practices (2 Chronicles 33:6), defiling worship. True worshipers honor Jehovah’s authority, ensuring pure devotion. For example, Noah was instructed to pour out blood (Genesis 9:4). This obedience aligns with Jehovah’s standards, offering eternal life, while false practices lead to spiritual ruin and divine disapproval, as they disrespect His sanctity of life.",
    scriptures: [
      { text: "You must not eat the blood; pour it out on the ground like water.", reference: "Deuteronomy 12:16", tooltip: "Blood is sacred." },
      { text: "Abstain from... blood and from things strangled.", reference: "Acts 15:20", tooltip: "Abstain from blood." }
    ]
  },
  {
    title: "Christians Avoid Worldly Ties",
    icon: "fas fa-handshake-slash",
    summary: "True Christians remain separate from worldly politics and customs, as Jesus rejected worldly power (John 18:36). Daniel refused Babylon’s ways (Daniel 1:8). False religions engage in voting or holidays, like Israel’s alliances (Hosea 7:11), defiling worship. True worshipers prioritize Jehovah’s Kingdom, ensuring His approval. For example, early Christians avoided Roman festivals (1 Corinthians 10:20-21). This neutrality offers eternal life, while worldly ties lead to spiritual ruin and divine disapproval, as they betray exclusive devotion to Jehovah.",
    scriptures: [
      { text: "They are no part of the world, just as I am no part of the world.", reference: "John 17:16", tooltip: "No part of the world." },
      { text: "Friendship with the world is enmity with God.", reference: "James 4:4", tooltip: "Worldly ties oppose God." }
    ]
  },
  {
    title: "Flag Salutes Are Idolatry",
    icon: "fas fa-flag",
    summary: "Saluting flags is idolatry, diverting devotion from Jehovah. Scripture forbids worshiping symbols, as Israel was punished for idols (Judges 10:6). Shadrach, Meshach, and Abednego refused to bow to images (Daniel 3:18). False religions embrace patriotic rituals, misleading followers into idolatry. True worshipers honor only Jehovah’s Kingdom, ensuring pure devotion. This loyalty aligns with His commands, offering eternal life, while flag salutes defile worship, leading to spiritual ruin and divine disapproval, as they prioritize human creations over the Creator.",
    scriptures: [
      { text: "You must not make for yourself a carved image... you must not bow down to them.", reference: "Exodus 20:4, 5", tooltip: "No images in worship." },
      { text: "You must worship God alone.", reference: "Luke 4:8", tooltip: "Worship God alone." }
    ]
  },
  {
    title: "The Soul Is Mortal",
    icon: "fas fa-dove",
    summary: "Humans are mortal souls that die, not immortal spirits (Ezekiel 18:20). Lazarus was called asleep, awaiting resurrection (John 11:11). False teachings of immortal souls, from Greek philosophy, deny Jehovah’s plan, like Israel’s pagan beliefs (Jeremiah 16:11). True worshipers trust in resurrection, ensuring acceptable worship. For example, Martha believed in Lazarus’ resurrection (John 11:24). This hope offers eternal life on earth, while false doctrines lead to spiritual ruin and divine disapproval, as they distort Jehovah’s purpose for humanity.",
    scriptures: [
      { text: "The soul who sins is the one who will die.", reference: "Ezekiel 18:20", tooltip: "The soul dies." },
      { text: "The dead know nothing at all.", reference: "Ecclesiastes 9:5", tooltip: "The dead are unconscious." }
    ]
  },
  {
    title: "Earth Will Be Paradise",
    icon: "fas fa-tree",
    summary: "Jehovah’s purpose is to restore earth as a paradise, as promised in Psalm 37:29. Noah’s family was preserved to inhabit earth (Genesis 9:1). False religions predict a fiery end, misusing 2 Peter 3:7, like Israel’s false prophets (Jeremiah 23:16). True worshipers hope in paradise, ensuring Jehovah’s approval. Abraham trusted in an earthly hope (Hebrews 11:10). This faith offers eternal life, while false teachings lead to spiritual ruin and divine disapproval, as they defy Jehovah’s plan for creation.",
    scriptures: [
      { text: "The righteous will possess the earth, and they will live forever on it.", reference: "Psalm 37:29", tooltip: "Eternal habitation." },
      { text: "He has established the earth on its foundations; it will not be moved from its place forever.", reference: "Psalm 104:5", tooltip: "Earth endures forever." }
    ]
  },
  {
    title: "No Clergy in True Worship",
    icon: "fas fa-user-shield",
    summary: "All Christians are equal ministers, as Jesus taught (Matthew 23:8). Peter served humbly, not as a superior (1 Peter 5:3). False religions elevate clergy, like the Pharisees who sought prominence (Matthew 23:6), defiling worship. True worshipers follow Jesus’ example of service, ensuring Jehovah’s approval. For example, Paul worked alongside brothers (Acts 18:3). This equality offers eternal life, while clergy systems lead to spiritual ruin and divine disapproval, as they contradict the humility required in true worship.",
    scriptures: [
      { text: "You are all brothers.", reference: "Matthew 23:8", tooltip: "All are brothers." },
      { text: "Do not call anyone your father on earth, for one is your Father, the heavenly One.", reference: "Matthew 23:9", tooltip: "No religious titles." }
    ]
  },
  {
    title: "Baptism Requires Faith",
    icon: "fas fa-baby",
    summary: "Baptism requires conscious faith, as Jesus commanded (Matthew 28:19). The Ethiopian eunuch was baptized after understanding Scripture (Acts 8:35-38). Infant baptism, rooted in pagan traditions, lacks biblical basis, like Israel’s unscriptural rituals (Amos 5:21). False religions promote empty ceremonies, defiling worship. True worshipers ensure baptism reflects dedication, ensuring Jehovah’s approval. This commitment offers eternal life, while unscriptural practices lead to spiritual ruin and divine disapproval, as they fail Jehovah’s requirement for voluntary worship.",
    scriptures: [
      { text: "Go and make disciples... baptizing them.", reference: "Matthew 28:19", tooltip: "Discipleship precedes baptism." },
      { text: "Repent, and let each one of you be baptized.", reference: "Acts 2:38", tooltip: "Repentance is required." }
    ]
  },
  {
    title: "Congregation Is People",
    icon: "fas fa-users",
    summary: "The true congregation is Jehovah’s people, not buildings, as early Christians met in homes (Acts 2:46). Jesus emphasized spiritual unity (Matthew 18:20). False religions glorify churches, like Israel’s unauthorized temples (1 Kings 12:31), diverting focus to materialism. True worshipers prioritize heartfelt devotion, ensuring Jehovah’s approval. Paul met in simple settings (Acts 20:20). This focus offers eternal life, while materialistic worship leads to spiritual ruin and divine disapproval, as it contradicts the simplicity of true worship.",
    scriptures: [
      { text: "Where two or three are gathered in my name, I am there.", reference: "Matthew 18:20", tooltip: "Worship among people." },
      { text: "God is a Spirit, and those worshipping him must worship with spirit and truth.", reference: "John 4:24", tooltip: "Heart-based worship." }
    ]
  },
  {
    title: "Love Identifies Christians",
    icon: "fas fa-heart",
    summary: "Genuine love marks true Christians, as Jesus taught (John 13:35). The Good Samaritan showed love beyond prejudice (Luke 10:33-37). False religions, divided by politics, lack this love, like the Pharisees who shunned sinners (Luke 7:39). True worshipers display self-sacrificing love, ensuring Jehovah’s approval. For example, early Christians shared resources (Acts 4:32). This love offers eternal life, while loveless worship leads to spiritual ruin and divine disapproval, as it fails to reflect Jehovah’s character.",
    scriptures: [
      { text: "By this all will know that you are my disciples—if you have love among yourselves.", reference: "John 13:35", tooltip: "Love defines disciples." },
      { text: "Love one another; just as I have loved you.", reference: "John 15:12", tooltip: "Love reflects Jehovah." }
    ]
  },
  {
    title: "Paradise Earth Is God’s Plan",
    icon: "fas fa-globe-americas",
    summary: "Jehovah’s purpose is to restore earth as a paradise, fulfilling His plan for Adam and Eve (Genesis 1:28). Psalm 37:29 promises eternal life on earth. False religions focus on heaven, like Israel’s false prophets (Jeremiah 23:16), misleading followers. Abraham trusted in an earthly hope (Hebrews 11:10). True worshipers align with Jehovah’s will, ensuring His approval. This faith offers eternal life in paradise, while false teachings lead to spiritual ruin and divine disapproval, as they defy Jehovah’s plan.",
    scriptures: [
      { text: "The righteous will possess the earth, and they will live forever on it.", reference: "Psalm 37:29", tooltip: "Eternal life on earth." },
      { text: "As for the heavens, they belong to Jehovah, but the earth he has given to the sons of men.", reference: "Psalm 115:16", tooltip: "Earth for humanity." }
    ]
  },
  {
    title: "The Bible Guides Life",
    icon: "fas fa-compass",
    summary: "The Bible is Jehovah’s guide for life, offering clear principles (Psalm 119:105). Timothy was taught from Scripture (2 Timothy 3:15). False religions rely on human philosophies, like Israel’s false prophets (Jeremiah 23:16), leading to confusion. True worshipers study Scripture, as the Bereans did (Acts 17:11), ensuring Jehovah’s approval. This reliance offers eternal life, while false teachings lead to spiritual ruin and divine disapproval, as they reject Jehovah’s authoritative Word.",
    scriptures: [
      { text: "Be not carried about with divers and strange doctrines.", reference: "Hebrews 13:9", tooltip: "Avoid false doctrines." },
      { text: "Your word is a lamp to my foot and a light to my path.", reference: "Psalm 119:105", tooltip: "Scripture guides." }
    ]
  },
  {
    title: "Christmas Is Pagan",
    icon: "fas fa-gift",
    summary: "Christmas, rooted in Roman Saturnalia, is a pagan holiday with customs like trees and gift-giving, forbidden by Jehovah (Jeremiah 10:2-3). Early Christians never celebrated Jesus’ birth, as seen in their focus on his death (1 Corinthians 11:26). False religions blend paganism with worship, like Israel’s idolatry (2 Kings 17:33), misleading followers. True worshipers reject Christmas, ensuring pure devotion. This aligns with Jehovah’s standards, offering eternal life, while pagan practices lead to spiritual ruin and divine disapproval.",
    scriptures: [
      { text: "Do not learn the way of the nations... for the customs of the peoples are a delusion.", reference: "Jeremiah 10:2, 3", tooltip: "Jehovah forbids pagan practices." },
      { text: "You must not worship Jehovah your God in that way.", reference: "Deuteronomy 12:31", tooltip: "True worship avoids pagan rituals." }
    ]
  },
  {
    title: "Easter Is Pagan",
    icon: "fas fa-egg",
    summary: "Easter, tied to fertility cults like Astarte, uses pagan symbols like eggs, condemned by Jehovah (Exodus 23:13). Jesus commanded commemorating his death (Luke 22:19), not resurrection. False religions embrace Easter, like Israel’s pagan worship (2 Kings 23:13), defiling worship. True worshipers focus on the Lord’s Evening Meal, ensuring Jehovah’s approval. For example, early Christians kept this memorial (1 Corinthians 11:24). This obedience offers eternal life, while pagan rituals lead to spiritual ruin and divine disapproval.",
    scriptures: [
      { text: "You must not mention the name of other gods.", reference: "Exodus 23:13", tooltip: "Pagan worship is unacceptable." },
      { text: "Keep doing this in remembrance of me.", reference: "Luke 22:19", tooltip: "Jesus commanded a specific memorial." }
    ]
  },
  {
    title: "The Trinity Is False",
    icon: "fas fa-book",
    summary: "The Trinity, from pagan triads, falsely equates Jesus and the Holy Spirit with Jehovah, the only true God (Deuteronomy 6:4). Jesus is His created Son (1 Corinthians 11:3). False religions uphold this apostasy, like Israel’s idolatry (1 Kings 12:28), misleading followers. True worshipers honor Jehovah alone, as Jesus did (John 20:17). This ensures His approval and eternal life, while the Trinity defiles worship, leading to spiritual ruin and divine disapproval, as it distorts Jehovah’s nature.",
    scriptures: [
      { text: "Jehovah our God is one Jehovah.", reference: "Deuteronomy 6:4", tooltip: "Jehovah is uniquely supreme." },
      { text: "The head of the Christ is God.", reference: "1 Corinthians 11:3", tooltip: "Jesus is subordinate to Jehovah." }
    ]
  },
  {
    title: "Worship Must Be True",
    icon: "fas fa-pray",
    summary: "Jehovah requires worship based on His Word, free from paganism (John 4:23). The apostles rejected human traditions (Galatians 1:14). False religions mix holidays or idols, like Israel’s calf worship (Exodus 32:4), rendering worship vain. True worshipers obey Scripture, as Paul did (Acts 24:14), ensuring Jehovah’s approval. This devotion offers eternal life, while false practices lead to spiritual ruin and divine disapproval, as they fail Jehovah’s standard for true worship.",
    scriptures: [
      { text: "True worshipers will worship the Father with spirit and truth.", reference: "John 4:23", tooltip: "Pure worship is required." },
      { text: "In vain do they keep worshipping me.", reference: "Matthew 15:9", tooltip: "False worship is futile." }
    ]
  },
  {
    title: "Birthdays Are Unscriptural",
    icon: "fas fa-birthday-cake",
    summary: "Birthdays, tied to pagan astrology, are not celebrated by Christians, as seen with Pharaoh and Herod (Genesis 40:20; Mark 6:21). Scripture condemns pagan customs (Jeremiah 10:2). False religions embrace birthdays, like Israel’s idolatry (Judges 8:27), defiling worship. True worshipers honor Jehovah, ensuring pure devotion. This aligns with His standards, offering eternal life, while pagan practices lead to spiritual ruin and divine disapproval, as they glorify individuals over the Creator.",
    scriptures: [
      { text: "Do not learn the way of the nations.", reference: "Jeremiah 10:2", tooltip: "Pagan customs are unfit for worship." },
      { text: "The day of our death is better than the day of our birth.", reference: "Ecclesiastes 7:1", tooltip: "Life’s value lies in serving Jehovah." }
    ]
  },
  {
    title: "Military Service Is Unchristian",
    icon: "fas fa-shield-alt",
    summary: "Christians refuse military service, following Jesus’ command to love and remain neutral (John 18:36). Early Christians faced persecution for this (Acts 5:29). False religions support war, like Israel’s alliances (2 Chronicles 20:35), defiling worship. True worshipers uphold peace, as Jesus did (Matthew 26:52). This ensures Jehovah’s approval and eternal life, while military involvement leads to spiritual ruin and divine disapproval, as it opposes Jehovah’s principles.",
    scriptures: [
      { text: "You must love your neighbor as yourself.", reference: "Matthew 22:39", tooltip: "Love defines neighbors." },
      { text: "My kingdom is no part of this world.", reference: "John 18:36", tooltip: "Christians prioritize God’s Kingdom." }
    ]
  },
  {
    title: "Resurrection Is Jehovah’s Promise",
    icon: "fas fa-skull",
    summary: "Jehovah will resurrect the dead to a paradise earth, as death is a sleep (John 5:28-29). Jesus raised Lazarus, proving this hope (John 11:43). False teachings of immortal souls, like Israel’s pagan beliefs (Jeremiah 16:11), deny this. True worshipers trust in resurrection, as Martha did (John 11:24). This hope offers eternal life, while false doctrines lead to spiritual ruin and divine disapproval, as they distort Jehovah’s plan.",
    scriptures: [
      { text: "The hour is coming in which all those in the memorial tombs will hear his voice and come out.", reference: "John 5:28, 29", tooltip: "Resurrection is certain." },
      { text: "Lazarus our friend has fallen asleep, but I am traveling there to awaken him.", reference: "John 11:11", tooltip: "Death is a temporary sleep." }
    ]
  },
  {
    title: "Armageddon Is Near",
    icon: "fas fa-clock",
    summary: "Armageddon, Jehovah’s judgment, will destroy the wicked, establishing His Kingdom (2 Peter 3:10). Noah’s flood prefigured this (Genesis 7:22). False religions dismiss it, like Israel’s false prophets (Jeremiah 23:16), lulling people into complacency. True worshipers prepare by obeying Jehovah, as Noah did (Hebrews 11:7). This ensures His approval and survival, while false teachings lead to spiritual ruin and divine disapproval, as they ignore Jehovah’s imminent judgment.",
    scriptures: [
      { text: "Jehovah’s day is coming as a thief.", reference: "2 Peter 3:10", tooltip: "Jehovah’s judgment is certain." },
      { text: "The wicked will be cut off from the earth.", reference: "Proverbs 2:22", tooltip: "The wicked will face destruction." }
    ]
  },
  {
    title: "The Bible Is God’s Word",
    icon: "fas fa-book",
    summary: "All Scripture is Jehovah’s inspired Word, guiding worship and life (2 Timothy 3:16). The Bereans verified teachings with it (Acts 17:11). False religions elevate human ideas, like Israel’s false prophets (Jeremiah 23:16), leading to confusion. True worshipers study Scripture, as Timothy did (2 Timothy 3:15), ensuring Jehovah’s approval. This reliance offers eternal life, while false teachings lead to spiritual ruin and divine disapproval, as they reject Jehovah’s authoritative Word.",
    scriptures: [
      { text: "All Scripture is inspired of God and beneficial.", reference: "2 Timothy 3:16", tooltip: "The Bible is divinely inspired." },
      { text: "The word of our God endures forever.", reference: "Isaiah 40:8", tooltip: "Jehovah’s Word endures forever." }
    ]
  },
  {
    title: "Choosing Good Association",
    icon: "fas fa-user-friends",
    summary: "Choosing good association is vital for true worship, as bad company corrupts (1 Corinthians 15:33). Ahab’s alliance with Jehoshaphat led to near disaster due to Ahab’s wickedness (2 Chronicles 18:1-3). Scripture urges associating with those who fear Jehovah (Psalm 119:63). False associations, like Israel’s with idolaters (Hosea 4:17), defile worship. True worshipers choose companions who uphold Jehovah’s standards, as Timothy did with Paul (Philippians 2:20). This ensures Jehovah’s approval and eternal life, while bad associations lead to spiritual ruin and divine disapproval.",
    scriptures: [
      { text: "Do not be misled. Bad company corrupts good morals.", reference: "1 Corinthians 15:33", tooltip: "Association impacts character." },
      { text: "I am a friend to all who fear you.", reference: "Psalm 119:63", tooltip: "Choose God-fearing companions." }
    ]
  },
  {
    title: "Noah’s Obedience Saves",
    icon: "fas fa-ship",
    summary: "Noah’s unwavering obedience to Jehovah saved his family from the Flood, demonstrating faith in action (Genesis 6:22). By building the ark despite ridicule, Noah showed trust in Jehovah’s word. False religions rely on human wisdom, like the pre-Flood world’s defiance (Genesis 6:5), leading to destruction. True worshipers, like Noah, obey Jehovah’s commands, ensuring His approval. Noah’s example teaches us to act on faith, even when opposed, securing eternal life in Jehovah’s Kingdom. In contrast, disobedience, like that of Noah’s contemporaries, results in spiritual ruin and divine judgment, as it rejects Jehovah’s guidance for salvation.",
    scriptures: [
      { text: "Noah did according to all that God had commanded him.", reference: "Genesis 6:22", tooltip: "Obedience brings salvation." },
      { text: "By faith Noah... constructed an ark for the saving of his household.", reference: "Hebrews 11:7", tooltip: "Faith prompts action." }
    ]
  },
  {
    title: "Abraham’s Faith Sustains",
    icon: "fas fa-tent",
    summary: "Abraham’s faith in Jehovah led him to leave Ur and trust in divine promises, earning him the title ‘friend of God’ (James 2:23). His willingness to sacrifice Isaac showed absolute trust (Genesis 22:12). False religions cling to material security, like Lot’s choice of Sodom (Genesis 13:10-11), leading to ruin. True worshipers, like Abraham, prioritize Jehovah’s will, ensuring His approval. Abraham’s example teaches reliance on Jehovah, even in uncertainty, offering hope for eternal life. In contrast, lack of faith, like Israel’s doubt in the wilderness (Numbers 14:11), results in spiritual failure and divine disapproval.",
    scriptures: [
      { text: "By faith Abraham... obeyed by going out to a place he was to receive.", reference: "Hebrews 11:8", tooltip: "Faith moves us to obey." },
      { text: "You are my friends if you do what I am commanding you.", reference: "John 15:14", tooltip: "Obedience builds friendship with God." }
    ]
  },
  {
    title: "Sarah’s Hope Endures",
    icon: "fas fa-female",
    summary: "Sarah’s hope in Jehovah’s promise of a son, despite her old age, exemplifies enduring faith (Hebrews 11:11). Though she initially laughed, she trusted Jehovah’s word (Genesis 18:12-15). False religions promote despair or human solutions, like Hagar’s role (Genesis 16:2), leading to strife. True worshipers, like Sarah, wait on Jehovah, ensuring His approval. Sarah’s example teaches patience in Jehovah’s timing, offering eternal life in His Kingdom. In contrast, impatience, like Israel’s demand for a king (1 Samuel 8:19), results in spiritual ruin and divine disapproval, as it distrusts Jehovah’s plan.",
    scriptures: [
      { text: "By faith Sarah... received power to conceive.", reference: "Hebrews 11:11", tooltip: "Faith brings hope." },
      { text: "Hope does not lead to disappointment.", reference: "Romans 5:5", tooltip: "Hope in Jehovah is certain." }
    ]
  },
  {
    title: "Isaac’s Submission Teaches",
    icon: "fas fa-hand-holding",
    summary: "Isaac’s submission to Abraham during the near-sacrifice on Moriah shows trust in Jehovah’s purpose (Genesis 22:9). His willingness reflects obedience to divine authority. False religions promote rebellion, like Korah’s defiance (Numbers 16:3), leading to destruction. True worshipers, like Isaac, submit to Jehovah’s will, ensuring His approval. Isaac’s example teaches us to trust Jehovah’s direction, even in trials, securing eternal life. In contrast, self-will, like Saul’s disobedience (1 Samuel 15:23), results in spiritual ruin and divine disapproval, as it rejects Jehovah’s authority.",
    scriptures: [
      { text: "Abraham... bound Isaac his son and put him on the altar.", reference: "Genesis 22:9", tooltip: "Submission shows trust." },
      { text: "Obey God as ruler rather than men.", reference: "Acts 5:29", tooltip: "God’s authority is supreme." }
    ]
  },
  {
    title: "Jacob’s Repentance Restores",
    icon: "fas fa-pray",
    summary: "Jacob’s repentance after deceiving Isaac led to reconciliation with Jehovah, as seen in his wrestling with an angel (Genesis 32:24-28). His transformed character earned him the name Israel. False religions justify deceit, like Ananias’ lie (Acts 5:3), leading to judgment. True worshipers, like Jacob, seek forgiveness, ensuring Jehovah’s approval. Jacob’s example teaches us to repent sincerely, securing eternal life in Jehovah’s Kingdom. In contrast, unrepentant sin, like Achan’s greed (Joshua 7:21), results in spiritual ruin and divine disapproval.",
    scriptures: [
      { text: "Your name will no longer be Jacob but Israel.", reference: "Genesis 32:28", tooltip: "Repentance transforms." },
      { text: "If we confess our sins, he is faithful and righteous so as to forgive us.", reference: "1 John 1:9", tooltip: "Confession brings forgiveness." }
    ]
  },
  {
    title: "Joseph’s Integrity Shines",
    icon: "fas fa-crown",
    summary: "Joseph’s integrity in resisting Potiphar’s wife upheld Jehovah’s standards, leading to his rise in Egypt (Genesis 39:9). His faithfulness in trials showed trust in Jehovah. False religions tolerate immorality, like Israel’s idolatry (Hosea 4:12), defiling worship. True worshipers, like Joseph, maintain purity, ensuring Jehovah’s approval. Joseph’s example teaches us to uphold righteousness, securing eternal life. In contrast, compromise, like Samson’s weakness (Judges 16:17), leads to spiritual ruin and divine disapproval, as it betrays Jehovah’s principles.",
    scriptures: [
      { text: "How could I commit this great badness and actually sin against God?", reference: "Genesis 39:9", tooltip: "Integrity honors God." },
      { text: "The one who is faithful in what is least is also faithful in much.", reference: "Luke 16:10", tooltip: "Faithfulness brings reward." }
    ]
  },
  {
    title: "Moses’ Humility Guides",
    icon: "fas fa-staff",
    summary: "Moses’ humility, described as unmatched, allowed him to lead Israel faithfully (Numbers 12:3). Despite challenges, he relied on Jehovah, as seen at the Red Sea (Exodus 14:13). False religions promote pride, like Pharaoh’s arrogance (Exodus 5:2), leading to ruin. True worshipers, like Moses, cultivate humility, ensuring Jehovah’s approval. Moses’ example teaches us to rely on Jehovah, securing eternal life. In contrast, pride, like Nebuchadnezzar’s boast (Daniel 4:30), results in spiritual ruin and divine disapproval, as it opposes Jehovah’s will.",
    scriptures: [
      { text: "The man Moses was by far the meekest of all the men.", reference: "Numbers 12:3", tooltip: "Humility pleases God." },
      { text: "Humble yourselves in the sight of Jehovah.", reference: "James 4:10", tooltip: "Humility brings blessings." }
    ]
  },
  {
    title: "Rahab’s Faith Saves",
    icon: "fas fa-door-open",
    summary: "Rahab’s faith in Jehovah led her to protect Israel’s spies, saving her family in Jericho’s fall (Joshua 2:11). Her trust contrasted with Canaan’s idolatry. False religions cling to false gods, like Jericho’s defiance (Joshua 6:1), leading to destruction. True worshipers, like Rahab, act on faith, ensuring Jehovah’s approval. Rahab’s example teaches us to choose Jehovah, securing eternal life. In contrast, idolatry, like Israel’s golden calf (Exodus 32:4), results in spiritual ruin and divine disapproval.",
    scriptures: [
      { text: "Jehovah your God is God in the heavens above and on the earth beneath.", reference: "Joshua 2:11", tooltip: "Faith recognizes Jehovah." },
      { text: "By faith Rahab... did not perish.", reference: "Hebrews 11:31", tooltip: "Faith brings salvation." }
    ]
  },
  {
    title: "Gideon’s Trust Triumphs",
    icon: "fas fa-sword",
    summary: "Gideon’s trust in Jehovah led to victory over Midian with only 300 men, showing reliance on divine strength (Judges 7:7). His humility contrasted with Israel’s idolatry. False religions trust in human power, like Goliath’s boast (1 Samuel 17:8), leading to defeat. True worshipers, like Gideon, rely on Jehovah, ensuring His approval. Gideon’s example teaches us to trust Jehovah’s might, securing eternal life. In contrast, self-reliance, like Israel’s trust in Egypt (Isaiah 31:1), leads to spiritual ruin and divine disapproval.",
    scriptures: [
      { text: "With the 300 men... I will save you.", reference: "Judges 7:7", tooltip: "Jehovah gives victory." },
      { text: "Trust in Jehovah with all your heart.", reference: "Proverbs 3:5", tooltip: "Reliance on God brings success." }
    ]
  },
  {
    title: "Ruth’s Loyalty Endures",
    icon: "fas fa-hand-holding-heart",
    summary: "Ruth’s loyalty to Naomi and Jehovah led her to leave Moab, gaining blessings as an ancestor of Jesus (Ruth 1:16). Her devotion contrasted with Orpah’s return to idolatry. False religions prioritize self-interest, like Demas’ desertion (2 Timothy 4:10), leading to ruin. True worshipers, like Ruth, show loyalty, ensuring Jehovah’s approval. Ruth’s example teaches us to cling to Jehovah’s people, securing eternal life. In contrast, disloyalty, like Judas’ betrayal (Matthew 26:14-16), results in spiritual ruin and divine disapproval.",
    scriptures: [
      { text: "Your people will be my people, and your God my God.", reference: "Ruth 1:16", tooltip: "Loyalty to Jehovah’s people." },
      { text: "A true companion loves all the time.", reference: "Proverbs 17:17", tooltip: "Loyalty brings blessings." }
    ]
  },
  {
    title: "Samuel’s Dedication Serves",
    icon: "fas fa-child",
    summary: "Samuel’s dedication to Jehovah from childhood made him a faithful prophet, serving despite Israel’s corruption (1 Samuel 3:10). His obedience contrasted with Eli’s sons’ wickedness. False religions tolerate sin, like Eli’s neglect (1 Samuel 2:29), leading to judgment. True worshipers, like Samuel, serve Jehovah wholeheartedly, ensuring His approval. Samuel’s example teaches us to dedicate our lives to Jehovah, securing eternal life. In contrast, negligence, like Saul’s disobedience (1 Samuel 15:23), results in spiritual ruin and divine disapproval.",
    scriptures: [
      { text: "Speak, for your servant is listening.", reference: "1 Samuel 3:10", tooltip: "Dedication to Jehovah’s service." },
      { text: "Serve Jehovah with all your heart.", reference: "1 Samuel 12:20", tooltip: "Wholehearted service pleases God." }
    ]
  },
  {
    title: "David’s Repentance Heals",
    icon: "fas fa-harp",
    summary: "David’s repentance after sinning with Bathsheba restored his relationship with Jehovah, showing sincere contrition (2 Samuel 12:13). His humility contrasted with Saul’s defiance. False religions justify sin, like Ahab’s idolatry (1 Kings 16:31), leading to ruin. True worshipers, like David, seek forgiveness, ensuring Jehovah’s approval. David’s example teaches us to repent humbly, securing eternal life. In contrast, unrepentant sin, like Manasseh’s early wickedness (2 Chronicles 33:6), results in spiritual ruin and divine disapproval.",
    scriptures: [
      { text: "I have sinned against Jehovah.", reference: "2 Samuel 12:13", tooltip: "Repentance restores." },
      { text: "A heart broken and crushed, O God, you will not reject.", reference: "Psalm 51:17", tooltip: "Humility brings forgiveness." }
    ]
  },
  {
    title: "Solomon’s Wisdom Fades",
    icon: "fas fa-crown",
    summary: "Solomon’s early wisdom, granted by Jehovah, blessed Israel, but his later idolatry led to ruin (1 Kings 3:12; 11:9). His fall warns against compromise. False religions embrace idolatry, like Jeroboam’s calves (1 Kings 12:28), defiling worship. True worshipers, like Hezekiah, remain steadfast (2 Kings 18:6), ensuring Jehovah’s approval. Solomon’s example teaches us to guard our devotion, securing eternal life. In contrast, compromise, like Solomon’s foreign wives, leads to spiritual ruin and divine disapproval.",
    scriptures: [
      { text: "I will give you a wise and understanding heart.", reference: "1 Kings 3:12", tooltip: "Wisdom from Jehovah." },
      { text: "Guard your heart, for out of it are the sources of life.", reference: "Proverbs 4:23", tooltip: "Protect your devotion." }
    ]
  },
  {
    title: "Elijah’s Zeal Inspires",
    icon: "fas fa-fire",
    summary: "Elijah’s zeal for Jehovah defeated Baal’s prophets on Carmel, proving Jehovah’s supremacy (1 Kings 18:39). His courage contrasted with Israel’s apostasy. False religions promote idolatry, like Ahab’s Baal worship (1 Kings 16:32), leading to ruin. True worshipers, like Elijah, stand firm, ensuring Jehovah’s approval. Elijah’s example teaches us to defend true worship, securing eternal life. In contrast, apathy, like Israel’s indecision (1 Kings 18:21), results in spiritual ruin and divine disapproval.",
    scriptures: [
      { text: "Jehovah, he is the true God!", reference: "1 Kings 18:39", tooltip: "Zeal proves Jehovah’s power." },
      { text: "Be zealous for the good work.", reference: "Titus 2:14", tooltip: "Zeal for Jehovah is vital." }
    ]
  },
  {
    title: "Elisha’s Faith Heals",
    icon: "fas fa-hand-sparkles",
    summary: "Elisha’s faith in Jehovah led to miracles, like healing Naaman’s leprosy, showing divine power (2 Kings 5:14). His trust contrasted with Gehazi’s greed. False religions seek gain, like Simon’s sorcery (Acts 8:18-19), leading to ruin. True worshipers, like Elisha, rely on Jehovah, ensuring His approval. Elisha’s example teaches us to trust Jehovah’s provision, securing eternal life. In contrast, greed, like Judas’ betrayal (Matthew 26:15), results in spiritual ruin and divine disapproval.",
    scriptures: [
      { text: "His flesh was restored like the flesh of a small boy.", reference: "2 Kings 5:14", tooltip: "Faith brings healing." },
      { text: "Your faith has made you well.", reference: "Luke 17:19", tooltip: "Faith in Jehovah heals." }
    ]
  },
  {
    title: "Jonah’s Lesson in Mercy",
    icon: "fas fa-fish",
    summary: "Jonah’s reluctance to preach to Nineveh taught him Jehovah’s mercy when the city repented (Jonah 3:10). His initial disobedience contrasted with Nineveh’s humility. False religions lack compassion, like the Pharisees’ judgment (Matthew 23:23), leading to ruin. True worshipers, like Jonah after learning, reflect Jehovah’s mercy, ensuring His approval. Jonah’s example teaches us to show mercy, securing eternal life. In contrast, hardness, like Jonah’s initial attitude, leads to spiritual ruin and divine disapproval.",
    scriptures: [
      { text: "God saw their works, that they had turned back from their evil way.", reference: "Jonah 3:10", tooltip: "Mercy follows repentance." },
      { text: "Be merciful, just as your Father is merciful.", reference: "Luke 6:36", tooltip: "Imitate Jehovah’s mercy." }
    ]
  },
  {
    title: "Hezekiah’s Prayer Prevails",
    icon: "fas fa-pray",
    summary: "Hezekiah’s prayer for deliverance from Assyria showed reliance on Jehovah, leading to victory (2 Kings 19:19). His faith contrasted with Ahaz’s idolatry. False religions trust in human alliances, like Israel’s reliance on Egypt (Isaiah 31:1), leading to ruin. True worshipers, like Hezekiah, pray fervently, ensuring Jehovah’s approval. Hezekiah’s example teaches us to rely on prayer, securing eternal life. In contrast, self-reliance, like Sennacherib’s boast (2 Kings 18:33), results in spiritual ruin and divine disapproval.",
    scriptures: [
      { text: "O Jehovah... save us from his hand.", reference: "2 Kings 19:19", tooltip: "Prayer brings deliverance." },
      { text: "Call upon me in the day of distress.", reference: "Psalm 50:15", tooltip: "Jehovah answers prayers." }
    ]
  },
  {
    title: "Josiah’s Reforms Restore",
    icon: "fas fa-book-open",
    summary: "Josiah’s reforms, sparked by finding the Law, restored true worship in Judah (2 Kings 23:3). His zeal contrasted with Manasseh’s idolatry. False religions cling to traditions, like Judah’s high places (2 Kings 23:5), defiling worship. True worshipers, like Josiah, uphold Jehovah’s Word, ensuring His approval. Josiah’s example teaches us to reform our worship, securing eternal life. In contrast, apostasy, like Manasseh’s sins (2 Chronicles 33:6), leads to spiritual ruin and divine disapproval.",
    scriptures: [
      { text: "The king... made a covenant before Jehovah.", reference: "2 Kings 23:3", tooltip: "Reforms honor Jehovah." },
      { text: "Do what is right in the eyes of Jehovah.", reference: "Deuteronomy 12:25", tooltip: "Obedience brings blessings." }
    ]
  },
  {
    title: "Daniel’s Courage Stands",
    icon: "fas fa-lion",
    summary: "Daniel’s courage in praying despite a ban led to his deliverance from lions, showing trust in Jehovah (Daniel 6:10). His faith contrasted with Babylon’s idolatry. False religions compromise under pressure, like Israel’s apostasy (Hosea 7:11), leading to ruin. True worshipers, like Daniel, stand firm, ensuring Jehovah’s approval. Daniel’s example teaches us to remain steadfast, securing eternal life. In contrast, cowardice, like Peter’s denial (Matthew 26:70), leads to spiritual ruin and divine disapproval.",
    scriptures: [
      { text: "He knelt... and prayed... just as he had been regularly doing.", reference: "Daniel 6:10", tooltip: "Courage in worship." },
      { text: "Be courageous and strong.", reference: "Joshua 1:9", tooltip: "Jehovah strengthens the faithful." }
    ]
  },
  {
    title: "Esther’s Bravery Saves",
    icon: "fas fa-crown",
    summary: "Esther’s bravery in approaching Ahasuerus saved her people from Haman’s plot, showing reliance on Jehovah (Esther 4:16). Her faith contrasted with Haman’s pride. False religions promote self-interest, like Ahab’s greed (1 Kings 21:4), leading to ruin. True worshipers, like Esther, act selflessly, ensuring Jehovah’s approval. Esther’s example teaches us to trust Jehovah in danger, securing eternal life. In contrast, selfishness, like Haman’s plot (Esther 7:10), leads to spiritual ruin and divine disapproval.",
    scriptures: [
      { text: "If I must die, I must die.", reference: "Esther 4:16", tooltip: "Bravery for Jehovah’s people." },
      { text: "The one who loses his life for my sake will find it.", reference: "Matthew 10:39", tooltip: "Selflessness brings life." }
    ]
  },
  {
    title: "Job’s Endurance Sustains",
    icon: "fas fa-cloud-rain",
    summary: "Job’s endurance through trials, despite losing everything, proved his integrity to Jehovah (Job 1:22). His faith contrasted with his wife’s despair. False religions promote giving up, like Israel’s complaints (Numbers 14:2), leading to ruin. True worshipers, like Job, endure, ensuring Jehovah’s approval. Job’s example teaches us to hold fast in trials, securing eternal life. In contrast, lack of endurance, like Demas’ desertion (2 Timothy 4:10), leads to spiritual ruin and divine disapproval.",
    scriptures: [
      { text: "In all this, Job did not sin.", reference: "Job 1:22", tooltip: "Endurance proves integrity." },
      { text: "The one who has endured to the end will be saved.", reference: "Matthew 24:13", tooltip: "Endurance brings salvation." }
    ]
  },
  {
    title: "Isaiah’s Prophecy Strengthens",
    icon: "fas fa-scroll",
    summary: "Isaiah’s willingness to prophesy Jehovah’s message, despite opposition, strengthened Judah (Isaiah 6:8). His faith contrasted with Uzziah’s pride. False religions silence truth, like Amaziah’s opposition (Amos 7:12), leading to ruin. True worshipers, like Isaiah, proclaim Jehovah’s word, ensuring His approval. Isaiah’s example teaches us to speak boldly, securing eternal life. In contrast, silence, like Israel’s false prophets (Micah 2:6), leads to spiritual ruin and divine disapproval.",
    scriptures: [
      { text: "Here I am! Send me!", reference: "Isaiah 6:8", tooltip: "Willingness to serve." },
      { text: "Preach the word; be at it urgently.", reference: "2 Timothy 4:2", tooltip: "Proclaim Jehovah’s message." }
    ]
  },
  {
    title: "Jeremiah’s Perseverance Shines",
    icon: "fas fa-book",
    summary: "Jeremiah’s perseverance in preaching Jehovah’s judgment, despite persecution, showed loyalty (Jeremiah 20:9). His faith contrasted with Judah’s apostasy. False religions conform to please men, like Hananiah’s lies (Jeremiah 28:11), leading to ruin. True worshipers, like Jeremiah, persevere, ensuring Jehovah’s approval. Jeremiah’s example teaches us to stand firm, securing eternal life. In contrast, compromise, like Zedekiah’s weakness (Jeremiah 38:5), leads to spiritual ruin and divine disapproval.",
    scriptures: [
      { text: "It has become like a fire in my bones.", reference: "Jeremiah 20:9", tooltip: "Perseverance in preaching." },
      { text: "He who endures to the end will be saved.", reference: "Matthew 24:13", tooltip: "Perseverance brings salvation." }
    ]
  },
  {
    title: "Ezekiel’s Obedience Warns",
    icon: "fas fa-eye",
    summary: "Ezekiel’s obedience in warning Israel as a watchman showed faithfulness to Jehovah’s commission (Ezekiel 3:17). His courage contrasted with Israel’s rebellion. False religions ignore warnings, like Judah’s defiance (Ezekiel 2:3), leading to ruin. True worshipers, like Ezekiel, warn others, ensuring Jehovah’s approval. Ezekiel’s example teaches us to speak truth boldly, securing eternal life. In contrast, silence, like Israel’s false prophets (Ezekiel 13:3), leads to spiritual ruin and divine disapproval.",
    scriptures: [
      { text: "I have made you a watchman.", reference: "Ezekiel 3:17", tooltip: "Obedience to warn." },
      { text: "Go, therefore, and make disciples.", reference: "Matthew 28:19", tooltip: "Share Jehovah’s message." }
    ]
  },
  {
    title: "Hosea’s Love Reflects",
    icon: "fas fa-heart",
    summary: "Hosea’s love for Gomer, despite her unfaithfulness, mirrored Jehovah’s love for Israel (Hosea 3:1). His forgiveness contrasted with Israel’s idolatry. False religions lack love, like the Pharisees’ hypocrisy (Matthew 23:15), leading to ruin. True worshipers, like Hosea, reflect Jehovah’s love, ensuring His approval. Hosea’s example teaches us to love sacrificially, securing eternal life. In contrast, lovelessness, like Israel’s betrayal (Hosea 4:1), leads to spiritual ruin and divine disapproval.",
    scriptures: [
      { text: "Go again, love a woman loved by another.", reference: "Hosea 3:1", tooltip: "Love reflects Jehovah." },
      { text: "Love one another intensely from the heart.", reference: "1 Peter 1:22", tooltip: "Love is Christian." }
    ]
  },
  {
    title: "Mary’s Humility Serves",
    icon: "fas fa-female",
    summary: "Mary’s humility in accepting her role as Jesus’ mother showed submission to Jehovah’s will (Luke 1:38). Her faith contrasted with Herod’s pride. False religions promote self-exaltation, like Diotrephes’ arrogance (3 John 9), leading to ruin. True worshipers, like Mary, serve humbly, ensuring Jehovah’s approval. Mary’s example teaches us to submit to Jehovah, securing eternal life. In contrast, pride, like Herod’s boast (Acts 12:23), leads to spiritual ruin and divine disapproval.",
    scriptures: [
      { text: "I am the slave girl of Jehovah!", reference: "Luke 1:38", tooltip: "Humility serves God." },
      { text: "Whoever exalts himself will be humbled.", reference: "Matthew 23:12", tooltip: "Humility is required." }
    ]
  },
  {
    title: "John’s Boldness Prepares",
    icon: "fas fa-water",
    summary: "John the Baptist’s boldness in preparing the way for Jesus, calling for repentance, fulfilled prophecy (Matthew 3:3). His courage contrasted with the Pharisees’ hypocrisy. False religions avoid truth, like Herod’s advisors (Mark 6:20), leading to ruin. True worshipers, like John, proclaim Jehovah’s message, ensuring His approval. John’s example teaches us to prepare hearts for Jehovah, securing eternal life. In contrast, silence, like the Pharisees’ schemes (Matthew 12:14), leads to spiritual ruin and divine disapproval.",
    scriptures: [
      { text: "Prepare the way of Jehovah!", reference: "Matthew 3:3", tooltip: "Boldness prepares hearts." },
      { text: "Repent, for the Kingdom of the heavens has drawn near.", reference: "Matthew 3:2", tooltip: "Repentance is urgent." }
    ]
  },
  {
    title: "Peter’s Growth Strengthens",
    icon: "fas fa-fish",
    summary: "Peter’s growth from denying Jesus to becoming a bold apostle shows Jehovah’s mercy (Luke 22:61; Acts 2:14). His repentance contrasted with Judas’ despair. False religions reject restoration, like the Pharisees’ judgment (Matthew 23:13), leading to ruin. True worshipers, like Peter, grow through repentance, ensuring Jehovah’s approval. Peter’s example teaches us to learn from failures, securing eternal life. In contrast, despair, like Judas’ end (Matthew 27:5), leads to spiritual ruin and divine disapproval.",
    scriptures: [
      { text: "Strengthen your brothers.", reference: "Luke 22:32", tooltip: "Growth strengthens others." },
      { text: "Repent, therefore, and turn around.", reference: "Acts 3:19", tooltip: "Repentance restores." }
    ]
  },
  {
    title: "Paul’s Zeal Transforms",
    icon: "fas fa-road",
    summary: "Paul’s zeal, once misdirected as Saul, transformed into tireless service for Jesus after his conversion (Acts 9:6). His dedication contrasted with the Pharisees’ stubbornness. False religions cling to error, like Gamaliel’s indecision (Acts 5:34), leading to ruin. True worshipers, like Paul, embrace truth, ensuring Jehovah’s approval. Paul’s example teaches us to redirect our zeal, securing eternal life. In contrast, stubbornness, like Felix’s delay (Acts 24:25), leads to spiritual ruin and divine disapproval.",
    scriptures: [
      { text: "Lord, what do you want me to do?", reference: "Acts 9:6", tooltip: "Zeal for truth." },
      { text: "I am not ashamed of the good news.", reference: "Romans 1:16", tooltip: "Boldness in preaching." }
    ]
  },
  {
    title: "Timothy’s Youth Shines",
    icon: "fas fa-child",
    summary: "Timothy’s youthful service, guided by faith, strengthened early Christians despite his age (1 Timothy 4:12). His dedication contrasted with Hymenaeus’ apostasy. False religions despise youth, like Elihu’s initial hesitation (Job 32:6), leading to ruin. True worshipers, like Timothy, serve faithfully, ensuring Jehovah’s approval. Timothy’s example teaches us to serve Jehovah regardless of age, securing eternal life. In contrast, apostasy, like Hymenaeus’ error (2 Timothy 2:17), leads to spiritual ruin and divine disapproval.",
    scriptures: [
      { text: "Let no man ever look down on your youth.", reference: "1 Timothy 4:12", tooltip: "Youth can serve Jehovah." },
      { text: "From infancy you have known the holy writings.", reference: "2 Timothy 3:15", tooltip: "Early training strengthens." }
    ]
  },
  {
    title: "Honesty Pleases Jehovah",
    icon: "fas fa-hand-holding-heart",
    summary: "Jehovah values honesty, as He is a God of truth (Psalm 31:5). Ananias and Sapphira lied and faced judgment (Acts 5:3-5). False religions tolerate deceit, like Israel’s dishonest priests (Hosea 4:9), misleading followers. True worshipers speak truth, as Nathanael did (John 1:47). This ensures Jehovah’s approval and eternal life, while deceit leads to spiritual ruin and divine disapproval, as it contradicts Jehovah’s nature.",
    scriptures: [
      { text: "You must love truth and peace.", reference: "Zechariah 8:19", tooltip: "Truth is essential." },
      { text: "Let your word ‘Yes’ mean yes, and your ‘No,’ no.", reference: "Matthew 5:37", tooltip: "Honesty in speech." }
    ]
  },
  {
    title: "Obedience Brings Blessings",
    icon: "fas fa-star",
    summary: "Obedience to Jehovah brings blessings, as He rewards the faithful (Deuteronomy 28:1-2). Abraham obeyed and was blessed (Genesis 22:18). False religions promote disobedience, like Israel’s rebellion (1 Samuel 15:22-23), leading to ruin. True worshipers obey, as Samuel did (1 Samuel 3:10). This ensures Jehovah’s approval and eternal life, while disobedience leads to spiritual ruin and divine disapproval, as it defies His commands.",
    scriptures: [
      { text: "If you listen to my voice... all these blessings will come upon you.", reference: "Deuteronomy 28:1-2", tooltip: "Obedience brings blessings." },
      { text: "To obey is better than a sacrifice.", reference: "1 Samuel 15:22", tooltip: "Obedience is paramount." }
    ]
  },
  {
    title: "Prayer Is Vital",
    icon: "fas fa-pray",
    summary: "Prayer is essential for drawing close to Jehovah, as it reflects faith and dependence (Philippians 4:6). Daniel prayed regularly, even under threat (Daniel 6:10). False religions use vain repetitions, like the Pharisees’ hypocrisy (Mark 7:6-7), defiling worship. True worshipers pray sincerely, like Hannah (1 Samuel 1:11). This ensures Jehovah’s approval, offering eternal life, while empty prayers lead to spiritual ruin and divine disapproval, as they lack heartfelt devotion.",
    scriptures: [
      { text: "Do not be anxious over anything, but in everything by prayer... let your petitions be made known to God.", reference: "Philippians 4:6", tooltip: "Prayer brings peace." },
      { text: "When you pray, do not say the same things over and over again.", reference: "Matthew 6:7", tooltip: "Avoid vain repetitions." }
    ]
  },
  {
    title: "Faith Moves Mountains",
    icon: "fas fa-mountain",
    summary: "Faith in Jehovah can overcome obstacles, as Jesus taught (Matthew 17:20). The widow of Zarephath trusted Jehovah and was sustained (1 Kings 17:12-15). False religions lack faith, like Israel’s doubt (Numbers 14:11), leading to idolatry. True worshipers exercise faith, as Caleb did (Numbers 14:24), ensuring Jehovah’s approval. This faith offers eternal life, while lack of faith leads to spiritual ruin and divine disapproval, as it distrusts Jehovah’s power.",
    scriptures: [
      { text: "If you have faith the size of a mustard grain... nothing will be impossible for you.", reference: "Matthew 17:20", tooltip: "Faith overcomes obstacles." },
      { text: "Without faith it is impossible to please God well.", reference: "Hebrews 11:6", tooltip: "Faith is essential." }
    ]
  },
  {
    title: "Jehovah’s Name Is Holy",
    icon: "fas fa-scroll",
    summary: "Jehovah’s name is sacred, to be hallowed, as Jesus taught (Matthew 6:9). Moses revered His name (Exodus 3:15). False religions replace it with titles, like Israel’s neglect (Jerah 23:27), defiling worship. True worshipers sanctify His name, as Ezra did (Ezra 7:5-6), ensuring His approval. This offers eternal life, while dishonoring Jehovah’s name leads to spiritual ruin and divine disapproval, as it disregards His holiness.",
    scriptures: [
      { text: "Let your name be sanctified.", reference: "Matthew 6:9", tooltip: "Hallow Jehovah’s name." },
      { text: "This is my name forever.", reference: "Exodus 3:15", tooltip: "Jehovah’s name is eternal." }
    ]
  },
  {
    title: "Marriage Is Sacred",
    icon: "fas fa-ring",
    summary: "Marriage is Jehovah’s sacred arrangement, designed for loyalty and love (Genesis 2:24). Boaz honored it with Ruth (Ruth 4:13). False religions tolerate immorality, like Israel’s adultery (Hosea 4:2), leading to spiritual ruin. True worshipers uphold marriage, as Aquila and Priscilla did (Acts 18:26), ensuring Jehovah’s approval. This offers eternal life, while dishonoring marriage leads to spiritual ruin and divine disapproval, as it violates Jehovah’s design.",
    scriptures: [
      { text: "A man will leave his father and his mother and he will stick to his wife.", reference: "Genesis 2:24", tooltip: "Marriage is sacred." },
      { text: "Let marriage be honorable among all.", reference: "Hebrews 13:4", tooltip: "Honor marriage." }
    ]
  },
    {
    title: "Forgiveness Is Christian",
    icon: "fas fa-handshake",
    summary: "Forgiveness reflects Jehovah’s mercy, a hallmark of true Christians (Ephesians 4:32). Joseph forgave his brothers’ betrayal, showing Jehovah’s love (Genesis 50:20). False religions harbor grudges, like the Pharisees’ unforgiving attitude (Matthew 23:23), leading to spiritual ruin. True worshipers forgive, as Jesus taught in the Lord’s Prayer (Matthew 6:14). This ensures Jehovah’s approval and eternal life, while unforgiveness defiles worship, like Cain’s resentment (Genesis 4:5), leading to divine disapproval. Forgiveness fosters peace and aligns with Jehovah’s character, offering hope for reconciliation in His Kingdom.",
    scriptures: [
      { text: "Continue being forgiving to one another, just as God also by Christ freely forgave you.", reference: "Ephesians 4:32", tooltip: "Forgive as Jehovah does." },
      { text: "If you forgive men their trespasses, your heavenly Father will also forgive you.", reference: "Matthew 6:14", tooltip: "Forgiveness brings divine mercy." }
    ]
  },
  {
    title: "Preaching Is a Duty",
    icon: "fas fa-bullhorn",
    summary: "Preaching Jehovah’s Kingdom is a Christian obligation, as Jesus commanded (Matthew 24:14). The apostles shared the good news despite persecution, like Paul in Philippi (Acts 16:25). False religions neglect this duty, like Israel’s silent priests (Malachi 2:7), misleading followers into complacency. True worshipers proclaim Jehovah’s truth, as Timothy did (2 Timothy 4:2), ensuring His approval. Preaching reflects love for neighbor and trust in Jehovah’s promises, offering eternal life in His Kingdom. Neglecting this duty, like Jonah’s initial flight (Jonah 1:3), leads to spiritual ruin and divine disapproval, as it defies Jehovah’s commission to warn others.",
    scriptures: [
      { text: "This good news of the Kingdom will be preached in all the inhabited earth.", reference: "Matthew 24:14", tooltip: "Preaching is a global duty." },
      { text: "Preach the word; be at it urgently.", reference: "2 Timothy 4:2", tooltip: "Preaching is urgent." }
    ]
  },
  {
    title: "Kindness Reflects Jehovah",
    icon: "fas fa-hand-holding-heart",
    summary: "Kindness mirrors Jehovah’s loving nature, as He is compassionate (Psalm 86:15). Boaz showed kindness to Ruth, reflecting divine care (Ruth 2:10-12). False religions lack compassion, like the Pharisees who ignored the needy (Luke 10:31-32), defiling worship. True worshipers practice kindness, as Dorcas did with her charitable acts (Acts 9:36), ensuring Jehovah’s approval. Kindness fosters unity and draws others to Jehovah’s truth, offering eternal life. In contrast, cruelty, like Israel’s oppression of the poor (Amos 2:6), leads to spiritual ruin and divine disapproval, as it contradicts Jehovah’s character.",
    scriptures: [
      { text: "Jehovah is merciful and gracious, slow to anger and abundant in loyal love.", reference: "Psalm 86:15", tooltip: "Jehovah’s kindness is abundant." },
      { text: "Clothe yourselves with... kindness.", reference: "Colossians 3:12", tooltip: "Kindness is a Christian quality." }
    ]
  },
  {
    title: "Diligence in Service",
    icon: "fas fa-tools",
    summary: "Diligence in serving Jehovah reflects devotion, as He rewards the faithful (Hebrews 11:6). Nehemiah diligently rebuilt Jerusalem’s walls despite opposition (Nehemiah 4:6). False religions are apathetic, like Laodicea’s lukewarmness (Revelation 3:16), leading to spiritual ruin. True worshipers work zealously, as Paul urged (Romans 12:11), ensuring Jehovah’s approval. Diligence in preaching and worship strengthens faith and prepares us for eternal life in Jehovah’s Kingdom. In contrast, laziness, like Israel’s neglect of the temple (Haggai 1:4), leads to divine disapproval and spiritual ruin, as it dishonors Jehovah’s purpose.",
    scriptures: [
      { text: "Do not be lacking in zeal, but be aglow with the spirit.", reference: "Romans 12:11", tooltip: "Zeal in service is vital." },
      { text: "Whatever you are doing, work at it whole-souled as for Jehovah.", reference: "Colossians 3:23", tooltip: "Diligence honors Jehovah." }
    ]
  },
  {
    title: "Contentment Brings Peace",
    icon: "fas fa-smile",
    summary: "Contentment with Jehovah’s provisions brings peace, as Paul learned in all circumstances (Philippians 4:11). The Shunammite woman was content, serving Elisha without seeking gain (2 Kings 4:13). False religions chase wealth, like Israel’s greedy merchants (Amos 8:5), leading to spiritual ruin. True worshipers find contentment, as Timothy was urged (1 Timothy 6:6), ensuring Jehovah’s approval. Contentment fosters gratitude and trust in Jehovah’s care, offering eternal life. In contrast, discontent, like Achan’s greed (Joshua 7:21), leads to divine disapproval and spiritual ruin, as it rejects Jehovah’s sufficiency.",
    scriptures: [
      { text: "I have learned to be content with whatever I have.", reference: "Philippians 4:11", tooltip: "Contentment brings peace." },
      { text: "Godliness with contentment is great gain.", reference: "1 Timothy 6:6", tooltip: "Contentment is spiritual wealth." }
    ]
  },
  {
    title: "Respect for Authority",
    icon: "fas fa-gavel",
    summary: "Respecting authority honors Jehovah, who establishes rulers for order (Romans 13:1). David respected Saul’s position despite his flaws (1 Samuel 24:6). False religions rebel against authority, like Korah’s defiance (Numbers 16:3), leading to spiritual ruin. True worshipers submit to lawful authority, as Jesus did (Matthew 22:21), ensuring Jehovah’s approval. Respect aligns with Jehovah’s arrangement, fostering peace and offering eternal life. In contrast, rebellion, like Absalom’s revolt (2 Samuel 15:12), leads to divine disapproval and spiritual ruin, as it disrupts Jehovah’s order.",
    scriptures: [
      { text: "Let every person be in subjection to the superior authorities.", reference: "Romans 13:1", tooltip: "Authority is from Jehovah." },
      { text: "Render to Caesar the things that are Caesar’s.", reference: "Matthew 22:21", tooltip: "Respect lawful authority." }
    ]
  },
  {
    title: "Avoiding Gossip",
    icon: "fas fa-comment-slash",
    summary: "Avoiding gossip preserves unity, as Jehovah hates slander (Proverbs 6:16-19). Miriam’s gossip against Moses led to punishment (Numbers 12:10). False religions tolerate slander, like the Pharisees’ accusations against Jesus (Matthew 12:24), defiling worship. True worshipers speak truthfully, as Paul urged (Ephesians 4:25), ensuring Jehovah’s approval. Avoiding gossip builds trust and reflects Jehovah’s love, offering eternal life. In contrast, gossip, like Doeg’s betrayal (1 Samuel 22:9-10), leads to spiritual ruin and divine disapproval, as it harms others and dishonors Jehovah.",
    scriptures: [
      { text: "A slanderer reveals secrets, but a trustworthy person keeps a confidence.", reference: "Proverbs 11:13", tooltip: "Avoid slander." },
      { text: "Speak truth each one with his neighbor.", reference: "Ephesians 4:25", tooltip: "Honest speech unites." }
    ]
  },
  {
    title: "Endurance in Trials",
    icon: "fas fa-mountain",
    summary: "Endurance in trials proves faith, as Jesus taught (Matthew 24:13). Job endured immense loss, maintaining integrity (Job 1:22). False religions falter under pressure, like Israel’s complaints in the wilderness (Numbers 14:2), leading to spiritual ruin. True worshipers persevere, as Paul did through hardships (2 Corinthians 11:23-27), ensuring Jehovah’s approval. Endurance strengthens character and secures eternal life in Jehovah’s Kingdom. In contrast, giving up, like Demas’ desertion (2 Timothy 4:10), leads to divine disapproval and spiritual ruin, as it shows lack of trust in Jehovah.",
    scriptures: [
      { text: "The one who has endured to the end will be saved.", reference: "Matthew 24:13", tooltip: "Endurance brings salvation." },
      { text: "We are not the sort who shrink back to destruction.", reference: "Hebrews 10:39", tooltip: "Endurance preserves faith." }
    ]
  },
  {
    title: "Gratitude Pleases Jehovah",
    icon: "fas fa-thumbs-up",
    summary: "Gratitude reflects faith in Jehovah’s provisions, as Paul urged constant thanks (1 Thessalonians 5:18). The healed leper returned to thank Jesus, showing appreciation (Luke 17:15-16). False religions breed ingratitude, like Israel’s murmuring (Numbers 11:4-6), defiling worship. True worshipers give thanks, as David did (Psalm 30:12), ensuring Jehovah’s approval. Gratitude fosters joy and draws us closer to Jehovah, offering eternal life. In contrast, ingratitude, like the Pharisees’ attitude (Luke 7:39), leads to spiritual ruin and divine disapproval, as it rejects Jehovah’s goodness.",
    scriptures: [
      { text: "In everything give thanks.", reference: "1 Thessalonians 5:18", tooltip: "Gratitude is constant." },
      { text: "Give thanks to Jehovah, for he is good.", reference: "Psalm 136:1", tooltip: "Thank Jehovah always." }
    ]
  },
  {
    title: "Purity in Heart",
    icon: "fas fa-heart",
    summary: "Purity in heart is essential for seeing Jehovah, as Jesus taught (Matthew 5:8). Nathanael’s sincerity impressed Jesus (John 1:47). False religions harbor hypocrisy, like the Pharisees’ outward show (Matthew 23:27), leading to spiritual ruin. True worshipers maintain pure motives, as David sought (Psalm 51:10), ensuring Jehovah’s approval. A pure heart fosters genuine worship and secures eternal life in Jehovah’s Kingdom. In contrast, impure motives, like Ananias’ deceit (Acts 5:3), lead to divine disapproval and spiritual ruin, as they defile devotion to Jehovah.",
    scriptures: [
      { text: "Happy are the pure in heart, since they will see God.", reference: "Matthew 5:8", tooltip: "Purity leads to Jehovah." },
      { text: "Create in me a clean heart, O God.", reference: "Psalm 51:10", tooltip: "Seek a pure heart." }
    ]
  },
  {
    title: "Trust in Jehovah’s Protection",
    icon: "fas fa-shield-alt",
    summary: "Trusting Jehovah’s protection ensures safety, as He is a refuge (Psalm 91:2). Shadrach, Meshach, and Abednego trusted Jehovah in the fiery furnace (Daniel 3:28). False religions rely on human strength, like Israel’s trust in Egypt (Isaiah 31:1), leading to spiritual ruin. True worshipers depend on Jehovah, as David did (1 Samuel 17:45), ensuring His approval. Trust in Jehovah’s protection offers eternal life and peace. In contrast, self-reliance, like Sennacherib’s arrogance (2 Kings 18:35), leads to divine disapproval and spiritual ruin, as it denies Jehovah’s power.",
    scriptures: [
      { text: "Jehovah is my refuge and my stronghold.", reference: "Psalm 91:2", tooltip: "Jehovah protects." },
      { text: "Trust in Jehovah with all your heart.", reference: "Proverbs 3:5", tooltip: "Trust ensures safety." }
    ]
  },
  {
    title: "Hospitality Honors Jehovah",
    icon: "fas fa-door-open",
    summary: "Hospitality reflects Jehovah’s generosity, as He welcomes the humble (Luke 14:13-14). Abraham hosted angels, showing kindness (Genesis 18:2-5). False religions neglect strangers, like Sodom’s cruelty (Genesis 19:4-5), leading to spiritual ruin. True worshipers practice hospitality, as Gaius did (3 John 5-8), ensuring Jehovah’s approval. Hospitality strengthens bonds and supports Jehovah’s work, offering eternal life. In contrast, inhospitality, like the Pharisees’ exclusivity (Luke 7:39), leads to divine disapproval and spiritual ruin, as it opposes Jehovah’s love.",
    scriptures: [
      { text: "Do not forget hospitality, for through it some entertained angels.", reference: "Hebrews 13:2", tooltip: "Hospitality is godly." },
      { text: "Share with the holy ones according to their needs.", reference: "Romans 12:13", tooltip: "Hospitality supports others." }
    ]
  },
  {
    title: "Wisdom Guides Decisions",
    icon: "fas fa-lightbulb",
    summary: "Jehovah’s wisdom guides decisions, ensuring righteous choices (Proverbs 2:6). Solomon’s wise judgment blessed Israel (1 Kings 3:28). False religions rely on human reasoning, like Ahithophel’s flawed counsel (2 Samuel 17:14), leading to spiritual ruin. True worshipers seek Jehovah’s wisdom, as James urged (James 1:5), ensuring His approval. Wisdom aligns actions with Jehovah’s will, offering eternal life in His Kingdom. In contrast, folly, like Rehoboam’s rashness (1 Kings 12:13), leads to divine disapproval and spiritual ruin, as it ignores Jehovah’s guidance.",
    scriptures: [
      { text: "Jehovah himself gives wisdom.", reference: "Proverbs 2:6", tooltip: "Wisdom comes from Jehovah." },
      { text: "If any of you is lacking in wisdom, let him keep asking God.", reference: "James 1:5", tooltip: "Seek divine wisdom." }
    ]
  },
  {
    title: "Mercy Reflects Jehovah",
    icon: "fas fa-hand-holding-water",
    summary: "Mercy reflects Jehovah’s compassion, as He forgives the repentant (Micah 7:18). The Good Samaritan showed mercy to a stranger (Luke 10:33-37). False religions lack mercy, like the Pharisees’ harshness (Matthew 23:23), leading to spiritual ruin. True worshipers practice mercy, as Jesus taught (Luke 6:36), ensuring Jehovah’s approval. Mercy fosters love and draws others to Jehovah’s truth, offering eternal life. In contrast, mercilessness, like Israel’s oppression (Amos 4:1), leads to divine disapproval and spiritual ruin, as it defies Jehovah’s character.",
    scriptures: [
      { text: "Who is a God like you, pardoning error?", reference: "Micah 7:18", tooltip: "Jehovah is merciful." },
      { text: "Be merciful, just as your Father is merciful.", reference: "Luke 6:36", tooltip: "Imitate Jehovah’s mercy." }
    ]
  },
  {
    title: "Zeal for True Worship",
    icon: "fas fa-fire-alt",
    summary: "Zeal for Jehovah’s worship drives true Christians, as Jesus cleansed the temple (John 2:17). Phinehas’ zeal stopped a plague (Numbers 25:11). False religions lack passion, like Israel’s apathy (Haggai 1:4), leading to spiritual ruin. True worshipers serve zealously, as Paul did (Romans 12:11), ensuring Jehovah’s approval. Zeal fuels preaching and worship, securing eternal life in Jehovah’s Kingdom. In contrast, lukewarmness, like Laodicea’s attitude (Revelation 3:16), leads to divine disapproval and spiritual ruin, as it dishonors Jehovah’s name.",
    scriptures: [
      { text: "Zeal for your house has consumed me.", reference: "John 2:17", tooltip: "Zeal drives worship." },
      { text: "Do not be lacking in zeal.", reference: "Romans 12:11", tooltip: "Zeal is essential." }
    ]
  },
  {
    title: "Faithful Stewardship",
    icon: "fas fa-coins",
    summary: "Faithful stewardship of Jehovah’s gifts honors Him, as He entrusts us with resources (1 Peter 4:10). The faithful slave used his talents wisely (Matthew 25:21). False religions misuse resources, like Israel’s greedy priests (Malachi 3:8), leading to spiritual ruin. True worshipers manage gifts faithfully, as Onesimus did (Colossians 4:9), ensuring Jehovah’s approval. Stewardship supports Jehovah’s work and secures eternal life. In contrast, wastefulness, like Gehazi’s greed (2 Kings 5:20), leads to divine disapproval and spiritual ruin, as it dishonors Jehovah’s trust.",
    scriptures: [
      { text: "Each one should use whatever gift he has received to serve others.", reference: "1 Peter 4:10", tooltip: "Stewardship serves others." },
      { text: "Well done, good and faithful slave!", reference: "Matthew 25:21", tooltip: "Faithfulness brings reward." }
    ]
  },
  {
    title: "Joy in Jehovah’s Service",
    icon: "fas fa-smile-beam",
    summary: "Joy in serving Jehovah strengthens faith, as He loves cheerful givers (2 Corinthians 9:7). Nehemiah’s people rejoiced in worship (Nehemiah 8:10). False religions serve grudgingly, like Israel’s reluctant offerings (Malachi 1:13), leading to spiritual ruin. True worshipers find joy, as Paul did in trials (Philippians 1:4), ensuring Jehovah’s approval. Joy reflects trust in Jehovah’s promises, offering eternal life. In contrast, joylessness, like the Pharisees’ burden (Matthew 23:4), leads to divine disapproval and spiritual ruin, as it lacks Jehovah’s spirit.",
    scriptures: [
      { text: "The joy of Jehovah is your stronghold.", reference: "Nehemiah 8:10", tooltip: "Joy strengthens faith." },
      { text: "God loves a cheerful giver.", reference: "2 Corinthians 9:7", tooltip: "Joyful service pleases Jehovah." }
    ]
  },
  {
    title: "Unity Among Christians",
    icon: "fas fa-users",
    summary: "Unity among Christians reflects Jehovah’s purpose, as Jesus prayed for oneness (John 17:21). Early Christians shared everything, showing unity (Acts 4:32). False religions are divided, like Israel’s factions (1 Kings 12:16), leading to spiritual ruin. True worshipers maintain unity, as Paul urged (Ephesians 4:3), ensuring Jehovah’s approval. Unity strengthens worship and secures eternal life in Jehovah’s Kingdom. In contrast, division, like Corinth’s disputes (1 Corinthians 1:10), leads to divine disapproval and spiritual ruin, as it defies Jehovah’s will.",
    scriptures: [
      { text: "That they may all be one, just as you, Father, are in union with me.", reference: "John 17:21", tooltip: "Unity reflects Jehovah." },
      { text: "Make every effort to keep the unity of the spirit.", reference: "Ephesians 4:3", tooltip: "Unity is essential." }
    ]
  },
  {
    title: "Patience in Waiting",
    icon: "fas fa-hourglass-half",
    summary: "Patience in waiting on Jehovah demonstrates faith, as He acts in His time (Habakkuk 2:3). Abraham waited patiently for Isaac (Hebrews 6:15). False religions seek instant solutions, like Israel’s golden calf (Exodus 32:1), leading to spiritual ruin. True worshipers wait patiently, as David did (Psalm 40:1), ensuring Jehovah’s approval. Patience strengthens trust in Jehovah’s promises, offering eternal life. In contrast, impatience, like Saul’s rashness (1 Samuel 13:9), leads to divine disapproval and spiritual ruin, as it distrusts Jehovah’s timing.",
    scriptures: [
      { text: "The vision is yet for the appointed time... it will not be late.", reference: "Habakkuk 2:3", tooltip: "Jehovah’s timing is perfect." },
      { text: "I waited patiently for Jehovah.", reference: "Psalm 40:1", tooltip: "Patience brings deliverance." }
    ]
  },
  {
    title: "Courage in Witnessing",
    icon: "fas fa-microphone",
    summary: "Courage in witnessing about Jehovah’s Kingdom is vital, as Jesus commissioned (Acts 1:8). Stephen boldly testified, even facing death (Acts 7:59-60). False religions shrink from preaching, like Israel’s silent prophets (Micah 3:8), leading to spiritual ruin. True worshipers witness courageously, as Paul did (Acts 20:21), ensuring Jehovah’s approval. Courage in sharing truth advances Jehovah’s purpose and secures eternal life. In contrast, fearfulness, like Peter’s denial (Luke 22:57), leads to divine disapproval and spiritual ruin, as it hinders Jehovah’s work.",
    scriptures: [
      { text: "You will be witnesses of me... to the most distant part of the earth.", reference: "Acts 1:8", tooltip: "Witnessing is a command." },
      { text: "Be courageous and strong.", reference: "Joshua 1:9", tooltip: "Courage supports witnessing." }
    ]
  },
  {
    title: "Loyalty to Jehovah’s Standards",
    icon: "fas fa-anchor",
    summary: "Loyalty to Jehovah’s standards ensures His favor, as He values faithfulness (Psalm 18:25). Daniel remained loyal, praying despite a ban (Daniel 6:10). False religions compromise standards, like Israel’s idolatry (Hosea 4:17), leading to spiritual ruin. True worshipers uphold Jehovah’s principles, as Joseph did (Genesis 39:9), ensuring His approval. Loyalty reflects trust in Jehovah’s ways, offering eternal life. In contrast, disloyalty, like Solomon’s idolatry (1 Kings 11:4), leads to divine disapproval and spiritual ruin, as it betrays Jehovah’s trust.",
    scriptures: [
      { text: "With someone loyal you act in loyalty.", reference: "Psalm 18:25", tooltip: "Loyalty brings Jehovah’s favor." },
      { text: "Hold fast to what is fine.", reference: "1 Thessalonians 5:21", tooltip: "Uphold Jehovah’s standards." }
    ]
  },
  {
    title: "Hope in Jehovah’s Promises",
    icon: "fas fa-star",
    summary: "Hope in Jehovah’s promises sustains faith, as He never fails (Romans 15:4). Abraham hoped in a future city, trusting Jehovah (Hebrews 11:10). False religions offer empty hopes, like Israel’s false gods (Jeremiah 2:11), leading to spiritual ruin. True worshipers hold fast to hope, as Paul did (Acts 24:15), ensuring Jehovah’s approval. Hope anchors believers in Jehovah’s Kingdom, offering eternal life. In contrast, despair, like Israel’s complaints (Numbers 14:2), leads to divine disapproval and spiritual ruin, as it rejects Jehovah’s faithfulness.",
    scriptures: [
      { text: "We have this hope as an anchor for the soul.", reference: "Hebrews 6:19", tooltip: "Hope stabilizes faith." },
      { text: "Hope does not lead to disappointment.", reference: "Romans 5:5", tooltip: "Jehovah’s promises are sure." }
    ]
  },
  {
    title: "Humility Before Jehovah",
    icon: "fas fa-user",
    summary: "Humility before Jehovah ensures His favor, as He exalts the humble (James 4:10). Moses’ meekness made him a faithful leader (Numbers 12:3). False religions promote pride, like Nebuchadnezzar’s arrogance (Daniel 4:30), leading to spiritual ruin. True worshipers cultivate humility, as Jesus exemplified (Philippians 2:8), ensuring Jehovah’s approval. Humility fosters unity and prepares us for eternal life in Jehovah’s Kingdom. In contrast, pride, like Uzziah’s presumption (2 Chronicles 26:16), leads to divine disapproval and spiritual ruin, as it opposes Jehovah’s will.",
    scriptures: [
      { text: "Humble yourselves in the sight of Jehovah, and he will exalt you.", reference: "James 4:10", tooltip: "Humility brings exaltation." },
      { text: "Whoever exalts himself will be humbled.", reference: "Matthew 23:12", tooltip: "Pride leads to downfall." }
    ]
  },
  {
    title: "Love Unifies Jehovah’s People",
    icon: "fas fa-heart-circle",
    summary: "Love unifies Jehovah’s people, as Jesus taught it identifies true disciples (John 13:35). Early Christians shared resources, showing love (Acts 2:44-45). False religions foster division, like Israel’s factions (1 Kings 12:16), leading to spiritual ruin. True worshipers love deeply, as Peter urged (1 Peter 4:8), ensuring Jehovah’s approval. Love strengthens the congregation and reflects Jehovah’s character, offering eternal life. In contrast, hatred, like Cain’s envy (Genesis 4:5), leads to divine disapproval and spiritual ruin, as it defies Jehovah’s command to love.",
    scriptures: [
      { text: "By this all will know that you are my disciples—if you have love among yourselves.", reference: "John 13:35", tooltip: "Love identifies disciples." },
      { text: "Love covers a multitude of sins.", reference: "1 Peter 4:8", tooltip: "Love unifies." }
    ]
  },

{
    title: "Barzillai’s Generosity Supports",
    icon: "fas fa-gift",
    summary: "Barzillai’s generosity in providing for David during his flight from Absalom reflects Jehovah’s giving nature (2 Samuel 17:27-29). His selflessness contrasts with the greed of Ahithophel, who betrayed David for gain. False religions hoard resources, like Israel’s corrupt priests (Malachi 3:8), leading to spiritual ruin. True worshipers, like Barzillai, give freely to support Jehovah’s servants, ensuring His approval. Barzillai’s example teaches us to prioritize others’ needs, fostering unity and securing eternal life in Jehovah’s Kingdom. In contrast, selfishness, like Ananias’ deceit (Acts 5:1-2), leads to divine disapproval and spiritual ruin, as it dishonors Jehovah’s call to generosity.",
    scriptures: [
      { text: "Barzillai... brought... provisions for David.", reference: "2 Samuel 17:27-29", tooltip: "Generosity aids Jehovah’s work." },
      { text: "There is more happiness in giving than in receiving.", reference: "Acts 20:35", tooltip: "Giving brings joy." }
    ]
  },
  {
    title: "Jehu’s Zeal Purifies",
    icon: "fas fa-fire",
    summary: "Jehu’s zeal in destroying Baal worship in Israel purified the land, fulfilling Jehovah’s command (2 Kings 10:28). His decisiveness contrasts with Ahab’s idolatry, which defiled worship. False religions tolerate false worship, like Judah’s high places (2 Kings 12:3), leading to spiritual ruin. True worshipers, like Jehu, act boldly to uphold Jehovah’s standards, ensuring His approval. Jehu’s example teaches us to reject compromise in worship, securing eternal life. In contrast, tolerance of falsehood, like Israel’s mixed worship (2 Kings 17:33), leads to divine disapproval and spiritual ruin, as it betrays Jehovah’s exclusive devotion.",
    scriptures: [
      { text: "Jehu wiped out Baal from Israel.", reference: "2 Kings 10:28", tooltip: "Zeal purifies worship." },
      { text: "You must be holy, because I am holy.", reference: "1 Peter 1:16", tooltip: "Holiness in worship." }
    ]
  },
  {
    title: "Asa’s Reforms Strengthen",
    icon: "fas fa-broom",
    summary: "Asa’s reforms in removing idols strengthened Judah’s worship, showing reliance on Jehovah (2 Chronicles 14:3-4). His faith contrasts with Rehoboam’s apostasy, which weakened the nation. False religions cling to idols, like Israel’s calves (1 Kings 12:28), leading to spiritual ruin. True worshipers, like Asa, purify worship, ensuring Jehovah’s approval. Asa’s example teaches us to remove false practices from our lives, securing eternal life in Jehovah’s Kingdom. In contrast, apostasy, like Manasseh’s idolatry (2 Chronicles 33:6), leads to divine disapproval and spiritual ruin, as it defiles Jehovah’s worship.",
    scriptures: [
      { text: "Asa removed the foreign altars and the high places.", reference: "2 Chronicles 14:3", tooltip: "Reforms honor Jehovah." },
      { text: "Get out from among them, and separate yourselves.", reference: "2 Corinthians 6:17", tooltip: "Purity in worship." }
    ]
  },
  {
    title: "Joash’s Early Devotion",
    icon: "fas fa-child",
    summary: "Joash’s early devotion under Jehoiada’s guidance restored Jehovah’s temple, showing youthful zeal (2 Chronicles 24:4-6). His obedience contrasts with his later apostasy, which led to ruin. False religions neglect Jehovah’s worship, like Judah’s defiled altars (2 Chronicles 28:24), leading to spiritual ruin. True worshipers, like young Joash, serve Jehovah wholeheartedly, ensuring His approval. Joash’s example teaches us to start serving Jehovah early, securing eternal life. In contrast, turning from truth, like Joash’s later idolatry (2 Chronicles 24:18), leads to divine disapproval and spiritual ruin, as it rejects Jehovah’s guidance.",
    scriptures: [
      { text: "Joash set his heart on repairing the house of Jehovah.", reference: "2 Chronicles 24:4", tooltip: "Devotion restores worship." },
      { text: "Train a boy in the way he should go.", reference: "Proverbs 22:6", tooltip: "Early training endures." }
    ]
  },
  {
    title: "Uzziah’s Early Faith",
    icon: "fas fa-crown",
    summary: "Uzziah’s early faith in seeking Jehovah brought prosperity to Judah, as he trusted God’s guidance (2 Chronicles 26:5). His success contrasts with his later pride, which led to leprosy. False religions rely on human strength, like Israel’s alliances (Hosea 7:11), leading to spiritual ruin. True worshipers, like young Uzziah, seek Jehovah’s direction, ensuring His approval. Uzziah’s example teaches us to remain humble in success, securing eternal life. In contrast, pride, like Uzziah’s presumption (2 Chronicles 26:16), leads to divine disapproval and spiritual ruin, as it defies Jehovah’s authority.",
    scriptures: [
      { text: "He kept searching for God in the days of Zechariah.", reference: "2 Chronicles 26:5", tooltip: "Faith brings blessings." },
      { text: "Pride is before a crash.", reference: "Proverbs 16:18", tooltip: "Humility prevents ruin." }
    ]
  },
  {
    title: "Hosea’s Love Reflects",
    icon: "fas fa-heart",
    summary: "Hosea’s love for Gomer, despite her unfaithfulness, mirrors Jehovah’s love for wayward Israel (Hosea 3:1). His loyalty contrasts with Israel’s idolatry, which broke Jehovah’s heart. False religions promote disloyalty, like Judah’s apostasy (Jeremiah 3:8), leading to spiritual ruin. True worshipers, like Hosea, reflect Jehovah’s enduring love, ensuring His approval. Hosea’s example teaches us to love despite betrayal, securing eternal life in Jehovah’s Kingdom. In contrast, hardheartedness, like Israel’s rejection (Hosea 4:17), leads to divine disapproval and spiritual ruin, as it spurns Jehovah’s mercy.",
    scriptures: [
      { text: "Go again, love a woman loved by another.", reference: "Hosea 3:1", tooltip: "Love reflects Jehovah." },
      { text: "Love never fails.", reference: "1 Corinthians 13:8", tooltip: "Love endures all." }
    ]
  },
  {
    title: "Amos’ Boldness Proclaims",
    icon: "fas fa-bullhorn",
    summary: "Amos’ boldness in proclaiming Jehovah’s judgment against Israel’s injustice showed unwavering faith (Amos 7:15). His courage contrasts with Israel’s corrupt priests, who silenced truth. False religions suppress truth, like Judah’s false prophets (Jeremiah 23:16), leading to spiritual ruin. True worshipers, like Amos, speak Jehovah’s word fearlessly, ensuring His approval. Amos’ example teaches us to proclaim truth despite opposition, securing eternal life. In contrast, silence, like Israel’s complacent leaders (Amos 6:1), leads to divine disapproval and spiritual ruin, as it neglects Jehovah’s call to warn.",
    scriptures: [
      { text: "Jehovah took me from following the flock and said to me, ‘Go, prophesy.’", reference: "Amos 7:15", tooltip: "Boldness in preaching." },
      { text: "Preach the word; be at it urgently.", reference: "2 Timothy 4:2", tooltip: "Proclaim truth." }
    ]
  },
  {
    title: "Obadiah’s Mercy Shelters",
    icon: "fas fa-shield-alt",
    summary: "Obadiah’s mercy in hiding Jehovah’s prophets from Jezebel’s wrath showed courage and compassion (1 Kings 18:4). His faith contrasts with Ahab’s apostasy, which endangered God’s servants. False religions persecute the faithful, like Babylon’s oppression (Daniel 3:12), leading to spiritual ruin. True worshipers, like Obadiah, protect Jehovah’s people, ensuring His approval. Obadiah’s example teaches us to show mercy under pressure, securing eternal life. In contrast, cruelty, like Jezebel’s murders (1 Kings 18:13), leads to divine disapproval and spiritual ruin, as it opposes Jehovah’s love.",
    scriptures: [
      { text: "Obadiah... hid 100 prophets.", reference: "1 Kings 18:4", tooltip: "Mercy protects the faithful." },
      { text: "Do not withhold good from those to whom it is due.", reference: "Proverbs 3:27", tooltip: "Mercy is godly." }
    ]
  },
  {
    title: "Habakkuk’s Trust Waits",
    icon: "fas fa-hourglass",
    summary: "Habakkuk’s trust in Jehovah’s justice, despite Judah’s turmoil, led him to wait patiently for divine action (Habakkuk 3:16-18). His faith contrasts with Judah’s despair, which sought human solutions. False religions lack trust, like Israel’s reliance on Egypt (Isaiah 31:1), leading to spiritual ruin. True worshipers, like Habakkuk, wait on Jehovah, ensuring His approval. Habakkuk’s example teaches us to trust Jehovah’s timing, securing eternal life in His Kingdom. In contrast, impatience, like Judah’s complaints (Numbers 21:5), leads to divine disapproval and spiritual ruin, as it doubts Jehovah’s plan.",
    scriptures: [
      { text: "I will exult in the God of my salvation.", reference: "Habakkuk 3:18", tooltip: "Trust brings joy." },
      { text: "The vision is yet for the appointed time.", reference: "Habakkuk 2:3", tooltip: "Wait on Jehovah." }
    ]
  },
  {
    title: "Zephaniah’s Warning Awakens",
    icon: "fas fa-exclamation-triangle",
    summary: "Zephaniah’s warning of Jehovah’s day urged Judah to seek righteousness, prompting repentance (Zephaniah 2:3). His boldness contrasts with Judah’s complacent priests. False religions ignore judgment, like Israel’s false prophets (Micah 3:11), leading to spiritual ruin. True worshipers, like Zephaniah, proclaim Jehovah’s warnings, ensuring His approval. Zephaniah’s example teaches us to urge others to seek Jehovah, securing eternal life. In contrast, apathy, like Judah’s indifference (Zephaniah 1:12), leads to divine disapproval and spiritual ruin, as it ignores Jehovah’s call to repent.",
    scriptures: [
      { text: "Seek Jehovah, all you meek ones.", reference: "Zephaniah 2:3", tooltip: "Warnings urge repentance." },
      { text: "The great day of Jehovah is near.", reference: "Zephaniah 1:14", tooltip: "Judgment is certain." }
    ]
  },
  {
    title: "Haggai’s Call Rebuilds",
    icon: "fas fa-trowel",
    summary: "Haggai’s call to rebuild Jehovah’s temple stirred Israel’s zeal, prioritizing worship (Haggai 1:14). His urgency contrasts with Israel’s neglect, which delayed God’s house. False religions prioritize self-interest, like Israel’s luxury (Haggai 1:4), leading to spiritual ruin. True worshipers, like Haggai, urge devotion to Jehovah’s work, ensuring His approval. Haggai’s example teaches us to put Jehovah’s interests first, securing eternal life. In contrast, procrastination, like Israel’s delay (Haggai 1:2), leads to divine disapproval and spiritual ruin, as it dishonors Jehovah’s purpose.",
    scriptures: [
      { text: "Jehovah stirred up the spirit of the people.", reference: "Haggai 1:14", tooltip: "Call to action." },
      { text: "Seek first the Kingdom.", reference: "Matthew 6:33", tooltip: "Prioritize Jehovah." }
    ]
  },
  {
    title: "Zechariah’s Vision Encourages",
    icon: "fas fa-eye",
    summary: "Zechariah’s visions encouraged Israel to rebuild the temple, assuring Jehovah’s support (Zechariah 4:6). His hope contrasts with Israel’s discouragement in exile. False religions offer empty promises, like Babylon’s idols (Isaiah 46:1), leading to spiritual ruin. True worshipers, like Zechariah, inspire faith in Jehovah’s promises, ensuring His approval. Zechariah’s example teaches us to encourage others with Jehovah’s truth, securing eternal life. In contrast, despair, like Israel’s doubt (Zechariah 7:13), leads to divine disapproval and spiritual ruin, as it rejects Jehovah’s encouragement.",
    scriptures: [
      { text: "Not by a military force, but by my spirit.", reference: "Zechariah 4:6", tooltip: "Jehovah’s spirit empowers." },
      { text: "Encourage one another.", reference: "1 Thessalonians 5:11", tooltip: "Build up faith." }
    ]
  },
  {
    title: "Malchijah’s Faithfulness Builds",
    icon: "fas fa-hammer",
    summary: "Malchijah’s faithfulness in repairing Jerusalem’s wall under Nehemiah strengthened Israel’s defense (Nehemiah 3:14). His diligence contrasts with Israel’s earlier neglect. False religions shirk duty, like Israel’s lazy priests (Malachi 1:13), leading to spiritual ruin. True worshipers, like Malchijah, work diligently for Jehovah, ensuring His approval. Malchijah’s example teaches us to contribute to Jehovah’s work, securing eternal life. In contrast, negligence, like Israel’s apathy (Haggai 1:9), leads to divine disapproval and spiritual ruin, as it dishonors Jehovah’s call to serve.",
    scriptures: [
      { text: "Malchijah... repaired the Dung Gate.", reference: "Nehemiah 3:14", tooltip: "Faithfulness strengthens." },
      { text: "Whatever you are doing, work at it whole-souled.", reference: "Colossians 3:23", tooltip: "Diligence honors Jehovah." }
    ]
  },
  {
    title: "Shadrach’s Loyalty Endures",
    icon: "fas fa-fire-alt",
    summary: "Shadrach’s loyalty to Jehovah, refusing to bow to Nebuchadnezzar’s image, led to miraculous deliverance (Daniel 3:17-18). His faith contrasts with Babylon’s idolatry. False religions compromise under pressure, like Israel’s apostasy (Hosea 4:17), leading to spiritual ruin. True worshipers, like Shadrach, stand firm, ensuring Jehovah’s approval. Shadrach’s example teaches us to remain loyal despite threats, securing eternal life. In contrast, cowardice, like Israel’s conformity (Daniel 3:7), leads to divine disapproval and spiritual ruin, as it betrays Jehovah’s exclusive worship.",
    scriptures: [
      { text: "Our God whom we serve is able to rescue us.", reference: "Daniel 3:17", tooltip: "Loyalty trusts Jehovah." },
      { text: "Hold fast to what is fine.", reference: "1 Thessalonians 5:21", tooltip: "Loyalty to standards." }
    ]
  },
  {
    title: "Meshach’s Courage Stands",
    icon: "fas fa-shield",
    summary: "Meshach’s courage in defying Nebuchadnezzar’s idol, alongside his companions, showed unwavering faith (Daniel 3:28). His resolve contrasts with Babylon’s fear-driven worship. False religions yield to fear, like Israel’s alliances (2 Kings 16:7), leading to spiritual ruin. True worshipers, like Meshach, face trials boldly, ensuring Jehovah’s approval. Meshach’s example teaches us to uphold Jehovah’s worship under pressure, securing eternal life. In contrast, compromise, like Judah’s idolatry (2 Chronicles 28:23), leads to divine disapproval and spiritual ruin, as it forsakes Jehovah’s protection.",
    scriptures: [
      { text: "God sent his angel and rescued his servants.", reference: "Daniel 3:28", tooltip: "Courage brings deliverance." },
      { text: "Be courageous and strong.", reference: "Joshua 1:9", tooltip: "Courage honors Jehovah." }
    ]
  },
  {
    title: "Abednego’s Trust Triumphs",
    icon: "fas fa-cross",
    summary: "Abednego’s trust in Jehovah, refusing to worship Nebuchadnezzar’s image, led to his preservation in the furnace (Daniel 3:18). His faith contrasts with Babylon’s idolatry. False religions trust in false gods, like Israel’s Baal worship (1 Kings 16:32), leading to spiritual ruin. True worshipers, like Abednego, rely on Jehovah, ensuring His approval. Abednego’s example teaches us to trust Jehovah in trials, securing eternal life. In contrast, idolatry, like Judah’s apostasy (2 Chronicles 33:6), leads to divine disapproval and spiritual ruin, as it rejects Jehovah’s sovereignty.",
    scriptures: [
      { text: "Even if he does not, we will not serve your gods.", reference: "Daniel 3:18", tooltip: "Trust in Jehovah alone." },
      { text: "Trust in Jehovah with all your heart.", reference: "Proverbs 3:5", tooltip: "Trust ensures salvation." }
    ]
  },
  {
    title: "Mordecai’s Integrity Shines",
    icon: "fas fa-star",
    summary: "Mordecai’s integrity in refusing to bow to Haman upheld Jehovah’s standards, risking his life (Esther 3:2-4). His loyalty contrasts with Haman’s pride, which led to ruin. False religions compromise principles, like Israel’s idolatry (2 Kings 17:7), leading to spiritual ruin. True worshipers, like Mordecai, stand firm, ensuring Jehovah’s approval. Mordecai’s example teaches us to uphold righteousness, securing eternal life. In contrast, compromise, like Ahab’s concessions (1 Kings 20:34), leads to divine disapproval and spiritual ruin, as it betrays Jehovah’s truth.",
    scriptures: [
      { text: "Mordecai would not bow down or do obeisance.", reference: "Esther 3:2", tooltip: "Integrity honors Jehovah." },
      { text: "The one who is faithful in what is least is also faithful in much.", reference: "Luke 16:10", tooltip: "Faithfulness matters." }
    ]
  },
  {
    title: "Job’s Integrity Endures",
    icon: "fas fa-balance-scale",
    summary: "Job’s integrity, despite Satan’s trials, proved his devotion to Jehovah, refusing to curse God (Job 2:9-10). His steadfastness contrasts with his wife’s despair. False religions falter in trials, like Israel’s complaints (Numbers 14:2), leading to spiritual ruin. True worshipers, like Job, hold fast to integrity, ensuring Jehovah’s approval. Job’s example teaches us to endure suffering faithfully, securing eternal life. In contrast, giving up, like Demas’ desertion (2 Timothy 4:10), leads to divine disapproval and spiritual ruin, as it rejects Jehovah’s strength.",
    scriptures: [
      { text: "In all this, Job did not sin with his lips.", reference: "Job 2:10", tooltip: "Integrity endures trials." },
      { text: "The one who has endured to the end will be saved.", reference: "Matthew 24:13", tooltip: "Endurance saves." }
    ]
  },
  {
    title: "Mary Magdalene’s Devotion",
    icon: "fas fa-female",
    summary: "Mary Magdalene’s devotion to Jesus, supporting his ministry and staying at his execution, showed deep faith (Luke 8:2-3). Her loyalty contrasts with the disciples’ initial fear. False religions lack commitment, like Israel’s wavering (Hosea 6:4), leading to spiritual ruin. True worshipers, like Mary, serve Jehovah steadfastly, ensuring His approval. Her example teaches us to remain devoted in adversity, securing eternal life. In contrast, desertion, like Judas’ betrayal (Matthew 26:14), leads to divine disapproval and spiritual ruin, as it abandons Jehovah’s purpose.",
    scriptures: [
      { text: "Mary Magdalene... ministered to them from their belongings.", reference: "Luke 8:2-3", tooltip: "Devotion supports Jehovah’s work." },
      { text: "A true companion loves all the time.", reference: "Proverbs 17:17", tooltip: "Loyalty endures." }
    ]
  },
  {
    title: "Joanna’s Support Strengthens",
    icon: "fas fa-hand-holding-heart",
    summary: "Joanna’s support for Jesus’ ministry, using her resources, strengthened his work (Luke 8:3). Her generosity contrasts with the Pharisees’ greed, which hindered truth. False religions hoard wealth, like Israel’s priests (Malachi 3:8), leading to spiritual ruin. True worshipers, like Joanna, give to Jehovah’s cause, ensuring His approval. Joanna’s example teaches us to support Jehovah’s work generously, securing eternal life. In contrast, selfishness, like Ananias’ withholding (Acts 5:1), leads to divine disapproval and spiritual ruin, as it opposes Jehovah’s call to give.",
    scriptures: [
      { text: "Joanna... provided for them out of their belongings.", reference: "Luke 8:3", tooltip: "Support aids Jehovah’s work." },
      { text: "God loves a cheerful giver.", reference: "2 Corinthians 9:7", tooltip: "Generosity pleases Jehovah." }
    ]
  },
  {
    title: "Barnabas’ Encouragement Uplifts",
    icon: "fas fa-hands-helping",
    summary: "Barnabas’ encouragement of early Christians, like Paul, strengthened the congregation (Acts 11:23-24). His kindness contrasts with the Pharisees’ criticism, which discouraged faith. False religions tear down, like Israel’s false prophets (Jeremiah 23:14), leading to spiritual ruin. True worshipers, like Barnabas, uplift others, ensuring Jehovah’s approval. Barnabas’ example teaches us to encourage brothers, securing eternal life. In contrast, criticism, like Miriam’s slander (Numbers 12:1), leads to divine disapproval and spiritual ruin, as it harms Jehovah’s people.",
    scriptures: [
      { text: "He encouraged them all to remain with a resolute heart.", reference: "Acts 11:23", tooltip: "Encouragement builds faith." },
      { text: "Encourage one another and build one another up.", reference: "1 Thessalonians 5:11", tooltip: "Uplift others." }
    ]
  },
  {
    title: "Priscilla’s Teaching Edifies",
    icon: "fas fa-book-open",
    summary: "Priscilla’s teaching, alongside Aquila, helped Apollos understand Jehovah’s truth accurately (Acts 18:26). Her zeal contrasts with the Jews’ ignorance, which resisted truth. False religions reject instruction, like Israel’s priests (Hosea 4:6), leading to spiritual ruin. True worshipers, like Priscilla, teach Jehovah’s Word, ensuring His approval. Priscilla’s example teaches us to share truth lovingly, securing eternal life. In contrast, silence, like Israel’s negligent leaders (Micah 3:11), leads to divine disapproval and spiritual ruin, as it withholds Jehovah’s truth.",
    scriptures: [
      { text: "They took him aside and explained the way of God more accurately.", reference: "Acts 18:26", tooltip: "Teaching edifies." },
      { text: "Make disciples... teaching them.", reference: "Matthew 28:19-20", tooltip: "Teach Jehovah’s truth." }
    ]
  },
  {
    title: "Aquila’s Partnership Strengthens",
    icon: "fas fa-users",
    summary: "Aquila’s partnership with Priscilla in teaching and supporting Paul strengthened early Christians (Acts 18:2-3). His cooperation contrasts with the Jews’ division, which hindered truth. False religions foster discord, like Corinth’s factions (1 Corinthians 1:10), leading to spiritual ruin. True worshipers, like Aquila, work unitedly, ensuring Jehovah’s approval. Aquila’s example teaches us to collaborate in Jehovah’s work, securing eternal life. In contrast, division, like Israel’s rebellion (1 Kings 12:16), leads to divine disapproval and spiritual ruin, as it disrupts Jehovah’s unity.",
    scriptures: [
      { text: "Aquila and Priscilla... worked together.", reference: "Acts 18:2-3", tooltip: "Partnership strengthens." },
      { text: "Make every effort to keep the unity of the spirit.", reference: "Ephesians 4:3", tooltip: "Unity is vital." }
    ]
  },
  {
    title: "Apollos’ Zeal Proclaims",
    icon: "fas fa-microphone",
    summary: "Apollos’ zeal in proclaiming Jehovah’s truth, refined by Priscilla and Aquila, strengthened the congregation (Acts 18:25-26). His fervor contrasts with the Jews’ resistance to truth. False religions lack zeal, like Laodicea’s lukewarmness (Revelationg 3:16), leading to spiritual ruin. True worshipers, like Apollos, preach passionately, ensuring Jehovah’s approval. Apollos’ example teaches us to share truth eagerly, securing eternal life. In contrast, apathy, like Israel’s silence (Micah 3:8), leads to divine disapproval and spiritual ruin, as it neglects Jehovah’s commission.",
    scriptures: [
      { text: "He was aglow with the spirit and spoke boldly.", reference: "Acts 18:25", tooltip: "Zeal in preaching." },
      { text: "Do not be lacking in zeal.", reference: "Romans 12:11", tooltip: "Zeal is essential." }
    ]
  },
  {
    title: "Timothy’s Youthful Service",
    icon: "fas fa-child",
    summary: "Timothy’s youthful service to Jehovah, guided by Paul, strengthened early Christians despite his age (1 Timothy 4:12). His faith contrasts with the Jews’ prejudice against youth. False religions dismiss young servants, like Israel’s neglectful elders (Lamentations 5:14), leading to spiritual ruin. True worshipers, like Timothy, serve regardless of age, ensuring Jehovah’s approval. Timothy’s example teaches us to serve Jehovah early, securing eternal life. In contrast, prejudice, like Elihu’s initial silence (Job 32:6), leads to divine disapproval and spiritual ruin, as it limits Jehovah’s work.",
    scriptures: [
      { text: "Let no man ever look down on your youth.", reference: "1 Timothy 4:12", tooltip: "Youthful service counts." },
      { text: "Train a boy in the way he should go.", reference: "Proverbs 22:6", tooltip: "Early service endures." }
    ]
  },
  {
    title: "Titus’ Leadership Guides",
    icon: "fas fa-user-tie",
    summary: "Titus’ leadership in organizing congregations, as Paul’s delegate, strengthened early Christians (Titus 1:5). His diligence contrasts with Crete’s false teachers, who misled others. False religions promote error, like Israel’s false prophets (Jeremiah 23:16), leading to spiritual ruin. True worshipers, like Titus, guide with truth, ensuring Jehovah’s approval. Titus’ example teaches us to lead with integrity, securing eternal life. In contrast, false teaching, like Hymenaeus’ error (2 Timothy 2:17), leads to divine disapproval and spiritual ruin, as it corrupts Jehovah’s truth.",
    scriptures: [
      { text: "Appoint elders in every city as I directed you.", reference: "Titus 1:5", tooltip: "Leadership strengthens." },
      { text: "Shepherd the flock of God.", reference: "1 Peter 5:2", tooltip: "Lead with care." }
    ]
  },
  {
    title: "Avoiding Worldly Desires",
    icon: "fas fa-ban",
    summary: "Avoiding worldly desires honors Jehovah, who calls for holiness (1 John 2:15-16). Daniel refused Babylon’s delicacies, maintaining purity (Daniel 1:8). False religions indulge in worldliness, like Israel’s immorality (Numbers 25:1-2), leading to spiritual ruin. True worshipers reject worldly temptations, as Paul urged (Romans 12:2), ensuring Jehovah’s approval. Daniel’s example teaches us to stay separate from worldly influences, securing eternal life. In contrast, worldliness, like Demas’ love for the world (2 Timothy 4:10), leads to divine disapproval and spiritual ruin, as it defiles Jehovah’s worship.",
    scriptures: [
      { text: "Do not love either the world or the things in the world.", reference: "1 John 2:15", tooltip: "Avoid worldliness." },
      { text: "Do not be conformed to this system of things.", reference: "Romans 12:2", tooltip: "Stay separate." }
    ]
  },
  {
    title: "Honesty in Speech",
    icon: "fas fa-comment",
    summary: "Honesty in speech reflects Jehovah’s truth, as He hates lies (Proverbs 12:22). Nathanael’s sincerity earned Jesus’ praise (John 1:47). False religions promote deceit, like Ananias’ lie (Acts 5:3), leading to spiritual ruin. True worshipers speak truthfully, as Paul urged (Ephesians 4:25), ensuring Jehovah’s approval. Nathanael’s example teaches us to be honest in all dealings, securing eternal life. In contrast, dishonesty, like Gehazi’s deception (2 Kings 5:22), leads to divine disapproval and spiritual ruin, as it dishonors Jehovah’s truth.",
    scriptures: [
      { text: "Jehovah detests a lying tongue.", reference: "Proverbs 12:22", tooltip: "Honesty pleases Jehovah." },
      { text: "Speak truth each one with his neighbor.", reference: "Ephesians 4:25", tooltip: "Truth builds trust." }
    ]
  },
  {
    title: "Perseverance in Prayer",
    icon: "fas fa-pray",
    summary: "Perseverance in prayer draws us closer to Jehovah, as He hears the persistent (Luke 18:1-7). Hannah’s persistent prayer for a son was answered (1 Samuel 1:11-12). False religions rely on rituals, like Israel’s vain prayers (Isaiah 1:15), leading to spiritual ruin. True worshipers pray fervently, as James urged (James 5:16), ensuring Jehovah’s approval. Hannah’s example teaches us to pray without ceasing, securing eternal life. In contrast, neglect of prayer, like Israel’s silence (Psalm 83:1), leads to divine disapproval and spiritual ruin, as it forsakes Jehovah’s guidance.",
    scriptures: [
      { text: "She kept praying before Jehovah.", reference: "1 Samuel 1:12", tooltip: "Persistence in prayer." },
      { text: "The prayer of the righteous is powerful.", reference: "James 5:16", tooltip: "Prayer moves Jehovah." }
    ]
  },
  {
    title: "Self-Sacrifice for Others",
    icon: "fas fa-hands-heart",
    summary: "Self-sacrifice for others reflects Jehovah’s love, as Jesus laid down his life (John 15:13). Epaphroditus risked his life serving Paul (Philippians 2:30). False religions prioritize self, like Israel’s greedy leaders (Ezekiel 34:2), leading to spiritual ruin. True worshipers sacrifice for others, as Paul did (2 Corinthians 12:15), ensuring Jehovah’s approval. Epaphroditus’ example teaches us to put others first, securing eternal life. In contrast, selfishness, like Diotrephes’ dominance (3 John 9), leads to divine disapproval and spiritual ruin, as it opposes Jehovah’s love.",
    scriptures: [
      { text: "He risked his life to make up for your not being here.", reference: "Philippians 2:30", tooltip: "Sacrifice serves others." },
      { text: "No one has love greater than this.", reference: "John 15:13", tooltip: "Sacrifice reflects love." }
    ]
  }
];
