/* ==========================================================================
   SITE CONTENT
   This is the only file you need to edit to change text, videos and contacts.
   Keep the quotes "" and commas , exactly as they are.
   Everything marked PLACEHOLDER is sample text: replace it with your own.
   ========================================================================== */

window.SITE = {

  /* ---------- Hero (first screen) ---------- */
  name: "Your Name",              // PLACEHOLDER. Words wrap onto separate lines, e.g. "Alex Morgan".
  role: "Video Editor",
  tagline: "Short vertical videos for Reels, Shorts and TikTok. Long-form edits for YouTube.",

  availability: {
    show: true,                   // true = show the small status line, false = hide it
    text: "Open to new projects"  // PLACEHOLDER. Change or hide if it is not true for you.
  },

  /* Optional showreel button in the hero. Leave id/src empty ("") to hide the button.
     Use ONE of: type "youtube" + id, type "vimeo" + id, or type "file" + src. */
  showreel: {
    type: "youtube",
    id: "",                       // YouTube video ID or full link
    src: "",                      // for type "file": "assets/videos/showreel.mp4"
    poster: "",                   // optional cover image, e.g. "assets/images/showreel.jpg"
    format: "horizontal"          // "horizontal" (16:9) or "vertical" (9:16)
  },

  /* ---------- Contacts ---------- */
  contacts: {
    telegram: "your_username",    // PLACEHOLDER. Username without @, or a full https://t.me/... link
    email: "hello@example.com",   // PLACEHOLDER.
    emailSubject: "Video editing project",   // pre-filled subject of the email
    socials: [
      // Optional extra links shown under the buttons. Examples:
      // { label: "YouTube",   url: "https://youtube.com/@yourchannel" },
      // { label: "Instagram", url: "https://instagram.com/yourname" }
    ]
  },

  /* ---------- About ---------- */
  about: {
    heading: "Every cut should earn its place.",
    text: [
      "PLACEHOLDER: add a short intro here. Who you are, where you are based and what you enjoy editing.",
      "I turn raw footage into videos that are clear, well paced and built for the platform they are published on."
    ],
    photo: "",                    // optional, e.g. "assets/images/me.jpg" (4:5 portrait works best)
    photoAlt: "Portrait",
    tools: [
      // Optional. Add the software you really use. Example: "Premiere Pro", "DaVinci Resolve"
    ],
    principles: [
      { title: "Story before effects",
        text: "Structure and pacing come first. An effect stays only if it helps the viewer follow the story." },
      { title: "Made for the platform",
        text: "Vertical edits are framed and paced for the phone. YouTube edits are built to hold attention over a longer runtime." },
      { title: "Clean, balanced sound",
        text: "Voice, music and sound effects are balanced so the video works on phone speakers and headphones." },
      { title: "Clear process",
        text: "A short brief up front, organised feedback and final files delivered in the formats you need." }
    ]
  },

  /* ---------- Services (PLACEHOLDER: keep only what you really offer) ---------- */
  services: [
    { title: "Short-form editing",
      text: "Reels, Shorts and TikTok edits with tight pacing, captions, sound design and proper vertical framing." },
    { title: "YouTube editing",
      text: "Full edits of long-form videos: structure, cuts, b-roll, graphics, sound mix and final export." },
    { title: "Captions and subtitles",
      text: "Styled captions for short-form video and clean subtitles for longer videos." },
    { title: "Repurposing long videos",
      text: "Turning podcasts, streams and YouTube videos into a set of short vertical clips." },
    { title: "Sound and music",
      text: "Dialogue cleanup, music selection, sound effects and a final mix." },
    { title: "Color correction",
      text: "Basic correction and a consistent look across the whole project." }
  ],

  /* ---------- Category headings ---------- */
  categories: {
    short:   { title: "Short-form",     text: "Vertical edits for Reels, Shorts and TikTok." },
    youtube: { title: "YouTube",        text: "Long-form videos and channel edits." },
    other:   { title: "Other projects", text: "Other formats and personal projects." }
  },

  /* ---------- Projects ----------
     Each project is one { ... } block. Copy a block to add a project, delete it to remove one.

     category : "short" | "youtube" | "other"
     featured : true  = shown in the big "Selected work" section at the top
                false = shown in its category list below (a project is never shown twice)
     format   : "vertical" (9:16) or "horizontal" (16:9). Optional: short = vertical, others = horizontal
     title    : project name
     note     : optional one-line description (what you did, client, year...). Use "" to hide.
     poster   : optional cover image, e.g. "assets/images/my-cover.jpg".
                Not needed for YouTube (the thumbnail is loaded automatically).
     video    : where the video comes from. Use ONE of these:
                { type: "youtube", id: "dQw4w9WgXcQ" }     // YouTube ID or full link (Shorts links work too)
                { type: "vimeo",   id: "123456789" }       // Vimeo ID or link (add a poster)
                { type: "file",    src: "assets/videos/my-video.mp4" }   // your own MP4 (under 25 MB)
                Leave id/src empty ("") and the card shows an "Your video here" placeholder.
  */
  projects: [

    /* Featured (big section at the top) */
    { category: "youtube", featured: true, format: "horizontal",
      title: "YouTube project title", note: "Add what you did on this video",
      poster: "", video: { type: "youtube", id: "" } },

    { category: "short", featured: true,
      title: "Short-form project title", note: "",
      poster: "", video: { type: "file", src: "" } },
    { category: "short", featured: true,
      title: "Short-form project title", note: "",
      poster: "", video: { type: "file", src: "" } },
    { category: "short", featured: true,
      title: "Short-form project title", note: "",
      poster: "", video: { type: "file", src: "" } },

    /* Short-form */
    { category: "short", title: "Short-form project title", note: "", poster: "", video: { type: "file", src: "" } },
    { category: "short", title: "Short-form project title", note: "", poster: "", video: { type: "file", src: "" } },
    { category: "short", title: "Short-form project title", note: "", poster: "", video: { type: "file", src: "" } },
    { category: "short", title: "Short-form project title", note: "", poster: "", video: { type: "file", src: "" } },

    /* YouTube */
    { category: "youtube", title: "YouTube project title", note: "", poster: "", video: { type: "youtube", id: "" } },
    { category: "youtube", title: "YouTube project title", note: "", poster: "", video: { type: "youtube", id: "" } },

    /* Other projects */
    { category: "other", format: "horizontal", title: "Project title", note: "", poster: "", video: { type: "youtube", id: "" } },
    { category: "other", format: "horizontal", title: "Project title", note: "", poster: "", video: { type: "youtube", id: "" } }
  ]
};
