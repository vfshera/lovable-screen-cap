import { Link } from "react-router";

export default function TheNavbar() {
  return (
    <nav className="glass fixed top-0 z-10 flex w-full items-center justify-between px-4 py-4 md:px-8">
      <Link to="/" className="flex items-center gap-2">
        <div className="from-primary to-secondary relative flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br">
          <div className="h-3 w-3 rounded-full bg-white"></div>
        </div>
        <span className="text-foreground text-lg font-semibold">ScreenCapture</span>
      </Link>

      <div className="flex items-center gap-6">
        <Link
          to="/"
          className="text-foreground hover:text-primary text-sm font-medium transition-colors"
        >
          Home
        </Link>
        <Link
          to="/recording"
          className="bg-primary hover:bg-primary/90 rounded-lg px-4 py-2 text-sm font-medium text-white shadow-md transition-colors"
        >
          Start Recording
        </Link>
      </div>
    </nav>
  );
}
