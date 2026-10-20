/**
 * Everything the site says and links to, in one place.
 * Edit this file to change the site; the components only render it.
 */
import type { IconName } from './components/Icon'

export const site = {
  appName: 'MyStuff',
  brand: 'Ravvo',
  email: 'team.ravvo@gmail.com',

  links: {
    /** The GitHub Releases page; "latest" always points at the newest APK. */
    download: 'https://github.com/ravvo-717/mystuff/releases/latest',
    itch: 'https://ravvo-717.itch.io/mystuff',
    github: 'https://github.com/ravvo-717/mystuff',
  },

  hero: {
    headline: 'Everything important.\nLocked on your phone.',
    sub: 'A private vault for passwords, notes, cards, IDs and documents. Free, with no ads and no tracking.',
    primary: 'Download for Android',
    secondary: 'Get it on itch.io',
    /** Shorter labels for the side-by-side buttons on phones. */
    primaryShort: 'Download',
    secondaryShort: 'Get on itch.io',
    note: 'Free · optional Google Drive backup',
    notePhone: 'Free for Android 6 or newer',
    /** App screens rebuilt in public/screens/<name>.html, left to right. */
    screens: [
      { screen: 'unlock', alt: 'MyStuff unlock screen with PIN pad and fingerprint' },
      { screen: 'home', alt: 'MyStuff Home with Passwords, Notes, Cards, Identities and Documents' },
      { screen: 'item', alt: 'A saved password in MyStuff' },
    ],
  },

  learn: {
    safetyTitle: 'Private by design',
    safetySub: 'Here is what happens when you save a password.',
    /** The three-step "where your data goes" diagram. */
    journey: {
      phone: {
        tag: 'On your phone',
        title: 'You save it',
        sample: { label: 'Netflix · Password', lines: ['you@gmail.com', 'sunflower-42'] },
        line: 'Only you can see it, after your PIN or fingerprint.',
      },
      encrypt: {
        tag: 'Before it is saved',
        title: 'Locked with AES-256',
        /** Illustration only: what a stored item looks like to anyone without your PIN. */
        cipher: 'A6SNuiVwwiro0PXtsDrd7zHg7spk66XV1VJTbS7ju4DRjgaM6DXWq7gKZSXbVin06d3oohgs==',
        line: 'Without your PIN, this is all anyone gets.',
      },
      backup: {
        tag: 'Backup',
        title: 'Your Google Drive',
        file: 'mystuff_vault.enc',
        fileNote: 'Hidden and locked',
        none: 'No Ravvo servers.',
      },
    },
    safetyMore: [
      { icon: 'screenshot', text: 'No screenshots or screen recording.' },
      { icon: 'eyeOff', text: 'No ads, no tracking, no sign-up.' },
    ] satisfies { icon: IconName; text: string }[],
    keepTitle: 'What you can keep',
    keepSub: 'Everything sits on your Home screen.',
    /** Colours match the app's categories (VaultItemTypeUi.color). */
    keep: [
      { icon: 'lock', color: '#2563eb', name: 'Passwords', line: 'Logins you copy with one tap.' },
      { icon: 'note', color: '#6366f1', name: 'Notes', line: 'Private notes and lists.' },
      { icon: 'card', color: '#10b981', name: 'Cards', line: 'Bank and credit cards.' },
      { icon: 'id', color: '#0ea5e9', name: 'Identities', line: 'Aadhaar, PAN, passport and more.' },
      { icon: 'doc', color: '#64748b', name: 'Documents', line: 'PDFs and photos of your papers.' },
      { icon: 'folder', color: '#f59e0b', name: 'Folders', line: 'Group things, like Travel or Family.' },
    ] satisfies { icon: IconName; color: string; name: string; line: string }[],
    faqTitle: 'Questions',
    faqSub: 'The three things people ask most.',
    /** `big` questions get a large answer card ("Big three"); the rest open on tap. */
    faq: [
      {
        icon: 'shield',
        big: true,
        short: 'Yes',
        q: 'Is my data safe?',
        a: 'It is locked on your phone with AES-256. Only your PIN or fingerprint opens it. Your backup is locked the same way.',
      },
      {
        icon: 'phone',
        big: true,
        short: 'It comes back',
        q: 'What if I lose my phone?',
        a: 'Install MyStuff on your new phone and sign in with the same Google account. Everything comes back. Then set a new PIN.',
      },
      {
        icon: 'eyeOff',
        big: true,
        short: 'No',
        q: 'Can Ravvo see my data?',
        a: 'Ravvo has no servers. Your data is only on your phone and in your own Google Drive.',
      },
      {
        icon: 'user',
        q: 'Do I need a Google account?',
        a: 'No. MyStuff works offline. Google only adds backup, and you can turn it on later.',
      },
      {
        icon: 'trash',
        q: 'How do I delete everything?',
        a: 'Go to Settings → Sign out and turn on "Also delete my Google Drive backup".',
      },
      {
        icon: 'store',
        q: "Why isn't it on the Play Store?",
        a: 'Sharing it directly keeps it free. It is the same app, with the same updates.',
      },
    ] as { icon: IconName; big?: boolean; short?: string; q: string; a: string }[],
  },

  /** "Get it on your phone": drawn as the app's own Get started checklist. */
  install: {
    eyebrow: 'Free for Android',
    title: 'Get it on\nyour phone',
    sub: 'No ads, no account. About a minute.',
    meta: 'Version 1.0.0 · Android 6 or newer',
    card: { title: 'Get started', sub: 'MyStuff by Ravvo' },
    /** `done` shows the step ticked. */
    steps: [
      { title: 'Download MyStuff', line: 'From GitHub or itch.io', done: true },
      { title: 'Allow the install', line: 'Turn on "Allow from this source" once' },
      { title: 'Set your PIN', line: 'Open MyStuff and choose one' },
    ] as { title: string; line: string; done?: boolean }[],
  },

  /** The privacy policy (privacy.html). Checked against what the app does;
   *  change `updated` whenever the text changes. Emails and https:// links
   *  in the text become links. */
  privacy: {
    title: 'Your stuff stays yours.',
    sub: 'MyStuff has no servers and no accounts. This is exactly what happens to your data.',
    updated: '20 October 2026',
    sections: [
      {
        id: 'who',
        title: 'Who we are',
        blocks: [{ p: 'MyStuff is made by Ravvo. For any question about this policy, write to team.ravvo@gmail.com.' }],
      },
      {
        id: 'phone',
        title: 'What stays on your phone',
        blocks: [
          { p: 'Everything you save in MyStuff: passwords, notes, cards, IDs and documents.' },
          {
            list: [
              'It is encrypted with AES-256 before it is stored.',
              'Your PIN unlocks it and never leaves your phone.',
              'Fingerprint unlock is handled by Android. MyStuff never sees your fingerprint.',
              'Files you add are copied into the encrypted vault. MyStuff only sees the files you choose.',
            ],
          },
        ],
      },
      {
        id: 'google',
        title: 'Google sign-in and backup',
        blocks: [
          { p: 'Backup is optional. If you turn it on, you sign in with Google and MyStuff receives:' },
          {
            list: [
              'Your name and email address, to show which account is linked. Only the email is saved, on your phone.',
              'Access to a private app folder in your Google Drive (drive.appdata). MyStuff cannot see any other files in your Drive.',
            ],
          },
          { p: 'The backup is a single encrypted file. It goes directly from your phone to your Drive and is never sent to Ravvo.' },
        ],
      },
      {
        id: 'google-data',
        title: 'How we use Google data',
        blocks: [
          {
            quote:
              "MyStuff's use and transfer of information received from Google APIs adheres to the Google API Services User Data Policy, including the Limited Use requirements.",
          },
          { p: 'It is used only to store and restore your backup. It is not transferred to anyone, used for advertising, or used to train AI models.' },
        ],
      },
      {
        id: 'never',
        title: 'What we never do',
        blocks: [
          {
            list: [
              'Run servers that receive your data.',
              'Show ads, or use analytics or tracking.',
              'Sell or share your data.',
              'Ask you to create an account.',
            ],
          },
        ],
      },
      {
        id: 'permissions',
        title: 'Permissions',
        blocks: [
          {
            list: [
              'Internet: only to reach Google Drive for your backup.',
              'Biometrics: to unlock MyStuff with your fingerprint, if you turn it on.',
            ],
          },
        ],
      },
      {
        id: 'delete',
        title: 'Keeping and deleting your data',
        blocks: [
          { p: 'Your data is kept on your phone, and in your Drive backup if you turn it on, until you delete it.' },
          {
            list: [
              'In the app, go to Settings → Sign out and turn on "Also delete my Google Drive backup".',
              'Uninstalling MyStuff removes everything stored on your phone.',
              "You can remove MyStuff's access to your Google account at any time at https://myaccount.google.com/permissions.",
            ],
          },
        ],
      },
      {
        id: 'website',
        title: 'This website',
        blocks: [
          { p: 'This site uses no cookies and no analytics, and loads nothing from other services. Your light or dark choice is saved in your browser only.' },
          { p: 'It is hosted on GitHub Pages, which may keep standard server logs. Downloads come from GitHub or itch.io, under their own privacy policies.' },
        ],
      },
      {
        id: 'children',
        title: 'Children',
        blocks: [{ p: 'MyStuff is not directed at children under 13. We do not collect personal data from anyone.' }],
      },
      {
        id: 'changes',
        title: 'Changes to this policy',
        blocks: [{ p: 'If this policy changes, we will update this page and the date at the top.' }],
      },
    ] as { id: string; title: string; blocks: ({ p: string } | { list: string[] } | { quote: string })[] }[],
  },
}
