export default {
  /*
    Task difficulty descriptions: B345-B346
   */
  taskDifficulty: {
    "+10": {
      label: 'Automatic',
      description: 'Tasks so trivial that the GM should waive the need for a success roll, except under extraordinary circumstances',
      example: 'A Driving roll to start a car.'
    },
    "+8": {
      label: 'Trivial',
      description: 'Situations where failure is extremely unlikely, and would require incredibly bad luck.',
      example: 'A Driving roll to drive around an empty parking lot.'
    },
    "+6": {
      label: 'Very Easy',
      description: 'Tasks where failure is possible, but would require bad luck.',
      example: 'A Driving roll to drive down an empty suburban street.'
    },
    "+4": {
      label: 'Easy',
      description: 'Most mundane tasks, including rolls made by ordinary people at day-to-day jobs.',
      example: 'A Driving roll to commute to work in a small town.'
    },
    "+2": {
      label: 'Very Favorable',
      description: 'Mildly risky tasks that most people would undertake without hesitation.',
      example: 'A Driving roll to commute to work in a teeming metropolis.'
    },
    "+1": {
      label: 'Favorable',
      description: 'Tasks that most people would hesitate at, due to the risk, but that a career adventurer would regard as easy.',
      example: 'A Driving roll to compete in a road rally.'
    },
    "0": {
      label: 'Average',
      description: 'Most adventuring tasks, and the majority of skill use under stress.',
      example: 'A Driving roll in a car chase.'
    },
    "-1": {
      label: 'Unfavorable',
      description: 'Stressful tasks that would challenge a novice adventurer, but not an old hand.',
      example: 'A Driving roll in a high-speed car chase.'
    },
    "-2": {
      label: 'Very Unfavorable',
      description: 'Stressful tasks that would challenge a professional. Skilled adventurers still routinely accept such risks!',
      example: 'A Driving roll in a high-speed car chase on a busy freeway.'
    },
    "-4": {
      label: 'Hard',
      description: 'Tasks so challenging that even an expert will look for alternatives. A true "master" is still unlikely to feel challenged.',
      example: 'A Driving roll to keep the car on the road while shooting a gun out the window during a high-speed chase.'
    },
    "-6": {
      label: 'Very Hard',
      description: 'Situations that even the masters might have second thoughts about.',
      example: 'A Driving roll in a high-speed chase during a blizzard.'
    },
    "-8": {
      label: 'Dangerous',
      description: 'Tasks at which even the greatest masters expect to fail.',
      example: 'A Driving roll while shooting a gun in a high-speed chase during a blizzard.'
    },
    "-10": {
      label: 'Impossible',
      description: 'No sane person would attempt such a task. The GM may wish to forbid such attempts altogether.',
      example: 'A Driving roll to steer a car with the knees while firing a bazooka two-handed during a chase through a blizzard.'
    },


/*

  +10 – Automatic. Tasks so trivial that the GM should waive the need for a success roll, except under extraordinary circumstances. Example: A Driving roll to start a car.
  +8 or +9 – Trivial. Situations where failure is extremely unlikely, and would require incredibly bad luck. Example: A Driving roll to drive around an empty parking lot.
  +6 or +7 – Very Easy. Tasks where failure is possible, but would require bad luck. Example: A Driving roll to drive down an empty suburban street.
  +4 or +5 – Easy. Most mundane tasks, including rolls made by ordinary people at day-to-day jobs. Example: A Driving roll to commute to work in a small town.
  +2 or +3 – Very Favorable. Mildly risky tasks that most people would undertake without hesitation. Example: A Driving roll to commute to work in a teeming metropolis.
  +1 – Favorable. Tasks that most people would hesitate at, due to the risk, but that a career adventurer would regard as easy. Example: A Driving roll to compete in a road rally.
  0 – Average. Most adventuring tasks, and the majority of skill use under stress. Example: A Driving roll in a car chase.
  -1 – Unfavorable. Stressful tasks that would challenge a novice adventurer, but not an old hand. Example: A Driving roll in a high-speed car chase.
  -2 or -3 – Very Unfavorable. Stressful tasks that would challenge a professional. Skilled adventurers still routinely accept such risks! Example: A Driving roll in a high-speed car chase on a busy freeway.
  -4 or -5 – Hard. Tasks so challenging that even an expert will look for alternatives. A true "master" is still unlikely to feel challenged. Example: A Driving roll to keep the car on the road while shooting a gun out the window during a high-speed chase.
  -6 or -7 – Very Hard. Situations that even the masters might have second thoughts about. Example: A Driving roll in a high-speed chase during a blizzard.
  -8 or -9 – Dangerous. Tasks at which even the greatest masters expect to fail. Example: A Driving roll while shooting a gun in a high-speed chase during a blizzard.
  -10 – Impossible. No sane person would attempt such a task. The GM may wish to forbid such attempts altogether. Example: A Driving roll to steer a car with the knees while firing a bazooka two- handed during a chase through a blizzard.

  These modifiers assume a trained character. To get an idea of how tough a task would be for someone working at default, add the default penalty to the difficulty modifier.
*/
  },
  /*
    Meaning of Skill Levels: B172,
    Character Traits: How to Be A GURPS GM p.12,
    Post by Kromm: http://forums.sjgames.com/showthread.php?p=328957
   */
  skills: {
    "7": {
      group: 'Unskilled',
      label: 'Unskilled',
      description: 'Skills used by ordinary folks with no training.',
      addendum: 'default users',
    },
    "8": {
      group: 'Average People',
      label: 'Feeble',
      description: 'Skills remembered from school days.',
      addendum: 'beginners, humorous bumblers',
    },
    "10": {
      group: 'Average People',
      label: 'Average',
      description: 'Most skills, including hobbies, secondary job skills of volunteers, and primary skills of draftees.',
      addendum: 'most non-job skills for ordinary folks',
    },
    "12": {
      group: 'Average People',
      label: 'Competent',
      description: 'Primary job skills of most normal people (including cops, doctors, pilots, and soldiers).',
      addendum: 'most job skills for ordinary folks',
    },
    "14": {
      group: 'Experts',
      label: 'Exceptional',
      description: 'Someone good enough to work under life-or-death conditions (including commandos, field surgeons, and ace pilots).',
      addendum: 'the most seasoned of ordinary folks',
    },
    "16": {
      group: 'Experts',
      label: 'Phenomenal',
      description: 'Someone good enough to stand out in his field, however rarefied (top commando, ace of aces, etc.).',
      addendum: 'distinguished experts',
    },
    "18": {
      group: 'Experts',
      label: 'Heroic',
      description: 'Best of a generation (e.g., the world’s best sniper)',
      addendum: 'extraordinary world-class experts',
    },
    "20": {
      group: 'Masters',
      label: 'Larger-than-Life',
      description: 'Top master alive (presumably good enough to teach the best of a couple of generations).',
      addendum: 'top experts from all of history',
    },
    "22": {
      group: 'Masters',
      label: 'Legendary',
      description: 'Confirmed top master of all time.',
      addendum: '"typical" mythic figures',
    },
    "24": {
      group: 'Masters',
      label: 'Superhuman',
      description: 'Mythic masters, verging on the cinematic.',
      addendum: 'outstanding mythic figures',
    },
    "27": {
      group: 'Deific',
      label: 'Godlike',
      description: 'Beyond the ken of mortal men.',
      addendum: 'greatest mythic figures, gods, etc.',
    }
  },
  skillGroups: {
    Unskilled: {
      label: 'Unskilled',
      minLevel: 7,
      description: '"Average people" without training in a skill will default to an attribute with a penalty ' +
      'that oftentimes puts their effective skill level at 7 or below. This is less impairing than it may seem; ' +
      'most "Easy" everyday tasks made by ordinary people at everyday jobs are made at a +4 or +5, allowing even ' +
      'the unskilled a reasonable chance at success. Some actions are impossible without training. Skills like ' +
      'Alchemy, Karate, and magic spells have no default. Someone without the proper training can’t attempt these things at all.'
    },
    'Average People': {
      minLevel: 8,
      label: 'Average People',
      description: 'For an "average" person, it is reasonable to assume attributes between 9 and 11, and from 20 to 40 points in ' +
      '"life skills" (varying with education and dedication). Most people spread these points fairly evenly over roughly ' +
      'a dozen skills. This will result in skill levels between 8 and 13. Skills used to earn a living tend toward the ' +
      'upper end of this range (12 or 13), while little-used skills and those originating from long-forgotten college ' +
      'courses are at the lower end (8 or 9).'
    },
    Experts: {
      minLevel: 14,
      label: 'Experts',
      description: 'Once your skill level reaches 14, additional levels of skill don’t improve your odds of success much. Furthermore, ' +
      'it can cost a lot of points to acquire higher skill levels. If you are an adventurer, though, the investment is ' +
      'worthwhile, to help you overcome the penalties for difficult tasks. For instance, if you have Lockpicking-23, ' +
      'ordinary locks are no easier for you – you fail on a 17 or 18, no matter what. But when you run into a hard lock that ' +
      'gives -6 to skill, your effective skill is 17 and you still only fail on a 17 or 18!'
    },
    Masters: {
      minLevel: 20,
      label: 'Masters',
      description: 'If you are a "master" in your field, you might be tempted to increase your skill levels ad infinitum. However, a true ' +
      'master has a detailed understanding of every aspect of his calling, best represented by stopping at a masterful ' +
      'level (20 to 25) in the "main" skill and branching out into several "subsidiary" skills. An extreme level (anything ' +
      'over 25) in one skill tends to be excessive and unbelievable – and is frequently less useful than a lesser level ' +
      'combined with one or more subsidiary skills.'
    },
    Deific: {
      minLevel: 27,
      label: 'Deific',
      description: 'Skill levels in this range exceed anything realistically achievable by humans, even in the most ' +
      'cinematic or mythical settings. Success is all but assured on tasks of even Impossible difficulty (-10 or more). ' +
      'While it may be possible for situational modifiers such as those granted from equipment, environment, magic ' +
      'spells, or combat maneuvers to boost a skill into this range under narrow circumstances, base skill levels of 27 ' +
      'or above are placed squarely in the realm of the godlike.'
    }

  },
  /*

  ===

  Average People (8-13)
    8-9: Skills remembered from school days.
    10-11: Most skills, including hobbies, secondary job skills of volunteers, and primary skills of draftees.
    12-13: Primary job skills of most normal people (including cops, doctors, pilots, and soldiers).
  Experts (14-19)
    14-15: Someone good enough to work under life-or-death conditions (including commandos, field surgeons, and ace pilots).
    16-17: Someone good enough to stand out in his field, however rarefied (top commando, ace of aces, etc.).
    18-19: Best of a generation (e.g., the world’s best sniper).
  Masters (20-25)
    20-21: Top master alive (presumably good enough to teach the best of a couple of generations).
    22-23: Confirmed top master of all time.
    24-25: Mythic masters, verging on the cinematic.

  ===

  7 or less: Unskilled (default users)
  8-9: Feeble (beginners, humorous bumblers)
  10-11: Average (most non-job skills for ordinary folks)
  12-13: Competent (most job skills for ordinary folks)
  14-16: Exceptional (the most seasoned of ordinary folks)
  17-19: Heroic (extraordinary world-class experts)
  20-21: Larger-than-Life (top experts from all of history)
  22-23: Legendary ("typical" mythic figures)
  24-26: Superhuman (outstanding mythic figures)
  27 or more: Godlike (greatest mythic figures, gods, etc.)

  ===

  Ordinary Folks
    For an "average" person, it is reasonable to assume attributes between 9 and 11, and from 20 to 40 points in
    "life skills" (varying with education and dedication). Most people spread these points fairly evenly over roughly
    a dozen skills. This will result in skill levels between 8 and 13. Skills used to earn a living tend toward the
    upper end of this range (12 or 13), while little-used skills and those originating from long-forgotten college
    courses are at the lower end (8 or 9).
  Experts
    Once your skill level reaches 14, additional levels of skill don’t improve your odds of success much. Furthermore,
    it can cost a lot of points to acquire higher skill levels. If you are an adventurer, though, the investment is
    worthwhile, to help you overcome the penalties for difficult tasks. For instance, if you have Lockpicking-23,
    ordinary locks are no easier for you – you fail on a 17 or 18, no matter what. But when you run into a hard lock that
    gives -6 to skill, your effective skill is 17 and you still only fail on a 17 or 18!
  Masters
    If you are a "master" in your field, you might be tempted to increase your skill levels ad infinitum. However, a true
    master has a detailed understanding of every aspect of his calling, best represented by stopping at a masterful
    level (20 to 25) in the “main” skill and branching out into several “subsidiary” skills. An extreme level (anything
    over 25) in one skill tends to be excessive and unbelievable – and is frequently less useful than a lesser level
    combined with one or more subsidiary skills.

   */

  /*
    Basic Attribute Descriptions: B14
    Character Traits: How to Be A GURPS GM p.12
   */
  attributes: {
    "6": {
      label: 'Crippling',
      description: 'An attribute this bad severely constrains your lifestyle.',
      addendum: 'Literally – you can’t live a normal life.'
    },
    "7": {
      label: 'Poor',
      description: 'Your limitations are immediately obvious to anyone who meets you. This is the lowest score you can have and still pass for "able-bodied."',
      addendum: 'You can life a normal life, with care, but never be an adventurer.'
    },
    "8": {
      label: 'Below Average',
      description: 'Such scores are limiting, but within the human norm. The GM may forbid attributes below 8 to active adventurers.',
      addendum: 'Low side of able-bodied, probably the lowest an adventurer should ever have.'
    },
    "10": {
      label: 'Average',
      description: 'Most humans get by just fine with a score of 10!',
      addendum: 'Most scores for most people'
    },
    "11": {
      label: 'Above average',
      description: 'These scores are superior, but within the human norm.',
      addendum: 'High side of able-bodied, probably a good average for adventurers.'
    },
    "13": {
      label: 'Exceptional',
      description: 'Such an attribute is immediately apparent – as bulging muscles, feline grace, witty dialog, or glowing health – to those who meet you.',
      addendum: 'Highest you’ll likely meet on the street, above-average for adventurers.'
    },
    "15": {
      label: 'Amazing',
      description: 'An attribute this high draws constant comment and probably guides your career choices.',
      addendum: 'Highest you’ll likely see or hear about, strongly defines an adventurer.'
    },
    "17": {
      label: 'Legendary',
      description: '',
      addendum: 'Historical "bests" and remarkable fictional heroes.'
    },
    "19": {
      label: 'Mythic',
      description: '',
      addendum: 'Astounding even among great heroes in fiction and folklore.'
    },
    "21": {
      label: 'Superhuman',
      description: '',
      addendum: 'Off-limits to humans, barely suitable for great heroes, okay for deities.'
    }
/*

  6 or less: Crippling (literally – you can’t live a normal life).
  7: Poor (you can life a normal life, with care, but never be an adventurer).
  8-9: Below-Average (low side of able-bodied, probably the lowest an adventurer should ever have).
  10: Average (most scores for most people).
  11-12: Above-Average (high side of able-bodied, probably a good average for adventurers).
  13-14: Exceptional (highest you’ll likely meet on the street, above-average for adventurers).
  15-16: Amazing (highest you’ll likely see or hear about, strongly defines an adventurer).
  17-18: Legendary (historical “bests” and remarkable fictional heroes).
  19-20: Mythic (astounding even among great heroes in fiction and folklore).
  21 or more: Superhuman (off-limits to humans, barely suitable for great heroes, okay for deities).
 */
  }
}

//TODO: Equipment Modifiers (p. B345)

//TODO: Hit location penalties (p. B398-B399)

//http://projects.wojtekmaj.pl/react-pdf/
//https://github.com/jaredpalmer/formik