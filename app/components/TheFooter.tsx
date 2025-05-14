export default function TheFooter() {
  return (
    <footer className="text-foreground/60 py-8 text-center text-sm">
      <div className="container mx-auto space-y-2">
        <p>
          Vibe coded by{" "}
          <a target="_blank" href="https://github.com/vfshera" className="underline">
            Franklin Shera
          </a>
        </p>

        <p>© {new Date().getFullYear()} ScreenCapture. All rights reserved.</p>
      </div>
    </footer>
  );
}
