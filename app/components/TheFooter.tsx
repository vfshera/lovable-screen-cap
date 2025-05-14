export default function TheFooter() {
  return (
    <footer className="text-foreground/60 py-8 text-center text-sm">
      <div className="container mx-auto">
        <p>© {new Date().getFullYear()} ScreenCapture. All rights reserved.</p>
      </div>
    </footer>
  );
}
