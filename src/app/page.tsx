import dynamic from 'next/dynamic'
 
const WheelOfSongIdeas = dynamic(() => import('./components/wheel-of-song-ideas'), { ssr: false })
 
const footerLinks = [
  {
    href: "https://enphnt.github.io/",
    text: "🌐 Go to enphnt homepage →",
  },
];

const FooterLink = ({ href, text }: Record<string, any>) => (
  <a
    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
  >
    {text}
  </a>
);

export default function Home() {
  return (
    <div className="grid items-between justify-items-center min-h-screen p-8 gap-16 sm:p-2 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center">
        <WheelOfSongIdeas />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        {footerLinks.map((link, index) => (
          <FooterLink key={index} {...link} />
        ))}
      </footer>
    </div>
  );
}
