import { Link } from "react-router";
import TheFooter from "~/components/TheFooter";
import { Play } from "lucide-react";

export function meta() {
  return [
    { title: "ScreenCapture" },
    {
      name: "description",
      content:
        "Record your screen with just a few clicks. No downloads, no installations, just a simple web app that makes screen recording effortless.",
    },
  ];
}

export default function Home() {
  return (
    <>
      <div className="flex flex-1 flex-col items-center justify-center px-4 pt-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="animate-fade-in relative mx-auto mb-8 h-20 w-20">
            <div className="from-primary to-secondary absolute inset-0 animate-pulse rounded-full bg-gradient-to-br opacity-20"></div>
            <div className="from-primary to-secondary absolute inset-2 flex items-center justify-center rounded-full bg-gradient-to-br">
              <Play size={32} className="ml-1 text-white" />
            </div>
          </div>

          <h1 className="from-primary to-secondary animate-fade-in mb-6 bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
            Capture Your Screen Instantly
          </h1>

          <p className="text-foreground/80 animate-fade-in mx-auto mb-10 max-w-2xl text-lg md:text-xl">
            Record your screen with just a few clicks. No downloads, no installations, just a simple
            web app that makes screen recording effortless.
          </p>

          <Link
            to="/recording"
            className="from-primary to-secondary animate-fade-in inline-flex transform items-center gap-2 rounded-xl bg-gradient-to-r px-8 py-4 font-medium text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          >
            <Play size={20} />
            Start Recording
          </Link>

          <div className="mt-16 grid grid-cols-1 gap-8 text-left md:grid-cols-3">
            <div className="glass rounded-xl p-6">
              <div className="bg-primary/20 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                <Play size={24} className="text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">One-Click Recording</h3>
              <p className="text-foreground/70">
                Start recording your screen with just a single click - no complex setup needed.
              </p>
            </div>

            <div className="glass rounded-xl p-6">
              <div className="bg-secondary/20 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-secondary"
                >
                  <path d="M21 15V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                  <path d="m17 9 5-5"></path>
                  <line x1="22" y1="4" x2="15" y2="4"></line>
                  <line x1="22" y1="11" x2="22" y2="4"></line>
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold">No Downloads</h3>
              <p className="text-foreground/70">
                Everything works right in your browser - no need to download or install any
                software.
              </p>
            </div>

            <div className="glass rounded-xl p-6">
              <div className="bg-accent/20 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-accent"
                >
                  <path d="M12 2v20"></path>
                  <path d="m19 15-7 7-7-7"></path>
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold">Instant Download</h3>
              <p className="text-foreground/70">
                Download your recordings immediately after you finish - no waiting for processing.
              </p>
            </div>
          </div>
        </div>
      </div>
      <TheFooter />
    </>
  );
}
