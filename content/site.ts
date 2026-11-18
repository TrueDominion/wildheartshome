// Site wide settings and words. Edit the text between the quotes.

export const site = {
  name: "Wild Hearts Home Bakery",
  shortName: "Wild Hearts",
  /** The live web address, used for search engines and link previews. */
  url: "https://wildheartshomebakery.com",

  /** The Hotplate storefront. Every Order button goes here. */
  hotplateUrl: "https://hotplate.com/tnbhofficial",

  email: "lauren@wildheartshomebakery.com",

  /** TODO(content): Instagram handle without the @. null hides the link. */
  instagram: null as string | null,

  /**
   * Privacy: only the city is ever shown. Never put a street address here.
   */
  location: {
    city: "Worcester",
    region: "MA",
    addressNote: "The exact pickup address is sent with your order confirmation.",
  },

  /** Short description for search engines and link previews. */
  description:
    "Organic sourdough, cookies and cinnamon rolls, baked to order in a Worcester, MA home kitchen. Weekly pickup drops through Hotplate.",

  hero: {
    eyebrow: "Small-batch · Made to order",
    // Wordmark: first word heavy, second in her script, third line heavy.
    wordmark: { first: "Wild", script: "Hearts", second: "Home Bakery" },
    tagline: "Organic sourdough, cookies & cinnamon rolls",
    // From the live site, lightly edited: em dash removed.
    lede: "Organic sourdough, fresh-baked cookies, and gooey buttercream cinnamon rolls from my home kitchen.",
    photo: {
      src: null,
      alt: "A Classic Sourdough Loaf cut open to show its airy crumb.",
      shot: 1,
    },
  },

  /** The dark band that rises over the first screen. All her words. */
  night: {
    label: "From my kitchen",
    statement:
      "Every loaf, cookie, and cinnamon roll comes from my home kitchen, made in small batches with simple, honest ingredients.",
    ribbon: "baked to order",
  },

  story: {
    heading: "About me",
    // Verbatim from the live site, em dash replaced with a period.
    paragraphs: [
      "I'm a stay-at-home mom who believes the quality of the food we eat really matters. That's why I use organic ingredients in all my bakes. No exceptions.",
      "What started as baking for my own family grew into sharing with neighbors, friends, and now you. Every loaf, cookie, and cinnamon roll comes from my home kitchen, made in small batches with simple, honest ingredients.",
    ],
    signatureLine: "If I wouldn't feed it to my family, I won't feed it to yours.",
    signedAs: "Lauren",
    photo: {
      src: null,
      alt: "Lauren in her kitchen with a tray of cinnamon rolls.",
      shot: 14,
    },
  },

  stallPhoto: {
    src: null,
    alt: "The Wild Hearts pickup table set out on a Saturday morning.",
    shot: 13,
  },

  /** Shown in the holiday section whenever no holiday menu is live. Her words, em dash removed. */
  holidayStanding: {
    heading: "Holiday specials",
    body: "During the holidays, I put together special seasonal menus. Think festive flavors, gift-worthy treats, and limited-time bakes you won't find the rest of the year.",
    follow: "Follow along on Hotplate so you don't miss the next holiday drop.",
  },

  /** Short lines that introduce sections. Written for the site; edit freely in her voice. */
  sections: {
    menuIntro:
      "What I bake, with sizes, prices and allergens. Each week's drop on Hotplate is chosen from this list.",
    howIntro: "Three plain steps, from Hotplate to your table.",
    closingNote: "Every drop is ordered and paid for on Hotplate.",
  },

  /** Footer line, from the live site. */
  footerLine: "Organic sourdough · Cookies · Cinnamon rolls",

  closing: {
    // Verbatim from the live site.
    heading: "Ready to taste the difference?",
  },

  /**
   * TODO(content): the Massachusetts cottage food and labeling statement, exactly as she
   * confirms it against current state requirements. null hides it.
   * Do not write this wording yourself.
   */
  complianceStatement: null as string | null,

  /**
   * TODO(content): she has not yet confirmed the organic claim wording for this site.
   * The words "organic" above are copied exactly from her current site.
   */
  organicClaimConfirmed: false,
};
